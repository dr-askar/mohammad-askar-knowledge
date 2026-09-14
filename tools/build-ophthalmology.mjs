import {readFile,writeFile,mkdir,rm,readdir} from 'node:fs/promises';
import {homedir} from 'node:os';
import {join,resolve} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const contentFile=join(root,'content/ophthalmology/articles.json');
const outDir=join(root,'knowledge/ophthalmology');
const exportRoot=process.env.NOTEBOOK_EXPORT_DIR||join(homedir(),'Desktop/Notbook_ask');
const publish=process.argv.includes('--publish');
const data=JSON.parse(await readFile(contentFile,'utf8'));
const sourceFiles=[
  join(exportRoot,'Ophthalmologie/👁️ Netzhaut/Quellen/manifest.json'),
  join(exportRoot,'Ophthalmologie/👁️ Glaukom/Quellen/manifest.json')
];
const studioDirs=[
  join(exportRoot,'Ophthalmologie/👁️ Netzhaut/Studio'),
  join(exportRoot,'Ophthalmologie/👁️ Glaukom/Studio')
];
const studioPrefixes={
  'amd-neovaskulaer':'044_','diabetische-retinopathie-stadien':'026_','retinale-venenverschluss':'014_','retinopathie-fruehgeborene':'042_','makula-loch':'006_',
  'glaukom-open-angle':'007_','glaukom-winkelblock':'019_','glaukom-normaldruck':'001_','glaukom-kind':'012_','glaukom-pigment':'006_',
  'oct-netzhaut-interpretation':'004_','diabetisches-makulaoedem':'040_','retinaler-arterienverschluss':'014_','rhegmatogene-netzhautabloesung':'012_','hereditaere-netzhautdystrophien':'011_',
  'glaukom-diagnostik':'018_','glaukom-gesichtsfeld':'017_','glaukom-medikamentoese-therapie':'013_','glaukom-lasertherapie':'014_','glaukom-chirurgie':'010_'
};
const studioFileCache=new Map();
const sources=new Map();
for(const file of sourceFiles){const manifest=JSON.parse(await readFile(file,'utf8'));for(const source of manifest.sources)sources.set(source.source_key,source)}
const articles=publish?data.articles.filter(article=>article.status==='approved'):data.articles;
const required=['slug','title','category','summary','takeaway','professional','patient','questions','sourceKeys','status','lastReviewed'];
const forbidden=['Text wird gescannt','Details werden untersucht','Antwort wird ausgegeben'];
const slugs=new Set();
for(const article of data.articles){
  for(const field of required)if(article[field]===undefined)throw new Error(`${article.slug||'Artikel'}: Feld ${field} fehlt`);
  if(!/^[a-z0-9-]+$/.test(article.slug))throw new Error(`${article.slug}: ungültiger Slug`);
  if(slugs.has(article.slug))throw new Error(`${article.slug}: doppelter Slug`);slugs.add(article.slug);
  if(!['retina','glaucoma'].includes(article.category))throw new Error(`${article.slug}: unbekannte Kategorie`);
  if(!['draft','medical-review','approved'].includes(article.status))throw new Error(`${article.slug}: unbekannter Status`);
  for(const path of [['professional','overview'],['professional','diagnostics'],['professional','management'],['professional','pitfalls'],['patient','explanation'],['patient','care'],['patient','urgent']])if(!Array.isArray(article[path[0]]?.[path[1]])||!article[path[0]][path[1]].length)throw new Error(`${article.slug}: ${path.join('.')} fehlt`);
  if(!Array.isArray(article.questions)||article.questions.length<2)throw new Error(`${article.slug}: mindestens zwei Prüfungsfragen erforderlich`);
  if(!article.sourceKeys.length)throw new Error(`${article.slug}: keine Quellen`);
  for(const key of article.sourceKeys)if(!sources.has(key))throw new Error(`${article.slug}: unbekannte Quelle ${key}`);
  const serialized=JSON.stringify(article);for(const phrase of forbidden)if(serialized.includes(phrase))throw new Error(`${article.slug}: NotebookLM-Platzhalter gefunden`);
}
await mkdir(outDir,{recursive:true});
for(const article of data.articles)await rm(join(outDir,article.slug),{recursive:true,force:true});
for(const article of articles)await renderArticle(article);
await writeFile(join(outDir,'index.html'),renderIndex(articles));
await writeFile(join(outDir,'articles.json'),JSON.stringify({generatedAt:data.updated,mode:publish?'publish':'preview',articles:articles.map(publicRecord)},null,2)+'\n');
console.log(`Built ${articles.length} ophthalmology articles (${publish?'publish':'preview'} mode).`);

function esc(value=''){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
function paragraphs(items){return items.map(item=>`<p>${esc(item)}</p>`).join('\n')}
function list(items){return `<ul>${items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`}
function pageStart(title,description,depth='.'){
  return `<!doctype html><html lang="de" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="robots" content="${publish?'index,follow':'noindex,nofollow'}"><title>${esc(title)} | Mohammad Askar</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="${depth}/assets/library.css"><link rel="stylesheet" href="${depth}/assets/lecture.css"></head><body><div class="kb-shell"><nav class="kb-nav" aria-label="Navigation"><a href="${depth}/index.html">← Augenheilkunde-Wissen</a><div class="kb-nav-links"><a href="${depth}/../../index.html#knowledge">Hauptseite</a><a href="${depth}/index.html">Alle Kapitel</a></div></nav>`
}
function renderIndex(items){
  const cards=items.map(article=>`<a class="kb-card" data-category="${article.category}" href="./${article.slug}/"><span class="kb-badge">${article.category==='retina'?'Netzhaut':'Glaukom'}</span><h2>${esc(article.title)}</h2><p>${esc(article.summary)}</p><footer><span>${article.readingMinutes} Min.</span><span class="kb-status">${statusLabel(article.status)}</span></footer></a>`).join('\n');
  const modeLabel=publish?'Redigiertes Lernkompendium':'Lernkompendium · lokale Prüffassung';
  const notice=publish?'<div class="kb-warning"><strong>Medizinischer Hinweis:</strong> Die Inhalte dienen der Fortbildung und allgemeinen Information. Sie ersetzen keine individuelle ärztliche Beratung.</div>':'<div class="kb-warning"><strong>Noch nicht veröffentlicht:</strong> Alle Kapitel befinden sich in der medizinischen Prüfung. Die Inhalte ersetzen keine individuelle ärztliche Beratung.</div>';
  const footer=publish?`${items.length} medizinisch freigegebene Kapitel`:`${items.length} Kapitel · medizinische Prüfung ausstehend`;
  return `${pageStart('Augenheilkunde-Wissen','Redigiertes Lernkompendium für die Facharztprüfung und verständliche Patienteninformationen.')}
<header class="kb-hero"><p class="kb-eyebrow">${modeLabel}</p><h1>Augenheilkunde-Wissen</h1><p>Neu redigierte, thematisch konsolidierte Lernkapitel aus der persönlichen Facharztprüfung-Sammlung. Jedes Kapitel trennt Fachwissen und Patienteninformation und nennt die tatsächlich verwendeten Quellen.</p>${notice}</header>
<main><div class="kb-controls"><label><span class="kb-eyebrow">Kapitel durchsuchen</span><input class="kb-search" type="search" placeholder="z. B. OCT, Winkelblock, AMD" aria-label="Kapitel durchsuchen"></label><div class="kb-filters" aria-label="Fachgebiet filtern"><button class="kb-filter" data-filter="all" aria-pressed="true">Alle</button><button class="kb-filter" data-filter="retina" aria-pressed="false">Netzhaut</button><button class="kb-filter" data-filter="glaucoma" aria-pressed="false">Glaukom</button></div></div><section class="kb-grid" aria-label="Lernkapitel">${cards}</section><p class="kb-empty" hidden>Keine passenden Kapitel gefunden.</p></main><footer class="kb-footer">Redaktionsstand ${esc(data.updated)} · ${footer}</footer></div><script src="./assets/library.js"></script></body></html>`;
}
async function renderArticle(article){
  const dir=join(outDir,article.slug);await mkdir(dir,{recursive:true});
  const bibliography=article.sourceKeys.map(key=>sources.get(key));
  const lectureHtml=await loadLecture(article.slug);
  const professional=`<section class="kb-view" id="panel-facharzt" data-view="facharzt" role="tabpanel" aria-labelledby="tab-facharzt"><div class="kb-lecture"><h2>Ausführliche Vorlesungsnotizen</h2><p class="kb-lecture-note"><strong>Lokaler Studio-Entwurf:</strong> Dieser ausführliche Leitfaden stammt aus dem NotebookLM-Studio-Export und ist noch nicht medizinisch freigegeben.</p>${lectureHtml}</div><h2>Prüfungsorientierter Überblick</h2>${paragraphs(article.professional.overview)}<h2>Diagnostik und Einordnung</h2>${list(article.professional.diagnostics)}<h2>Management und Prüfungswissen</h2>${list(article.professional.management)}<section class="kb-pitfalls"><h2>Merksätze und Fallstricke</h2>${list(article.professional.pitfalls)}</section><h2>Prüfungsfragen</h2>${article.questions.map((q,index)=>`<details class="kb-question"><summary>${index+1}. ${esc(q.q)}</summary><p>${esc(q.a)}</p></details>`).join('')}</section>`;
  const patient=`<section class="kb-view" id="panel-patienten" data-view="patienten" role="tabpanel" aria-labelledby="tab-patienten" hidden><h2>Was bedeutet das?</h2>${paragraphs(article.patient.explanation)}<h2>Untersuchung und Behandlung</h2>${list(article.patient.care)}<h2>Wann sollte man rasch handeln?</h2>${list(article.patient.urgent)}<div class="kb-warning">Diese Information erklärt allgemeine Zusammenhänge. Sie ersetzt keine Untersuchung, Diagnose oder persönliche Therapieempfehlung.</div></section>`;
  const refs=bibliography.map(source=>`<li><span class="kb-source-type">${esc(source.type==='youtube'?'Vorlesung / Video':source.type)}</span><br>${source.canonical_url?`<a href="${esc(source.canonical_url)}" target="_blank" rel="noreferrer">${esc(source.title)}</a>`:esc(source.title)}</li>`).join('');
  const sourceNote=article.status==='approved'?'Vorlesungen dienen der didaktischen Einordnung und sind als solche gekennzeichnet.':'Vorlesungen dienen der didaktischen Einordnung. Therapieaussagen müssen vor Freigabe zusätzlich gegen aktuelle Leitlinien oder Primärliteratur geprüft werden.';
  const html=`${pageStart(article.title,article.summary,'..')}<main class="kb-article"><p class="kb-eyebrow">${article.category==='retina'?'Netzhaut':'Glaukom'} · ${article.status==='approved'?'Fachkapitel':'Lernentwurf'}</p><h1>${esc(article.title)}</h1><p class="kb-lead">${esc(article.summary)}</p><div class="kb-meta"><span class="kb-badge">Deutsch</span><span class="kb-badge">${article.readingMinutes} Minuten</span><span class="kb-badge kb-status">${statusLabel(article.status)}</span><span class="kb-badge">Stand ${esc(article.lastReviewed)}</span></div>${article.status!=='approved'?'<div class="kb-warning"><strong>Redaktioneller Entwurf:</strong> Dieses Kapitel ist noch nicht medizinisch freigegeben und darf nicht veröffentlicht werden.</div>':''}<p class="kb-takeaway">${esc(article.takeaway)}</p><div class="kb-tabs" role="tablist" aria-label="Ansicht wählen"><button class="kb-view-button" id="tab-facharzt" data-view="facharzt" role="tab" aria-controls="panel-facharzt" aria-selected="true">Facharztprüfung</button><button class="kb-view-button" id="tab-patienten" data-view="patienten" role="tab" aria-controls="panel-patienten" aria-selected="false" tabindex="-1">Für Patienten</button></div>${professional}${patient}<section class="kb-sources"><h2>Verwendete Quellen</h2><ol>${refs}</ol><p><small>${sourceNote}</small></p></section></main><footer class="kb-footer">Educational content only · keine individuelle medizinische Beratung</footer></div><script src="../assets/library.js"></script></body></html>`;
  await writeFile(join(dir,'index.html'),html);
}
function statusLabel(status){return status==='approved'?'Freigegeben':status==='medical-review'?'Medizinische Prüfung':'Entwurf'}
function publicRecord(article){return {slug:article.slug,title:article.title,category:article.category,language:'de',audiences:['professional','patient'],summary:article.summary,status:article.status,lastReviewed:article.lastReviewed,readingMinutes:article.readingMinutes,sourceCount:article.sourceKeys.length,url:`./${article.slug}/`}}

async function loadLecture(slug){
  const prefix=studioPrefixes[slug];
  if(!prefix)return '<p>Für dieses Kapitel ist noch kein Studio-Leitfaden zugeordnet.</p>';
  if(!studioFileCache.has(slug)){
    let found=null;
    const preferredDir=slug.startsWith('glaukom-')?studioDirs[1]:studioDirs[0];
    const otherDir=preferredDir===studioDirs[0]?studioDirs[1]:studioDirs[0];
    for(const dir of [preferredDir,otherDir]){let files=[];try{files=await readdir(dir)}catch{continue}found=files.find(file=>file.startsWith(prefix)&&file.endsWith('.md'));if(found){studioFileCache.set(slug,join(dir,found));break}}
    if(!found&&!studioFileCache.has(slug))throw new Error(`${slug}: Studio-Leitfaden mit Präfix ${prefix} fehlt`);
  }
  return markdownToHtml(await readFile(studioFileCache.get(slug),'utf8'));
}
function markdownToHtml(markdown){
  const lines=markdown.replace(/\r/g,'').split('\n');let html='';let listType=null;let listItems=[];
  const flush=()=>{if(!listType)return;html+=`<${listType}>${listItems.map(item=>`<li>${inline(item)}</li>`).join('')}</${listType}>`;listType=null;listItems=[]};
  for(const raw of lines){const line=raw.trim();if(!line){flush();continue}
    const heading=line.match(/^(#{1,4})\s+(.+)$/);if(heading){flush();const level=Math.min(heading[1].length+2,6);html+=`<h${level}>${inline(heading[2])}</h${level}>`;continue}
    const bullet=line.match(/^[-*+]\s+(.+)$/);if(bullet){if(listType&&listType!=='ul')flush();listType='ul';listItems.push(bullet[1]);continue}
    const numbered=line.match(/^\d+[.)]\s+(.+)$/);if(numbered){if(listType&&listType!=='ol')flush();listType='ol';listItems.push(numbered[1]);continue}
    flush();html+=`<p>${inline(line)}</p>`;
  }
  flush();return html;
}
function inline(value){return esc(value).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/`(.+?)`/g,'<code>$1</code>')}
