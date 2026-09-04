---
title: "The data in a template"
description: "What record and variants contain, how to read an attribute by its code, and which page covers each of the other value types."
---

What a template can read, and how to read a plain attribute. For the syntax see [template language basics](/en/channels/templates/language.html); for the functions, the [function reference](/en/channels/templates/functions.html).

Not sure what is available in your account? [`debug.dump`](/en/channels/templates/testing.html#see-everything-that-is-available) prints the whole data structure.

## The three variables

| | |
| --- | --- |
| **`record`** | The current record — a product, or one custom entity record for a custom entity feed. In the **record template** and in the *Text template* node. |
| **`variants`** | Every variant of the current product. Only in the **record template**. |
| **`sources`** | The inputs of a field processing pipeline. Only inside the *Text template* node, not in a channel template. |

**Header and footer templates have none of these, and no functions either** — `export.*`, `asset.*`, `i18n.*` and `debug.*` are all unavailable there.

:::caution[A *Text template* node has no channel context]
`record` and `sources` work in the node, but the channel data behind the `export.*` functions is not loaded there. `export.culture_codes`, `export.language_codes` and `export.attribute` come back empty; `export.attr_label` and `export.xml_attr_labels` return an empty string; `i18n.t` always returns its fallback; and `export.custom_entity` and `export.load_custom_entities` **throw** — *"custom entity data is not available in mapper field templates"*. The Scriban built-ins behave normally.

Everything on this page and on the [assets](/en/channels/templates/assets.html) page applies in both places. Everything on the [custom entities](/en/channels/templates/custom-entities.html) page and the channel-run functions applies only to a channel template.
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

## The other value types

Each needs a function to read, and each has its own page covering the attribute and the functions together:

| Attribute type | Read it with | Page |
| --- | --- | --- |
| **Translatable** text | `i18n.t` | [Translatable attributes in a template](/en/channels/templates/translations.html) |
| **Assets** — images, PDFs, files | `asset.url` | [Assets in a template](/en/channels/templates/assets.html) |
| **References** to custom entity records | `export.load_custom_entities` | [Custom entities in a template](/en/channels/templates/custom-entities.html) |

## Information about the channel run

The `export` object also carries data about the run and the catalog setup. The channel's languages — `export.culture_codes` — are on the [translatable attributes](/en/channels/templates/translations.html#the-channels-languages--exportculture_codes) page.

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

For a translated label use [`export.attr_label`](/en/channels/templates/translations.html#exportattr_label).
