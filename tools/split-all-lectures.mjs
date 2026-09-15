import { readFile, writeFile } from 'node:fs/promises';
import { basename } from 'node:path';
const path='content/ophthalmology/topic-groups.json';
const root='/Users/test/Desktop/Notbook_ask/Ophthalmologie/';
const data=JSON.parse(await readFile(path,'utf8'));
const old=data.groups;
const used=new Set(); const out=[];
const clean=x=>x.replace(/```[\s\S]*?```/g,' ').replace(/<[^>]*>/g,' ').replace(/[#*_`>|$\\]/g,' ').replace(/\s+/g,' ').trim();
for(const group of old){
  const refs=[group.primary,...(group.merged||[])];
  for(const ref of refs){
    let source=''; try{source=await readFile(root+ref,'utf8')}catch{source=group.bodyDe||'';}
    const arabic=(source.match(/[\u0600-\u06ff]/g)||[]).length;
    if(arabic>40 && group.bodyDe) source=group.bodyDe;
    const blocks=source.split(/\n\s*\n/).map(clean).filter(x=>x.length>70);
    const heading=(source.match(/^#\s+(.+)$/m)?.[1]||basename(ref,'.md')).replace(/[*_]/g,'').trim();
    const base=heading.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'fachvorlesung';
    let id=base; let n=2; while(used.has(id)){id=`${base}-${n++}`} used.add(id);
    const summary=(blocks.find(x=>!/^#/.test(x))||group.summaryDe||`Ausführliche Einzelvorlesung zu ${heading}.`).slice(0,650);
    const pick=re=>blocks.filter(x=>re.test(x)).slice(0,8);
    const ensure=(items,fallback)=>items.length?items:[fallback];
    out.push({id,titleDe:heading,category:group.category,status:'medical-review',primary:ref,merged:[],sourceLanguages:group.sourceLanguages||['de'],bodyDe:source,summaryDe:summary,learningObjectives:[`Die Inhalte der Einzelvorlesung „${heading}“ strukturiert wiedergeben.`,`Diagnostische Befunde und Differenzialdiagnosen fachärztlich einordnen.`,`Therapie, Verlauf und Warnzeichen sicher beurteilen.`],professional:{overview:ensure(blocks.slice(0,10),summary),diagnostics:ensure(pick(/Diagnos|Untersuch|OCT|Bildgebung|Spaltlampe|Fluoreszenz|Befund/i),'Diagnostische Einzelheiten im vollständigen Vorlesungstext prüfen.'),differentials:ensure(pick(/Differenzial|Differential|Ätiolog|Ursach/i),'Differenzialdiagnosen im klinischen Kontext und gegen aktuelle Leitlinien abgleichen.'),therapy:ensure(pick(/Therap|Behandlung|Management|Steroid|Immun|Operation|Chirurg/i),'Therapieentscheidungen individuell und leitliniengerecht treffen.'),redFlags:ensure(pick(/Notfall|Warn|sofort|dring|Komplikation|Red Flag/i),'Warnzeichen, Komplikationen und Notfallindikationen fachärztlich validieren.')},questions:[{q:`Was sind die wichtigsten Lernpunkte der Vorlesung „${heading}“?`,a:'Die Antwort ergibt sich aus den strukturierten Abschnitten und muss am individuellen klinischen Befund überprüft werden.'},{q:'Welche Befunde erfordern eine dringliche Abklärung?',a:'Rasche Sehverschlechterung, starke Schmerzen, ausgeprägte Entzündung, Druckanstieg oder Verdacht auf eine infektiöse oder neurologische Ursache.'}],patient:{explanation:[summary],care:['Die Inhalte dienen der Orientierung und ersetzen keine individuelle Untersuchung durch eine Fachärztin oder einen Facharzt.'],urgent:['Bei plötzlicher Sehverschlechterung, starken Schmerzen oder neuem Gesichtsfeldausfall sofort medizinische Hilfe suchen.']}});
  }
}
await writeFile(path,JSON.stringify({...data,groups:out},null,2)+'\n');
console.log(`Split ${out.length} individual Studio lectures across all categories.`);
