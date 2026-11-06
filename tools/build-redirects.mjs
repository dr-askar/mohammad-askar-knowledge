import {execFileSync} from 'node:child_process';
import {mkdirSync,existsSync,writeFileSync} from 'node:fs';
import {dirname,resolve,relative,isAbsolute} from 'node:path';
import {fileURLToPath} from 'node:url';

export const CURRENT='https://mohammad-askar-astro.pages.dev';
export const LEGACY_PREFIX='/mohammad-askar-knowledge';

// Fixed destination origin; preserve topic, language, query and fragment.
export function currentUrl(input){
 const old=new URL(input);
 if(old.origin!=='https://dr-askar.github.io')throw Error('Unexpected legacy origin');
 let path=old.pathname.replace(/^\/mohammad-askar-knowledge(?=\/|$)/,'')||'/';
 if(path==='/ophthalmology'||path.startsWith('/ophthalmology/'))path='/knowledge'+path;
 if(path==='/404.html'||path==='/docs'||path.startsWith('/docs/'))path='/';
 path=path.replace(/\/index\.html$/,'/');
 const target=new URL('https://mohammad-askar-astro.pages.dev'+path);
 target.search=old.search;target.hash=old.hash;
 return target.href;
}
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function redirectHtml(path){
 if(path.startsWith('/')||path.includes('\\')||path.split('/').some(p=>p==='.'||p==='..'))throw Error('Unsafe source path');
 const encoded=path.split('/').map(encodeURIComponent).join('/');
 const fallback=currentUrl('https://dr-askar.github.io'+LEGACY_PREFIX+'/'+encoded);
 const script='('+currentUrl.toString()+')(location.href)';
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Mohammad Askar — current website</title><link rel="canonical" href="'+escape(fallback)+'"><script>location.replace('+script+');</script><meta http-equiv="refresh" content="0;url='+escape(fallback)+'"></head><body><main><p>Current website · Aktuelle Website · الموقع الحالي</p><p><a href="'+escape(fallback)+'">Continue · Weiter · متابعة</a></p></main></body></html>\n';
}
export function build(output){
 const root=fileURLToPath(new URL('../',import.meta.url));
 const out=resolve(output);
 const subpath=relative(root,out);
 if(!subpath||subpath.startsWith('..')||isAbsolute(subpath))throw Error('Output must be a dedicated directory inside this checkout');
 if(existsSync(out))throw Error('Output directory already exists; use a fresh directory');
 const paths=execFileSync('git',['ls-files','-z'],{cwd:root,encoding:'utf8'}).split('\0').filter(p=>p.endsWith('.html')&&!p.startsWith('docs/'));
 paths.push('404.html','ophthalmology/index.html');
 const unique=[...new Set(paths)];
 mkdirSync(out,{recursive:true});
 for(const path of unique){
  const target=resolve(out,path);
  if(!relative(out,target)||relative(out,target).startsWith('..'))throw Error('Unsafe output path');
  mkdirSync(dirname(target),{recursive:true});writeFileSync(target,redirectHtml(path));
 }
 writeFileSync(resolve(out,'.nojekyll'),'');
 writeFileSync(resolve(out,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+CURRENT+'/sitemap.xml\n');
 console.log(JSON.stringify({redirect_pages:unique.length,output:out,artifact:'redirects-only'}));
 return unique;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))build(process.argv[2]||'_redirect_site');
