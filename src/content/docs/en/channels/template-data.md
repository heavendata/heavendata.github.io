---
title: "The data in a template"
description: "What record and variants contain, and how to read every attribute type — text, translatable, asset and reference."
sidebar:
  order: 22
---

What a template can read, and how to read each kind of attribute. For the syntax see [template language basics](/en/channels/template-language.html); for the functions, the [function reference](/en/channels/template-functions.html).

Not sure what is available in your account? [`debug.dump`](/en/channels/template-testing.html#see-everything-that-is-available) prints the whole data structure.

## The three variables

| | |
| --- | --- |
| **`record`** | The current product. Only in the **record template**. |
| **`variants`** | Every variant of the current product. Only in the **record template**. |
| **`sources`** | The inputs of a field processing pipeline. Only inside the *Text template* node, not in a channel template. |

Header and footer templates have none of these — they run once, with no product in scope.

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

To group variants — the usual case being color, with sizes underneath — use [`export.variants_by`](/en/channels/template-functions.html#exportvariants_by).

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
**Use exactly the code configured in your account** — see **Settings → Languages**. If a language is configured with a region (`en-US`) you must pass the region; if it is configured without one (`en`) you must not. A mismatched code returns nothing, silently.
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

For a configured [image variant](/en/assets/asset-variants.html) instead of the original:

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
| `mimeType` | Content type of the file, for example `image/png` |

See [`asset.url`](/en/channels/template-functions.html#asseturl) and [`asset.updated`](/en/channels/template-functions.html#assetupdated).

## Reference attributes — custom entities

A **reference** attribute links a product to records of a [custom entity](/en/concepts/custom-entities.html). Like assets, it holds a list.

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

### Reading the rest of a linked record

For any other attribute of the linked record, look it up with `export.custom_entity`, passing the custom entity's key from **Settings → Custom entities**.

Look up by id, or by identifier:

```plaintext frame="none"
{{ export.custom_entity('manufacturer').get('id.entityid', r.target_id) }}

{{ export.custom_entity('manufacturer').get('meta.identifier', r.target_identifier.value) }}
```

:::caution
**The two forms are not interchangeable.** `target_id` goes with `id.entityid`; `target_identifier.value` goes with `meta.identifier` — and the `.value` is required. Mix them up or drop the `.value` and the lookup silently finds nothing.
:::

A complete example, outputting values stored on the linked manufacturer:

```plaintext frame="none"
{{ for r in record.manufacturer }}
  {{ m = export.custom_entity('manufacturer').get('id.entityid', r.target_id) }}
  {{ if m }}
    <support_url>{{ m.support_url }}</support_url>
    <support_phone>{{ m.support_phone }}</support_phone>
  {{ end }}
{{ end }}
```

The `if` guards against a record that cannot be found. Without it the template stops with `Cannot get the member ... for a null object`.

On a looked-up record:

| Property | Description |
| --- | --- |
| `m.my_attribute_code` | Value of that attribute |
| `m._meta.name` | Name of the record |
| `m._meta.identifier` | Identifier of the record |
| `m._id.entityid` | Internal id of the record |

### Looking up by any text attribute

Instead of `id.entityid` or `meta.identifier`, look up by any text attribute using its code. `get` returns the first match, `find` returns all of them:

```plaintext frame="none"
{{ for m in export.custom_entity('manufacturer').find('country_code', 'DE') }}
  {{ m._meta.name }}
{{ end }}
```

The value must match exactly — the comparison is case sensitive, with no partial matching.

:::note[Performance]
The first lookup loads **all** records of that custom entity and keeps them for the rest of the run. Looking up by a second attribute loads them again. In a large channel, stick to one lookup attribute per custom entity.
:::

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
