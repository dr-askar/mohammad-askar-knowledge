import {readFile, readdir, stat} from 'node:fs/promises';
import {join, resolve, posix} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outDir = resolve(process.env.RELEASE_OUT_DIR || join(root, '_site'));
const publicBase = 'https://dr-askar.github.io/mohammad-askar-knowledge/';
const phdPublicPages = ['knowledge/phd/index.html', 'knowledge/phd/contents.html', 'knowledge/phd/chapter-1.html', 'knowledge/phd/chapter-2.html', 'knowledge/phd/chapter-3.html', 'knowledge/phd/chapter-4.html', 'knowledge/phd/chapter-5.html', 'knowledge/phd/chapter-6.html', 'knowledge/phd/chapter-7.html', 'knowledge/phd/chapter-8.html', 'knowledge/phd/chapter-9.html', 'knowledge/phd/chapter-10.html', 'knowledge/phd/literature.html', 'knowledge/phd/appendix.html', 'knowledge/phd/tables.html', 'knowledge/phd/figures.html', 'knowledge/phd/en/index.html', 'knowledge/phd/en/contents.html', 'knowledge/phd/en/chapter-1.html', 'knowledge/phd/en/chapter-2.html', 'knowledge/phd/en/chapter-3.html', 'knowledge/phd/en/chapter-4.html', 'knowledge/phd/en/chapter-5.html', 'knowledge/phd/en/chapter-6.html', 'knowledge/phd/en/chapter-7.html', 'knowledge/phd/en/chapter-8.html', 'knowledge/phd/en/chapter-9.html', 'knowledge/phd/en/chapter-10.html', 'knowledge/phd/en/literature.html', 'knowledge/phd/en/appendix.html', 'knowledge/phd/en/tables.html', 'knowledge/phd/en/figures.html', 'knowledge/phd/ar/index.html', 'knowledge/phd/ar/contents.html', 'knowledge/phd/ar/chapter-1.html', 'knowledge/phd/ar/chapter-2.html', 'knowledge/phd/ar/chapter-3.html', 'knowledge/phd/ar/chapter-4.html', 'knowledge/phd/ar/chapter-5.html', 'knowledge/phd/ar/chapter-6.html', 'knowledge/phd/ar/chapter-7.html', 'knowledge/phd/ar/chapter-8.html', 'knowledge/phd/ar/chapter-9.html', 'knowledge/phd/ar/chapter-10.html', 'knowledge/phd/ar/literature.html', 'knowledge/phd/ar/appendix.html', 'knowledge/phd/ar/tables.html', 'knowledge/phd/ar/figures.html'];
const registerPath = resolve(process.env.RELEASE_REGISTER || join(root, 'content/ophthalmology/release-register.json'));
const register = JSON.parse(await readFile(registerPath, 'utf8'));
const articles = JSON.parse(await readFile(join(root, register.coverage.articleSource), 'utf8')).articles;
const topicGroups = JSON.parse(await readFile(join(root, register.coverage.topicGroupSource), 'utf8')).groups;
const sourceAttributions = JSON.parse(await readFile(join(root, register.coverage.sourceAttributions), 'utf8')).records;
const records = [
  ...articles.map(item => ({kind: 'article', id: item.slug, source: 'knowledge/ophthalmology/' + item.slug + '/index.html'})),
  ...topicGroups.map(item => ({kind: 'topic-group', id: item.id, source: 'knowledge/ophthalmology/topics/' + item.id + '/index.html'}))
];
const resolved = records.map(record => ({...register.defaults, sourceAttribution: sourceAttributions[record.id] || [], ...(register.overrides[record.id] || {}), ...record}));
const errors = [];
const published = resolved.filter(releaseReady);

if (articles.length !== register.coverage.expectedArticles) errors.push('Artikelanzahl im Register stimmt nicht.');
if (topicGroups.length !== register.coverage.expectedTopicGroups) errors.push('Topic-Group-Anzahl im Register stimmt nicht.');
if (records.length !== register.coverage.expectedTotal) errors.push('Gesamtzahl im Register stimmt nicht.');
if (register.medicalApprovalScope) {
  if (register.medicalApprovalScope.contentCount !== records.length) errors.push('Medizinische Sammelfreigabe deckt nicht exakt alle registrierten Inhalte ab.');
  if (!nonEmpty(register.medicalApprovalScope.approvedBy) || !validDate(register.medicalApprovalScope.approvedAt) || !nonEmpty(register.medicalApprovalScope.statement)) errors.push('Medizinische Sammelfreigabe ist unvollständig.');
}
if (register.rightsApprovalScope) {
  if (register.rightsApprovalScope.contentCount !== records.length) errors.push('Rechte-Sammelfreigabe deckt nicht exakt alle registrierten Inhalte ab.');
  if (register.rightsApprovalScope.basis !== 'independent-rewrite' || !nonEmpty(register.rightsApprovalScope.verifiedBy) || !validDate(register.rightsApprovalScope.verifiedAt) || !nonEmpty(register.rightsApprovalScope.statement)) errors.push('Rechte-Sammelfreigabe ist unvollständig.');
}
if (new Set(records.map(record => record.id)).size !== records.length) errors.push('Doppelte Release-ID.');
if (Object.keys(register.overrides).some(id => !records.some(record => record.id === id))) errors.push('Release-Override ohne Quellinhalt.');
if (Object.keys(sourceAttributions).length !== records.length || Object.keys(sourceAttributions).some(id => !records.some(record => record.id === id))) errors.push('Quellenattribution deckt nicht exakt alle Inhalte ab.');

for (const record of resolved) {
  if (!['written-permission', 'independent-rewrite', null].includes(record.rightsBasis)) errors.push(record.id + ': ungültige rightsBasis');
  if (!['pending', 'verified', 'rejected'].includes(record.rightsStatus)) errors.push(record.id + ': ungültiger rightsStatus');
  if (!['pending', 'approved', 'rejected'].includes(record.medicalStatus)) errors.push(record.id + ': ungültiger medicalStatus');
  if (!['unpublished', 'approved', 'withdrawn'].includes(record.publishStatus)) errors.push(record.id + ': ungültiger publishStatus');
  if (!Array.isArray(record.sourceAttribution) || record.sourceAttribution.some(source => !validAttribution(source))) errors.push(record.id + ': sourceAttribution ist nicht strukturiert oder unvollständig');
  if (record.rightsStatus === 'verified' && !rightsEvidenceValid(record)) errors.push(record.id + ': Rechte-Nachweis ist unvollständig');
  if (record.publishStatus === 'approved' && !releaseReady(record)) errors.push(record.id + ': als approved markiert, aber Freigabekriterien fehlen');
}

const files = await walk(outDir).catch(error => { errors.push('_site fehlt: ' + error.message); return []; });
const relativeFiles = files.map(file => file.slice(outDir.length + 1).replaceAll('\\', '/'));
for (const file of relativeFiles) if ((/\.json$/u.test(file) && file !== 'knowledge/phd/assets/manifest.json') || file.startsWith('content/') || file.startsWith('tools/') || file.startsWith('docs/') || file.startsWith('.git/')) errors.push('Private Datei im Artefakt: ' + file);

const expectedHtml = new Set(['index.html', 'knowledge/ophthalmology/index.html', ...phdPublicPages, 'legal/impressum.html', 'legal/datenschutz.html', '404.html', ...published.map(record => record.source)]);
for (const file of relativeFiles.filter(file => file.endsWith('.html'))) if (!expectedHtml.has(file)) errors.push('Unerwartete HTML-Seite im Artefakt: ' + file);
for (const file of expectedHtml) if (!relativeFiles.includes(file)) errors.push('Erwartete öffentliche Seite fehlt: ' + file);
if (!relativeFiles.includes('output/pdf/phd-kc-ai-askar-de.pdf')) errors.push('Finale PhD-PDF fehlt: output/pdf/phd-kc-ai-askar-de.pdf');
if (relativeFiles.includes('knowledge/phd/privacy-audit.md')) errors.push('Internes Privacy-Audit darf nicht öffentlich kopiert werden.');
const phdFigureAssets = relativeFiles.filter(file => /^knowledge\/phd\/assets\/figures\/figure-\d{3}\.svg$/u.test(file));
const phdFigureJpegs = relativeFiles.filter(file => /^knowledge\/phd\/assets\/figures\/figure-\d{3}\.jpg$/u.test(file));
const phdSourcePageImages = relativeFiles.filter(file => /^knowledge\/phd\/assets\/source-pages\/page-\d{3}\.jpg$/u.test(file));
if (phdFigureJpegs.length !== 114) errors.push('PhD-Abbildungsassets fehlen oder sind nicht vollständig: ' + phdFigureJpegs.length + '/114');
if (phdSourcePageImages.length === 0) errors.push('PhD-Originalseitenbilder fehlen.');
if (!relativeFiles.includes('knowledge/phd/assets/manifest.json')) errors.push('PhD-Asset-Manifest fehlt.');
const phdManifest = JSON.parse(await readFile(join(outDir, 'knowledge/phd/assets/manifest.json'), 'utf8').catch(() => '{}'));
if (!Array.isArray(phdManifest.figures) || phdManifest.figures.length !== 114) errors.push('PhD-Manifest enthält nicht exakt 114 Abbildungen.');
if (Array.isArray(phdManifest.figures)) {
  const invalidFigureAssets = phdManifest.figures.filter(figure => !/^assets\/figures\/figure-\d{3}\.jpg$/u.test(figure.asset) || !relativeFiles.includes('knowledge/phd/' + figure.asset));
  if (invalidFigureAssets.length) errors.push('PhD-Manifest enthält ungültige oder fehlende dedizierte Figurenassets: ' + invalidFigureAssets.length);
  if (phdManifest.figures.some(figure => figure.asset.includes('source-pages') || figure.asset.endsWith('.svg'))) errors.push('PhD-Manifest verweist auf Seitenbilder oder synthetische SVG-Figuren.');
}
if (!Array.isArray(phdManifest.tables) || phdManifest.tables.length !== 58) errors.push('PhD-Manifest enthält nicht exakt 58 Tabellen.');
const figuresHtml = await readFile(join(outDir, 'knowledge/phd/figures.html'), 'utf8').catch(() => '');
const tablesHtml = await readFile(join(outDir, 'knowledge/phd/tables.html'), 'utf8').catch(() => '');
if ((figuresHtml.match(/<figure\b/gu) || []).length !== 114) errors.push('PhD-Abbildungsseite enthält nicht exakt 114 Figure-Elemente.');
if ((figuresHtml.match(/loading="lazy"/gu) || []).length !== 114) errors.push('PhD-Abbildungsseite nutzt nicht für alle 114 Bilder Lazy Loading.');
if ((figuresHtml.match(/alt="/gu) || []).length < 114) errors.push('PhD-Abbildungsseite enthält nicht für jedes Bild Alt-Text.');
if (/figure-\d{3}\.svg|assets\/source-pages\/page-\d{3}\.jpg/u.test(figuresHtml)) errors.push('PhD-Abbildungsseite verweist auf synthetische SVG-Figuren oder vollständige Seitenbilder.');
if ((tablesHtml.match(/class="phd-table-card"/gu) || []).length !== 58) errors.push('PhD-Tabellenseite enthält nicht exakt 58 Tabellenkarten.');

const home = await readFile(join(outDir, 'index.html'), 'utf8').catch(() => '');
for (const phrase of ['Learning summaries from multiple lectures', 'Nur zu Lernzwecken', 'لأغراض التعلّم فقط', 'keine individuelle Diagnose- oder Therapieempfehlung', 'respective authors and rights holders', 'Impressum', 'Datenschutz']) if (!home.includes(phrase)) errors.push('Hauptseite: Pflichttext fehlt: ' + phrase);
if (!canonicalIs(home, canonicalFor(''))) errors.push('Hauptseite: Canonical fehlt oder ist falsch.');
if (/fonts\.googleapis\.com|fonts\.gstatic\.com|avatars\.githubusercontent\.com/iu.test(home)) errors.push('Hauptseite lädt externe Fonts oder Avatar.');
if (published.length === 0 && !home.includes('Keine Kapitel freigegeben')) errors.push('Hauptseite zeigt trotz 0 Freigaben keinen klaren Leerzustand.');
if (!home.includes('id="publication-notice"')) errors.push('Hauptseite: Fragmentziel publication-notice fehlt.');

const phdPath = join(outDir, 'knowledge/phd/index.html');
const phd = await readFile(phdPath, 'utf8').catch(() => '');
if (!canonicalIs(phd, canonicalFor('knowledge/phd/'))) errors.push('PhD-Seite: Canonical fehlt oder ist falsch.');
if (!phd.includes('Impressum') || !phd.includes('Datenschutz')) errors.push('PhD-Seite: Rechtslinks fehlen.');
if (!phd.includes('phd-kc-ai-askar-de.pdf')) errors.push('PhD-Seite: finale PDF-Verknüpfung fehlt.');
const arabicFiles = relativeFiles.filter(file => file.startsWith('knowledge/phd/ar/') && file.endsWith('.html'));
if (arabicFiles.length !== 16) errors.push('Arabische PhD-Ausgabe enthält nicht exakt 16 HTML-Seiten: ' + arabicFiles.length);
for (const file of arabicFiles) {
  const html = await readFile(join(outDir, file), 'utf8');
  if (!/<html[^>]*lang="ar"[^>]*dir="rtl"/u.test(html)) errors.push('Arabische Seite muss lang="ar" und dir="rtl" setzen: ' + file);
  if (!html.includes('phd-locale-switch') || !html.includes('Deutsch')) errors.push('Sprachnavigation fehlt in arabischer Seite: ' + file);
  if (!html.includes('phd-page-marker') && !['knowledge/phd/ar/index.html', 'knowledge/phd/ar/tables.html', 'knowledge/phd/ar/figures.html'].includes(file)) errors.push('Seitenprovenienz fehlt in arabischer Seite: ' + file);
}
if (!phd.includes('phd-locale-switch') || !phd.includes('العربية الأصلية')) errors.push('Sprachnavigation fehlt in deutscher PhD-Startseite.');
const englishFiles = relativeFiles.filter(file => file.startsWith('knowledge/phd/en/') && file.endsWith('.html'));
if (englishFiles.length !== 16) errors.push('Englische PhD-Ausgabe enthält nicht exakt 16 HTML-Seiten: ' + englishFiles.length);
for (const file of englishFiles) {
  const html = await readFile(join(outDir, file), 'utf8');
  if (!/<html[^>]*lang="en"[^>]*dir="ltr"/u.test(html)) errors.push('Englische Seite muss lang="en" und dir="ltr" setzen: ' + file);
  if (!html.includes('phd-locale-switch') || !html.includes('Deutsch')) errors.push('Sprachnavigation fehlt in englischer Seite: ' + file);
}

const knowledgeIndexPath = join(outDir, 'knowledge/ophthalmology/index.html');
const knowledgeIndex = await readFile(knowledgeIndexPath, 'utf8').catch(() => '');
if (!canonicalIs(knowledgeIndex, canonicalFor('knowledge/ophthalmology/'))) errors.push('Wissensindex: Canonical fehlt oder ist falsch.');
if (published.length === 0 && !knowledgeIndex.includes('Noch keine Kapitel freigegeben')) errors.push('Wissensindex: Leerzustand fehlt.');
const cardLinks = [...knowledgeIndex.matchAll(/<a class="kb-card"[^>]+href="([^"]+)"/gu)].map(match => match[1]);
const expectedLinks = published.map(record => record.kind === 'article' ? './' + record.id + '/' : './topics/' + record.id + '/');
if (cardLinks.length !== expectedLinks.length || cardLinks.some(link => !expectedLinks.includes(link))) errors.push('Wissensindex enthält nicht exakt die freigegebenen Inhalte.');
if (!knowledgeIndex.includes('class="kb-search"') || !knowledgeIndex.includes('class="kb-filters"') || !knowledgeIndex.includes('library.js')) errors.push('Wissensindex: Suche/Filter fehlen.');
if (cardLinks.length !== [...knowledgeIndex.matchAll(/<a class="kb-card" data-category="[^"]+"/gu)].length) errors.push('Wissensindex: Karten ohne data-category.');

const robots = await readFile(join(outDir, 'robots.txt'), 'utf8').catch(() => '');
if (!publishExpected() && !/Disallow:\s*\//u.test(robots)) errors.push('Preview muss für Crawler gesperrt sein.');
if (publishExpected() && !/Allow:\s*\//u.test(robots)) errors.push('Publish-Artefakt muss indexierbar sein.');

for (const file of relativeFiles.filter(file => file.endsWith('.html'))) {
  const html = await readFile(join(outDir, file), 'utf8');
  if (/\/Users\//u.test(html)) errors.push('Absolute lokaler Pfad im öffentlichen HTML: ' + file);
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com|avatars\.githubusercontent\.com/iu.test(html)) errors.push('Externe Ressource in ' + file);
  if (/id="tab-patienten"|id="panel-patienten"/u.test(html)) errors.push('Patientenansicht im Artefakt: ' + file);
  if (/Redaktioneller Entwurf|Lokaler Studio-Entwurf|noch nicht medizinisch freigegeben|medizinische Prüfung ausstehend|Lernentwurf|darf nicht veröffentlicht werden/u.test(html)) errors.push('Draft-Marker im Artefakt: ' + file);
  if (file !== '404.html' && !canonicalIs(html, canonicalFor(file))) errors.push('Falscher Canonical in ' + file);
  if (file !== '404.html' && !html.includes('legal/impressum.html') && !html.includes('legal/datenschutz.html')) errors.push('Rechtslinks fehlen in ' + file);
  for (const link of html.matchAll(/(?:href|src)="([^"]+)"/gu)) validateInternalLink(file, link[1]);
  for (const fragment of html.matchAll(/(?:href|src)="(#[-\w]+)"/gu)) if (!new RegExp('(?:id|name)="' + fragment[1].slice(1) + '"', 'u').test(html)) errors.push('Totes Fragmentziel in ' + file + ': ' + fragment[1]);
  if (published.some(record => record.source === file)) {
    if (!html.includes('kb-release-notice') || !html.includes('kb-release-meta') || !html.includes('Ärzte / Prüfung')) errors.push('Release-Metadaten fehlen in ' + file);
    if (!html.includes('Educational content only') && !html.includes('keine individuelle medizinische Beratung') && !html.includes('keine medizinische Beratung')) errors.push('Disclaimer fehlt in ' + file);
    if (/Redaktioneller Entwurf|Lokaler Studio-Entwurf|noch nicht medizinisch freigegeben|medizinische Prüfung ausstehend|Lernentwurf|darf nicht veröffentlicht werden/u.test(html)) errors.push('Unveröffentlichter Marker in ' + file);
    const record = published.find(item => item.source === file);
    if (!html.includes(record.medicalReviewer) || !html.includes(record.medicalReviewedAt)) errors.push('Reviewer/Datum fehlen in ' + file);
  }
}

const sitemap = await readFile(join(outDir, 'sitemap.xml'), 'utf8').catch(() => '');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu)].map(match => match[1]);
const expectedSitemap = publishExpected() ? [canonicalFor(''), canonicalFor('knowledge/ophthalmology/'), ...phdPublicPages.map(page => canonicalFor(page)), canonicalFor('legal/impressum.html'), canonicalFor('legal/datenschutz.html'), ...published.map(record => canonicalFor(record.source))] : [];
if (sitemapUrls.length !== expectedSitemap.length || sitemapUrls.some(url => !expectedSitemap.includes(url))) errors.push('Sitemap enthält nicht exakt die veröffentlichten Seiten.');

for (const file of relativeFiles) {
  const content = await readFile(join(outDir, file), 'utf8');
  if (/(?:<(?:script|img|iframe|source|video|audio)\b[^>]+\bsrc\s*=\s*"https?:\/\/|<link\b(?![^>]*\brel\s*=\s*"(?:canonical|alternate)")[^>]+\bhref\s*=\s*"https?:\/\/|url\(\s*https?:\/\/)/iu.test(content)) errors.push('Aktive externe Privacy-Ressource in ' + file);
}

if (errors.length) {
  console.error(errors.map(error => '- ' + error).join('\n'));
  process.exit(1);
}
console.log('Validated release register (' + records.length + ' contents) and clean _site (' + published.length + ' published pages).');

function publishExpected() { return /Allow:\s*\//u.test(robots); }
function validAttribution(source) {
  return source && typeof source === 'object' && nonEmpty(source.title) && (nonEmpty(source.authorOrLecturer) || nonEmpty(source.authorOrLecturerMissingReason)) && nonEmpty(source.publisherOrChannel) && (validHttps(source.url) || nonEmpty(source.missingReason)) && validDate(source.accessedAt);
}
function validHttps(value) { return typeof value === 'string' && /^https:\/\//u.test(value); }
function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/u.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day && date.toISOString().slice(0, 10) === value;
}
function nonEmpty(value) { return typeof value === 'string' && value.trim() !== ''; }
function rightsEvidenceValid(record) {
  return nonEmpty(record.rightsVerifiedBy) && validDate(record.rightsVerifiedAt) && (record.rightsBasis === 'written-permission' ? nonEmpty(record.permissionEvidenceRef) : record.rightsBasis === 'independent-rewrite' && nonEmpty(record.independentRewriteReviewRef));
}
function releaseReady(record) {
  return ['written-permission', 'independent-rewrite'].includes(record.rightsBasis) && record.rightsStatus === 'verified' && Array.isArray(record.rightsHolders) && record.rightsHolders.length > 0 && record.rightsHolders.every(nonEmpty) && Array.isArray(record.sourceAttribution) && record.sourceAttribution.length > 0 && record.sourceAttribution.every(validAttribution) && rightsEvidenceValid(record) && record.medicalStatus === 'approved' && nonEmpty(record.medicalReviewer) && validDate(record.medicalReviewedAt) && record.publishStatus === 'approved';
}
function canonicalFor(relative) { return publicBase + relative.replace(/^\.\//u, '').replace(/index\.html$/u, ''); }
function canonicalIs(html, expected) { const match = html.match(/<link rel="canonical" href="([^"]+)">/u); return match?.[1] === expected; }
function validateInternalLink(file, value) {
  if (/^(?:#|mailto:|tel:|https?:|data:|javascript:)/iu.test(value)) return;
  const clean = value.split('#')[0].split('?')[0];
  if (!clean) return;
  const base = resolve(outDir, posix.dirname(file));
  const target = resolve(base, clean);
  const relative = target.slice(outDir.length + 1).replaceAll('\\', '/');
  if (target !== outDir && !target.startsWith(outDir + '/')) return errors.push('Link außerhalb des Artefakts in ' + file + ': ' + value);
  const candidates = clean.endsWith('/') ? [join(outDir, relative, 'index.html')] : [join(outDir, relative), join(outDir, relative, 'index.html')];
  if (!candidates.some(candidate => files.includes(candidate))) errors.push('Toter interner Link in ' + file + ': ' + value);
}
async function walk(dir) {
  const entries = await readdir(dir, {withFileTypes: true});
  const result = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await walk(path)); else if ((await stat(path)).isFile()) result.push(path);
  }
  return result;
}
