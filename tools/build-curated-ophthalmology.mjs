import {mkdir,readFile,readdir,rm,writeFile} from 'node:fs/promises';
import {basename,dirname,join,relative,resolve,sep} from 'node:path';

const repoRoot=resolve(import.meta.dirname,'..');
const sourceRoot=resolve(process.env.NOTEBOOK_OPHTHALMOLOGY_DIR||'/Users/test/Desktop/Notbook_ask/Ophthalmologie');
const mappingFile=resolve(process.env.OPHTHALMOLOGY_TOPIC_GROUPS||join(repoRoot,'content/ophthalmology/topic-groups.json'));
const outDir=resolve(process.env.OPHTHALMOLOGY_CURATED_OUT||join(repoRoot,'knowledge/ophthalmology/topics'));
const mapping=JSON.parse(await readFile(mappingFile,'utf8'));
const eligible=await listEligibleReports(sourceRoot);
const eligibleByPath=new Map(eligible.map(item=>[item.relative,item]));

const assignments=validateMapping(mapping,eligibleByPath);
await rm(outDir,{recursive:true,force:true});
await mkdir(outDir,{recursive:true});

const records=[];
const pendingRedaction=[];
for(const group of mapping.groups){
  const reports=[group.primary,...group.merged].map(ref=>eligibleByPath.get(normalizeRef(ref)));
  const missingFields=missingAuthoredFields(group);
  if(missingFields.length){
    pendingRedaction.push({id:group.id,title:group.titleDe,category:group.category,status:'pending-redaction',reportCount:reports.length,missingFields});
    continue;
  }
  const summary=group.summaryDe.trim();
  const body=markdownToHtml(group.bodyDe);
  const authoredText=[group.bodyDe,group.summaryDe,...group.learningObjectives,...group.professional.overview,...group.professional.diagnostics,...group.professional.differentials,...group.professional.therapy,...group.professional.redFlags,...group.questions.flatMap(item=>[item.q,item.a]),...group.patient.explanation,...group.patient.care,...group.patient.urgent].join(' ');
  const words=countWords(stripMarkup(authoredText));
  if(words<800)throw new Error(`${group.id}: öffentliche Seite hat nur ${words} Wörter (mindestens 800 erforderlich)`);
  const record={id:group.id,title:group.titleDe,category:group.category,status:'medical-review',summary,wordCount:words,reportCount:reports.length,sourceLanguages:group.sourceLanguages,url:`./${group.id}/`};
  records.push(record);
  const articleDir=join(outDir,group.id);
  await mkdir(articleDir,{recursive:true});
  await writeFile(join(articleDir,'index.html'),renderArticle(group,record,reports,body));
}

records.sort((a,b)=>a.category.localeCompare(b.category,'de')||a.title.localeCompare(b.title,'de'));
const audit={version:mapping.version,generatedFrom:mapping.generatedFrom,generatedAt:new Date().toISOString(),eligibleReportCount:eligible.length,auditedReportCount:assignments.size,publicGroupCount:records.length,pendingRedactionCount:pendingRedaction.length,excludedCount:(mapping.excluded||[]).length,reports:eligible.map(report=>({path:report.relative,notebook:report.notebook,...assignments.get(report.relative)}))};
await writeFile(join(outDir,'index.html'),renderIndex(records));
await writeFile(join(outDir,'topics.json'),JSON.stringify({generatedAt:audit.generatedAt,status:'medical-review',topics:records,pendingRedaction},null,2)+'\n');
await writeFile(join(outDir,'audit.json'),JSON.stringify(audit,null,2)+'\n');
console.log(`Built ${records.length} curated topics from ${eligible.length} Studio reports.`);

async function listEligibleReports(root){
  const notebooks=(await readdir(root,{withFileTypes:true})).filter(entry=>entry.isDirectory()).sort((a,b)=>a.name.localeCompare(b.name));
  const reports=[];
  for(const notebook of notebooks){
    const studio=join(root,notebook.name,'Studio');let entries=[];
    try{entries=await readdir(studio,{withFileTypes:true})}catch(error){if(error.code==='ENOENT')continue;throw error}
    for(const entry of entries.filter(entry=>entry.isFile()&&entry.name.toLowerCase().endsWith('.md')).sort((a,b)=>a.name.localeCompare(b.name))){
      const absolute=join(studio,entry.name);
      reports.push({absolute,relative:toPosix(relative(root,absolute)),notebook:notebook.name,file:entry.name});
    }
  }
  return reports;
}

function validateMapping(value,eligibleReports){
  const errors=[];
  if(!value||typeof value!=='object')throw new Error('topic-groups.json muss ein Objekt sein');
  if(!value.version)errors.push('version fehlt');
  if(!value.generatedFrom)errors.push('generatedFrom fehlt');
  if(!Array.isArray(value.groups)||value.groups.length===0)errors.push('groups fehlt oder ist leer');
  const ids=new Set();const assigned=new Map();
  for(const [index,group] of (value.groups||[]).entries()){
    const label=group?.id||`groups[${index}]`;
    if(!/^[a-z0-9-]+$/.test(group?.id||''))errors.push(`${label}: id muss ein URL-sicherer Slug sein`);
    if(ids.has(group?.id))errors.push(`${label}: doppelte Gruppen-ID`);ids.add(group?.id);
    for(const key of ['titleDe','category','status','primary'])if(typeof group?.[key]!=='string'||!group[key].trim())errors.push(`${label}: ${key} fehlt`);
    if(group?.status!=='medical-review')errors.push(`${label}: status muss medical-review sein`);
    if(!Array.isArray(group?.merged))errors.push(`${label}: merged muss ein Array sein`);
    if(!Array.isArray(group?.sourceLanguages)||group.sourceLanguages.length===0)errors.push(`${label}: sourceLanguages muss ein nicht-leeres Array sein`);
    const refs=[group?.primary,...(Array.isArray(group?.merged)?group.merged:[])].filter(ref=>typeof ref==='string');
    const local=new Set();
    for(const ref of refs){
      const normalized=normalizeRef(ref);
      if(local.has(normalized))errors.push(`${label}: Bericht innerhalb der Gruppe doppelt: ${normalized}`);local.add(normalized);
      if(!eligibleReports.has(normalized))errors.push(`${label}: kein zulässiger unmittelbarer Studio-Bericht: ${normalized}`);
      const auditStatus=normalized===normalizeRef(group.primary)?'used':'merged';
      if(assigned.has(normalized))errors.push(`${label}: Bericht bereits zugeordnet: ${normalized}`);else assigned.set(normalized,{groupId:label,status:auditStatus});
    }
  }
  if(value.excluded!==undefined&&!Array.isArray(value.excluded))errors.push('excluded muss ein Array sein');
  for(const [index,item] of (value.excluded||[]).entries()){
    const label=`excluded[${index}]`;const normalized=normalizeRef(item?.report);
    if(!['excluded-off-topic','excluded-insufficient'].includes(item?.disposition))errors.push(`${label}: disposition muss excluded-off-topic oder excluded-insufficient sein`);
    if(typeof item?.reason!=='string'||!item.reason.trim())errors.push(`${label}: reason fehlt`);
    if(!eligibleReports.has(normalized))errors.push(`${label}: kein zulässiger unmittelbarer Studio-Bericht: ${normalized}`);
    const auditStatus=item?.disposition==='excluded-off-topic'?'excluded-off-topic':'insufficient';
    if(assigned.has(normalized))errors.push(`${label}: Bericht bereits zugeordnet: ${normalized}`);else assigned.set(normalized,{groupId:null,status:auditStatus,reason:item?.reason});
  }
  for(const report of eligibleReports.keys())if(!assigned.has(report))errors.push(`Nicht zugeordneter Studio-Bericht: ${report}`);
  if(assigned.size!==eligibleReports.size)errors.push(`Zuordnungsbilanz: ${assigned.size} zugeordnet, ${eligibleReports.size} zulässig`);
  if(errors.length)throw new Error(`Ungültige kuratierte Themenzuordnung:\n- ${errors.join('\n- ')}`);
  return assigned;
}

function normalizeRef(ref){
  if(typeof ref!=='string')return '';
  const slash=ref.replaceAll('\\','/').replace(/^\.\//,'');
  const root=toPosix(sourceRoot).replace(/\/$/,'');
  const normalized=slash.startsWith(`${root}/`)?slash.slice(root.length+1):slash;
  if(normalized.startsWith('/')||normalized.split('/').includes('..'))return `INVALID:${normalized}`;
  return normalized;
}
function missingAuthoredFields(group){
  const missing=[];
  for(const key of ['bodyDe','summaryDe'])if(typeof group?.[key]!=='string'||!group[key].trim())missing.push(key);
  for(const key of ['learningObjectives','questions'])if(!Array.isArray(group?.[key])||group[key].length===0)missing.push(key);
  for(const key of ['overview','diagnostics','differentials','therapy','redFlags'])if(!Array.isArray(group?.professional?.[key])||group.professional[key].length===0)missing.push(`professional.${key}`);
  for(const key of ['explanation','care','urgent'])if(!Array.isArray(group?.patient?.[key])||group.patient[key].length===0)missing.push(`patient.${key}`);
  if(Array.isArray(group?.questions)&&group.questions.some(item=>typeof item?.q!=='string'||!item.q.trim()||typeof item?.a!=='string'||!item.a.trim()))missing.push('questions[].q/a');
  return missing;
}
function toPosix(value){return value.split(sep).join('/')}
function extractSummary(markdown){
  const paragraph=markdown.replace(/\r/g,'').split(/\n\s*\n/).map(part=>stripMarkup(part).trim()).find(part=>part.length>80&&!/^[-|]/.test(part));
  const text=paragraph||stripMarkup(markdown).trim();return text.length>320?`${text.slice(0,317).trim()}…`:text;
}
function countWords(text){return (text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)||[]).length}
function stripMarkup(value){return String(value).replace(/```[\s\S]*?```/g,' ').replace(/<[^>]*>/g,' ').replace(/[#*_`>|$\\]/g,' ').replace(/\s+/g,' ')}
function esc(value=''){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
function inline(value){return esc(value).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/`(.+?)`/g,'<code>$1</code>').replace(/\$\$(.+?)\$\$/g,(_,expr)=>`<span class="kb-math kb-math-display">${formatMath(expr)}</span>`).replace(/\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g,(_,expr)=>`<span class="kb-math">${formatMath(expr)}</span>`)}
function formatMath(expr){return expr.replace(/\\text\{([^{}]*)\}/g,'$1').replace(/\\times/g,'×').replace(/\\cdot/g,'·').replace(/\\leq/g,'≤').replace(/\\geq/g,'≥').replace(/\\pm/g,'±').replace(/\s+/g,' ').trim()}
function slugifyHeading(value,index){const slug=value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');return `abschnitt-${index}-${slug||'thema'}`}
function parseTableRow(line){return line.trim().replace(/^\|/,'').replace(/\|$/,'').split(/\s*\|\s*/).map(cell=>cell.trim())}
function markdownToHtml(markdown){
  const lines=markdown.replace(/\r/g,'').split('\n');let html='';let listType=null;let listItems=[];let headingIndex=0;
  const flush=()=>{if(!listType)return;html+=`<${listType}>${listItems.map(item=>`<li>${inline(item)}</li>`).join('')}</${listType}>`;listType=null;listItems=[]};
  for(let index=0;index<lines.length;index++){
    const line=lines[index].trim();if(!line){flush();continue}if(/^---+$/.test(line)){flush();html+='<hr>';continue}
    const heading=line.match(/^(#{1,5})\s+(.+)$/);if(heading){flush();const level=Math.min(heading[1].length+1,6);const text=heading[2].replace(/[*_]/g,'');const lower=text.toLocaleLowerCase('de');const kind=/red flag|warn|achtung|notfall|alarm/.test(lower)?' kb-heading-redflag':/zusammenfassung|summary|merksatz|take-home|fazit/.test(lower)?' kb-heading-summary':'';html+=`<h${level} id="${slugifyHeading(text,++headingIndex)}" class="${kind.trim()}">${inline(heading[2])}</h${level}>`;continue}
    if(line.includes('|')&&index+1<lines.length&&/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index+1])){flush();const header=parseTableRow(line);index++;const rows=[];while(index+1<lines.length&&lines[index+1].trim().includes('|')){index++;rows.push(parseTableRow(lines[index]))}html+=`<div class="kb-table-wrap"><table class="kb-table"><thead><tr>${header.map(cell=>`<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${header.map((_,cell)=>`<td>${inline(row[cell]||'')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;continue}
    const quote=line.match(/^>\s*(.+)$/);if(quote){flush();const lower=quote[1].toLocaleLowerCase('de');const className=/red flag|warn|achtung|notfall|alarm/.test(lower)?'kb-warning':'kb-takeaway';html+=`<aside class="${className}">${inline(quote[1])}</aside>`;continue}
    const bullet=line.match(/^[-*+]\s+(.+)$/);if(bullet){if(listType&&listType!=='ul')flush();listType='ul';listItems.push(bullet[1]);continue}
    const numbered=line.match(/^\d+[.)]\s+(.+)$/);if(numbered){if(listType&&listType!=='ol')flush();listType='ol';listItems.push(numbered[1]);continue}
    flush();html+=`<p>${inline(line)}</p>`;
  }
  flush();return html;
}
function pageStart(title,description,assetPrefix){return `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="robots" content="noindex,nofollow"><title>${esc(title)} | Mohammad Askar</title><link rel="stylesheet" href="${assetPrefix}/library.css"><link rel="stylesheet" href="${assetPrefix}/lecture.css"></head><body><div class="kb-shell">`}
function renderIndex(items){
  const categories=[...new Set(items.map(item=>item.category))].sort((a,b)=>a.localeCompare(b,'de'));
  const filters=categories.map(category=>`<button class="kb-filter" data-filter="${esc(category)}" aria-pressed="false">${esc(category)}</button>`).join('');
  const cards=items.map(item=>`<a class="kb-card" data-category="${esc(item.category)}" href="${item.id}/"><span class="kb-badge">${esc(item.category)}</span><h2>${esc(item.title)}</h2><p>${esc(item.summary)}</p><footer><span>${item.wordCount} Wörter</span><span class="kb-status">Medizinische Prüfung</span></footer></a>`).join('\n');
  return `${pageStart('Kuratierte Augenheilkunde','Konsolidierte ausführliche Lernkapitel aus den NotebookLM-Studio-Berichten.','../assets')}<nav class="kb-nav"><a href="../index.html">← Augenheilkunde-Wissen</a></nav><header class="kb-hero"><p class="kb-eyebrow">Lokale Prüffassung</p><h1>Kuratierte Themen</h1><p>Ausführliche, thematisch zusammengeführte Lernkapitel ohne doppelte Studio-Berichte.</p><div class="kb-warning"><strong>Nicht veröffentlicht:</strong> Alle Inhalte befinden sich in medizinischer Prüfung.</div></header><main><div class="kb-controls"><label><span class="kb-eyebrow">Themen durchsuchen</span><input class="kb-search" type="search" placeholder="Thema suchen" aria-label="Themen durchsuchen"></label><div class="kb-filters"><button class="kb-filter" data-filter="all" aria-pressed="true">Alle</button>${filters}</div></div><section class="kb-grid">${cards}</section><p class="kb-empty" hidden>Keine passenden Themen gefunden.</p></main><footer class="kb-footer">${items.length} Themen · medizinische Prüfung ausstehend</footer></div><script src="../assets/library.js?v=20260915"></script></body></html>`;
}
function renderArticle(group,record,reports,body){
  const list=items=>`<ul>${items.map(item=>`<li>${inline(item)}</li>`).join('')}</ul>`;
  const paragraphs=items=>items.map(item=>`<p>${inline(item)}</p>`).join('');
  const sources=reports.map(report=>`<li>${esc(basename(report.file,'.md'))}<br><small>${esc(report.notebook)}</small></li>`).join('');
  const professional=`<section class="kb-view" id="panel-facharzt" data-view="facharzt" role="tabpanel" aria-labelledby="tab-facharzt"><h2>Lernziele</h2>${list(group.learningObjectives)}<h2>Ausführliche Vorlesung</h2><article class="kb-lecture">${body}</article><h2>Prüfungsorientierter Überblick</h2>${paragraphs(group.professional.overview)}<h2>Diagnostik</h2>${list(group.professional.diagnostics)}<h2>Differenzialdiagnosen</h2>${list(group.professional.differentials)}<h2>Therapieprinzipien</h2>${list(group.professional.therapy)}<section class="kb-pitfalls"><h2>Red Flags</h2>${list(group.professional.redFlags)}</section><h2>Prüfungsfragen</h2>${group.questions.map((item,index)=>`<details class="kb-question"><summary>${index+1}. ${esc(item.q)}</summary><p>${inline(item.a)}</p></details>`).join('')}</section>`;
  const patient=`<section class="kb-view" id="panel-patienten" data-view="patienten" role="tabpanel" aria-labelledby="tab-patienten" hidden><h2>Was bedeutet das?</h2>${paragraphs(group.patient.explanation)}<h2>Untersuchung und Behandlung</h2>${list(group.patient.care)}<h2>Wann sollte man rasch handeln?</h2>${list(group.patient.urgent)}<div class="kb-warning">Diese Information ersetzt keine persönliche Untersuchung oder Therapieempfehlung.</div></section>`;
  return `${pageStart(group.titleDe,record.summary,'../../assets')}<nav class="kb-nav"><a href="../index.html">← Kuratierte Themen</a><div class="kb-nav-links"><a href="../../index.html">Alle Kapitel</a><a href="../../../index.html#knowledge">Hauptseite</a></div></nav><main class="kb-article"><p class="kb-eyebrow">${esc(group.category)} · Lernentwurf</p><h1>${esc(group.titleDe)}</h1><p class="kb-lead">${esc(record.summary)}</p><div class="kb-meta"><span class="kb-badge">Deutsch</span><span class="kb-badge">${record.wordCount} Wörter</span><span class="kb-badge kb-status">Medizinische Prüfung</span></div><div class="kb-warning"><strong>Redaktioneller Entwurf:</strong> Das Kapitel ist noch nicht medizinisch freigegeben.</div><div class="kb-tabs" role="tablist"><button class="kb-view-button" id="tab-facharzt" data-view="facharzt" role="tab" aria-controls="panel-facharzt" aria-selected="true">Facharztprüfung</button><button class="kb-view-button" id="tab-patienten" data-view="patienten" role="tab" aria-controls="panel-patienten" aria-selected="false" tabindex="-1">Für Patienten</button></div>${professional}${patient}<section class="kb-sources"><h2>Quellen</h2><ol>${sources}</ol></section></main><footer class="kb-footer">Educational content only · keine individuelle medizinische Beratung</footer></div><script src="../../assets/library.js"></script></body></html>`;
}
