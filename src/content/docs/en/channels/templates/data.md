---
title: "The data in a template"
description: "What record and variants contain, and how to read every attribute type — text, translatable, asset and reference."
---

What a template can read, and how to read each kind of attribute. For the syntax see [template language basics](/en/channels/templates/language.html); for the functions, the [function reference](/en/channels/templates/functions.html).

Not sure what is available in your account? [`debug.dump`](/en/channels/templates/testing.html#see-everything-that-is-available) prints the whole data structure.

## The three variables

| | |
| --- | --- |
| **`record`** | The current record — a product, or one custom entity record for a custom-entity feed. In the **record template** and in the *Text template* node. |
| **`variants`** | Every variant of the current product. Only in the **record template**. |
| **`sources`** | The inputs of a field processing pipeline. Only inside the *Text template* node, not in a channel template. |

**Header and footer templates have none of these, and no functions either.** They render without a template context, so `export.*`, `asset.*`, `i18n.*` and `debug.*` are all unavailable there as well — not just `record`.

:::caution[A *Text template* node has no channel context]
`record` and `sources` work in the node, but the channel data behind the `export.*` functions is not loaded there. `export.attribute` and `export.culture_codes` come back empty, `i18n.t` always returns its fallback, and `export.custom_entity` and `export.load_custom_entities` **throw** — *"custom entity data is not available in mapper field templates"*.

Everything on this page about attribute values, variants and assets applies in both places. Everything under [reference attributes](#reference-attributes--custom-entities) and the channel-run functions applies only to a channel template.
:::

## Attribute values

Read any attribute by its **code**:

```plaintext frame="none"
{{ record.product_name }}
```

Find the codes under **Settings → Attributes & sections**. A code containing a hyphen needs index syntax:

```plaintext frame="none"
{{ record['my-attribute'] }}
```

## Variants

```plaintext frame="none"
{{ for variant in variants }}
  <variant>
    <ean>{{ variant.ean }}</ean>
    <color>{{ variant.color_code }}</color>
  </variant>
{{ end }}
```

Inside the loop, `variant` holds that variant's values while `record` still refers to the product.

:::tip
**For a product with no variants, `variants` contains one item — the product itself.** So a template written as a loop over `variants` works for both, and you never need to handle the two cases separately.
:::

To group variants — the usual case being color, with sizes underneath — use [`export.variants_by`](/en/channels/templates/functions.html#exportvariants_by).

## Translatable attributes

A translatable attribute holds one value per language, so it needs a language code:

```plaintext frame="none"
{{ record.my_translatable_attr | i18n.t 'en-US' }}
```

With a fallback when that language is empty:

```plaintext frame="none"
{{ record.my_translatable_attr | i18n.t 'en-US' 'No value available' }}
```

:::caution
**Check the codes configured in your account** — see **Settings → Languages**.

A culture configured with a region also answers to its bare language code, so with `en-US` configured both `i18n.t 'en-US'` and `i18n.t 'en'` work. The reverse is not true: if a language is configured as bare `en`, then `'en-US'` finds nothing.

**Two traps.** A code that matches nothing returns an empty value **silently** — no error, no log entry. And if you have configured two regions of one language, say `de-DE` and `de-AT`, the bare `de` resolves to just one of them. Pass the full code whenever more than one region of a language is configured.
:::

`export.culture_codes` lists the languages included in this channel, which lets one template serve all of them:

```xml frame="none"
{{ for c in export.culture_codes }}
  <name lang="{{ c }}">{{ record.product_name | i18n.t c }}</name>
{{ end }}
```

## Asset attributes — images, PDFs, files

An asset attribute holds a **list**, even when there is only one file. Loop over it, or index into it.

```plaintext frame="none"
{{ for a in record.my_images }}
  <image>{{ a | asset.url }}</image>
{{ end }}
```

For a configured [image variant](/en/assets/asset-variants.html):

```plaintext frame="none"
{{ for a in record.my_images }}
  <image>{{ a | asset.url 'example_thumbnail' }}</image>
{{ end }}
```

Each asset carries:

| Property | Description |
| --- | --- |
| `id` | The internal asset id |
| `filename` | The file name as uploaded |
| `mime_type` | Content type of the file, for example `image/png` |
| `name` | The asset's name, which is not its file name |
| `description` | The asset's description |
| `updated` · `stored` | When it was last modified, and when it was first stored |

Note that `{{ a | asset.url }}` with no variant gives the **`default`** variant, not the uploaded original, and its URL carries no file extension — pass `'original'` for the file as uploaded. See [`asset.url`](/en/channels/templates/functions.html#asseturl).

See [`asset.url`](/en/channels/templates/functions.html#asseturl) and [`asset.updated`](/en/channels/templates/functions.html#assetupdated).

## Reference attributes — custom entities

A **reference** attribute links a product to records of a [custom entity](/en/concepts/custom-entities.html) — its certificates, its manufacturer, its care instructions. When it has links, it holds a **list**, even if there is only one.

:::caution[An unset reference attribute is missing, not empty]
If nothing has ever been linked, the attribute is **not** an empty list — it is absent, so `record.certificates` is null. `{{ record.certificates.size }}` and `{{ record.certificates[0] }}` both fail.

**Looping is safe**, which is why most templates never notice: a `for` over a null value renders nothing, without an error. Reach for `for` rather than an index or a count.
:::

Each reference carries the id, name and identifier of the linked record — **but none of its other values**:

| Property | Description |
| --- | --- |
| `target_id` | Internal id of the linked record |
| `target_name` | Name of the linked record, from the custom entity's label attribute |
| `target_identifier` | The linked record's identifier |

```plaintext frame="none"
{{ for m in record.manufacturer }}
  <manufacturer>{{ m.target_name }}</manufacturer>
{{ end }}
```

Looping also keeps the template working when the attribute is empty.

### Reading every linked record

To read a linked record's own attributes — not just its id, name and identifier — load it with `export.load_custom_entities`, naming the **record** (or a variant) and the **reference attribute's code**:

```plaintext frame="none"
{{ for cert in export.load_custom_entities(record, 'certificates') }}
  <certificate id="{{ cert._id.entityid }}">
    <name>{{ cert._meta.name }}</name>
    <number>{{ cert.certificate_number }}</number>
    <valid_until>{{ cert.valid_until | date.to_string '%Y-%m-%d' }}</valid_until>
  </certificate>
{{ end }}
```

This returns **every** linked record, in the order they were linked on the product — one call, whatever the attribute's cardinality. An attribute with no links returns an empty list, so the loop needs no separate guard. Duplicates (the same record linked twice) are kept, not collapsed.

:::caution[Use parentheses]
Write `export.load_custom_entities(record, 'certificates')` — with parentheses around both arguments — especially as a `for` loop's source. Scriban does not parse a multi-argument call without parentheses (`export.load_custom_entities record 'certificates'`) in that position.
:::

The variant form works the same way, for a reference attribute defined on variants rather than the product:

```plaintext frame="none"
{{ for v in variants }}
  {{ for c in export.load_custom_entities(v, 'care_instructions') }}<care>{{ c.text }}</care>{{ end }}
{{ end }}
```

On a loaded record:

| Property | Description |
| --- | --- |
| `cert.my_attribute_code` | Value of that attribute |
| `cert._meta.name` | Name of the record |
| `cert._meta.identifier` | Identifier of the record |
| `cert._id.entityid` | Internal id of the record |

`_meta.name` and `_meta.identifier` match the reference's own `target_name` and `target_identifier`. They are copied onto the reference when it is linked, and **renaming the linked record updates every reference to it straight away** — you do not have to re-save the products. So the two stay in step, and a loop over `export.load_custom_entities` does not need to carry the reference alongside it.

A wrong attribute code, an attribute that is not a reference attribute, or a reference to something other than a custom entity (a product reference, for example) is reported in the channel's job log rather than left for you to guess at from an empty result.

### Reading one linked record you already have a reference for

If a template loops `record.<attribute>` itself — to read `target_name`, or to keep the link order alongside other work — `export.custom_entity(key).get` accepts the reference directly, instead of picking `target_id` and the lookup field apart by hand:

```plaintext frame="none"
{{ for r in record.certificates }}
  {{ cert = export.custom_entity('certificates').get(r) }}
  {{ if cert }}
    <certificate number="{{ cert.certificate_number }}">{{ r.target_name }}</certificate>
  {{ end }}
{{ end }}
```

`export.custom_entity('certificates').get(r)` is equivalent to `export.custom_entity('certificates').get('id.entityid', r.target_id)` — it exists so a template never has to know that `id.entityid` is the field a reference resolves through.

:::caution
**`get` returns nothing for a reference whose target has since been deleted** — an account's data can always drift out of sync with what a product still links to. `get(r)` returns null in that case, same as any other unmatched lookup; the `if` above guards against it. Without it the template stops with `Cannot get the member ... for a null object`. `export.load_custom_entities` (above) does not need this guard — it skips a deleted target and reports it in the job log instead of leaving a gap in the list.
:::

### Looking up by any text attribute

For a lookup that is not reference-driven — every manufacturer in Germany, say, rather than the one(s) a product links to — use `export.custom_entity(key).get` or `.find` with any attribute code, passing the custom entity's key from **Settings → Custom entities**:

```plaintext frame="none"
{{ for m in export.custom_entity('manufacturer').find('country_code', 'DE') }}
  {{ m._meta.name }}
{{ end }}
```

`get` returns the first match, `find` returns all of them. The value must match exactly — the comparison is case sensitive, with no partial matching.

Looked up by id or identifier instead of a custom attribute:

```plaintext frame="none"
{{ export.custom_entity('manufacturer').get('id.entityid', r.target_id) }}

{{ export.custom_entity('manufacturer').get('meta.identifier', r.target_identifier.value) }}
```

:::caution
**The two forms are not interchangeable.** `target_id` goes with `id.entityid`; `target_identifier.value` goes with `meta.identifier` — and the `.value` is required. Mix them up or drop the `.value` and the lookup silently finds nothing. When you already hold a reference, prefer `get(r)` (above) — it removes this trap entirely.
:::

:::note[Performance]
The first lookup on a custom entity loads **all** of its records and keeps them for the rest of the run — including every record `export.load_custom_entities` resolves, since it shares this same cache. A second lookup **attribute** adds an index over those same records rather than loading them again, so looking up by several attributes of the same custom entity is cheap.
:::

### The old `<attribute>.data.<attribute>` fields

An earlier, undocumented mechanism let a reference attribute's linked record show up flattened into `record` under keys like `record.manufacturer.data.support_url` — but only for the *first* linked record, silently overwriting `record.manufacturer` itself in the process. Those keys never worked reliably and are gone. If a template copied from a colleague uses them, replace it with `export.load_custom_entities` (above).

## Information about the channel run

The `export` object also carries data about the run and the catalog setup.

### Languages

`export.culture_codes` lists the languages in this channel — the ones selected, or all configured languages. `export.language_codes` gives the language part only, without the region.

```plaintext frame="none"
{{ for code in export.culture_codes }}{{ code }} {{ end }}
```
```plaintext frame="none"
en-US fr-FR
```

`export.culture_code_uc` swaps the dash for an underscore, which some systems require:

```plaintext frame="none"
{{ for code in export.culture_codes }}{{ code | export.culture_code_uc }} {{ end }}
```
```plaintext frame="none"
en_US de_AT
```

:::note
**"Culture" and "language" mean the same thing here.** The template functions use *culture* — the technical term for a language as spoken in a particular region — while the app says *language*. If a language is configured without a region, `culture_codes` contains just the language code.
:::

### Attribute metadata

`export.attribute` gives access to every configured attribute:

| Property | Description |
| --- | --- |
| `id` | Internal attribute id |
| `name` | Attribute name, as shown in the app |
| `required` | True if a value is required |
| `translatable` | True if the value is language-specific |
| `labels` | Label translations, keyed by language code |

```plaintext frame="none"
{{ export.attribute.product_name.name }}
{{ export.attribute['my-attribute'].name }}
```

Use `export.attr_label` for a translated label; it falls back to the attribute name when no translation exists.

```plaintext frame="none"
{{ export.attr_label 'color' 'en-US' }}
```
