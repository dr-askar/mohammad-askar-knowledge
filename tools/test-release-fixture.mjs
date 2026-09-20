import {cp, mkdtemp, readFile, rm, writeFile} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {join, resolve} from 'node:path';

const run = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const temp = await mkdtemp('/tmp/knowledge-release-fixture-');
try {
  const register = JSON.parse(await readFile(join(root, 'content/ophthalmology/release-register.json'), 'utf8'));
  const articles = JSON.parse(await readFile(join(root, 'content/ophthalmology/articles.json'), 'utf8')).articles;
  const groups = JSON.parse(await readFile(join(root, 'content/ophthalmology/topic-groups.json'), 'utf8')).groups;
  const source = {
    title: 'Synthetic lecture source',
    authorOrLecturer: 'Synthetic Lecturer',
    publisherOrChannel: 'Synthetic Publisher',
    url: 'https://example.org/synthetic-source',
    accessedAt: '2026-09-16'
  };
  const approved = {};
  register.defaults.publishStatus = 'unpublished';
  register.defaults.publishedAt = null;
  for (const item of [articles[0], groups[0]]) approved[item.slug || item.id] = {
    rightsBasis: 'independent-rewrite',
    rightsStatus: 'verified',
    rightsHolders: ['Synthetic Rights Holder'],
    sourceAttribution: [source],
    independentRewriteReviewRef: 'fixture/rewrite-review-001',
    rightsVerifiedBy: 'Fixture Rights Reviewer',
    rightsVerifiedAt: '2026-09-16',
    medicalStatus: 'approved',
    medicalReviewer: 'Fixture Medical Reviewer',
    medicalReviewedAt: '2026-09-16',
    publishStatus: 'approved',
    publishedAt: '2026-09-16'
  };
  register.overrides = approved;
  const legalDir = join(temp, 'legal');
  await cp(join(root, 'legal'), legalDir, {recursive: true});
  for (const file of ['impressum.html', 'datenschutz.html']) {
    const path = join(legalDir, file);
    const html = await readFile(path, 'utf8');
    await writeFile(path, html.replace(/<!-- RELEASE_PLACEHOLDER:[\s\S]*?-->/gu, '').replace(/NICHT VERÖFFENTLICHEN[^<]*/gu, 'Verified public details.').replace(/\[[^\]]*\]/gu, 'Verified public details'));
  }
  const registerPath = join(temp, 'release-register.json');
  await writeFile(registerPath, JSON.stringify(register, null, 2));
  const env = {...process.env, RELEASE_REGISTER: registerPath, RELEASE_LEGAL_DIR: temp, RELEASE_OUT_DIR: join(temp, '_site')};
  await run(process.execPath, [join(root, 'tools/build-release.mjs'), '--publish'], {cwd: root, env});
  await run(process.execPath, [join(root, 'tools/validate-release.mjs')], {cwd: root, env});
  const index = await readFile(join(temp, '_site/knowledge/ophthalmology/index.html'), 'utf8');
  if ((index.match(/class="kb-card"/gu) || []).length !== 2 || !index.includes('kb-search') || !index.includes('kb-filters')) throw new Error('Synthetic index does not contain exactly two searchable approved cards.');
  for (const id of Object.keys(approved)) {
    const dir = id === articles[0].slug ? 'knowledge/ophthalmology/' + id : 'knowledge/ophthalmology/topics/' + id;
    const html = await readFile(join(temp, '_site', dir, 'index.html'), 'utf8');
    for (const marker of ['Redaktioneller Entwurf', 'Lokaler Studio-Entwurf', 'noch nicht medizinisch freigegeben', 'medizinische Prüfung ausstehend', 'Lernentwurf', 'darf nicht veröffentlicht werden']) if (html.includes(marker)) throw new Error('Synthetic output retained marker: ' + marker);
  }
  console.log('Synthetic release gate passed: 1 article + 1 topic, metadata, filters, links and marker removal verified.');
} finally {
  await rm(temp, {recursive: true, force: true});
}
