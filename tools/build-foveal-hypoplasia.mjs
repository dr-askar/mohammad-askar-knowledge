import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {join, resolve} from 'node:path';

const run = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const source = join(root, 'content/ophthalmology/lectures/foveal-hypoplasia');
const target = join(root, 'knowledge/ophthalmology/foveale-hypoplasie');
const config = {
  de: {file: 'index.html', title: 'Foveale Hypoplasie', back: 'Augenheilkunde-Wissen', notice: 'Redaktioneller Entwurf: medizinische Freigabe und Zuordnung zum Veröffentlichungsregister ausstehend.', legal: 'Ärztliche Fortbildung; keine individuelle medizinische Beratung.'},
  en: {file: 'en.html', title: 'Foveal hypoplasia', back: 'Ophthalmology knowledge', notice: 'Editorial draft: medical approval and inclusion in the release register pending.', legal: 'Medical education; not individual medical advice.'},
  ar: {file: 'ar.html', title: 'نقص تنسّج الحُفيرة', back: 'معرفة طب العيون', notice: 'مسودة تحريرية: المراجعة الطبية وإدراجها في سجل النشر معلّقان.', legal: 'تعليم طبي، وليس نصيحة طبية فردية.'}
};
const esc = s => String(s).replace(/[&<>"']/gu, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
await mkdir(target, {recursive: true});
for (const [lang, cfg] of Object.entries(config)) {
  const md = join(source, `${lang}.md`);
  const {stdout: body} = await run('pandoc', ['-f', 'gfm', '-t', 'html5', '--wrap=none', md], {maxBuffer: 2 * 1024 * 1024});
  const links = Object.entries(config).map(([code, item]) => `<a lang="${code}" href="./${item.file}"${lang === code ? ' aria-current="page"' : ''}>${{de:'Deutsch',en:'English',ar:'العربية'}[code]}</a>`).join(' ');
  const html = `<!doctype html><html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${esc(cfg.title)} | Mohammad Askar</title><link rel="stylesheet" href="../assets/library.css"><style>.kb-article{max-width:900px}.kb-article p,.kb-article li{line-height:1.7}.kb-article h2{margin-top:2.4rem}.kb-article table{width:100%;border-collapse:collapse;margin:1.4rem 0}.kb-article th,.kb-article td{padding:.65rem;border:1px solid #9baeb2;text-align:start;vertical-align:top}.kb-article blockquote{margin:1.3rem 0;padding:.5rem 1rem;border-inline-start:4px solid #388e89;background:rgba(80,140,140,.08)}.kb-article a{overflow-wrap:anywhere}.lang-nav{display:flex;gap:1rem;flex-wrap:wrap;margin:1rem 0 2rem}.lang-nav [aria-current]{font-weight:700;text-decoration:underline}.kb-article table{display:block;overflow-x:auto}@media(max-width:650px){.kb-article{padding-inline:1rem}}</style></head><body><div class="kb-shell"><nav class="kb-nav"><a href="../index.html">${esc(cfg.back)}</a></nav><main class="kb-article"><nav class="lang-nav" aria-label="Languages">${links}</nav><aside class="kb-warning"><strong>${esc(cfg.notice)}</strong></aside>${body}<footer class="kb-footer">${esc(cfg.legal)}</footer></main></div></body></html>\n`;
  await writeFile(join(target, cfg.file), html);
}
console.log('Built three noindex foveal-hypoplasia review pages.');
