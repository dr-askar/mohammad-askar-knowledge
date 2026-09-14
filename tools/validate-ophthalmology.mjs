import {readFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const registry=JSON.parse(await readFile(join(root,'content/ophthalmology/articles.json'),'utf8'));
const built=JSON.parse(await readFile(join(root,'knowledge/ophthalmology/articles.json'),'utf8'));
const errors=[];
if(built.articles.length!==registry.articles.length)errors.push('Artikelanzahl stimmt nicht überein');
if(registry.articles.length!==20)errors.push(`Pilot erwartet 20 Artikel, gefunden: ${registry.articles.length}`);
for(const category of ['retina','glaucoma'])if(registry.articles.filter(article=>article.category===category).length!==10)errors.push(`${category}: Pilot erwartet 10 Artikel`);
const slugs=new Set();
for(const article of registry.articles){
  if(slugs.has(article.slug))errors.push(`Doppelter Slug: ${article.slug}`);slugs.add(article.slug);
  if(!['draft','medical-review','approved'].includes(article.status))errors.push(`${article.slug}: ungültiger Status`);
  if(article.questions.length<2)errors.push(`${article.slug}: zu wenige Prüfungsfragen`);
  if(article.sourceKeys.length<1)errors.push(`${article.slug}: keine Quelle`);
  const file=join(root,'knowledge/ophthalmology',article.slug,'index.html');
  try{const html=await readFile(file,'utf8');for(const required of ['Facharztprüfung','Für Patienten','Verwendete Quellen','noindex,nofollow'])if(!html.includes(required))errors.push(`${article.slug}: ${required} fehlt`);if(/Text wird gescannt|Details werden untersucht|Antwort wird ausgegeben/.test(html))errors.push(`${article.slug}: Ladeplatzhalter gefunden`)}catch{errors.push(`${article.slug}: HTML fehlt`)}
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Validated ${registry.articles.length} draft articles: structure, review gate, sources and placeholders OK.`);
