import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const sourceRoot = join(root, 'content/phd');
const siteRoot = join(root, 'knowledge/phd/en');
const assetRoot = join(root, 'knowledge/phd/assets');
const manifestPath = join(assetRoot, 'manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const figureManifest = new Map(manifest.figures.map(f => [f.number, f]));
const tableManifest = new Map(manifest.tables.map(t => [t.number, t]));

const sources = {
  front: await readFile(join(sourceRoot, 'translation-en.md'), 'utf8'),
  s22: await readFile(join(sourceRoot, 'translation-en-s22-31.md'), 'utf8'),
  s32: await readFile(join(sourceRoot, 'translation-en-s32-43.md'), 'utf8'),
  s44: await readFile(join(sourceRoot, 'translation-en-s44-75.md'), 'utf8'),
  s82: await readFile(join(sourceRoot, 'translation-en-s82-113.md'), 'utf8'),
  s114: await readFile(join(sourceRoot, 'translation-en-s114-137.md'), 'utf8'),
  s138: await readFile(join(sourceRoot, 'translation-en-s138-164.md'), 'utf8'),
  s165: await readFile(join(sourceRoot, 'translation-en-s165-196.md'), 'utf8'),
};

await mkdir(siteRoot, {recursive: true});

const tableList = extractNumberedList(sources.front, '## List of Tables', '## List of Figures and Diagrams');
const figureList = extractNumberedList(sources.front, '## List of Figures and Diagrams', '## Arabic Abstract');

const pages = [
  ['index.html', startPage()],
  ['contents.html', standardPage('Contents', 'Complete Table of Contents', contentsBody(), 'Home')],
  ['chapter-1.html', standardPage('Chapter 1', 'Introduction', markdownToHtml(chapter1()), 'Contents')],
  ['chapter-2.html', standardPage('Chapter 2', 'Keratoconus', markdownToHtml(chapter2()), 'Chapter 1')],
  ['chapter-3.html', standardPage('Chapter 3', 'Artificial Intelligence', markdownToHtml(chapter3()), 'Chapter 2')],
  ['chapter-4.html', standardPage('Chapter 4', 'AI in Medicine and Ophthalmology', markdownToHtml(chapter4()), 'Chapter 3')],
  ['chapter-5.html', standardPage('Chapter 5', 'Study Design and Methods', markdownToHtml(chapter5()), 'Chapter 4')],
  ['chapter-6.html', standardPage('Chapter 6', 'Results', markdownToHtml(chapter6()), 'Chapter 5')],
  ['chapter-7.html', standardPage('Chapter 7', 'Discussion', markdownToHtml(chapter7()), 'Chapter 6')],
  ['chapter-8.html', standardPage('Chapter 8', 'Summary and Conclusions', markdownToHtml(chunk(sources.s165, '## Chapter 8', '## Chapter 9')), 'Chapter 7')],
  ['chapter-9.html', standardPage('Chapter 9', 'Recommendations', markdownToHtml(chunk(sources.s165, '## Chapter 9', '## Chapter 10')), 'Chapter 8')],
  ['chapter-10.html', standardPage('Chapter 10', 'Closing Remarks', markdownToHtml(chunk(sources.s165, '## Chapter 10', '## References')), 'Chapter 9')],
  ['literature.html', standardPage('References', 'References', markdownToHtml(chunk(sources.s165, '## References', '## English Translation of the English Abstract')), 'Chapter 10')],
  ['appendix.html', standardPage('Appendix', 'Abstract and Transferred Title Page', appendixBody(), 'References')],
  ['tables.html', standardPage('Tables', `${tableList.length} Tables – reconstructed or facsimile reference`, tablesBody(), 'Contents')],
  ['figures.html', standardPage('Figures', `${figureList.length} Figures – extracted original artwork`, figuresBody(), 'Contents')],
];
for (const [name, html] of pages) await writeFile(join(siteRoot, name), html, 'utf8');
console.log(`Built English PhD HTML: ${pages.length} pages, ${tableList.length} tables, ${figureList.length} figures.`);

function chapter1() {
  const body = sources.s22.split('# Chapter 2:')[0].replace(/^##[^\n]*\n\n?/, '');
  return body;
}
function chapter2() {
  const body = sources.s22.slice(sources.s22.indexOf('# Chapter 2:')) + '\n\n' + sources.s32 + '\n\n' + sources.s44.slice(0, sources.s44.indexOf('## Chapter 3:'));
  return body;
}
function chapter3() { return sources.s44.slice(sources.s44.indexOf('## Chapter 3:')); }
function chapter4() { return chunk(sources.s82, '# Chapter 4:', '## S. 97–113'); }
function chapter5() { return chunk(sources.s82, '# Chapter 5:', null); }
function chapter6() { return sources.s114 + '\n\n' + sources.s138; }
function chapter7() { return chunk(sources.s165, '## S. 165–188', '## Chapter 8'); }
function appendixBody() {
  return `${chunk(sources.s165, '## English Translation of the English Abstract', '## Transferred Title Page')}\n\n${chunk(sources.s165, '## Transferred Title Page', null)}`;
}
function contentsBody() {
  const front = chunk(sources.front, '## Complete Table of Contents', '## List of Tables');
  return `${markdownToHtml(front, {contents: true, locale: 'en'})}<p class="phd-jump-grid"><a href="tables.html">All ${tableList.length} tables</a><a href="figures.html">All ${figureList.length} figures</a></p>`;
}
function tablesBody() {
  return `<div class="phd-count-line">${tableList.length} tables &middot; responsive rendering where data could be reliably reconstructed from the translation segments.</div><div class="phd-table-grid">${tableList.map(table => {
    const manifestTable = tableManifest.get(table.number);
    return `<article class="phd-table-card" id="table-${table.number}"><h2>Table ${table.number}</h2><p class="phd-caption">${inline(table.caption)}</p><p class="phd-source">Source: Original dissertation, Original p. ${table.page}.</p><p class="phd-note">Table reconstructed from the original text. See the original PDF facsimile for the authoritative version.</p></article>`;
  }).join('')}</div>`;
}
function figuresBody() {
  return `<div class="phd-count-line">${figureList.length} figures &middot; local figure areas extracted from the original PDF, with deterministic composites of real embedded sub-images where needed.</div><div class="phd-figure-grid">${figureList.map(figure => figureMarkup(figure)).join('')}</div>`;
}

function figureMarkup(figure) {
  const item = figureManifest.get(figure.number);
  if (!item) throw new Error(`Missing manifest entry for Figure ${figure.number}`);
  const asset = '../' + item.asset;
  const caption = (item && item.captionEn) || figure.caption;
  const label = `Figure ${figure.number}`;
  const source = `Source: Original dissertation, Original p. ${figure.page}. Figure area extracted locally from the original PDF.`;
  const alt = `Extracted original figure ${figure.number}: ${caption}`;
  return `<figure class="phd-figure phd-original-figure" id="figure-${figure.number}"><a class="phd-figure-zoom" href="${asset}"><img loading="lazy" decoding="async" src="${asset}" alt="${escapeHtml(alt)}" width="900" height="1200"></a><figcaption><strong>${label}.</strong> ${inline(caption)} <span class="phd-source">${source}</span></figcaption></figure>`;
}

function startPage() {
  return pageShell('Home', `<header class="kb-hero"><p class="kb-eyebrow">PhD &middot; Research &middot; Cornea and Artificial Intelligence</p><h1>English HTML Edition of the Dissertation</h1><p>Complete multi-page rendering of the English translation of <strong>Mohammad Askar</strong> on computer vision and deep learning for differentiation of normal, keratoconic, and suspect corneas.</p><div class="kb-warning"><strong>Transparency:</strong> Non-official working translation. Scientific work; not individual medical advice.</div></header><article class="kb-article"><div class="kb-meta"><span class="kb-badge">English</span><span class="kb-badge">Original: Arabic</span><span class="kb-badge">196 original pages</span><span class="kb-badge">58 tables &middot; 114 figures</span></div><section class="phd-jump-grid"><a href="contents.html">Open contents</a><a href="chapter-1.html">Start Chapter 1</a><a href="tables.html">View tables</a><a href="figures.html">View figures</a></section><section><h2>Research Subject</h2><p>The dissertation investigates a computer vision and deep learning system for differentiation of normal, keratoconic, and suspect corneas using topographic map images.</p><p>This English HTML edition follows the complete translation. Tables are rendered as responsive HTML where values could be reliably reconstructed; otherwise the page references the corresponding original page in the facsimile.</p></section><section class="phd-sources"><h2>Source, Rights and Privacy</h2><p>The source is the dissertation PDF <code>phd_KC_AI_dr_askar.pdf</code>. All 114 figures are presented as locally extracted original figure areas or deterministic composites of real embedded sub-images, with source and rights notices. The full PDF facsimile is linked below.</p></section></article>`, 'Contents');
}
function standardPage(section, title, body, previous) {
  const chapterId = section.match(/^Chapter\s+(\d+)/)?.[1];
  return pageShell(section, `<article class="kb-article"><p class="kb-eyebrow">${escapeHtml(section)} &middot; complete English translation</p><h1${chapterId ? ` id="chapter-${chapterId}"` : ''}>${escapeHtml(title)}</h1><div class="phd-section-body">${body}</div></article>`, previous);
}
function pageShell(section, body, previous = '') {
  const pageTitle = section === 'Home' ? 'English HTML Edition of the Dissertation' : section;
  const next = {'Home':'Contents','Contents':'Chapter 1','Chapter 1':'Chapter 2','Chapter 2':'Chapter 3','Chapter 3':'Chapter 4','Chapter 4':'Chapter 5','Chapter 5':'Chapter 6','Chapter 6':'Chapter 7','Chapter 7':'Chapter 8','Chapter 8':'Chapter 9','Chapter 9':'Chapter 10','Chapter 10':'References','References':'Appendix','Appendix':'Home'}[section];
  const localeFile = canonicalPathForSection(section);
  const nav = `<nav class="phd-locale-switch" aria-label="Language selection"><span aria-current="page">English</span><a href="../ar/${localeFile}">العربية الأصلية</a><a href="../${localeFile}">Deutsch</a></nav><nav class="kb-nav" aria-label="Page navigation"><a href="index.html">&larr; PhD Home</a><div class="kb-nav-links"><a href="contents.html">Contents</a><a href="tables.html">Tables</a><a href="figures.html">Figures</a><a href="../../../output/pdf/phd-kc-ai-askar-de.pdf">PDF</a></div></nav>`;
  const trail = `<p class="phd-breadcrumbs"><a href="index.html">PhD</a> <span aria-hidden="true">/</span> ${escapeHtml(section)}</p>`;
  const pager = `<nav class="phd-pager" aria-label="Chapter navigation">${previous ? `<a href="${hrefFor(previous)}">&larr; ${escapeHtml(previous)}</a>` : '<span></span>'}${next ? `<a href="${hrefFor(next)}">${escapeHtml(next)} &rarr;</a>` : '<span></span>'}</nav>`;
  const canonicalPath = section === 'Home' ? '' : hrefFor(section);
  return `<!doctype html><html lang="en" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${escapeHtml(pageTitle)} – English translation of the dissertation by Mohammad Askar."><meta name="robots" content="index,follow"><link rel="canonical" href="https://dr-askar.github.io/mohammad-askar-knowledge/knowledge/phd/en/${canonicalPath}"><link rel="alternate" hreflang="en" href="https://dr-askar.github.io/mohammad-askar-knowledge/knowledge/phd/en/${canonicalPath}"><link rel="alternate" hreflang="de" href="https://dr-askar.github.io/mohammad-askar-knowledge/knowledge/phd/${canonicalPath}"><link rel="alternate" hreflang="ar" href="https://dr-askar.github.io/mohammad-askar-knowledge/knowledge/phd/ar/${canonicalPath}"><title>${escapeHtml(pageTitle)} | Mohammad Askar</title><link rel="stylesheet" href="../../ophthalmology/assets/library.css"><link rel="stylesheet" href="../assets/phd.css"></head><body><div class="kb-shell">${nav}${trail}${body}${pager}<footer class="kb-footer">Non-official working translation &middot; <a href="../../../legal/impressum.html">Impressum</a> &middot; <a href="../../../legal/datenschutz.html">Datenschutz</a> &middot; <a href="../../../output/pdf/phd-kc-ai-askar-de.pdf">PDF with original facsimile</a></footer></div></body></html>`;
}
function canonicalPathForSection(section) { return section === 'Home' ? 'index.html' : hrefFor(section); }
function hrefFor(label) {
  if (label === 'Home') return 'index.html';
  if (label === 'Contents') return 'contents.html';
  if (label === 'References') return 'literature.html';
  if (label === 'Appendix') return 'appendix.html';
  if (label === 'Tables') return 'tables.html';
  if (label === 'Figures') return 'figures.html';
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
  return [...body.matchAll(/^([0-9]+)\.\s+(.*?)(?:\s+\(p\.\s*([0-9–-]+)\))?$/gmu)].map(match => ({number: Number(match[1]), caption: match[2].replace(/\s+\(p\.\s*[0-9–-]+\)$/, '').trim(), page: (match[3] || '—').replace('–', '–')}));
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
    const figure = line.match(/^\*\*Figure\s+(\d+):\*\*\s*(.*)$/i) || line.match(/^\*\*Figure\s+(\d+)\*\*:\s*(.*)$/i);
    if (figure) { const item = figureList.find(candidate => candidate.number === Number(figure[1])); if (item) out.push(figureMarkup(item)); else out.push(`<p>${inline(line)}</p>`); i++; continue; }
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
  if (/Tables|List of Tables/i.test(value)) return 'tables.html';
  if (/Figures|List of Figures/i.test(value)) return 'figures.html';
  return null;
}
function contentsItem(value) {
  const page = value.match(/\s+\(p\.\s*([0-9–-]+)\)\s*$/i);
  const label = value.replace(/\s+\(p\.\s*[0-9–-]+\)\s*$/i, '').trim();
  const section = label.match(/^(\d+(?:\.\d+)+)\b/);
  const rawHref = contentsLink(label);
  const href = section && !sourceHasSection(section[1]) ? `chapter-${renderedChapterForSection(section[1])}.html` : rawHref;
  if (!href) return '';
  return `<a href="${href}">${inline(label)}</a>${page ? ` <span class="phd-toc-page">(p. ${escapeHtml(page[1])})</span>` : ''}`;
}
function sourceHasSection(section) {
  return Object.values(sources).some(text => new RegExp(`^#{1,4}\\s+${section.replaceAll('.', '\\.')}(?:\\b|\\s)`, 'mu').test(text));
}
function renderedChapterForSection(section) {
  return /^7\.(?:1|2)(?:\.|$)/.test(section) ? '6' : section.split('.')[0];
}
function slug(value) { return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'section'; }

// verified node write
