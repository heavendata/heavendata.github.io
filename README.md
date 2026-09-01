# heavendata user documentation

The public, customer-facing documentation published at
**<https://docs.heavendata.com>**.

Built with [Astro Starlight](https://starlight.astro.build/) and the
[`lucode-starlight`](https://github.com/lucas-labs/lucode-starlight-theme) theme.
The customer-facing landing page lives in `src/content/docs/index.md` — this file
is the repository README only.

> **This repository is public.** No customer names, internal URLs, cluster
> details, or unreleased plans. Its issue tracker is a customer feedback channel.

## Working on the docs

```bash
pnpm install
pnpm dev
```

Then open <http://localhost:4321>. The dev server hot-reloads on save, so you can
check a change before it goes anywhere.

```bash
pnpm build     # production build into dist/
pnpm preview   # serve dist/ exactly as it will be published
```

## Layout

| Path | What it is |
| --- | --- |
| `src/content/docs/` | Every page. `index.md` is the site landing page; `en/**` is the English documentation. |
| `src/content/docs/en/**/images/` | Page images, colocated with the page that uses them. Astro optimises them to WebP at build time. |
| `astro.config.mjs` | Site config and the sidebar. **Read the comments before changing `build.format` or `locales`** — both have non-obvious failure modes. |
| `src/assets/` | The header logo, in a light and a dark variant. |
| `scripts/` | Asset generation — see *The logo* below. |
| `public/` | Files copied verbatim, including `CNAME` (the custom domain). |
| `.github/workflows/deploy.yml` | Builds every PR; publishes on push to `main`. |

## Publishing

A push to `main` builds and deploys automatically. Pull requests build but do not
deploy, so a broken change fails the PR rather than the live site.

CI runs three checks beyond the build itself, because a green Astro build is not
proof the site is usable — both failures found during the migration off Jekyll
built green:

- the page count, search index, `CNAME` and sitemap are present;
- the navigation links use the expected URL format;
- **every internal link resolves** (`.github/scripts/check-links.mjs`).

## The logo

`src/assets/heavendata-logo.png` is the source of truth. Two assets are **derived
from it and must not be hand-edited**:

| File | What it is |
| --- | --- |
| `src/assets/heavendata-logo-dark.png` | The wordmark sets "heaven" in the brand navy `rgb(16,16,58)`, which is invisible on a dark background. This variant recolours that half to white. |
| `public/favicon.png` | The hexagon icon alone, cropped and squared — a 4.66:1 wordmark is illegible at 16x16. |

If the logo changes, replace the source file and regenerate both:

```bash
node scripts/make-logo-assets.mjs
```

The script refuses to emit a half-invisible logo if it meets a dark pixel it does
not recognise, and refuses to emit a non-square favicon.

Note also that the theme's own header CSS caps a logo at 32x32, which would
squash this 4.66:1 wordmark; `src/styles/custom.css` overrides that.

## Writing pages

Front matter is Starlight's:

```yaml
---
title: "Page title"
sidebar:
  order: 10
---
```

Pages are plain Markdown. Unlike the previous Jekyll site, `{{ … }}` is **not**
interpreted — Scriban and Liquid examples can be written directly, with no
`{% raw %}` wrapper.

One renderer quirk to know: Expressive Code treats a comment on a code block's
first line as a file name and hoists it into the block's header. If a snippet
starts with something like `// Example: name-as-uploaded.png`, use a fenced block
with `frame="none"` to keep it in the code.

## Support

support@heavendata.com · <https://heavendata.com/en/about/schedule-meeting/>

Feature requests and bug reports: <https://github.com/heavendata/issues/issues>
