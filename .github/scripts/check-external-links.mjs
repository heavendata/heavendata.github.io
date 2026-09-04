// Fetches every external link in dist/ and reports the ones that are gone.
//
// WHY THIS IS SEPARATE FROM check-links.mjs
// check-links.mjs deliberately skips external links, because they break on
// someone else's schedule and a third-party outage must never block our deploy.
// That reasoning is right for the DEPLOY path and wrong for the AUTHORING path:
// it let nine hand-written URLs that had never existed ship to a branch.
//
// So this runs in two places, neither of them the deploy:
//   * `pnpm verify:external` — before pushing a batch of pages. Catches invented
//     URLs, which is the failure this was written for.
//   * a scheduled workflow — catches rot in links that were correct when written.
//
// Anything an LLM can get wrong by writing a plausible-looking URL, a script can
// settle by asking the server. Do not delegate this to a reviewer.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const OWN_HOST = 'docs.heavendata.com';
const ALLOW_FILE = '.github/external-links-allow.txt';
// Starlight's "Edit page" link, one per page, all pointing at github.com. Generated
// chrome, not something a writer typed — and 60 of them in parallel is what makes
// github.com answer 429. Excluded for the same reason as <link rel="canonical">.
const EDIT_LINK_PREFIX = 'https://github.com/heavendata/heavendata.github.io/edit/';
const CONCURRENCY = 8;
const TIMEOUT_MS = 20000;

// Hosts that answer automated requests with 403/429 whatever the URL. One host
// per line, '#' for comments.
const allow = existsSync(ALLOW_FILE)
  ? new Set(
      readFileSync(ALLOW_FILE, 'utf8')
        .split('\n')
        .map((l) => l.replace(/#.*/, '').trim())
        .filter(Boolean)
    )
  : new Set();

const walk = (dir) =>
  readdirSync(dir).flatMap((e) => {
    const p = join(dir, e);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const pages = walk(DIST).filter((f) => f.endsWith('.html'));

// --- collect every EDITORIAL external reference -------------------------------
// Only <a href> and <img src>, and only after <body>.
//
// The first version scanned every href/src and reported 40 "problems" on its
// first run — all of them Starlight's own <link rel="canonical"> tags, which are
// absolute by design and must stay that way. A check that cries wolf forty times
// is a check nobody runs twice, so the scope is deliberately narrow: links a
// person typed into a page.
const uses = new Map(); // url -> Set(page)
const selfAbsolute = new Map(); // url -> Set(page)

for (const file of pages) {
  const page = '/' + relative(DIST, file).split(/[\\/]/).join('/');
  const html = readFileSync(file, 'utf8');
  const bodyStart = html.search(/<body[\s>]/i);
  const body = bodyStart === -1 ? html : html.slice(bodyStart);
  const editorial = [
    ...body.matchAll(/<a\s[^>]*?href="(https?:\/\/[^"]+)"/gi),
    ...body.matchAll(/<img\s[^>]*?src="(https?:\/\/[^"]+)"/gi),
  ];
  for (const m of editorial) {
    const url = m[1].replace(/&amp;/g, '&');
    if (url.startsWith(EDIT_LINK_PREFIX)) continue;
    const bucket = url.includes(OWN_HOST) ? selfAbsolute : uses;
    if (!bucket.has(url)) bucket.set(url, new Set());
    bucket.get(url).add(page);
  }
}

// --- check one url ------------------------------------------------------------
async function check(url) {
  const { hostname, hash } = new URL(url);
  if (allow.has(hostname)) return { state: 'skipped', note: 'host allowlisted' };

  const fetchWith = (method) =>
    fetch(url, {
      method,
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'user-agent': 'heavendata-docs-link-check' },
    });

  let res;
  try {
    res = await fetchWith('HEAD');
    // plenty of servers refuse HEAD but serve GET fine
    if (res.status === 405 || res.status === 501 || res.status === 403) res = await fetchWith('GET');
    // 429 here is us, not them: several links share a host and we ask in parallel.
    // One backoff turns a permanent warning into a clean result, which matters more
    // than the second it costs — a report with standing noise in it stops being read.
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 3000));
      res = await fetchWith('GET');
    }
  } catch (e) {
    return { state: 'unreachable', note: e.name === 'TimeoutError' ? 'timed out' : e.message };
  }

  if (res.status === 403 || res.status === 429)
    return { state: 'blocked', note: `HTTP ${res.status} — likely bot protection, not a dead link` };
  if (res.status >= 500) return { state: 'server-error', note: `HTTP ${res.status}` };
  if (!res.ok) return { state: 'broken', note: `HTTP ${res.status}` };

  // The page exists. If the link points at a fragment, see whether it is there.
  // A warning, never an error: plenty of sites build anchors in JS, and a false
  // failure here would train people to ignore the whole check.
  if (hash && hash.length > 1) {
    try {
      const body = await (await fetchWith('GET')).text();
      const id = decodeURIComponent(hash.slice(1));
      const esc = id.replace(/["\\]/g, '\\$&');
      const present =
        body.includes(`id="${esc}"`) ||
        body.includes(`name="${esc}"`) ||
        body.includes(`id='${esc}'`);
      if (!present) return { state: 'missing-anchor', note: `page is fine, #${id} was not found in it` };
    } catch {
      /* fragment check is best-effort */
    }
  }
  return { state: 'ok' };
}

// --- run, with a small concurrency limit --------------------------------------
const urls = [...uses.keys()].sort();
const results = new Map();
let cursor = 0;
await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, urls.length) }, async () => {
    while (cursor < urls.length) {
      const url = urls[cursor++];
      results.set(url, await check(url));
    }
  })
);

// --- report --------------------------------------------------------------------
const by = (state) => urls.filter((u) => results.get(u).state === state);
const broken = by('broken');
const warn = ['missing-anchor', 'server-error', 'unreachable', 'blocked'].flatMap(by);

console.log(`checked ${urls.length} external links across ${pages.length} files`);

const show = (url, level) => {
  const { note } = results.get(url);
  const where = [...uses.get(url)].sort();
  const list = where.length > 3 ? `${where.slice(0, 3).join(', ')} +${where.length - 3} more` : where.join(', ');
  const line = `${url} — ${note}\n      used on ${list}`;
  if (level === 'error') console.error(`::error::${line}`);
  else console.log(`  warning: ${line}`);
};

if (selfAbsolute.size) {
  console.log(
    `\n${selfAbsolute.size} link(s) written as absolute ${OWN_HOST} URLs — use a root-relative path instead, so they work in preview and on a branch:`
  );
  for (const [url, on] of selfAbsolute) console.log(`  ${url}  (${[...on][0]})`);
}

if (warn.length) {
  console.log(`\n${warn.length} link(s) worth a look:`);
  for (const u of warn) show(u, 'warn');
}

if (broken.length) {
  console.error(`\n${broken.length} broken external link(s):`);
  for (const u of broken) show(u, 'error');
  process.exit(1);
}

console.log('\nno broken external links');
