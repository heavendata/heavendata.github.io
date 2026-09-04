---
title: "Testing and debugging templates"
description: "See what your template produces before you publish it, find out what data is available, and read the errors."
---

You do not have to publish a channel to find out what it produces. This page covers the two tools that matter — the live **preview** and **`debug.dump`** — and how to read a template that has failed.

## Preview while you write

Each template page has a **Preview** button in its toolbar. It is off by default; switch it on and a **Preview** panel opens beside the template, renders your template against real products from the channel, and re-renders about a second after each edit.

The panel header shows:

- the **file name** the channel would produce,
- the **content type**, fixed when the channel was created — see [Template channels](/en/channels/templates.html#create-it-as-a-template-channel),
- **settings changed**, briefly, while an edit is waiting to be rendered. It disappears once the preview has caught up; if it stays, the preview is not running.

The preview renders the first **50 records**, not the whole catalog — and a product with variants counts once per variant, so a catalog of variant-heavy products previews only a handful of them.

## See everything that is available

`debug.dump` prints every value a template can reach:

```plaintext frame="none"
{{ debug.dump }}
```

Put that in the record template, look at the preview, and you get every value available for that product as formatted JSON — attribute codes, variants, references, assets, and the shape of each one. Remember to take it out again.

## Reading errors

Errors from a template appear in the job log — see [background jobs](/en/troubleshooting/background-jobs.html).

**`Cannot get the member ... for a null object`**
The most common one. You read a member of something that does not exist for this product — usually an attribute that is not set. A bare `{{ record.my_images }}` never fails; the `.size` after it does. Guard the object, then read its members:

```plaintext frame="none"
{{# stops the run on a product with no images: #}}
<image_count>{{ record.my_images.size }}</image_count>

{{# guarded: #}}
{{ if record.my_images }}
  <image_count>{{ record.my_images.size }}</image_count>
{{ end }}
```

`Object ... is null. Cannot access indexer` is the same mistake with `[0]` instead of a member name. The other common source is a custom entity lookup that found nothing — see [reading one linked record](/en/channels/templates/custom-entities.html#reading-one-linked-record-you-already-have-a-reference-for) for the guarded form.

One product with one missing value fails the whole run, so guard anything that is not required. Looping over a missing list is safe — `{{ for a in record.my_images }}` renders nothing when the attribute is absent.

**`Error parsing record template: ...`**
The template could not be parsed at all, so nothing ran. Almost always an unclosed `{{`, or an `if`/`for` without its `end`. The header template is parsed first and reports the same way, as `Error parsing header template: ...`.

**The template renders, but a value is empty or looks wrong**
Three usual causes, in order of likelihood:

1. **A translatable attribute read without a language** — it renders as a list of `{key: "de", value: ...}` pairs instead of a value. Pass it through `i18n.t` — see [translatable attributes](/en/channels/templates/translations.html).
2. **A language code that matches nothing configured** — `en-US` where the account has bare `en`. This fails silently; see [translatable attributes](/en/channels/templates/translations.html).
3. **The wrong attribute code.** Check under **Settings → Attributes & sections**, or use `debug.dump`.

**Everything fails, and the syntax looks right**
Check **Options → Template language**. If it says **Liquid**, the examples in this documentation do not apply — see [Which template language?](/en/channels/templates.html#which-template-language).

## Before you activate a channel

- The preview shows what you expect, for more than one product.
- A product with **empty** optional attributes still renders — this is what breaks in production.
- A product **without variants** renders; looping over `variants` handles both.
- Every value going into XML is escaped with `export.xmlize`.
- `debug.dump` has been removed.
