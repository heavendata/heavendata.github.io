---
title: "The data in a template"
description: "What record and variants contain, how to read an attribute by its code, how to read a product's categories, and which page covers each of the other value types."
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
`record` and `sources` work in the node, but the channel data behind the `export.*` functions is not loaded there. What that means per page:

| Page | In a *Text template* node |
| --- | --- |
| This page | `record` and the Scriban built-ins work. `export.attribute` is empty, and `record._categories` is not available. |
| [Assets](/en/channels/templates/assets.html) | Works |
| [Translatable attributes](/en/channels/templates/translations.html) | `i18n.t` always returns its fallback; `export.culture_codes` and `export.language_codes` are empty; `export.attr_label` and `export.xml_attr_labels` return an empty string |
| [Custom entities](/en/channels/templates/custom-entities.html) | `export.custom_entity` and `export.load_custom_entities` **throw** — *"custom entity data is not available in mapper field templates"* |
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

## Categories

The categories a product is in are on the record as **`record._categories`**, and per variant as **`variant._categories`**:

```plaintext frame="none" try model='{"record":{"_categories":[{"key":"shirts","name":"Shirts","sort_index":3,"parent_key":"clothing","path":[{"key":"clothing","name":"Clothing","sort_index":1},{"key":"shirts","name":"Shirts","sort_index":3}]},{"key":"sale","name":"Sale","sort_index":2,"path":[{"key":"sale","name":"Sale","sort_index":2}]}]}}'
{{ for c in record._categories }}
  <category key="{{ c.key }}" sort="{{ c.sort_index }}">{{ c.name }}</category>
{{ end }}
```

**The underscore is not a typo.** `record._categories` is the category tree heavendata maintains; `record.categories`, without it, is your own attribute if you have one with that code, and it is untouched. If you have no such attribute, `record.categories` is missing — a loop over it renders nothing, but `record.categories.size` stops the run, like [any missing value](/en/channels/templates/testing.html#reading-errors).

**In a channel template the list is always there**, an empty list when the product is in no category — so a loop needs no guard, unlike an unset attribute. Test for emptiness with `.size`, never with `{{ if record._categories }}`: an empty list is still true.

**In a *Text template* node `_categories` does not exist at all.** A loop over it renders nothing and `record._categories.size` stops the run. The node is handed the record before the category list gets its name, so a product's categories are not readable there at all.

Each entry is one category:

| Property | Description |
| --- | --- |
| `key` | The category key — the identifier the system that imported the category knows it by. **Missing** when the category has no key. |
| `name` | The category name |
| `sort_index` | The category's position among its sibling categories, counted from 1 |
| `parent_key` | The parent category's key. **Missing** for a top-level category, and when the parent has no key. |
| `path` | The category and every category above it, top-level first — each with `key`, `name` and `sort_index`, and nothing else |

`key` and `parent_key` are left out rather than set to an empty text, which is what makes `{{ if c.key }}` a reliable test — an empty text would be true. `{{ c.key }}` renders nothing either way.

**Only the categories a product is actually assigned to are listed**, each once. A parent category the product is not itself assigned to is not an entry of its own; it appears in the assigned category's `path`.

A category deleted after a product was assigned to it is simply absent from the list; it is not an error and not an empty entry.

The examples below are deliberately bare, because the **Try it** links run them in Scriban's own playground, which has none of our functions. A category can be called *Shoes & Boots*, so in a real template pass every value through [`export.xmlize`](/en/channels/templates/functions.html#exportxmlize).

### A variant's own categories

`variant._categories` is the variant's own categories **plus** everything it inherits from the product and from any variant above it, in the same tree order. `record._categories` is the product's:

```plaintext frame="none" try model='{"record":{"_categories":[{"key":"sale","name":"Sale","sort_index":2,"path":[{"key":"sale","name":"Sale","sort_index":2}]}]},"variants":[{"ean":"4006381333931","_categories":[{"key":"shirts","name":"Shirts","sort_index":3,"parent_key":"clothing","path":[{"key":"clothing","name":"Clothing","sort_index":1},{"key":"shirts","name":"Shirts","sort_index":3}]},{"key":"sale","name":"Sale","sort_index":2,"path":[{"key":"sale","name":"Sale","sort_index":2}]}]}]}'
{{ for variant in variants }}
  <variant ean="{{ variant.ean }}">
    {{- for c in variant._categories }}
    <category key="{{ c.key }}">{{ c.name }}</category>
    {{- end }}
  </variant>
{{ end }}
```

The product is in *Sale*; the variant adds *Shirts*, and its list carries both.

### The full path, as one string

Most receiving systems want a breadcrumb rather than a single name. Map the `path` to its names and join them:

```plaintext frame="none" try model='{"record":{"_categories":[{"key":"shirts","name":"Shirts","sort_index":3,"parent_key":"clothing","path":[{"key":"clothing","name":"Clothing","sort_index":1},{"key":"shirts","name":"Shirts","sort_index":3}]},{"key":"sale","name":"Sale","sort_index":2,"path":[{"key":"sale","name":"Sale","sort_index":2}]}]}}'
{{ for c in record._categories }}
  <category>{{ c.path | array.map "name" | array.join "//" }}</category>
{{ end }}
```

A product assigned to *Shirts* under *Clothing* gives `Clothing//Shirts`. Use `array.map "key"` instead for a path of keys, and any separator you like as the second argument of `array.join`.

### Order, and the sort index

The entries already come in the order the app shows: a category before its subcategories, sibling categories by their sort index. Writing `sort_index` out, as the first example does, is usually all a receiving system needs to reproduce that order.

**The numbers are positions the PIM maintains, not the numbering a source system sent.** An import applies the order it is given and then keeps its own, so a category dragged in the app gets a new `sort_index` and an imported one will not match the number in the source.

`sort_index` counts **within one parent**, so two categories under different parents can share a number, and sorting a whole list by it interleaves the levels rather than ordering them. When you want a different order, sort on something that means the same at every level — alphabetical, say:

```plaintext frame="none" try model='{"record":{"_categories":[{"key":"shirts","name":"Shirts","sort_index":3,"parent_key":"clothing","path":[{"key":"clothing","name":"Clothing","sort_index":1},{"key":"shirts","name":"Shirts","sort_index":3}]},{"key":"sale","name":"Sale","sort_index":2,"path":[{"key":"sale","name":"Sale","sort_index":2}]}]}}'
{{ sorted = record._categories | array.sort "name" }}
{{ for c in sorted }}
  <category>{{ c.name }}</category>
{{ end }}
```

### Is the product in one particular category?

```plaintext frame="none" try model='{"record":{"_categories":[{"key":"shirts","name":"Shirts","sort_index":3,"parent_key":"clothing","path":[{"key":"clothing","name":"Clothing","sort_index":1},{"key":"shirts","name":"Shirts","sort_index":3}]},{"key":"sale","name":"Sale","sort_index":2,"path":[{"key":"sale","name":"Sale","sort_index":2}]}]}}'
{{ if record._categories | array.map "key" | array.contains "sale" }}
  <sale>true</sale>
{{ end }}
```

This tests the categories the product is **assigned** to. To match a category anywhere above it as well, test the `path` of each entry instead.

## The other value types

Each needs a function to read, and each has its own page covering the attribute and the functions together:

| Attribute type | Read it with | Page |
| --- | --- | --- |
| **Translatable** text | `i18n.t` | [Translatable attributes in a template](/en/channels/templates/translations.html) |
| **Assets** — images, PDFs, files | `asset.url` | [Assets in a template](/en/channels/templates/assets.html) |
| **References** to custom entity records | `export.load_custom_entities` | [Custom entities in a template](/en/channels/templates/custom-entities.html) |

## Attribute metadata

`export.attribute` gives access to every configured attribute. (The channel's languages — `export.culture_codes` — are on the [translatable attributes](/en/channels/templates/translations.html#the-channels-languages--exportculture_codes) page.)

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

## What to read next

- [Template language basics](/en/channels/templates/language.html) — the syntax, and what the **Try it** links on this page run
- [Template function reference](/en/channels/templates/functions.html) — everything callable, including `export.xmlize`
- [Testing and debugging templates](/en/channels/templates/testing.html) — the preview, `debug.dump`, and the errors a missing value raises
