import { readFile, writeFile } from 'node:fs/promises';
import { basename } from 'node:path';
const path='content/ophthalmology/topic-groups.json';
const root='/Users/test/Desktop/Notbook_ask/Ophthalmologie/';
const data=JSON.parse(await readFile(path,'utf8'));
const groups=data.groups.filter(g=>g.category==='uveitis');
const refs=[...new Set(groups.flatMap(g=>[g.primary,...(g.merged||[])]))];
const used=new Set(data.groups.filter(g=>g.category!=='uveitis').map(g=>g.id));
const out=[];
for(const ref of refs){
  const text=await readFile(root+ref,'utf8');
  const clean=x=>x.replace(/```[\s\S]*?```/g,' ').replace(/<[^>]*>/g,' ').replace(/[#*_`>|$\\]/g,' ').replace(/\s+/g,' ').trim();
  const blocks=text.split(/\n\s*\n/).map(clean).filter(x=>x.length>70);
  const heading=(text.match(/^#\s+(.+)$/m)?.[1]||basename(ref,'.md')).replace(/[*_]/g,'').trim();
  const base=heading.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'uveitis-vorlesung';
  let id=base;let n=2;while(used.has(id)){id=`${base}-${n++}`}used.add(id);
  const pick=re=>blocks.filter(x=>re.test(x)).slice(0,8);
  const summary=(blocks.find(x=>!/^#/.test(x))||`Ausführliche Einzelvorlesung zu ${heading}.`).slice(0,650);
  out.push({id,titleDe:heading,category:'uveitis',status:'medical-review',primary:ref,merged:[],sourceLanguages:['de'],bodyDe:text,summaryDe:summary,learningObjectives:['Die Inhalte dieser Einzelvorlesung strukturiert wiedergeben.','Diagnostische Befunde und Differenzialdiagnosen sicher einordnen.','Therapie, Verlauf und Warnzeichen fachärztlich beurteilen.'],professional:{overview:blocks.slice(0,10),diagnostics:pick(/Diagnos|Untersuch|OCT|Bildgebung|Spaltlampe|Fluoreszenz/i),differentials:pick(/Differenzial|Differential|Ätiolog|Ursach/i),therapy:pick(/Therap|Behandlung|Management|Steroid|Immun|Operation/i),redFlags:pick(/Notfall|Warn|sofort|dring|Komplikation|Red Flag/i)},questions:[{q:`Was sind die wichtigsten Lernpunkte der Vorlesung „${heading}“?`,a:'Die Antwort ergibt sich aus den strukturierten Abschnitten und muss am individuellen klinischen Befund überprüft werden.'},{q:'Welche Befunde erfordern eine dringliche Abklärung?',a:'Rasche Sehverschlechterung, starke Schmerzen, ausgeprägte Entzündung, Druckanstieg oder infektiöser Verdacht.'}],patient:{explanation:[summary],care:['Die Inhalte dienen der Orientierung und ersetzen keine individuelle Untersuchung durch eine Augenärztin oder einen Augenarzt.'],urgent:['Bei plötzlicher Sehverschlechterung, starken Schmerzen oder neuem Gesichtsfeldausfall sofort medizinische Hilfe suchen.']}});
}
data.groups=[...data.groups.filter(g=>g.category!=='uveitis'),...out];
await writeFile(path,JSON.stringify(data,null,2)+'\n');
console.log(`Split ${refs.length} individual Uveitis lectures into separate chapters.`);
