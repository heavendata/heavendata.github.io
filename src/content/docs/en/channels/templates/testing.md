---
title: "Testing and debugging templates"
description: "See what your template produces before you publish it, find out what data is available, and read the errors."
---

You do not have to publish a channel to find out what it produces. This page covers the two tools that matter — the live **preview** and **`debug.dump`** — and how to read a template that has failed.

## Preview while you write

Each template page has a **Preview** button in its toolbar. It is off by default; turn it on and a **Preview** panel opens beside the template, renders your template against real products from the channel's feed, and re-renders about a second after each edit.

The panel header shows:

- the **file name** the channel would produce,
- the **content type**, fixed when the channel was created — see [Template channels](/en/channels/templates.html#create-it-as-a-template-channel),
- **Rendering the preview…** while the output shown is older than your last edit. It disappears once the preview has caught up; if it stays, the preview is not running.

### Choosing what the preview renders

The preview renders **at most five products**, not the whole catalog — each with the variants the channel would export for it. On a custom entity feed it renders at most five **rows**, and the panel says *rows* wherever it would say *products*. The line under the header says which it shows, and the row below it chooses them:

| Control | What it does |
| --- | --- |
| A field, then the **Search** box | Shows only the products whose value in that field **starts with** one of the values you enter, ignoring case. The field is the account's SKU attribute to begin with, on a product feed that has one, and otherwise the first text field; any text attribute of the feed can be chosen. Type or paste several values at once — a tab, `;`, `,` or a new line separates them — and press Enter to apply them. A feed with no text field has no search, only the filter. |
| **Add filter** | Opens **Filter the preview** — the same filter editor, fields and conditions as the channel's own **Filter** under **Options**. Once set, the button reads **Filter (‹n›)**. |
| **Ignore the channel's filter** (filter icon) | Shown only while the channel's own **Filter** has a condition. Pressed, the preview leaves that filter out; the search and the preview's filter still apply. |
| **Reset preview** | Empties the search and the filter, and applies the channel's filter again. |

**A product is shown when it matches the search, the preview's filter and the channel's own Filter** — unless you ignore the last. The preview renders exactly what the feed would export with your choice added to its filter, so searching for one product variant's SKU renders that product with that product variant only.

**Nothing you set here is saved.** The choice is the same on all three template steps and lasts while the channel is open, it never marks the channel as changed, and a run still sends the file its own Filter selects.

**When nothing matches**, the panel shows *No products match the search* (or *… the filter*, with no search) and **Clear search** or **Reset filter**, instead of a file of header and footer alone. While the channel's own Filter applies and has a condition, it adds *The preview includes only products the channel's filter lets through* — that filter may be why.

**A condition on a translatable field matches in any of the account's languages** — in the preview's search and filter, in the channel's own Filter, and so in what a run exports. The list of a custom entity's records in the app is the exception: its search and filter match the account's default language only.

## See everything that is available

`debug.dump` prints every value a template can reach:

```plaintext frame="none"
{{ debug.dump }}
```

Put that in the record template, look at the preview, and you get every value available for that product as formatted JSON — attribute codes, variants, references, assets, and the shape of each one. Remember to take it out again.

## Reading errors

Errors from a template appear in the run's steps and their log files — see [background jobs](/en/troubleshooting/background-jobs.html).

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
3. **The wrong attribute code.** Look it up with **Insert field** in the record template's toolbar — see [the three templates](/en/channels/templates.html#the-three-templates) — or under **Settings → Attributes & sections**, or use `debug.dump`.

**Everything fails, and the syntax looks right**
Check **Options → Template language**. If it says **Liquid**, the examples in this documentation do not apply — see [Which template language?](/en/channels/templates.html#which-template-language).

## Before you enable a channel

- The preview shows what you expect, for more than one product.
- A product with **empty** optional attributes still renders — this is what breaks in production. To find one, [choose it in the preview](#choosing-what-the-preview-renders) with a filter that the attribute is empty.
- A product **without variants** renders; looping over `variants` handles both. Search the preview for the SKU of one.
- Every value going into XML is escaped with `export.xmlize`.
- `debug.dump` has been removed.
- A whole run produces what the preview promised — the preview renders up to five products, a run renders them all. Run the channel and download the file it created: see [downloading what a step read or created](/en/troubleshooting/background-jobs.html#downloading-what-a-step-read-or-created).
