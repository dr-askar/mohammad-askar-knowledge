import {readFile,readdir} from 'node:fs/promises';
import {join,resolve} from 'node:path';

const repoRoot=resolve(import.meta.dirname,'..');
const outDir=resolve(process.env.OPHTHALMOLOGY_CURATED_OUT||join(repoRoot,'knowledge/ophthalmology/topics'));
const topics=JSON.parse(await readFile(join(outDir,'topics.json'),'utf8'));
const audit=JSON.parse(await readFile(join(outDir,'audit.json'),'utf8'));
const errors=[];

if(topics.status!=='medical-review')errors.push('topics.json: Status muss medical-review sein');
if(topics.topics.length!==audit.publicGroupCount)errors.push(`Themenzahl ${topics.topics.length} stimmt nicht mit Audit ${audit.publicGroupCount} überein`);
if(topics.pendingRedaction.length!==audit.pendingRedactionCount)errors.push(`Pending-Redaction-Zahl ${topics.pendingRedaction.length} stimmt nicht mit Audit ${audit.pendingRedactionCount} überein`);
if(audit.auditedReportCount!==audit.eligibleReportCount)errors.push(`Studio-Bilanz unvollständig: ${audit.auditedReportCount}/${audit.eligibleReportCount}`);
const paths=new Set();const ids=new Set();
for(const report of audit.reports){
  if(paths.has(report.path))errors.push(`Audit enthält Bericht doppelt: ${report.path}`);paths.add(report.path);
  if(!/^[^/]+\/Studio\/[^/]+\.md$/u.test(report.path))errors.push(`Unzulässiger Berichtspfad: ${report.path}`);
  if(!['used','merged','duplicate','insufficient','excluded-off-topic'].includes(report.status))errors.push(`Ungültiger Auditstatus: ${report.path}`);
  if(['used','merged'].includes(report.status)&&!report.groupId)errors.push(`Verwendeter Bericht ohne Gruppe: ${report.path}`);
  if(!['used','merged'].includes(report.status)&&(!report.reason||report.groupId))errors.push(`Ausgeschlossener Bericht ohne Begründung oder mit Gruppe: ${report.path}`);
}
if(paths.size!==audit.eligibleReportCount)errors.push(`Audit enthält ${paths.size} eindeutige Berichte, erwartet ${audit.eligibleReportCount}`);
for(const topic of topics.topics){
  if(ids.has(topic.id))errors.push(`Doppelte Themen-ID: ${topic.id}`);ids.add(topic.id);
  if(topic.status!=='medical-review')errors.push(`${topic.id}: Status muss medical-review sein`);
  if(topic.wordCount<800)errors.push(`${topic.id}: nur ${topic.wordCount} Wörter`);
  if(topic.reportCount<1)errors.push(`${topic.id}: kein Primärbericht`);
  const file=join(outDir,topic.id,'index.html');
  try{
    const html=await readFile(file,'utf8');
    for(const required of ['noindex,nofollow','Medizinische Prüfung','Facharztprüfung','Für Patienten','Differenzialdiagnosen','Prüfungsfragen','Quellen','kb-lecture'])if(!html.includes(required))errors.push(`${topic.id}: ${required} fehlt`);
    if(/Text wird gescannt|Details werden untersucht|Antwort wird ausgegeben/.test(html))errors.push(`${topic.id}: Ladeplatzhalter gefunden`);
    const text=html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&[a-z#0-9]+;/gi,' ');
    const words=(text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)||[]).length;
    if(words<800)errors.push(`${topic.id}: gerenderte Seite hat nur ${words} Wörter`);
  }catch(error){errors.push(`${topic.id}: HTML fehlt oder unlesbar (${error.message})`)}
}
try{
  const entries=await readdir(outDir,{withFileTypes:true});
  const generated=entries.filter(entry=>entry.isDirectory()).map(entry=>entry.name);
  for(const id of ids)if(!generated.includes(id))errors.push(`${id}: Ausgabeverzeichnis fehlt`);
  for(const id of generated)if(!ids.has(id))errors.push(`Verwaistes Ausgabeverzeichnis: ${id}`);
}catch(error){errors.push(`Ausgabeverzeichnis unlesbar: ${error.message}`)}
if(errors.length){console.error(errors.map(error=>`- ${error}`).join('\n'));process.exit(1)}
console.log(`Validated ${topics.topics.length} curated topics: ${audit.eligibleReportCount} Studio reports assigned exactly once, review gates and 800-word minimum OK.`);
