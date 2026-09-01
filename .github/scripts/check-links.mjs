// Fails the build if any internal href/src in dist/ points at a file that was
// not emitted. Both of the breakages found during the Starlight migration were
// of exactly this shape and both built green:
//   - build.format 'preserve' emitted page.html while Starlight linked to /page/
//   - the locale-aware logo linked to /en.html, which never existed
// External links are not checked here; they go stale on someone else's schedule.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, posix, relative, dirname } from 'node:path';

const DIST = 'dist';

const walk = (dir) =>
  readdirSync(dir).flatMap((e) => {
    const p = join(dir, e);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = walk(DIST);
const emitted = new Set(files.map((f) => '/' + relative(DIST, f).split(/[\\/]/).join('/')));

let checked = 0;
const broken = [];

for (const file of files.filter((f) => f.endsWith('.html'))) {
  const page = '/' + relative(DIST, file).split(/[\\/]/).join('/');
  const html = readFileSync(file, 'utf8');
  const refs = new Set(
    [...html.matchAll(/(?:href|src)="([^"#?]+)/g)].map((m) => m[1]).filter(Boolean)
  );
  for (const ref of refs) {
    if (/^(https?:|mailto:|data:|\/\/|#)/.test(ref)) continue;
    const target = ref.startsWith('/')
      ? ref
      : posix.normalize(posix.join(posix.dirname(page), ref));
    checked++;
    if (!emitted.has(target) && !emitted.has(posix.join(target, 'index.html'))) {
      broken.push(`${page} -> ${ref}`);
    }
  }
}

console.log(`checked ${checked} internal references across ${files.length} files`);
if (broken.length) {
  for (const b of broken) console.log(`::error::broken internal link: ${b}`);
  console.log(`\n${broken.length} broken internal link(s)`);
  process.exit(1);
}
console.log('all internal links resolve');
