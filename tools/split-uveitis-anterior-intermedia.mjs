import { readFile, writeFile } from 'node:fs/promises';
const path = 'content/ophthalmology/topic-groups.json';
const root = '/Users/test/Desktop/Notbook_ask/Ophthalmologie/🎓 التهاب العنبة/Studio/';
const data = JSON.parse(await readFile(path, 'utf8'));
const old = data.groups.find(g => g.id === 'uveitis-anterior-intermedia');
if (!old) { console.log('Uveitis chapter already split.'); process.exit(0); }
const anterior = '014_Leitfaden zur Uveitis anterior_ Beurteilung, Management und Nachsorge.md';
const step = '018_Behandlungsrichtlinien und der Step-Ladder-Ansatz bei Uveitis.md';
const intermediate = '012_Uveitis Intermedia_ Eine Umfassende Analyse.md';
const make = async (id, titleDe, files, summaryFallback) => {
  const texts = await Promise.all(files.map(f => readFile(root + f, 'utf8')));
  const bodyDe = texts.join('\n\n---\n\n');
  const blocks = bodyDe.split(/\n\s*\n/).map(clean).filter(x => x.length > 80);
  const pick = re => blocks.filter(x => re.test(x)).slice(0, 8);
  const summaryDe = (blocks.find(x => !/^#/.test(x)) || summaryFallback).slice(0, 650);
  return {id,titleDe,category:'uveitis',status:'medical-review',primary:`🎓 التهاب العنبة/Studio/${files[0]}`,merged:files.slice(1).map(f=>`🎓 التهاب العنبة/Studio/${f}`),sourceLanguages:['de'],bodyDe,summaryDe,learningObjectives:[`Die klinischen Muster von ${titleDe} sicher erkennen und klassifizieren.`,`Diagnostik, Differenzialdiagnosen und Verlauf strukturiert planen.`,`Therapie nach Entzündungsaktivität, Komplikationen und Systemerkrankung ausrichten.`],professional:{overview:blocks.slice(0,8),diagnostics:pick(/Diagnos|Untersuch|OCT|Fluoreszenz|Spaltlampe|Bildgebung/i),differentials:pick(/Differenzial|Differential|Ursach|Ätiolog/i),therapy:pick(/Therap|Behandlung|Management|Steroid|Immun|Operation/i),redFlags:pick(/Notfall|Warn|sofort|dring|Komplikation|Red Flag/i)},questions:[{q:`Welche Befunde definieren ${titleDe}?`,a:'Die Diagnose ergibt sich aus Lokalisation, Aktivitätsgrad, Verlauf und typischen Komplikationen; der vollständige Befund muss klinisch erhoben werden.'},{q:'Welche Warnzeichen erfordern eine dringliche Abklärung?',a:'Rasche Sehverschlechterung, ausgeprägte Schmerzen, Hypopyon, hoher Augeninnendruck, Makulaödem oder Verdacht auf infektiöse Ursache.'}],patient:{explanation:[summaryDe],care:['Die Behandlung und Verlaufskontrolle erfolgen individuell durch eine uveitis-erfahrene Augenärztin oder einen Augenarzt.'],urgent:['Bei plötzlicher Sehverschlechterung, starken Schmerzen, Lichtscheu mit Sehtrübung oder neuem Gesichtsfeldausfall sofort abklären lassen.']}};
};
data.groups = data.groups.filter(g => g !== old);
data.groups.push(await make('uveitis-anterior','Uveitis anterior: Befunde, SUN-Grading und Therapie',[anterior,step],'Die Uveitis anterior betrifft primär Vorderkammer und Iris. Entscheidend sind Spaltlampenbefund, SUN-Grading, Ursachenabklärung und eine frühzeitige Behandlung von Entzündung und Komplikationen.'));
data.groups.push(await make('uveitis-intermedia','Uveitis intermedia: Pars planitis, Diagnostik und stufenweise Therapie',[intermediate],'Die Uveitis intermedia betrifft vor allem Glaskörper und Pars plana. Snowballs, Snowbanking und zystoides Makulaödem sind zentrale Befunde; systemische Assoziationen müssen gezielt gesucht werden.'));
await writeFile(path, JSON.stringify(data,null,2)+'\n');
console.log('Split combined anterior/intermedia chapter into 2 separate German chapters.');
function clean(x){return x.replace(/```[\s\S]*?```/g,' ').replace(/<[^>]*>/g,' ').replace(/[#*_`>|$\\]/g,' ').replace(/\s+/g,' ').trim()}
