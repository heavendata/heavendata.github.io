// Fails `pnpm verify` when a code fence marked `try` (see src/plugins/scriban-try-it.mjs)
// uses a heavendata template function. The Scriban playground the link opens has
// none of them, so such a link errors in front of a customer.
//
// This lives here and not only in the plugin because Expressive Code LOGS a plugin
// error and keeps building — `astro build` exits 0 with the offending page rendered
// without the link. A check that only logs is not a check. This one exits 1.
//
// Also rejects a `try` fence whose `model` is not valid JSON, for the same reason.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src/content/docs';
const OUR_NAMESPACES = /\b(export|asset|i18n|debug)\./;
const FENCE_OPEN = /^```(\S*)\s*(.*)$/;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.mdx?$/.test(name)) yield p;
  }
}

function parseMeta(meta) {
  // Minimal parser for `key`, `key=value`, `key="value"`, `key='value'`, matching
  // what Expressive Code accepts for the two keys we care about.
  const opts = { try: false, model: undefined };
  const re = /(\w+)(?:=("[^"]*"|'[^']*'|\S+))?/g;
  let m;
  while ((m = re.exec(meta))) {
    const [, key, raw] = m;
    if (key === 'try') opts.try = raw === undefined || /^(true|"true"|'true')$/.test(raw);
    if (key === 'model' && raw !== undefined) opts.model = raw.replace(/^["']|["']$/g, '');
  }
  return opts;
}

const errors = [];
let tryCount = 0;

for (const file of walk(ROOT)) {
  const lines = readFileSync(file, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const open = lines[i].match(FENCE_OPEN);
    if (!open) continue;
    const meta = open[2] ?? '';
    let j = i + 1;
    while (j < lines.length && !lines[j].startsWith('```')) j++;
    const body = lines.slice(i + 1, j).join('\n');
    const opts = parseMeta(meta);
    if (opts.try) {
      tryCount++;
      const hit = body.match(OUR_NAMESPACES);
      if (hit) errors.push(`${file}:${i + 1}: fence marked \`try\` uses \`${hit[0]}\` — the Scriban playground has no heavendata functions; remove \`try\``);
      if (opts.model !== undefined) {
        try {
          JSON.parse(opts.model);
        } catch (e) {
          errors.push(`${file}:${i + 1}: fence \`model\` is not valid JSON (${e.message})`);
        }
      }
    }
    i = j;
  }
}

console.log(`checked ${tryCount} \`try\` fence(s)`);
for (const e of errors) console.error(`::error::${e}`);
if (errors.length) {
  console.error(`${errors.length} invalid \`try\` fence(s)`);
  process.exit(1);
}
console.log('all `try` fences are playground-safe');
