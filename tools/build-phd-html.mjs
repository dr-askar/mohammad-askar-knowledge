import {mkdir, readFile, writeFile, access, mkdtemp, readdir, rm} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {join, resolve} from 'node:path';
import {tmpdir} from 'node:os';

const root = resolve(import.meta.dirname, '..');
const sourceRoot = join(root, 'content/phd');
const siteRoot = join(root, 'knowledge/phd');
const assetRoot = join(siteRoot, 'assets');
const sourceImageRoot = join(assetRoot, 'source-pages');
const figureImageRoot = join(assetRoot, 'figures');
const originalPdf = '/Users/test/Downloads/phd_KC_AI_dr_askar.pdf';
const execFileAsync = promisify(execFile);
const sources = {
  front: await readFile(join(sourceRoot, 'translation-de.md'), 'utf8'),
  s22: await readFile(join(sourceRoot, 'translation-s22-31.md'), 'utf8'),
  s32: await readFile(join(sourceRoot, 'translation-s32-43.md'), 'utf8'),
  s44: await readFile(join(sourceRoot, 'translation-s44-75.md'), 'utf8'),
  s82: await readFile(join(sourceRoot, 'translation-s82-113.md'), 'utf8'),
  s114: await readFile(join(sourceRoot, 'translation-s114-137.md'), 'utf8'),
  s138: await readFile(join(sourceRoot, 'translation-s138-164.md'), 'utf8'),
  s165: await readFile(join(sourceRoot, 'translation-s165-196.md'), 'utf8'),
};
const arabicExtracted = await readFile(join(root, 'tmp/arabic-full-extracted.txt'), 'utf8').catch(() => '');
const arabicFigureCaptions = extractArabicFigureCaptions(arabicExtracted);

await mkdir(assetRoot, {recursive: true});
await mkdir(figureImageRoot, {recursive: true});
await mkdir(sourceImageRoot, {recursive: true});

const tableList = extractNumberedList(sources.front, '## Tabellenverzeichnis', '## Abbildungs- und Diagrammverzeichnis');
const figureList = extractNumberedList(sources.front, '## Abbildungs- und Diagrammverzeichnis', '## Arabische Zusammenfassung');
const tableData = extractTables(Object.values(sources));

const {assets: figureAssets, representations: figureRepresentations} = await buildFigureAssets(figureList);
for (const table of tableList) if (!tableData.has(table.number)) await sourcePageAsset(table.page);
await writeFile(join(assetRoot, 'manifest.json'), JSON.stringify({
  generatedBy: 'tools/build-phd-html.mjs',
  rightsPolicy: 'Alle Figuren verwenden lokal extrahierte oder aus extrahierten Original-Unterbildern zusammengesetzte Bilddateien aus dem bereitgestellten Dissertation-PDF. Es werden keine vollständigen PDF-Seiten und keine künstlichen Ersatzgrafiken als Figuren verwendet.',
  figures: figureList.map(figure => ({...figure, captionAr: arabicFigureCaptions.get(figure.number) || `الشكل ${figure.number}`, chapter: chapterForFigure(figure.number), asset: figureAssets.get(figure.number), representation: figureRepresentations.get(figure.number), rightsBasis: 'Lokale Extraktion aus dem bereitgestellten Original-PDF; keine externe Grafiklizenz.'})),
  tables: tableList.map(table => ({...table, representation: tableData.has(table.number) ? 'responsive-html-table' : 'original-page-image-reference', asset: tableData.has(table.number) ? null : sourcePageAssetName(table.page), source: 'Originaldissertation, unverändertes PDF-Faksimile'})),
}, null, 2) + '\n', 'utf8');

const pages = [
  ['index.html', startPage()],
  ['contents.html', standardPage('Verzeichnisse', 'Vollständige Verzeichnisse und Abdeckung', contentsBody(), 'Startseite')],
  ['chapter-1.html', standardPage('Kapitel 1', 'Einleitung', markdownToHtml(chapter1()), 'Verzeichnisse')],
  ['chapter-2.html', standardPage('Kapitel 2', 'Keratokonus und Topographie', markdownToHtml(chapter2()), 'Kapitel 1')],
  ['chapter-3.html', standardPage('Kapitel 3', 'Künstliche Intelligenz', markdownToHtml(chapter3()), 'Kapitel 2')],
  ['chapter-4.html', standardPage('Kapitel 4', 'KI in Medizin und Augenheilkunde', markdownToHtml(chapter4()), 'Kapitel 3')],
  ['chapter-5.html', standardPage('Kapitel 5', 'Studiendesign und Methoden', markdownToHtml(chapter5()), 'Kapitel 4')],
  ['chapter-6.html', standardPage('Kapitel 6', 'Ergebnisse', markdownToHtml(chapter6()), 'Kapitel 5')],
  ['chapter-7.html', standardPage('Kapitel 7', 'Diskussion', markdownToHtml(chapter7()), 'Kapitel 6')],
  ['chapter-8.html', standardPage('Kapitel 8', 'Zusammenfassung und Schlussfolgerungen', markdownToHtml(chunk(sources.s165, '## Kapitel 8', '## Kapitel 9')), 'Kapitel 7')],
  ['chapter-9.html', standardPage('Kapitel 9', 'Vorschläge und Empfehlungen', markdownToHtml(chunk(sources.s165, '## Kapitel 9', '## Kapitel 10')), 'Kapitel 8')],
  ['chapter-10.html', standardPage('Kapitel 10', 'Abschließendes Wort', markdownToHtml(chunk(sources.s165, '## Kapitel 10', '## Literaturverzeichnis')), 'Kapitel 9')],
  ['literature.html', standardPage('Literatur', 'Literaturverzeichnis', markdownToHtml(chunk(sources.s165, '## Literaturverzeichnis', '## Deutsche Übersetzung des englischen Abstracts')), 'Kapitel 10')],
  ['appendix.html', standardPage('Anhang', 'Abstract, übertragene Titelseite und Originalfaksimile', appendixBody(), 'Literatur')],
  ['tables.html', standardPage('Tabellen', '58 Tabellen – rekonstruiert oder als Faksimile-Referenz', tablesBody(), 'Verzeichnisse')],
  ['figures.html', standardPage('Abbildungen', '114 Abbildungen – extrahierte Originalabbildungen', figuresBody(), 'Verzeichnisse')],
];
for (const [name, html] of pages) await writeFile(join(siteRoot, name), html, 'utf8');
await execFileAsync(process.execPath, [join(root, 'tools/build-phd-html-ar.mjs')]);
console.log(`Built PhD HTML: ${pages.length} pages, ${tableList.length} tables, ${figureList.length} figures.`);

function chapter1() {
  return `# Kapitel 1: Einleitung (Original S. 22–23)\n\n${sources.s22.split('# Kapitel 2:')[0].replace(/^##[^\n]*\n\n?/, '')}`;
}
function chapter2() {
  const body = sources.s22.slice(sources.s22.indexOf('# Kapitel 2:')) + '\n\n' + sources.s32 + '\n\n' + sources.s44.slice(0, sources.s44.indexOf('## Kapitel 3:'));
  const figure24 = figureList.find(figure => figure.number === 24);
  return body + (body.includes('**Abbildung 24:**') || body.includes('**Abbildung 24:**') ? '' : `\n\n**Abbildung 24:** ${figure24?.caption || 'Originalabbildung auf S. 62'}.`);
}
function chapter3() { return sources.s44.slice(sources.s44.indexOf('## Kapitel 3:')); }
function chapter4() { return chunk(sources.s82, '# Kapitel 4:', '## S. 97–113'); }
function chapter5() { return chunk(sources.s82, '# Kapitel 5:', null); }
function chapter6() { return sources.s114 + '\n\n' + sources.s138; }
function chapter7() { return chunk(sources.s165, '## S. 165–188', '## Kapitel 8'); }
function appendixBody() {
  return `${chunk(sources.s165, '## Deutsche Übersetzung des englischen Abstracts', null)}
\n<section class="phd-facsimile-note"><h2>Unverändertes arabisches Originalfaksimile</h2><p>Das vollständige arabische Original ist in der <a href="../../output/pdf/phd-kc-ai-askar-de.pdf">finalen PDF-Ausgabe</a> als 196-seitiger Faksimile-Anhang enthalten. Die HTML-Seiten sind die deutsche Textausgabe; Karten, Diagramme und Originaltabellen bleiben im Faksimile prüfbar.</p></section>`;
}
function contentsBody() {
  const front = chunk(sources.front, '## Vollständiges Inhaltsverzeichnis', '## Arabische Zusammenfassung');
  return `${markdownToHtml(front, {contents: true, locale: 'de'})}<p class="phd-jump-grid"><a href="tables.html">Zu allen 58 Tabellen</a><a href="figures.html">Zu allen 114 Abbildungen</a></p>`;
}
function tablesBody() {
  return `<div class="phd-count-line">${tableList.length} Tabellen · responsive Darstellung, wenn die Daten im Übersetzungssegment zuverlässig rekonstruiert sind.</div><div class="phd-table-grid">${tableList.map(table => {
    const rows = tableData.get(table.number);
    return `<article class="phd-table-card" id="tabelle-${table.number}"><h2>Tabelle ${table.number}</h2><p class="phd-caption">${inline(table.caption)}</p><p class="phd-source">Quelle: Originaldissertation, Original S. ${table.page}. Rechtebasis: ${rows ? 'deutsche Übersetzung mit rekonstruierter HTML-Tabelle' : 'lokal gerendertes Originalseitenbild; keine externe Grafiklizenz'}.</p>${rows ? htmlTable(rows) : `<div class="phd-reference"><strong>Originaltabelle als Seitenbild</strong><a class="phd-figure-zoom" href="${sourcePageAssetName(table.page)}"><img loading="lazy" decoding="async" src="${sourcePageAssetName(table.page)}" alt="Originaltabelle ${table.number} auf Originalseite ${table.page}" width="900" height="1200"></a><p>Die Tabelle wird als tatsächliches Originalseitenbild gezeigt, weil die Struktur in diesem Segment nicht zuverlässig vollständig als HTML rekonstruiert werden konnte. Original S. ${table.page} ist auch im unveränderten PDF-Faksimile enthalten.</p></div>`}</article>`;
  }).join('')}</div>`;
}
function figuresBody() {
  return `<div class="phd-count-line">${figureList.length} Abbildungen · lokal aus dem Original-PDF extrahierte Abbildungsbereiche und deterministische Zusammensetzungen echter Unterbilder.</div><div class="phd-figure-grid">${figureList.map(figure => figureMarkup(figure, 'de')).join('')}</div>`;
}

function figureMarkup(figure, locale) {
  const asset = figureAsset(figure);
  const caption = locale === 'ar' ? figure.captionAr : figure.caption;
  const label = locale === 'ar' ? `الشكل ${figure.number}` : `Abbildung ${figure.number}`;
  const source = locale === 'ar' ? `المصدر: الأطروحة الأصلية، الصفحة ${figure.page}. صورة الشكل مستخرجة محلياً من PDF الأصلي.` : `Quelle: Originaldissertation, Original S. ${figure.page}. Abbildungsbereich lokal aus dem Original-PDF extrahiert.`;
  const alt = locale === 'ar' ? `الشكل المستخرج ${figure.number}: ${caption}` : `Extrahierte Originalabbildung ${figure.number}: ${caption}`;
  return `<figure class="phd-figure phd-original-figure" id="abbildung-${figure.number}"><a class="phd-figure-zoom" href="${asset}"><img loading="lazy" decoding="async" src="${asset}" alt="${escapeHtml(alt)}" width="900" height="1200"></a><figcaption><strong>${label}.</strong> ${inline(caption)} <span class="phd-source">${source}</span></figcaption></figure>`;
}

function startPage() {
  const summary = chunk(sources.front, '## Arabische Zusammenfassung', null);
  return pageShell('Startseite', `<header class="kb-hero"><p class="kb-eyebrow">PhD · Forschung · Hornhaut und künstliche Intelligenz</p><h1>Deutsche HTML-Ausgabe der Dissertation</h1><p>Vollständige mehrseitige Darstellung der deutschen Übersetzung von <strong>Mohammad Askar</strong> zur Computer Vision und zum Deep Learning bei der Differenzierung normaler, keratokonischer und verdächtiger Hornhäute.</p><div class="kb-warning"><strong>Transparenz:</strong> Nicht amtliche Übersetzung mit arabischem Originalfaksimile. Wissenschaftliche Arbeit; keine individuelle medizinische Beratung.</div></header><article class="kb-article"><div class="kb-meta"><span class="kb-badge">Deutsch</span><span class="kb-badge">Original: Arabisch</span><span class="kb-badge">196 Originalseiten</span><span class="kb-badge">58 Tabellen · 114 Abbildungen</span></div><section class="phd-jump-grid"><a href="contents.html">Verzeichnisse öffnen</a><a href="chapter-1.html">Kapitel 1 beginnen</a><a href="tables.html">Tabellen ansehen</a><a href="figures.html">Abbildungen ansehen</a></section><section><h2>Forschungsgegenstand</h2><p>Die Dissertation untersucht ein Computer-Vision- und Deep-Learning-System zur Unterscheidung normaler, keratokonischer und keratokonusverdächtiger Hornhäute anhand topographischer Karten.</p><p>Diese HTML-Ausgabe folgt der vollständigen Übersetzung. Tabellen werden als responsive HTML-Tabelle dargestellt, sofern ihre Werte zuverlässig rekonstruiert werden konnten; andernfalls verweist die Seite auf die entsprechende Originalseite im Faksimile.</p></section><section><h2>Zusammenfassung</h2>${markdownToHtml(summary)}</section><section class="phd-sources"><h2>Quelle, Rechte und Datenschutz</h2><p>Quelle ist die Dissertation <code>phd_KC_AI_dr_askar.pdf</code>. Alle 114 Figuren werden als lokal extrahierte Originalabbildungen oder als deterministische Zusammensetzungen echter Unterbilder mit Quellen- und Rechtehinweis dargestellt. Das unveränderte arabische PDF-Faksimile bleibt zusätzlich verlinkt.</p><p>Die technische Prüfung aller 196 Originalseiten ergab keine individuellen Patientennamen, IDs, Geburtsdaten, Adressen oder Telefonnummern. Dies ersetzt keine institutionelle Datenschutz- oder Rechtsprüfung.</p></section></article>`);
}
function standardPage(section, title, body, previous) {
  const chapterId = section.match(/^Kapitel\s+(\d+)/)?.[1];
  return pageShell(section, `<article class="kb-article"><p class="kb-eyebrow">${escapeHtml(section)} · vollständige deutsche Übersetzung</p><h1${chapterId ? ` id="chapter-${chapterId}"` : ''}>${escapeHtml(title)}</h1><div class="phd-section-body">${body}</div></article>`, previous);
}
function pageShell(section, body, previous = '') {
  const pageTitle = section === 'Startseite' ? 'Deutsche HTML-Ausgabe der Dissertation' : section;
  const next = {'Startseite':'Verzeichnisse','Verzeichnisse':'Kapitel 1','Kapitel 1':'Kapitel 2','Kapitel 2':'Kapitel 3','Kapitel 3':'Kapitel 4','Kapitel 4':'Kapitel 5','Kapitel 5':'Kapitel 6','Kapitel 6':'Kapitel 7','Kapitel 7':'Kapitel 8','Kapitel 8':'Kapitel 9','Kapitel 9':'Kapitel 10','Kapitel 10':'Literatur','Literatur':'Anhang','Anhang':'Startseite'}[section];
  const localeFile = canonicalPathForSection(section);
  const nav = `<nav class="phd-locale-switch" aria-label="Sprachauswahl"><span aria-current="page">Deutsch</span><a href="ar/${localeFile}">العربية الأصلية</a><a href="en/${localeFile}">English</a></nav><nav class="kb-nav" aria-label="Seitennavigation"><a href="index.html">← PhD-Startseite</a><div class="kb-nav-links"><a href="contents.html">Verzeichnisse</a><a href="tables.html">Tabellen</a><a href="figures.html">Abbildungen</a><a href="../../output/pdf/phd-kc-ai-askar-de.pdf">PDF</a></div></nav>`;
  const trail = `<p class="phd-breadcrumbs"><a href="index.html">PhD</a> <span aria-hidden="true">/</span> ${escapeHtml(section)}</p>`;
  const pager = `<nav class="phd-pager" aria-label="Kapitel-Navigation">${previous ? `<a href="${hrefFor(previous)}">← ${escapeHtml(previous)}</a>` : '<span></span>'}${next ? `<a href="${hrefFor(next)}">${escapeHtml(next)} →</a>` : '<span></span>'}</nav>`;
  const canonicalPath = section === 'Startseite' ? '' : hrefFor(section);
  return `<!doctype html><html lang="de" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${escapeHtml(pageTitle)} – vollständige deutsche Übersetzung der Dissertation von Mohammad Askar."><meta name="robots" content="index,follow"><link rel="canonical" href="https://dr-askar.github.io/mohammad-askar-knowledge/knowledge/phd/${canonicalPath}"><link rel="alternate" hreflang="de" href="https://dr-askar.github.io/mohammad-askar-knowledge/knowledge/phd/${canonicalPath}"><link rel="alternate" hreflang="en" href="https://dr-askar.github.io/mohammad-askar-knowledge/knowledge/phd/en/${canonicalPath}"><link rel="alternate" hreflang="ar" href="https://dr-askar.github.io/mohammad-askar-knowledge/knowledge/phd/ar/${canonicalPath}"><title>${escapeHtml(pageTitle)} | Mohammad Askar</title><link rel="stylesheet" href="../ophthalmology/assets/library.css"><link rel="stylesheet" href="assets/phd.css"></head><body><div class="kb-shell">${nav}${trail}${body}${pager}<footer class="kb-footer">Nicht amtliche wissenschaftliche Übersetzung · <a href="../../legal/impressum.html">Impressum</a> · <a href="../../legal/datenschutz.html">Datenschutz</a> · <a href="../../output/pdf/phd-kc-ai-askar-de.pdf">PDF mit Originalfaksimile</a></footer></div></body></html>`;
}
function canonicalPathForSection(section) { return section === 'Startseite' ? 'index.html' : hrefFor(section); }
function hrefFor(label) {
  if (label === 'Startseite') return 'index.html';
  if (label === 'Verzeichnisse') return 'contents.html';
  if (label === 'Literatur') return 'literature.html';
  if (label === 'Anhang') return 'appendix.html';
  if (label === 'Tabellen') return 'tables.html';
  if (label === 'Abbildungen') return 'figures.html';
  return `chapter-${label.match(/\d+/)?.[0] || '1'}.html`;
}
function chunk(text, start, end) {
  const at = text.indexOf(start);
  if (at < 0) return '';
  const tail = text.slice(at);
  const stop = end ? tail.indexOf(end) : -1;
  return stop < 0 ? tail : tail.slice(0, stop);
}
function extractNumberedList(text, start, end) {
  const body = chunk(text, start, end);
  return [...body.matchAll(/^([0-9]+)\.\s+(.*?)(?:\s+\(S\.\s*([0-9–-]+)\))?$/gmu)].map(match => ({number: Number(match[1]), caption: match[2].replace(/\s+\(S\.\s*[0-9–-]+\)$/, '').trim(), page: (match[3] || '—').replace('–', '–')}));
}
function extractTables(texts) {
  const map = new Map();
  for (const text of texts) {
    const lines = text.split(/\r?\n/);
    const blocks = [];
    for (let i = 0; i < lines.length; i++) {
      if (!/^\|/.test(lines[i])) continue;
      const start = i;
      const block = [];
      while (i < lines.length && /^\|/.test(lines[i])) block.push(lines[i++]);
      i--;
      blocks.push({start, end: i, block});
    }
    for (const item of blocks) {
      const nearbyBefore = [];
      const nearbyAfter = [];
      for (let j = Math.max(0, item.start - 8); j <= Math.min(lines.length - 1, item.end + 4); j++) {
        const match = lines[j].match(/Tabelle\s+(\d+)/i);
        if (match) (j >= item.end ? nearbyAfter : nearbyBefore).push({distance: Math.abs(j - item.start), number: Number(match[1])});
      }
      nearbyAfter.sort((a, b) => a.distance - b.distance);
      nearbyBefore.sort((a, b) => a.distance - b.distance);
      const match = nearbyAfter[0] || nearbyBefore[0];
      const rows = item.block.map(line => line.split('|').slice(1, -1).map(cell => cell.trim())).filter(row => row.some(Boolean)).filter(row => !row.every(cell => /^:?-{2,}:?$/.test(cell)));
      if (match && rows.length >= 2) map.set(match.number, rows);
    }
  }
  return map;
}
function htmlTable(rows) {
  if (!rows.length) return '';
  return `<div class="phd-table-wrap"><table><thead><tr>${rows[0].map(cell => `<th scope="col">${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(row => `<tr>${row.map(cell => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function markdownToHtml(text, options = {}) {
  const lines = text.replace(/```[\s\S]*?```/g, '').split(/\r?\n/);
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    if (/^\|/.test(line)) {
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(lines[i++].trim().split('|').slice(1, -1).map(cell => cell.trim()));
      const filtered = rows.filter(row => row.some(Boolean)).filter(row => !row.every(cell => /^:?-{2,}:?$/.test(cell)));
      if (filtered.length) out.push(`<div class="phd-table-wrap"><table><thead><tr>${filtered[0].map(cell => `<th scope="col">${inline(cell)}</th>`).join('')}</tr></thead><tbody>${filtered.slice(1).map(row => `<tr>${row.map(cell => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) { const level = Math.min(4, heading[1].length + 1); const id = headingId(heading[2]); const link = options.contents ? contentsLink(heading[2]) : null; out.push(`<h${level} id="${id}">${link ? `<a href="${link}">${inline(heading[2])}</a>` : inline(heading[2])}</h${level}>`); i++; continue; }
    const figure = line.match(/^\*\*Abbildung\s+(\d+):\*\*\s*(.*)$/i) || line.match(/^\*\*Abbildung\s+(\d+)\*\*:\s*(.*)$/i);
    if (figure) { const item = figureList.find(candidate => candidate.number === Number(figure[1])); if (item) out.push(figureMarkup(item, 'de')); else out.push(`<p>${inline(line)}</p>`); i++; continue; }
    if (/^[-*]\s+/.test(line)) { const items = []; while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*]\s+/, '')); out.push(`<ul${options.contents ? ' class="phd-toc"' : ''}>${items.map(item => `<li>${contentsItem(item, options) || inline(item)}</li>`).join('')}</ul>`); continue; }
    if (/^\d+\.\s+/.test(line)) { const items = []; while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+\.\s+/, '')); out.push(`<ol${options.contents ? ' class="phd-toc"' : ''}>${items.map(item => `<li>${contentsItem(item, options) || inline(item)}</li>`).join('')}</ol>`); continue; }
    const para = [line]; i++;
    while (i < lines.length && lines[i].trim() && !/^#{1,4}\s+/.test(lines[i].trim()) && !/^\s*[-*]\s+/.test(lines[i]) && !/^\s*\d+\.\s+/.test(lines[i]) && !/^\s*\|/.test(lines[i])) para.push(lines[i++].trim());
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('\n');
}
function inline(value) {
  return escapeHtml(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}
function escapeHtml(value) { return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;'); }
function headingId(value) {
  const section = value.match(/^(\d+(?:\.\d+)+)\b/);
  if (section) return `section-${section[1].replaceAll('.', '-')}`;
  const chapter = value.match(/^(?:Kapitel|Chapter)\s+(\d+)/i);
  if (chapter) return `chapter-${chapter[1]}`;
  return slug(value);
}
function contentsLink(value) {
  const section = value.match(/^(\d+(?:\.\d+)+)\b/);
  if (section) return `chapter-${renderedChapterForSection(section[1])}.html#section-${section[1].replaceAll('.', '-')}`;
  const chapter = value.match(/^(?:Kapitel|Chapter)\s+(\d+)/i);
  if (chapter) return `chapter-${chapter[1]}.html#chapter-${chapter[1]}`;
  if (/Tabellenverzeichnis|List of Tables/i.test(value)) return 'tables.html';
  if (/Abbildungs|List of Figures/i.test(value)) return 'figures.html';
  return null;
}
function contentsItem(value, options) {
  const page = value.match(/\s+\((?:S\.|p\.)\s*([0-9–-]+)\)\s*$/i);
  const label = value.replace(/\s+\((?:S\.|p\.)\s*[0-9–-]+\)\s*$/i, '').trim();
  const section = label.match(/^(\d+(?:\.\d+)+)\b/);
  const rawHref = contentsLink(label);
  const href = section && !sourceHasSection(section[1]) ? `chapter-${renderedChapterForSection(section[1])}.html` : rawHref;
  if (!href) return '';
  return `<a href="${href}">${inline(label)}</a>${page ? ` <span class="phd-toc-page">(${options.locale === 'en' ? 'p.' : 'S.'} ${escapeHtml(page[1])})</span>` : ''}`;
}
function sourceHasSection(section) {
  return Object.values(sources).some(text => new RegExp(`^#{1,4}\\s+${section.replaceAll('.', '\\.')}(?:\\b|\\s)`, 'mu').test(text));
}
function renderedChapterForSection(section) {
  return /^7\.(?:1|2)(?:\.|$)/.test(section) ? '6' : section.split('.')[0];
}
function slug(value) { return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'abschnitt'; }
async function buildFigureAssets(figures) {
  const extractionRoot = await mkdtemp(join(tmpdir(), 'phd-figures-'));
  const prefix = join(extractionRoot, 'image');
  const listText = (await execFileAsync('pdfimages', ['-list', originalPdf])).stdout;
  const imageRows = listText.split(/\r?\n/).slice(2).map(line => line.trim().split(/\s+/)).filter(columns => columns.length > 2 && columns[2] === 'image');
  const byPage = new Map();
  for (const columns of imageRows) {
    const page = Number(columns[0]);
    const image = Number(columns[1]);
    if (!byPage.has(page)) byPage.set(page, []);
    byPage.get(page).push(image);
  }
  await execFileAsync('pdfimages', ['-all', originalPdf, prefix]);
  const extracted = new Map((await readdir(extractionRoot)).filter(name => name.startsWith('image-')).map(name => [Number(name.match(/image-(\d+)/)?.[1]), join(extractionRoot, name)]));
  const assets = new Map();
  const representations = new Map();
  const byFigurePage = new Map();
  for (const figure of figures) {
    const page = Number(String(figure.page).match(/\d+/)?.[0]);
    if (!byFigurePage.has(page)) byFigurePage.set(page, []);
    byFigurePage.get(page).push(figure);
  }
  for (const [page, pageFigures] of byFigurePage) {
    const imageIds = byPage.get(page) || [];
    if (!imageIds.length) throw new Error(`No embedded figure images found for original page ${page}`);
    const slices = splitFigureImages(page, pageFigures, imageIds);
    for (const [index, figure] of pageFigures.entries()) {
      const inputPaths = slices[index].map(imageId => extracted.get(imageId)).filter(Boolean);
      if (!inputPaths.length) throw new Error(`Missing extracted image data for Figure ${figure.number} on original page ${page}`);
      const output = join(figureImageRoot, `figure-${String(figure.number).padStart(3, '0')}.jpg`);
      await renderFigureAsset(inputPaths, output);
      assets.set(figure.number, `assets/figures/${output.split('/').pop()}`);
      representations.set(figure.number, inputPaths.length > 1 ? 'embedded-image-composite' : 'embedded-image');
    }
  }
  await rm(extractionRoot, {recursive: true, force: true});
  return {assets, representations};
}

function splitFigureImages(page, figures, imageIds) {
  if (figures.length === 1) return [page === 174 ? imageIds.filter(imageId => imageId !== 205) : imageIds];
  if (page === 51) return [imageIds.slice(0, 2), imageIds.slice(2)];
  if (imageIds.length % figures.length !== 0) throw new Error(`Ambiguous embedded-image mapping on original page ${page}: ${figures.length} figures, ${imageIds.length} images`);
  const size = imageIds.length / figures.length;
  return figures.map((_, index) => imageIds.slice(index * size, (index + 1) * size));
}

async function renderFigureAsset(inputPaths, output) {
  const columns = Math.min(4, Math.max(1, Math.ceil(Math.sqrt(inputPaths.length))));
  const rows = Math.ceil(inputPaths.length / columns);
  const args = ['-hide_banner', '-loglevel', 'error', '-y'];
  for (const input of inputPaths) args.push('-i', input);
  args.push('-filter_complex', `tile=${columns}x${rows}:padding=8:margin=8`, '-frames:v', '1', '-q:v', '2', output);
  await execFileAsync('ffmpeg', args);
}
function sourcePageAssetName(page) {
  const number = String(page).match(/\d+/)?.[0] || '0';
  return `assets/source-pages/page-${number.padStart(3, '0')}.jpg`;
}
async function sourcePageAsset(page) {
  const number = String(page).match(/\d+/)?.[0];
  if (!number) return sourcePageAssetName(page);
  const output = join(sourceImageRoot, `page-${number.padStart(3, '0')}`);
  const jpg = `${output}.jpg`;
  try { await access(jpg); } catch {
    await execFileAsync('pdftoppm', ['-f', number, '-l', number, '-jpeg', '-jpegopt', 'quality=82,optimize=y,progressive=y', '-r', '120', '-singlefile', originalPdf, output]);
  }
  return sourcePageAssetName(page);
}
function figureAsset(figure) {
  return `assets/figures/figure-${String(figure.number).padStart(3, '0')}.jpg`;
}

function chapterForFigure(number) {
  if (number <= 24) return 2;
  if (number <= 35) return 3;
  if (number <= 41) return 4;
  if (number <= 47) return 5;
  if (number <= 94) return 6;
  if (number <= 113) return 7;
  return 10;
}

function extractArabicFigureCaptions(text) {
  const captions = new Map();
  const normalized = text.replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/gu, '').replace(/[\u00A0\u202F]/gu, ' ');
  for (const match of normalized.matchAll(/(?:شكل|الشكل)\s*([0-9]{1,3})([^\n]*)/gu)) {
    const number = Number(match[1]);
    const tail = match[2].replace(/[\u200B-\u200F\u202A-\u202E\uFEFF]/gu, '').replace(/\s+/gu, ' ').replace(/\s+\d+\s*(?:\.{2,}.*)?$/u, '').trim();
    if (!captions.has(number)) captions.set(number, `الشكل ${number}${tail ? ` ${tail}` : ''}`);
  }
  return captions;
}
