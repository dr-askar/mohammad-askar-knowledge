import {cp, mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {join, resolve} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outDir = resolve(process.env.RELEASE_OUT_DIR || join(root, '_site'));
const publish = process.argv.includes('--publish');
const publicBase = 'https://dr-askar.github.io/mohammad-askar-knowledge/';
const phdPublicPages = ['knowledge/phd/', 'knowledge/phd/contents.html', 'knowledge/phd/chapter-1.html', 'knowledge/phd/chapter-2.html', 'knowledge/phd/chapter-3.html', 'knowledge/phd/chapter-4.html', 'knowledge/phd/chapter-5.html', 'knowledge/phd/chapter-6.html', 'knowledge/phd/chapter-7.html', 'knowledge/phd/chapter-8.html', 'knowledge/phd/chapter-9.html', 'knowledge/phd/chapter-10.html', 'knowledge/phd/literature.html', 'knowledge/phd/appendix.html', 'knowledge/phd/tables.html', 'knowledge/phd/figures.html', 'knowledge/phd/en/', 'knowledge/phd/en/contents.html', 'knowledge/phd/en/chapter-1.html', 'knowledge/phd/en/chapter-2.html', 'knowledge/phd/en/chapter-3.html', 'knowledge/phd/en/chapter-4.html', 'knowledge/phd/en/chapter-5.html', 'knowledge/phd/en/chapter-6.html', 'knowledge/phd/en/chapter-7.html', 'knowledge/phd/en/chapter-8.html', 'knowledge/phd/en/chapter-9.html', 'knowledge/phd/en/chapter-10.html', 'knowledge/phd/en/literature.html', 'knowledge/phd/en/appendix.html', 'knowledge/phd/en/tables.html', 'knowledge/phd/en/figures.html', 'knowledge/phd/ar/', 'knowledge/phd/ar/contents.html', 'knowledge/phd/ar/chapter-1.html', 'knowledge/phd/ar/chapter-2.html', 'knowledge/phd/ar/chapter-3.html', 'knowledge/phd/ar/chapter-4.html', 'knowledge/phd/ar/chapter-5.html', 'knowledge/phd/ar/chapter-6.html', 'knowledge/phd/ar/chapter-7.html', 'knowledge/phd/ar/chapter-8.html', 'knowledge/phd/ar/chapter-9.html', 'knowledge/phd/ar/chapter-10.html', 'knowledge/phd/ar/literature.html', 'knowledge/phd/ar/appendix.html', 'knowledge/phd/ar/tables.html', 'knowledge/phd/ar/figures.html'];
await promisify(execFile)(process.execPath, [join(root, 'tools/build-phd-html.mjs')]);
const registerPath = resolve(process.env.RELEASE_REGISTER || join(root, 'content/ophthalmology/release-register.json'));
const legalRoot = resolve(process.env.RELEASE_LEGAL_DIR || root);
const register = JSON.parse(await readFile(registerPath, 'utf8'));
const articles = JSON.parse(await readFile(join(root, register.coverage.articleSource), 'utf8')).articles;
const topicGroups = JSON.parse(await readFile(join(root, register.coverage.topicGroupSource), 'utf8')).groups;
const sourceAttributions = JSON.parse(await readFile(join(root, register.coverage.sourceAttributions), 'utf8')).records;

if (articles.length !== register.coverage.expectedArticles || topicGroups.length !== register.coverage.expectedTopicGroups) {
  throw new Error('Release register coverage mismatch: ' + articles.length + ' articles + ' + topicGroups.length + ' topic groups');
}

const records = [
  ...articles.map(item => ({kind: 'article', id: item[register.coverage.articleIdField], title: item.title, summary: item.summary, category: item.category, source: 'knowledge/ophthalmology/' + item.slug + '/index.html'})),
  ...topicGroups.map(item => ({kind: 'topic-group', id: item[register.coverage.topicGroupIdField], title: item.titleDe, summary: item.summaryDe, category: item.category, source: 'knowledge/ophthalmology/topics/' + item.id + '/index.html'}))
];
const resolved = records.map(record => ({...record, ...register.defaults, sourceAttribution: sourceAttributions[record.id] || [], ...(register.overrides[record.id] || {})}));
const approved = resolved.filter(isReleaseReady);

const legalFiles = ['legal/impressum.html', 'legal/datenschutz.html'];
const legalTemplates = await Promise.all(legalFiles.map(file => readFile(join(legalRoot, file), 'utf8')));
const legalPlaceholders = legalTemplates.some(html => /RELEASE_PLACEHOLDER|NICHT VERÖFFENTLICHEN|\[.*?fehlen\]/u.test(html));
if (publish && legalPlaceholders) throw new Error('Publish gate: Impressum/Datenschutz enthalten noch nicht veröffentlichbare Platzhalter.');
if (publish && approved.length === 0) throw new Error('Publish gate: kein Inhalt besitzt eine vollständige Rechte- und medizinische Freigabe.');

await rm(outDir, {recursive: true, force: true});
await mkdir(join(outDir, 'assets'), {recursive: true});
await mkdir(join(outDir, 'legal'), {recursive: true});
await mkdir(join(outDir, 'knowledge/ophthalmology'), {recursive: true});
await mkdir(join(outDir, 'knowledge/phd'), {recursive: true});
await mkdir(join(outDir, 'output/pdf'), {recursive: true});
await cp(join(root, 'assets/style.css'), join(outDir, 'assets/style.css'));
await cp(join(root, 'assets/app.js'), join(outDir, 'assets/app.js'));
await writeFile(join(outDir, 'index.html'), addCanonical(sanitizeHome(await readFile(join(root, 'index.html'), 'utf8'), approved), canonicalFor('')));
await writeFile(join(outDir, 'knowledge/ophthalmology/index.html'), renderKnowledgeIndex(approved));
for (const file of legalFiles) {
  const legalHtml = await readFile(join(legalRoot, file), 'utf8');
  await writeFile(join(outDir, file), addCanonical(publish ? legalHtml.replace('noindex,nofollow', 'index,follow') : legalHtml, canonicalFor(file)));
}
await writeFile(join(outDir, '404.html'), addCanonical('<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Seite nicht gefunden | Mohammad Askar</title><link rel="stylesheet" href="./assets/style.css"><main class="section"><p class="eyebrow">404</p><h1>Seite nicht gefunden</h1><p>Der angeforderte Inhalt ist nicht verfügbar oder wurde noch nicht freigegeben.</p><p><a href="./index.html">← Zur Hauptseite</a></p></main>', canonicalFor('404.html')));
await writeFile(join(outDir, 'robots.txt'), publish ? 'User-agent: *\nAllow: /\nSitemap: ' + publicBase + 'sitemap.xml\n' : 'User-agent: *\nDisallow: /\n');
await writeFile(join(outDir, 'sitemap.xml'), sitemap(approved));

// The PhD pages and generated local assets are a self-contained research
// artifact. Copy only this public tree plus the final PDF; internal audits and
// the superseded work-edition PDF stay outside the release tree.
await cp(join(root, 'knowledge/phd'), join(outDir, 'knowledge/phd'), {recursive: true});
await writeFile(join(outDir, 'knowledge/phd/index.html'), addCanonical(await readFile(join(root, 'knowledge/phd/index.html'), 'utf8'), canonicalFor('knowledge/phd/')));
await cp(join(root, 'output/pdf/phd-kc-ai-askar-de.pdf'), join(outDir, 'output/pdf/phd-kc-ai-askar-de.pdf'));

for (const record of approved) {
  try {
    const html = sanitizeKnowledge(await readFile(join(root, record.source), 'utf8'), record);
    const target = join(outDir, record.source);
    await mkdir(resolve(target, '..'), {recursive: true});
    await writeFile(target, html);
  } catch (error) {
    throw new Error('Publish gate: freigegebene Seite fehlt (' + record.id + '): ' + error.message);
  }
}
await cp(join(root, 'knowledge/ophthalmology/assets'), join(outDir, 'knowledge/ophthalmology/assets'), {recursive: true});

console.log('Built clean _site (' + (publish ? 'publish' : 'preview') + ' mode): ' + approved.length + '/' + records.length + ' approved content pages.');

function isReleaseReady(record) {
  const attribution = Array.isArray(record.sourceAttribution) && record.sourceAttribution.length > 0 && record.sourceAttribution.every(validAttribution);
  const rightsEvidence = record.rightsBasis === 'written-permission' ? nonEmpty(record.permissionEvidenceRef) : record.rightsBasis === 'independent-rewrite' && nonEmpty(record.independentRewriteReviewRef);
  return ['written-permission', 'independent-rewrite'].includes(record.rightsBasis) && record.rightsStatus === 'verified' && Array.isArray(record.rightsHolders) && record.rightsHolders.length > 0 && record.rightsHolders.every(nonEmpty) && attribution && rightsEvidence && nonEmpty(record.rightsVerifiedBy) && validDate(record.rightsVerifiedAt) && record.medicalStatus === 'approved' && nonEmpty(record.medicalReviewer) && validDate(record.medicalReviewedAt) && record.publishStatus === 'approved';
}
function validAttribution(value) {
  return value && typeof value === 'object' && nonEmpty(value.title) && (nonEmpty(value.authorOrLecturer) || nonEmpty(value.authorOrLecturerMissingReason)) && nonEmpty(value.publisherOrChannel) && (validHttps(value.url) || nonEmpty(value.missingReason)) && validDate(value.accessedAt);
}
function validHttps(value) { return typeof value === 'string' && /^https:\/\//u.test(value); }
function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/u.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day && date.toISOString().slice(0, 10) === value;
}
function nonEmpty(value) { return typeof value === 'string' && value.trim() !== ''; }
function esc(value = '') { return String(value).replace(/[&<>"']/gu, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }

function sanitizeHome(html, approvedRecords) {
  let result = html
    .replace(/\s*<link rel="preconnect"[^>]*>/gu, '')
    .replace(/\s*<link href="https:\/\/fonts\.googleapis\.com[^"]*"[^>]*>/gu, '');
  const countLabel = approvedRecords.length ? approvedRecords.length + ' freigegebene Kapitel' : 'Keine Kapitel freigegeben';
  result = result.replace(/<footer><span>Medizinische Prüfung ausstehend<\/span><span>[^<]*<\/span><\/footer>/u, '<footer><span>' + countLabel + '</span><span>' + (approvedRecords.length ? 'Nur geprüfte Inhalte' : 'Veröffentlichung ausstehend') + '</span></footer>');
  if (approvedRecords.length === 0) {
    result = result.replace('href="./knowledge/ophthalmology/index.html"', 'href="#publication-notice" aria-disabled="true"');
  }
  result = result.replace('href="./knowledge/kenntnispruefung-mv/index.html"', 'href="#publication-notice" aria-disabled="true"');
  result = result.replace(/<a class="knowledge-card featured"[\s\S]*?<\/a>/gu, block => block.includes('Kenntnisprüfung Mecklenburg-Vorpommern') ? '' : block);
  return result;
}

function renderKnowledgeIndex(items) {
  const cards = items.map(item => {
    const url = item.kind === 'article' ? './' + item.id + '/' : './topics/' + item.id + '/';
    return '<a class="kb-card" data-category="' + esc(item.category) + '" href="' + url + '"><span class="kb-badge">' + esc(item.category) + '</span><h2>' + esc(item.title) + '</h2><p>' + esc(item.summary) + '</p><footer><span>Ärztliche Fortbildung · Prüfung</span><span>Freigegeben</span></footer></a>';
  }).join('\n');
  const categories = [...new Set(items.map(item => item.category))].sort((a, b) => a.localeCompare(b, 'de'));
  const filters = '<div class="kb-filters" role="group" aria-label="Freigegebene Fachgebiete filtern"><button class="kb-filter" data-filter="all" aria-pressed="true">Alle</button>' + categories.map(category => '<button class="kb-filter" data-filter="' + esc(category) + '" aria-pressed="false">' + esc(category) + '</button>').join('') + '</div>';
  const controls = '<div class="kb-controls"><label><span class="kb-eyebrow">Freigegebene Kapitel durchsuchen</span><input class="kb-search" type="search" placeholder="z. B. Retina, Glaukom" aria-label="Freigegebene Kapitel durchsuchen"></label>' + filters + '</div>';
  const body = items.length ? '<section class="kb-grid" aria-label="Freigegebene ophthalmologische Lernkapitel">' + cards + '</section><p class="kb-empty" hidden>Keine passenden freigegebenen Kapitel gefunden.</p>' : '<section class="kb-empty" aria-live="polite"><h2>Noch keine Kapitel freigegeben</h2><p>Die Lernzusammenfassungen werden erst nach dokumentierter Rechtefreigabe, vollständiger Quellenangabe und menschlicher medizinischer Prüfung veröffentlicht.</p></section>';
  return '<!doctype html><html lang="de" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Freigegebene Vorlesungszusammenfassungen für ärztliche Fortbildung und Prüfungsvorbereitung."><meta name="robots" content="' + (publish ? 'index,follow' : 'noindex,nofollow') + '"><link rel="canonical" href="' + canonicalFor('knowledge/ophthalmology/') + '"><title>Freigegebene ophthalmologische Lernkapitel | Mohammad Askar</title><link rel="stylesheet" href="./assets/library.css"><link rel="stylesheet" href="./assets/lecture.css"></head><body><div class="kb-shell"><nav class="kb-nav"><a href="../../index.html">← Hauptseite</a></nav><header class="kb-hero"><p class="kb-eyebrow">Vorlesungszusammenfassungen · Ärzte / Prüfung</p><h1>Ophthalmologische Lernkapitel</h1><p>Diese Wissensseiten fassen mehrere Vorlesungen und ergänzende Quellen für ärztliche Fortbildung und Prüfungsvorbereitung zusammen. Sie sind keine medizinische Beratung.</p><div class="kb-warning"><strong>Originalrechte:</strong> Rechte an Vorlesungen, Videos, Folien und Originalmaterialien verbleiben bei den jeweiligen Rechteinhabern. Quellenangaben bedeuten keine Billigung oder Zusammenarbeit.</div></header><main>' + controls + body + '</main><footer class="kb-footer">' + items.length + ' freigegebene Kapitel · <a href="../../legal/impressum.html">Impressum</a> · <a href="../../legal/datenschutz.html">Datenschutz</a></footer></div><script src="./assets/library.js"></script></body></html>';
}

function sanitizeKnowledge(html, record) {
  const legalPrefix = record.kind === 'article' ? '../../../legal' : '../../../../legal';
  const notice = '<aside class="kb-warning kb-release-notice"><strong>Vorlesungszusammenfassung · Ärzte / Prüfung:</strong> Diese Seite dient ausschließlich der ärztlichen Fortbildung und Prüfungsvorbereitung und ist keine medizinische Beratung. Rechte an Originalmaterialien verbleiben bei den jeweiligen Rechteinhabern. Quellenangaben bedeuten keine Billigung oder Zusammenarbeit.</aside>';
  const metadata = '<section class="kb-release-meta"><h2>Öffentliche Freigabemetadaten</h2><dl><dt>Rechtebasis</dt><dd>' + esc(record.rightsBasis === 'written-permission' ? 'Schriftliche Erlaubnis' : 'Eigenständige Neufassung') + '</dd><dt>Rechteinhaber</dt><dd>' + record.rightsHolders.map(esc).join(', ') + '</dd><dt>Medizinische Prüfung</dt><dd>' + esc(record.medicalReviewer) + ' · ' + esc(record.medicalReviewedAt) + '</dd><dt>Quellenattribution</dt><dd><ul>' + record.sourceAttribution.map(source => '<li>' + esc(source.title) + ' — ' + esc(source.authorOrLecturer || source.authorOrLecturerMissingReason) + ' · ' + esc(source.publisherOrChannel) + ' · ' + (validHttps(source.url) ? '<a href="' + esc(source.url) + '" target="_blank" rel="noopener noreferrer">' + esc(source.url) + '</a>' : esc(source.missingReason)) + ' · abgerufen ' + esc(source.accessedAt) + '</li>').join('') + '</ul></dd></dl></section>';
  let result = html
    .replace(/\s*<link rel="preconnect"[^>]*>/gu, '')
    .replace(/\s*<link href="https:\/\/fonts\.googleapis\.com[^"]*"[^>]*>/gu, '')
    .replace(/<button[^>]*id="tab-patienten"[^>]*>[\s\S]*?<\/button>/u, '')
    .replace(/<section[^>]*id="panel-patienten"[^>]*>[\s\S]*?<\/section>/u, '')
    .replace(/<p class="kb-lecture-note">[\s\S]*?<\/p>/gu, match => /Lokaler Studio-Entwurf/u.test(match) ? '' : match)
    .replace(/<div class="kb-warning">[\s\S]*?<\/div>/gu, match => /Redaktioneller Entwurf|noch nicht medizinisch freigegeben|darf nicht veröffentlicht werden/u.test(match) ? '' : match)
    .replace(/<meta name="robots" content="[^"]*">/u, '<meta name="robots" content="' + (publish ? 'index,follow' : 'noindex,nofollow') + '">')
    .replace(record.kind === 'article' ? 'href="../../index.html#knowledge"' : 'href="../../../index.html#knowledge"', record.kind === 'article' ? 'href="../../../index.html#knowledge"' : 'href="../../../../index.html#knowledge"')
    .replace(record.kind === 'topic-group' ? 'href="../index.html"' : 'href="__no_topic_index__"', record.kind === 'topic-group' ? 'href="../../index.html"' : 'href="__no_topic_index__"')
    .replace(/Lernentwurf|Medizinische Prüfung|darf nicht veröffentlicht werden/gu, 'Freigegeben')
    .replace(/<main class="kb-article">/u, '<main class="kb-article">' + notice + metadata)
    .replace(/<\/footer>/u, ' · <a href="' + legalPrefix + '/impressum.html">Impressum</a> · <a href="' + legalPrefix + '/datenschutz.html">Datenschutz</a></footer>');
  result = addCanonical(result, canonicalFor(record.source));
  if (/tab-patienten|panel-patienten|Redaktioneller Entwurf|Lokaler Studio-Entwurf|noch nicht medizinisch freigegeben|medizinische Prüfung ausstehend|Lernentwurf|darf nicht veröffentlicht werden/u.test(result)) throw new Error('Freigegebene Seite enthält unveröffentlichte oder Patientenmarker');
  if (!result.includes('kb-release-notice') || !result.includes('kb-release-meta')) throw new Error('Freigabemetadata konnte nicht injiziert werden');
  return result;
}

function addCanonical(html, canonical) {
  if (/<link rel="canonical"/u.test(html)) return html.replace(/<link rel="canonical"[^>]*>/u, '<link rel="canonical" href="' + canonical + '">');
  return html.replace('</head>', '<link rel="canonical" href="' + canonical + '"></head>');
}
function canonicalFor(relative) { return publicBase + relative.replace(/^\.\//u, '').replace(/index\.html$/u, ''); }
function sitemap(items) {
  if (!publish) return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n';
  const paths = ['', 'knowledge/ophthalmology/', ...phdPublicPages, 'legal/impressum.html', 'legal/datenschutz.html', ...items.map(item => item.source)];
  return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + paths.map(path => '<url><loc>' + esc(canonicalFor(path)) + '</loc></url>').join('') + '</urlset>\n';
}
