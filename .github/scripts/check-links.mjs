// Fails the build if any internal href/src in dist/ points at a file that was
// not emitted — or, since 2026-09-04, at an anchor the target page does not have.
// Both of the breakages found during the Starlight migration were of the first
// shape and both built green:
//   - build.format 'preserve' emitted page.html while Starlight linked to /page/
//   - the locale-aware logo linked to /en.html, which never existed
// The anchor check was added when the template pages were split three ways and
// eleven cross-links moved to new pages: a wrong fragment renders a page that
// opens at the top, which no build and no reader reports.
// External links are not checked here; they go stale on someone else's schedule.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, posix, relative } from 'node:path';

const DIST = 'dist';

const walk = (dir) =>
  readdirSync(dir).flatMap((e) => {
    const p = join(dir, e);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = walk(DIST);
const emitted = new Set(files.map((f) => '/' + relative(DIST, f).split(/[\\/]/).join('/')));

// Lazily collected id="…" / name="…" sets per emitted HTML file.
const idCache = new Map();
const idsOf = (target) => {
  if (!idCache.has(target)) {
    const file = join(DIST, target);
    const html = readFileSync(file, 'utf8');
    idCache.set(target, new Set([...html.matchAll(/\s(?:id|name)="([^"]+)"/g)].map((m) => m[1])));
  }
  return idCache.get(target);
};

let checked = 0;
let anchorsChecked = 0;
const broken = [];
const badAnchors = [];

for (const file of files.filter((f) => f.endsWith('.html'))) {
  const page = '/' + relative(DIST, file).split(/[\\/]/).join('/');
  const html = readFileSync(file, 'utf8');
  const refs = new Set([...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]).filter(Boolean));
  for (const raw of refs) {
    if (/^(https?:|mailto:|data:|\/\/)/.test(raw)) continue;
    const [pathAndQuery, hash] = raw.split('#');
    const path = pathAndQuery.split('?')[0];
    let target = page;
    if (path) {
      target = path.startsWith('/') ? path : posix.normalize(posix.join(posix.dirname(page), path));
      checked++;
      if (!emitted.has(target)) {
        if (emitted.has(posix.join(target, 'index.html'))) target = posix.join(target, 'index.html');
        else {
          broken.push(`${page} -> ${raw}`);
          continue;
        }
      }
    }
    if (hash !== undefined && hash !== '' && target.endsWith('.html')) {
      anchorsChecked++;
      const id = decodeURIComponent(hash);
      if (!idsOf(target).has(id)) badAnchors.push(`${page} -> ${raw} (no id="${id}" on ${target})`);
    }
  }
}

console.log(`checked ${checked} internal references and ${anchorsChecked} anchors across ${files.length} files`);
if (broken.length || badAnchors.length) {
  for (const b of broken) console.log(`::error::broken internal link: ${b}`);
  for (const a of badAnchors) console.log(`::error::broken anchor: ${a}`);
  console.log(`\n${broken.length} broken internal link(s), ${badAnchors.length} broken anchor(s)`);
  process.exit(1);
}
console.log('all internal links and anchors resolve');
