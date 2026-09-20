import {mkdir, readFile, readdir, writeFile} from 'node:fs/promises';
import {dirname, join, resolve} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const manifestRoot = resolve(process.env.OPHTHALMOLOGY_MANIFEST_ROOT || '/Users/test/Desktop/Notbook_ask/Ophthalmologie');
const outputPath = resolve(process.env.SOURCE_ATTRIBUTIONS_OUT || join(root, 'content/ophthalmology/source-attributions.json'));
const articles = JSON.parse(await readFile(join(root, 'content/ophthalmology/articles.json'), 'utf8')).articles;
const groups = JSON.parse(await readFile(join(root, 'content/ophthalmology/topic-groups.json'), 'utf8')).groups;
const topicLinks = JSON.parse(await readFile(join(root, 'knowledge/ophthalmology/topics/original-source-links.json'), 'utf8'));

const manifestPaths = (await walk(manifestRoot)).filter(path => path.endsWith('/Quellen/manifest.json'));
const manifestSources = [];
for (const path of manifestPaths) {
  const manifest = JSON.parse(await readFile(path, 'utf8'));
  manifestSources.push(...(manifest.sources || []));
}

const byId = new Map();
const byKey = new Map();
const byUrl = new Map();
const byTitle = new Map();
for (const source of manifestSources) {
  if (source.source_id) byId.set(source.source_id, source);
  if (source.source_key) byKey.set(source.source_key, source);
  if (source.canonical_url) byUrl.set(source.canonical_url, source);
  if (source.title) byTitle.set(source.title, source);
}

const topicReports = new Map(topicLinks.reports.map(report => [report.topicId, report]));
const fallbackSourceKeys = {
  'studienleitfaden-zur-prufungsvorbereitung-risikofaktoren-des-offenwinkelglaukoms-basierend-auf-der-s2e-leitlinie-von-dog-bva-update-2024': ['0c555421ea1c6d701c3e6f0a'],
  'briefing-dokument-neuro-ophthalmologische-anatomie-und-bildgebung-2': ['8d264a843a3ad7d539cc315b', '18431e3a8a628ce93097afcc'],
  'neuro-ophthalmic-anatomy-and-imaging-a-comprehensive-briefing': ['8d264a843a3ad7d539cc315b', '18431e3a8a628ce93097afcc'],
  'neuro-ophthalmologische-anatomie-und-bildgebung-2': ['8d264a843a3ad7d539cc315b', '18431e3a8a628ce93097afcc'],
  'neuro-ophthalmologische-anatomie-und-bildgebung-3': ['8d264a843a3ad7d539cc315b', '18431e3a8a628ce93097afcc'],
  'briefing-dokument-evaluierung-und-abklarung-von-uveitis': ['419d904559e431d02aef3eba'],
  'briefing-dokument-evaluierung-und-abklarung-von-uveitis-2': ['419d904559e431d02aef3eba'],
  'briefing-dokument-evaluierung-und-untersuchung-von-uveitis': ['419d904559e431d02aef3eba'],
  'studienfuhrer-notfalle-in-der-uveitis-eine-synthese-der-vorlesung-von-dr-hassan-al-dhibi': ['8202ac2c863184fa68d54797'],
  'leitfaden-zur-uveitis-anterior-beurteilung-management-und-nachsorge': ['286cab33fd5520bd811fc164']
};
const records = {};
for (const article of articles) {
  const sources = article.sourceKeys.map(key => byKey.get(key)).filter(Boolean);
  records[article.slug] = uniqueAttributions(sources.map(source => normalize(source, source.collected_at)));
}
for (const group of groups) {
  const report = topicReports.get(group.id);
  const linked = report?.originalSources || [];
  let sources = linked.map(source => enrich(source));
  if (sources.length === 0) sources = (report?.sourceIds || []).map(id => byId.get(id)).filter(Boolean);
  if (sources.length === 0) sources = (fallbackSourceKeys[group.id] || []).map(key => byKey.get(key)).filter(Boolean);
  records[group.id] = uniqueAttributions(sources.map(source => normalize(source, source.collected_at || topicLinks.generatedAt)));
}

const empty = Object.entries(records).filter(([, sources]) => sources.length === 0).map(([id]) => id);
if (empty.length) throw new Error('Keine Quelldaten für: ' + empty.join(', '));
if (Object.keys(records).length !== articles.length + groups.length) throw new Error('Attributionsabdeckung stimmt nicht.');

const output = {
  version: 1,
  generatedAt: new Date().toISOString(),
  source: 'Local NotebookLM source manifests and knowledge/ophthalmology/topics/original-source-links.json',
  note: 'Missing lecturer/author names or URLs are stated explicitly; they are not guessed.',
  records
};
await mkdir(dirname(outputPath), {recursive: true});
await writeFile(outputPath, JSON.stringify(output, null, 2) + '\n');
console.log('Generated structured source attribution for ' + Object.keys(records).length + ' contents from ' + manifestPaths.length + ' manifests.');

function enrich(source) {
  return byUrl.get(source.url) || byTitle.get(source.title) || source;
}

function normalize(source, collectedAt) {
  const url = validHttps(source.canonical_url) ? source.canonical_url : validHttps(source.url) ? source.url : null;
  const type = source.type || 'source';
  const attribution = {
    title: source.title || 'Unbenannte Originalquelle',
    authorOrLecturerMissingReason: 'In den vorhandenen Quelldaten nicht ausgewiesen.',
    publisherOrChannel: source.youtube_channel || publisher(url, type),
    accessedAt: dateOnly(collectedAt) || '2026-09-16',
    sourceType: type
  };
  if (url) attribution.url = url;
  else attribution.missingReason = 'Die Original-URL wurde im lokalen Quellenexport nicht erfasst.';
  return attribution;
}

function publisher(url, type) {
  if (url) {
    try {
      const host = new URL(url).hostname.replace(/^www\./u, '');
      if (host === 'youtube.com' || host === 'youtu.be') return 'YouTube';
      return host;
    } catch {}
  }
  return ({youtube: 'YouTube', video_file: 'Lokale Videodatei', audio: 'Lokale Audiodatei', file: 'Lokale Quelldatei', unknown_11: 'Lokale Quelldatei', generated_research: 'Generierter Forschungsbericht'}[type] || 'Originalquelle');
}

function uniqueAttributions(items) {
  const seen = new Set();
  return items.filter(item => {
    const key = [item.title, item.url || item.missingReason].join('\u0000');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function dateOnly(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/u.test(value) ? value.slice(0, 10) : null;
}
function validHttps(value) { return typeof value === 'string' && /^https:\/\//u.test(value); }
async function walk(dir) {
  const entries = await readdir(dir, {withFileTypes: true});
  const paths = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) paths.push(...await walk(path));
    else paths.push(path);
  }
  return paths;
}
