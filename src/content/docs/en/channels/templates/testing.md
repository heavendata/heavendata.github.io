---
title: "Testing and debugging templates"
description: "See what your template produces before you publish it, find out what data is available, and read the errors."
---

You do not have to publish a channel to find out what it produces. This page covers the two tools that matter — the live **preview** and **`debug.dump`** — and how to read a template that has failed.

## Preview while you write

The template editor has a **Preview** panel beside the template. It renders your template against real products from the channel and updates as you edit.

The panel header shows:

| | |
| --- | --- |
| The **file name** the channel would produce | |
| The **content type** | The MIME type set on the channel |
| **settings changed** | Something outside the template was edited, so the preview is stale — it refreshes on the next run |

This is the answer to "what will actually go out?" — check it before you activate a channel, not after.

:::tip
The preview renders a limited number of products, not the whole catalog. It is the right tool for *is my template correct*, not for *how long will this take*.
:::

## See everything that is available

The hardest part of a first template is not the syntax — it is knowing what you can reach. `debug.dump` answers it directly:

```plaintext frame="none"
{{ debug.dump }}
```

Put that in the record template, look at the preview, and you get every value available for that product as formatted JSON — attribute codes, variants, references, assets, and the shape of each one.

That is usually faster than looking codes up in settings, and it is the only way to be certain how a value is actually structured. Remember to take it out again.

## Reading errors

Errors from a template appear in the run's log — see [background tasks](/en/troubleshooting/background-jobs.html).

**`Cannot get the member ... for a null object`**
The commonest one. Something in the chain does not exist for this product — usually an empty attribute, or a custom entity lookup that found nothing. Guard it:

```plaintext frame="none"
{{ if record.description }}
  <description>{{ record.description }}</description>
{{ end }}
```

One product missing one attribute fails the whole run, so guard anything that is not required.

**`Error parsing record template: ...`**
The template could not be parsed at all, so nothing ran. Almost always an unclosed `{{`, or an `if`/`for` without its `end`.

**The template renders, but a value is empty**
Three usual causes, in order of likelihood:

1. **A translatable attribute read without a language** — see [translatable attributes](/en/channels/templates/data.html#translatable-attributes).
2. **The wrong language code** — `en` where the account is configured as `en-US`, or the reverse. This fails silently.
3. **The wrong attribute code.** Check under **Settings → Attributes & sections**, or use `debug.dump`.

**Everything fails, and the syntax looks right**
Check the channel's **Template language** — and note that a channel where it was never chosen runs as **Liquid**, so this can bite a channel that looks unconfigured rather than one set to Liquid deliberately. If it is Liquid, none of the examples in this documentation apply — see [Template-based channels](/en/channels/templates.html#which-template-language).

## Before you activate a channel

| | |
| --- | --- |
| The preview shows what you expect, for more than one product | |
| A product with **empty** optional attributes still renders | This is what breaks in production |
| A product **without variants** renders — looping over `variants` handles both | |
| Every value going into XML is escaped with `export.xmlize` | |
| `debug.dump` has been removed | |
