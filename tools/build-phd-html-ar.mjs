import {mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {join, resolve} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const siteRoot = join(root, 'knowledge/phd');
const arSiteRoot = join(siteRoot, 'ar');
const originalPdf = process.env.PHD_AR_SOURCE_PDF || '/Users/test/Downloads/phd_KC_AI_dr_askar.pdf';
const execFileAsync = promisify(execFile);
const manifestPath = join(root, 'knowledge/phd/assets/manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const figureManifest = new Map(manifest.figures.map(figure => [figure.number, figure]));
const tocSource = await readFile(join(root, 'content/phd/translation-de.md'), 'utf8');

const ranges = {
  front: [1, 21], ch1: [22, 23], ch2: [24, 62], ch3: [63, 81],
  ch4: [82, 96], ch5: [97, 113], ch6: [114, 157], ch7: [158, 185],
  ch8: [186, 186], ch9: [187, 187], ch10: [188, 189], literature: [190, 194],
  appendix: [195, 196],
};
const titles = {
  front: 'المواد الأولية والفهرس', ch1: 'الفصل الأول: المقدمة', ch2: 'الفصل الثاني: القرنية المخروطية',
  ch3: 'الفصل الثالث: الذكاء الاصطناعي', ch4: 'الفصل الرابع: تطبيقات الذكاء الاصطناعي في الطب',
  ch5: 'الفصل الخامس: تصميم البحث وطرائقه', ch6: 'الفصل السادس: النتائج', ch7: 'الفصل السابع: المناقشة',
  ch8: 'الفصل الثامن: الخلاصة والاستنتاجات', ch9: 'الفصل التاسع: المقترحات والتوصيات',
  ch10: 'الفصل العاشر: كلمة ختامية', literature: 'المراجع', appendix: 'الملحق والملخص',
  tables: 'الجداول', figures: 'الأشكال',
};
const pageOrder = ['front', 'ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8', 'ch9', 'ch10', 'literature', 'appendix', 'tables', 'figures'];
const pages = {
  front: 'contents.html', ch1: 'chapter-1.html', ch2: 'chapter-2.html', ch3: 'chapter-3.html',
  ch4: 'chapter-4.html', ch5: 'chapter-5.html', ch6: 'chapter-6.html', ch7: 'chapter-7.html',
  ch8: 'chapter-8.html', ch9: 'chapter-9.html', ch10: 'chapter-10.html', literature: 'literature.html',
  appendix: 'appendix.html', tables: 'tables.html', figures: 'figures.html',
};
const tocSectionPages = extractTocSectionPages(tocSource);

await mkdir(arSiteRoot, {recursive: true});
await rm(join(arSiteRoot, 'abstract.html'), {force: true});
await rm(join(arSiteRoot, 'cover.html'), {force: true});
const tmpFull = join(root, 'tmp/arabic-full-extracted.txt');
await execFileAsync('pdftotext', ['-layout', '-enc', 'UTF-8', '-f', '1', '-l', '196', originalPdf, tmpFull]);
const extractedPages = (await readFile(tmpFull, 'utf8')).split('\f');
const arabicTocSectionTitles = extractArabicTocSectionTitles(
  Array.from({length: 6}, (_, index) => pageText(index + 6)).join('\n')
);

function cleanExtraction(text) {
  // pdftotext can emit the private-use glyph U+F0B7 for a bullet. That glyph
  // depends on the source PDF font and renders as "" in browsers. Normalize
  // it to the Unicode bullet used by the web fonts before escaping to HTML.
  return text.replace(/\r/g, '').replace(/\uF0B7/g, '•').replace(/[\u200B\u200C\u200D\u200E\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '').replace(/\u00A0/g, ' ').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
function pageText(page) { return cleanExtraction(extractedPages[page - 1] || ''); }
function rangeText([start, end]) {
  const parts = [];
  for (let page = start; page <= end; page++) {
    const text = pageText(page);
    if (text) parts.push('<!-- Original page ' + page + ' -->\n' + text);
  }
  return parts.join('\n\n');
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/gu, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
}
function slug(value) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^\u0600-\u06FF\w]+/gu, '-').replace(/^-|-$/g, '').slice(0, 80) || 'section';
}
function textToHtml(text, key) {
  const lines = text.split('\n');
  const textSectionAnchors = new Set([...text.matchAll(/-\s*[0-9]+(?:-[0-9]+)+/gu)].map(match => match[0].slice(1).replace(/\s+/gu, '').split('-').reverse().join('.')).filter(section => tocSectionPages.has(section)));
  const anchoredSections = new Set();
  const linkedContentsSections = new Set();
  let currentPage = 0;
  let skipExtractedArabicToc = false;
  const output = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index++; continue; }
    const page = line.match(/^<!-- Original page (\d+) -->$/u);
    if (page) {
      currentPage = Number(page[1]);
      if (key === 'front' && currentPage === 6) {
        skipExtractedArabicToc = true;
        output.push('<span id="page-6" class="phd-page-marker" data-page="6" title="الصفحة الأصلية 6">الصفحة 6</span>' + cleanArabicContentsNavigation());
        index++;
        continue;
      }
      if (skipExtractedArabicToc && currentPage >= 12) skipExtractedArabicToc = false;
      if (skipExtractedArabicToc) { index++; continue; }
      const fallbackAnchors = [...tocSectionPages.entries()].filter(([, sectionPage]) => sectionPage === currentPage).filter(([section]) => !textSectionAnchors.has(section) || section === '3.1' || section === '3.4').map(([section]) => '<span id="section-' + section.replaceAll('.', '-') + '"></span>').join('');
      output.push('<span id="page-' + page[1] + '" class="phd-page-marker" data-page="' + page[1] + '" title="الصفحة الأصلية ' + page[1] + '">الصفحة ' + page[1] + '</span>' + fallbackAnchors);
      index++;
      continue;
    }
    if (skipExtractedArabicToc) { index++; continue; }
    const figureMatch = line.match(/^(?:شكل|الشكل)\s*([0-9]{1,3})(.*)$/u);
    if (figureMatch && figureManifest.has(Number(figureMatch[1]))) {
      const figure = figureManifest.get(Number(figureMatch[1]));
      output.push(figureMarkup(figure));
      index++;
      continue;
    }
    // The Arabic PDF extraction reverses section number components in the
    // visible text (for example "-1-2" represents section 2.1 and
    // "-1-1-2" represents section 2.1.1). Turn those real text lines into
    // the visible anchor targets used by the contents navigation instead of
    // leaving the links attached only to page markers.
    const section = arabicSectionFromLine(line);
    if (section) {
      if (tocSectionPages.has(section) && currentPage >= tocSectionPages.get(section)) {
        const anchor = anchoredSections.has(section) ? '' : ' id="section-' + section.replaceAll('.', '-') + '"';
        output.push('<h2' + anchor + '>' + escapeHtml(line) + '</h2>');
        anchoredSections.add(section);
        index++;
        continue;
      }
    }
    if (/^\s{0,3}(?:الفصل|الباب|المبحث|المطلب|النتائج|المناقشة|المراجع|الملخص|المقدمة)\b/u.test(line) && line.length < 180) {
      output.push('<h2 id="' + slug(line) + '">' + escapeHtml(line) + '</h2>');
      index++;
      continue;
    }
    const paragraph = [line];
    index++;
    while (index < lines.length && lines[index].trim() && !/^<!-- Original page /u.test(lines[index])) {
      paragraph.push(lines[index].trim());
      index++;
    }
    let paragraphHtml = escapeHtml(paragraph.join(' '));
    paragraphHtml = decorateArabicSectionAnchors(paragraphHtml, anchoredSections, currentPage);
    if (key === 'front') paragraphHtml = decorateArabicContentsLinks(paragraphHtml, currentPage, linkedContentsSections);
    output.push('<p>' + paragraphHtml + '</p>');
  }
  return output.join('\n');
}

function decorateArabicSectionAnchors(html, seen, currentPage) {
  return html.replace(/-\s*[0-9]+(?:-[0-9]+)+/gu, token => {
    const section = token.slice(1).replace(/\s+/gu, '').split('-').reverse().join('.');
    if (!tocSectionPages.has(section) || currentPage < tocSectionPages.get(section) || seen.has(section)) return token;
    seen.add(section);
    return '<span id="section-' + section.replaceAll('.', '-') + '"></span>' + token;
  });
}

function decorateArabicContentsLinks(html, currentPage, linkedContentsSections) {
  // Pages 6–11 are the extracted Arabic table of contents. Keep its original
  // wording and page numbers, but make each visible section number clickable
  // so the original contents itself is the navigation.
  if (currentPage < 6 || currentPage > 11) return html;
  return html.replace(/(?:-|–)\s*[0-9]+(?:-[0-9]+)+/gu, token => {
    const section = token.replace(/^(?:-|–)\s*/u, '').split('-').reverse().join('.');
    if (!tocSectionPages.has(section) || linkedContentsSections.has(section)) return token;
    linkedContentsSections.add(section);
    const chapter = section.split('.')[0];
    return '<a href="chapter-' + chapter + '.html#section-' + section.replaceAll('.', '-') + '">' + token + '</a>';
  });
}

function cleanArabicContentsNavigation() {
  const sectionsByChapter = new Map();
  for (const [section, page] of tocSectionPages) {
    const chapter = section.split('.')[0];
    if (!sectionsByChapter.has(chapter)) sectionsByChapter.set(chapter, []);
    sectionsByChapter.get(chapter).push({section, page});
  }
  const chapterEntries = Object.entries(titles).filter(([key]) => /^ch\d+$/.test(key));
  const items = chapterEntries.map(([key, title]) => {
    const chapter = key.match(/\d+/)[0];
    const sections = (sectionsByChapter.get(chapter) || []).map(item => {
      const label = arabicTocSectionTitles.get(item.section) || 'القسم ' + item.section;
      return '<li><a href="chapter-' + chapter + '.html#section-' + item.section.replaceAll('.', '-') + '">' + escapeHtml(item.section + ' ' + label) + '</a><span class="phd-toc-page">(الصفحة ' + item.page + ')</span></li>';
    }).join('');
    return '<li class="phd-toc-chapter"><a href="chapter-' + chapter + '.html#chapter-' + chapter + '">' + escapeHtml(title) + '</a>' + (sections ? '<ul>' + sections + '</ul>' : '') + '</li>';
  }).join('');
  return '<nav class="phd-toc phd-toc-clean" aria-label="فهرس المحتويات"><h2>فهرس المحتويات</h2><p class="phd-toc-subtitle">Table of Contents</p><ul>' + items + '</ul></nav>';
}

function arabicSectionFromLine(line) {
  const match = line.match(/(?:^|\s)-([0-9]+(?:-[0-9]+)+)/u);
  if (!match) return null;
  const section = match[1].split('-').reverse().join('.');
  return section;
}
function localeSwitch(key) {
  const german = key === 'index' ? '../index.html' : '../' + pages[key];
  const english = key === 'index' ? '../en/index.html' : '../en/' + pages[key];
  return '<nav class="phd-locale-switch" aria-label="اختيار اللغة"><span aria-current="page">العربية الأصلية</span><a href="' + german + '">Deutsch</a><a href="' + english + '">English</a></nav>';
}
function shell(key, title, body, previous, next) {
  const range = ranges[key];
  const prev = previous ? '<a href="' + pages[previous] + '">→ ' + escapeHtml(titles[previous]) + '</a>' : '<span></span>';
  const nextLink = next ? '<a href="' + pages[next] + '">' + escapeHtml(titles[next]) + ' ←</a>' : '<span></span>';
  const arPath = key === 'index' ? '' : pages[key];
  const dePath = key === 'index' ? '' : pages[key];
  const rangeNote = range ? '<p class="phd-range">النص المستخرج من الصفحات الأصلية ' + range[0] + '–' + range[1] + '. لم تُترجم الفقرات أو تُعدّل دلالتها.</p>' : '';
  const legalLinks = '<a href="../../../legal/impressum.html">Impressum</a> · <a href="../../../legal/datenschutz.html">Datenschutz</a>';
  return '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="' + escapeHtml(title) + ' – النص العربي الأصلي لأطروحة محمد عسكر."><meta name="robots" content="index,follow"><link rel="canonical" href="https://dr-askar.github.io/mohammad-askar-knowledge/knowledge/phd/ar/' + arPath + '"><link rel="alternate" hreflang="ar" href="https://dr-askar.github.io/mohammad-askar-knowledge/knowledge/phd/ar/' + arPath + '"><link rel="alternate" hreflang="de" href="https://dr-askar.github.io/mohammad-askar-knowledge/knowledge/phd/' + dePath + '"><link rel="alternate" hreflang="en" href="https://dr-askar.github.io/mohammad-askar-knowledge/knowledge/phd/en/' + dePath + '"><title>' + escapeHtml(title) + ' | محمد عسكر</title><link rel="stylesheet" href="../../ophthalmology/assets/library.css"><link rel="stylesheet" href="../assets/phd-ar.css"></head><body><div class="kb-shell">' + localeSwitch(key) + '<nav class="kb-nav" aria-label="تنقل الأطروحة"><a href="index.html">← صفحة البداية</a><div class="kb-nav-links"><a href="contents.html">الفهرس</a><a href="tables.html">الجداول</a><a href="figures.html">الأشكال</a><a href="../../../output/pdf/phd-kc-ai-askar-de.pdf">PDF</a></div></nav><p class="phd-breadcrumbs"><a href="index.html">الأطروحة</a> <span aria-hidden="true">/</span> ' + escapeHtml(title) + '</p>' + body + rangeNote + '<nav class="phd-pager" aria-label="تنقل الفصول">' + prev + nextLink + '</nav><footer class="kb-footer">الأطروحة العربية الأصلية · ' + legalLinks + ' · <a href="../../../output/pdf/phd-kc-ai-askar-de.pdf">PDF مع الفاكسيميلي</a></footer></div></body></html>';
}
function article(key, title, text) {
  const rendered = textToHtml(text, key);
  const expected = manifest.figures.filter(figure => figure.chapter >= chapterNumberForKey(key) && figure.chapter <= chapterNumberForKey(key));
  const missing = expected.filter(figure => !rendered.includes(`id="الشكل-${figure.number}"`));
  const note = missing.length ? '<section class="phd-figure-references"><h2>أشكال موثقة في قائمة الأشكال</h2><p>لم يظهر موضع تسمية هذه الأشكال بوضوح في استخراج PDF؛ تُعرض هنا كأصول أشكال مستخرجة من PDF الأصلي مع الحفاظ على رقم الصفحة.</p>' + missing.map(figure => figureMarkup(figure)).join('') + '</section>' : '';
  const chapterId = key.match(/^ch(\d+)$/)?.[1];
  return '<article class="kb-article"><p class="kb-eyebrow">النص العربي الأصلي · الصفحات ' + ranges[key][0] + '–' + ranges[key][1] + '</p><h1' + (chapterId ? ' id="chapter-' + chapterId + '"' : '') + '>' + escapeHtml(title) + '</h1><div class="phd-section-body">' + rendered + note + '</div></article>';
}

function extractTocSectionPages(text) {
  const body = chunk(text, '## Vollständiges Inhaltsverzeichnis', '## Arabische Zusammenfassung');
  const sections = new Map();
  for (const line of body.split(/\r?\n/)) {
    const match = line.match(/(?:^|[-*]\s+)(\d+(?:\.\d+)+)\s+.*?\(S\.\s*([0-9–-]+)/);
    if (match) sections.set(match[1], Number(match[2].match(/\d+/)?.[0]));
  }
  return sections;
}

function extractArabicTocSectionTitles(text) {
  const titles = new Map();
  const matches = [...text.matchAll(/(?:-|–)\s*[0-9]+(?:-[0-9]+)+/gu)];
  for (let index = 0; index < matches.length; index++) {
    const token = matches[index][0];
    const section = token.replace(/^(?:-|–)\s*/u, '').split('-').reverse().join('.');
    if (!tocSectionPages.has(section)) continue;
    const start = matches[index].index + token.length;
    const end = matches[index + 1]?.index ?? text.length;
    const raw = text.slice(start, end)
      .replace(/\s+/gu, ' ')
      .replace(/\.{3,}/gu, ' ')
      // The PDF TOC repeats page numbers and English titles after the Arabic title.
      .split(/\d{1,3}/u)[0]
      .split(/[A-Za-z]/u)[0]
      .replace(/^[:؛,.\s]+/u, '')
      .replace(/[:؛,.\s]+$/u, '')
      .replace(/\s+[\u0621-\u064A]\s*$/u, '')
      .trim();
    const label = raw.slice(0, 180).trim();
    if (label && !titles.has(section)) titles.set(section, label);
  }
  return titles;
}

function chunk(text, start, end) {
  const at = text.indexOf(start);
  if (at < 0) return '';
  const tail = text.slice(at);
  const stop = end ? tail.indexOf(end) : -1;
  return stop < 0 ? tail : tail.slice(0, stop);
}

function chapterNumberForKey(key) {
  return Number(key.match(/\d+/)?.[0] || (key === 'front' ? 0 : 0));
}
function home() {
  return '<header class="kb-hero"><p class="kb-eyebrow">PhD · القرنية والذكاء الاصطناعي</p><h1>النسخة العربية الأصلية للأطروحة</h1><p>عرض HTML كامل وقابل للبحث للنص العربي المضمّن في أطروحة <strong>محمد عسكر</strong> حول رؤية الحاسب والتعلم العميق للتمييز بين القرنيات الطبيعية والمخروطية والمشتبه بها.</p><div class="kb-warning"><strong>تنبيه:</strong> هذا نص الأطروحة الأصلي المستخرج آلياً من PDF، وليس ترجمة أو نصيحة طبية فردية.</div></header><article class="kb-article"><div class="kb-meta"><span class="kb-badge">العربية</span><span class="kb-badge">النص الأصلي</span><span class="kb-badge">196 صفحة</span><span class="kb-badge">58 جدولاً · 114 شكلاً</span></div><section class="phd-jump-grid"><a href="contents.html">فتح الفهرس</a><a href="chapter-1.html">بدء الفصل الأول</a><a href="tables.html">عرض الجداول المشتركة</a><a href="figures.html">عرض الأشكال المشتركة</a><a href="../../../output/pdf/phd-kc-ai-askar-de.pdf">فتح PDF</a></section><section><h2>تغطية النص</h2><p>تغطي هذه النسخة الصفحات 1–196 مع علامات مصدر داخلية لكل صفحة، وفق حدود الفصول المثبتة في فهرس المحتويات. تشمل الصفحة 189 ضمن الفصل العاشر لضمان عدم فقدان أي نص مستخرج.</p></section><section class="phd-sources"><h2>المصدر والخصوصية</h2><p>المصدر المحلي هو ملف PDF الأصلي؛ لا يُكشف مساره المحلي في الموقع. الأصول المشتركة للجداول والأشكال يعاد استخدامها من النسخة الألمانية، ولا تُنسخ ملفات الصور الكبيرة إلى مجلد العربية.</p></section></article>';
}
function tablesPage() {
  return '<article class="kb-article"><p class="kb-eyebrow">الجداول · مورد مشترك مع النسخة الألمانية</p><h1>الجداول المشتركة (58 جدولاً)</h1><p>هذا مورد مشترك بين الإصدارين العربي والألماني. تُعرض الجداول مع بيانات المصدر والأصول المحلية في النسخة الألمانية.</p><p class="phd-jump-grid"><a href="../tables.html">فتح صفحة الجداول الكاملة (الألمانية)</a></p></article>';
}
function figuresPage() {
  return '<article class="kb-article"><p class="kb-eyebrow">الأشكال · النسخة العربية</p><h1>الأشكال الأصلية المستخرجة (114 شكلاً)</h1><p>تُعرض جميع الأشكال كمساحات أشكال مستخرجة محلياً من ملف PDF الأصلي، أو كمركبات حتمية من صور فرعية أصلية عند الحاجة، مع رقم الصفحة والمصدر.</p><div class="phd-figure-grid">' + manifest.figures.map(figure => figureMarkup(figure)).join('') + '</div></article>';
}

function figureMarkup(figure) {
  const asset = '../' + figure.asset;
  const caption = figure.captionAr || `الشكل ${figure.number}`;
  const alt = `الشكل المستخرج ${figure.number}: ${caption}`;
  return `<figure class="phd-figure phd-original-figure" id="الشكل-${figure.number}"><a class="phd-figure-zoom" href="${asset}"><img loading="lazy" decoding="async" src="${asset}" alt="${escapeHtml(alt)}" width="900" height="1200"></a><figcaption><strong>الشكل ${figure.number}.</strong> ${escapeHtml(caption)} <span class="phd-source">المصدر: الأطروحة الأصلية، الصفحة ${escapeHtml(figure.page)}. مساحة الشكل مستخرجة محلياً من PDF الأصلي.</span></figcaption></figure>`;
}

const content = {front: article('front', titles.front, rangeText(ranges.front))};
for (const key of pageOrder.filter(key => !['front', 'tables', 'figures'].includes(key))) {
  content[key] = article(key, titles[key], rangeText(ranges[key]));
}
content.tables = tablesPage();
content.figures = figuresPage();

await writeFile(join(arSiteRoot, 'index.html'), shell('index', 'النسخة العربية الأصلية للأطروحة', home(), null, 'front'), 'utf8');
for (let index = 0; index < pageOrder.length; index++) {
  const key = pageOrder[index];
  await writeFile(join(arSiteRoot, pages[key]), shell(key, titles[key], content[key], pageOrder[index - 1], pageOrder[index + 1]), 'utf8');
}
console.log('Built Arabic PhD HTML: ' + (pageOrder.length + 1) + ' pages, source pages 1–196');
