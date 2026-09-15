import {readFile,writeFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const mappingPath=join(root,'content/ophthalmology/topic-groups.json');
const mapping=JSON.parse(await readFile(mappingPath,'utf8'));
const draft=JSON.parse(await readFile(join(root,'content/ophthalmology/drafts/strabismus.json'),'utf8'));
for(const chapter of draft.chapters){
  const sources=new Set(chapter.sourceReports);
  const matched=mapping.groups.filter(group=>[group.primary,...group.merged].some(ref=>sources.has(ref)));
  if(!matched.length)throw new Error(`${chapter.id}: keine passende Gruppe gefunden`);
  const refs=[...new Set(matched.flatMap(group=>[group.primary,...group.merged]))];
  const primary=refs.find(ref=>sources.has(ref))||refs[0];
  mapping.groups=mapping.groups.filter(group=>!matched.includes(group));
  mapping.groups.push({id:chapter.id,titleDe:chapter.titleDe,category:'strabismus-pediatric',status:'medical-review',primary,merged:refs.filter(ref=>ref!==primary),sourceLanguages:['de'],bodyDe:chapterBody(chapter),summaryDe:chapter.summaryDe,learningObjectives:chapter.learningObjectives,professional:chapter.professional,questions:chapter.questions,patient:chapter.patient});
}
await writeFile(mappingPath,JSON.stringify(mapping,null,2)+'\n');
console.log(`Merged ${draft.chapters.length} German strabismus translation draft(s).`);
function chapterBody(c){const p=c.professional;const list=xs=>xs.map(x=>`- ${x}`).join('\n');return `# ${c.titleDe}\n\n## Zusammenfassung\n\n${c.summaryDe}\n\n## Lernziele\n\n${list(c.learningObjectives)}\n\n## Fachärztlicher Überblick\n\n${p.overview.join('\n\n')}\n\n## Diagnostik\n\n${list(p.diagnostics)}\n\n## Differenzialdiagnosen\n\n${list(p.differentials)}\n\n## Therapieprinzipien\n\n${list(p.therapy)}\n\n## Red Flags\n\n${list(p.redFlags)}`}
