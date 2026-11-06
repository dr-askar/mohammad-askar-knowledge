import assert from 'node:assert/strict';
import {currentUrl,redirectHtml,build,CURRENT} from './build-redirects.mjs';
const old='https://dr-askar.github.io/mohammad-askar-knowledge';
for(const [source,destination] of [
 ['/', '/'],
 ['/index.html','/'],
 ['/knowledge/ophthalmology/','/knowledge/ophthalmology/'],
 ['/ophthalmology/','/knowledge/ophthalmology/'],
 ['/ophthalmology/glaukom-kind/ar/index.html?view=lecture#sources','/knowledge/ophthalmology/glaukom-kind/ar/?view=lecture#sources'],
 ['/knowledge/ophthalmology/glaukom-kind/en/#chapter-2','/knowledge/ophthalmology/glaukom-kind/en/#chapter-2'],
 ['/docs/private-review.html','/'],
 ['/docs','/']
])assert.equal(currentUrl(old+source),CURRENT+destination);
for(const path of ['//example.org/','/%2F%2Fexample.org/','/ophthalmology//example.org/'])assert.equal(new URL(currentUrl(old+path)).origin,CURRENT);
assert.throws(()=>currentUrl('https://example.org/mohammad-askar-knowledge/'),/origin/);
assert.throws(()=>redirectHtml('../private.html'),/Unsafe/);
assert.ok(redirectHtml('knowledge/a?b#c.html').includes('/knowledge/a%3Fb%23c.html'));
assert.throws(()=>build(new URL('../',import.meta.url).pathname),/dedicated directory/);
assert.throws(()=>build(new URL('../../mohammad-askar-legacy-redirect-sibling',import.meta.url).pathname),/dedicated directory/);
const html=redirectHtml('knowledge/ophthalmology/index.html');
assert.ok(html.includes('http-equiv="refresh"'));
assert.ok(html.includes('location.replace('));
assert.ok(html.includes('rel="canonical" href="'+CURRENT+'/knowledge/ophthalmology/"'));
assert.ok(!html.includes('github.com/'));
console.log('PASS: routes, aliases, language/query/fragment, fixed origin, no-JS fallback');
