---
title: "Template function reference"
description: "Every function available in a template — the Scriban built-ins we support, and the heavendata additions — with where each one is documented."
---

The functions a template can call. Two groups: the **[Scriban built-ins](#scriban-built-ins)** we make available, and the **[heavendata functions](#heavendata-functions)** we add for product data. The heavendata functions for [assets](/en/channels/templates/assets.html), [translatable attributes](/en/channels/templates/translations.html) and [custom entities](/en/channels/templates/custom-entities.html) are documented on those pages, next to the data they read; the [index](#every-heavendata-function) below lists all of them.

:::caution[Templates cannot read files]
There is no file system access from a template, and no template loader — so **`{{ include }}` always fails**, and `include_join` is not available at all. Anything in Scriban's documentation that loads a file or another template will not work here. The complete list of what *is* available is below.
:::

:::note[Two places a template runs]
This page describes a template used as a channel's **whole output** — a [template channel](/en/channels/templates.html#create-it-as-a-template-channel).

A template can also be used on a **single field**, through the *Text template* node in a field processing pipeline. There the channel context does not exist and most `export.*` functions return nothing — see [A *Text template* node has no channel context](/en/channels/templates/data.html#the-three-variables).
:::

## Scriban built-ins

These namespaces are available in every template. They behave exactly as Scriban documents them, so we link out for the individual functions rather than restating them.

| Namespace | What it does | Reference |
| --- | --- | --- |
| `array` | Sort, filter, join, take, and other list operations | [array functions](https://scriban.github.io/docs/builtins/array/) |
| `date` | Format and calculate with dates | [date functions](https://scriban.github.io/docs/builtins/date/) |
| `html` | Escape, strip and encode HTML | [html functions](https://scriban.github.io/docs/builtins/html/) |
| `math` | Round, format, and arithmetic helpers | [math functions](https://scriban.github.io/docs/builtins/math/) |
| `object` | Inspect and convert values | [object functions](https://scriban.github.io/docs/builtins/object/) |
| `regex` | Match, replace and split with regular expressions | [regex functions](https://scriban.github.io/docs/builtins/regex/) |
| `string` | Trim, pad, case, truncate, split, replace | [string functions](https://scriban.github.io/docs/builtins/string/) |
| `timespan` | Durations | [timespan functions](https://scriban.github.io/docs/builtins/timespan/) |

The ones that come up constantly in product templates:

```plaintext frame="none"
{{ record.description | html.escape }}
{{ record.product_name | string.truncate 60 }}
{{ record.price | math.format '0.00' }}
{{ record.release_date | date.to_string '%F' }}
```

`date.to_string` takes the same format strings as [Scriban's `date.to_string`](https://scriban.github.io/docs/builtins/date/#dateto_string) — `%F` gives `2026-09-03`.

## heavendata functions

Four namespaces we add. These are specific to product data and are not in Scriban's documentation.

### Every heavendata function

| Function | What it does | Documented |
| --- | --- | --- |
| `asset.url` | The public URL of an asset, optionally for an image variant | [Assets](/en/channels/templates/assets.html#asseturl) |
| `asset.updated` | When an asset was last modified | [Assets](/en/channels/templates/assets.html#assetupdated) |
| `i18n.t` | A translatable attribute's value in one language, with a fallback | [Translatable attributes](/en/channels/templates/translations.html#read-one-language--i18nt) |
| `i18n.has` | Whether a translatable attribute has an entry for exactly that language | [Translatable attributes](/en/channels/templates/translations.html#check-whether-a-language-has-a-value--i18nhas) |
| `export.culture_codes` · `export.language_codes` | The languages in this channel | [Translatable attributes](/en/channels/templates/translations.html#the-channels-languages--exportculture_codes) |
| `export.culture_code_uc` | A culture code with an underscore: `en-US` → `en_US` | [Translatable attributes](/en/channels/templates/translations.html#the-channels-languages--exportculture_codes) |
| `export.attr_label` | An attribute's label in one language | [Translatable attributes](/en/channels/templates/translations.html#exportattr_label) |
| `export.xml_attr_labels` | An attribute's label in every channel language, as XML attributes | [Translatable attributes](/en/channels/templates/translations.html#exportxml_attr_labels) |
| `export.load_custom_entities` | Every custom entity record a reference attribute links to | [Custom entities](/en/channels/templates/custom-entities.html#reading-every-linked-record--exportload_custom_entities) |
| `export.custom_entity` | Look custom entity records up by any attribute — `.get`, `.find`, `.key` | [Custom entities](/en/channels/templates/custom-entities.html#exportcustom_entity--reference) |
| `export.attribute` | Every configured attribute's metadata | [Data](/en/channels/templates/data.html#attribute-metadata) |
| `export.variants_by` | Group the product's variants by an attribute | [below](#exportvariants_by) |
| `export.collect_attribute_values` | Every distinct value of an attribute across variants | [below](#exportcollect_attribute_values) |
| `export.account_id` | Your account's internal id | [below](#exportaccount_id) |
| `export.xmlize` | Escape a value for XML | [below](#exportxmlize) |
| `export.sanitize_filename` | Make a string safe as a file name | [below](#exportsanitize_filename) |
| `export.to_sorting_number` | Turn a string into a sortable integer | [below](#exportto_sorting_number) |
| `export.sv_additional_information` | SmartView `additionalInformation` elements | [below](#exportsv_additional_information) |
| `debug.dump` | Print every value the template can reach | [below](#debugdump) |

### Variants

#### `export.variants_by`

Group the current product's variants by an attribute, and reach each group's variants through `_variants`. Written for the common case of grouping by color and listing sizes underneath.

```plaintext frame="none"
{{ for color in export.variants_by 'color_code' }}
  <color code="{{ color.color_code }}">
    {{ for v in color._variants }}
      <size>{{ v.size }}</size>
    {{ end }}
  </color>
{{ end }}
```

Each group also carries the values of its first variant, so `color.color_name` works without reaching into `_variants`. Variants that have no `color_code` are not dropped — they form one group whose key is empty, so the template above emits `<color code="">` around them.

#### `export.collect_attribute_values`

Every distinct value of an attribute across a list of variants — for a summary line such as all sizes a product comes in.

```plaintext frame="none"
{{ variants | export.collect_attribute_values 'size' | array.join ', ' }}
```

Pass `true` as a second argument to flatten values that are themselves lists.

### The channel run

#### `export.account_id`

Your account's internal id — useful as a stable identifier in a feed header.

```xml frame="none"
<feed account="{{ export.account_id }}">
```

### Escaping and strings

#### `export.xmlize`

Escapes `&`, `<`, `>`, `'` and `"` so a value is safe inside an XML document. **Use it on every value you place in XML** — a single ampersand in a product name produces an invalid file.

```plaintext frame="none"
<name>{{ record.product_name | export.xmlize }}</name>
```

For HTML, use Scriban's `html.escape`.

#### `export.sanitize_filename`

Replaces characters that are not valid in a file name with underscores.

```plaintext frame="none"
<file>{{ record.product_name | export.sanitize_filename }}.pdf</file>
```

#### `export.to_sorting_number`

Turns a string into an integer usable as a sort key. Empty values give `0`.

```plaintext frame="none"
<sort>{{ record.sku | export.to_sorting_number }}</sort>
```

#### `export.sv_additional_information`

Builds SmartView `additionalInformation` XML elements for an attribute, one per channel language. Specific to SmartView output — ignore it unless you are building that format.

```plaintext frame="none"
{{ export.sv_additional_information 'color' 1 }}
```

### Debugging

#### `debug.dump`

Prints all available template data as formatted JSON. The fastest way to find out what you can actually reach. See [testing and debugging](/en/channels/templates/testing.html#see-everything-that-is-available).

## Limits

| | |
| --- | --- |
| Loop iterations | 100,000 per top-level loop, counted afresh per record |
| File system access | None — see the caution at the top of this page |
