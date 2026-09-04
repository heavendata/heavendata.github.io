// Expressive Code plugin: a "Try it" link under a Scriban example, pointing at
// Scriban's own playground with the fence's content and a data model pre-filled.
//
// Opt in per fence with the meta flag `try`, optionally with a model:
//
//   ```plaintext frame="none" try model='{"record":{"sku":"A-100"}}'
//
// The link is GENERATED from the fence at build time — never hand-written — so it
// cannot drift from the example. `model` is deliberately the same shape as a
// doc-test fixture's input record (pim-docs: authoring-automation.md, phase 6), so
// that when fixtures exist the link can be derived from the fixture instead.
//
// The playground runs Scriban's current release with none of heavendata's
// functions. A `try` fence that uses one of our namespaces would therefore open a
// playground that errors in front of a customer. This plugin throws on that — but
// Expressive Code only LOGS a plugin error and keeps building (exit 0, verified
// 2026-09-04), so the check that actually fails `pnpm verify` is
// .github/scripts/check-try-fences.mjs, which runs before the build. Keep both:
// the throw makes the cause visible in the build log, the script makes it fatal.
//
// Local trap: after changing this plugin's `baseStyles`, delete `.astro/` and
// `node_modules/.astro/` before building. Astro's content cache re-emits unchanged
// pages with the OLD `ec.<hash>.css` reference while the new hash is what gets
// written, and check-links.mjs then reports six broken stylesheet links. A clean
// checkout (CI) never sees this.
import { definePlugin } from '@expressive-code/core';

const PLAYGROUND = 'https://scriban.github.io/';
const OUR_NAMESPACES = /\b(export|asset|i18n|debug)\./;

export function scribanTryIt() {
  return definePlugin({
    name: 'scriban-try-it',
    baseStyles: `
      .scriban-try-it {
        text-align: right;
        font-size: 0.8125rem;
        margin: 0.25rem 0 0;
      }
      .scriban-try-it a {
        color: var(--sl-color-text-accent, inherit);
        text-decoration: none;
      }
      .scriban-try-it a:hover { text-decoration: underline; }
    `,
    hooks: {
      postprocessRenderedBlock: ({ codeBlock, renderData }) => {
        if (codeBlock.metaOptions.getBoolean('try') !== true) return;

        const code = codeBlock.code;
        const where = `${codeBlock.parentDocument?.sourceFilePath ?? 'unknown file'}: fence starting "${code.split('\n')[0]}"`;

        const hit = code.match(OUR_NAMESPACES);
        if (hit) {
          throw new Error(
            `scriban-try-it: ${where} is marked \`try\` but uses \`${hit[0]}\`, a heavendata function ` +
              `the Scriban playground does not have. Remove \`try\` from that fence.`,
          );
        }

        const model = codeBlock.metaOptions.getString('model') ?? '{}';
        try {
          JSON.parse(model);
        } catch (e) {
          throw new Error(`scriban-try-it: ${where} has a \`model\` that is not valid JSON: ${e.message}`);
        }

        // encodeURIComponent leaves ' ( ) ! * alone; a literal ' would be emitted as
        // &#x27; in the href, which check-external-links.mjs then reads as a #anchor.
        const enc = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());
        const href = `${PLAYGROUND}?template=${enc(code)}&model=${enc(model)}`;

        renderData.blockAst.children.push({
          type: 'element',
          tagName: 'div',
          properties: { className: ['scriban-try-it'] },
          children: [
            {
              type: 'element',
              tagName: 'a',
              properties: { href, target: '_blank', rel: 'noopener' },
              children: [{ type: 'text', value: 'Try it in the Scriban playground ↗' }],
            },
          ],
        });
      },
    },
  });
}
