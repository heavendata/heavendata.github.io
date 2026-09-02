// Structural assertions about the built site, run by CI *and* locally via
// `pnpm verify`. Keeping one implementation is the point: this file exists
// because the checks used to live inline in deploy.yml, where nobody could run
// them before pushing — and a restructure duly broke one and failed the build
// after the fact.
//
// These are cheap guards against silent, total breakage. Per-link correctness is
// check-links.mjs's job, not this one's.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const errors = [];
const fail = (m) => errors.push(m);

const walk = (dir) =>
  readdirSync(dir).flatMap((e) => {
    const p = join(dir, e);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

// --- the build produced a site at all ---------------------------------------
const pages = walk(DIST).filter((f) => f.endsWith('.html'));
console.log(`built ${pages.length} HTML pages`);
// Floor, not a target. 56 at the 2026-09-02 restructure (35 pages + 21
// redirects); this only has to catch "the build silently emitted almost
// nothing", so leave generous headroom and raise it when it starts to bite.
if (pages.length < 50) fail(`expected at least 50 pages, got ${pages.length}`);

// --- the things whose absence breaks the whole site -------------------------
for (const [path, why] of [
  ['pagefind/pagefind-entry.json', 'search index missing'],
  ['CNAME', 'CNAME missing — the custom domain would drop'],
  ['sitemap-index.xml', 'sitemap missing'],
]) {
  if (!existsSync(join(DIST, path))) fail(why);
}

// --- the URL scheme -----------------------------------------------------------
// Starlight builds its own hrefs and can emit a scheme that disagrees with
// build.format — the migration shipped exactly that bug on a green build. So
// assert a real sidebar link is an explicit .html URL.
const navProbe = join(DIST, 'en/concepts/product-types.html');
if (!existsSync(navProbe)) {
  fail(`nav probe page missing: ${relative(DIST, navProbe)} — update this check if the page moved`);
} else if (!readFileSync(navProbe, 'utf8').includes('href="/en/concepts/attributes.html"')) {
  fail('sidebar/nav links missing or not in the .html URL format');
}

// --- redirects the product itself depends on ----------------------------------
// These three are linked from inside the app. They are permanent: an app build
// already loaded in someone's browser keeps requesting the old path long after
// the app's own links are updated. See pim-docs → content-structure.md (D-A).
for (const [from, to] of [
  ['en/distribution/templates.html', '/en/channels/templates.html'], // channel template editor
  ['en/administration/overview.html', null],                          // admin dashboard (not moved)
  ['index.html', null],                                               // help centre + user dropdown
]) {
  const f = join(DIST, from);
  if (!existsSync(f)) {
    fail(`product deep-link target missing: /${from}`);
    continue;
  }
  if (to && !readFileSync(f, 'utf8').includes(to)) {
    fail(`/${from} no longer redirects to ${to}`);
  }
}

if (errors.length) {
  for (const e of errors) console.error(`::error::${e}`);
  console.error(`\n${errors.length} smoke check(s) failed`);
  process.exit(1);
}
console.log('smoke checks passed');
