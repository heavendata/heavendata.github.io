---
title: "Template function reference"
description: "Every function available in a template — the Scriban built-ins we support, and the heavendata additions."
sidebar:
  order: 23
---

Every function a template can call. Two groups: the **[Scriban built-ins](#scriban-built-ins)** we make available, and the **[heavendata functions](#heavendata-functions)** we add for product data.

:::caution[Not every Scriban built-in is available]
Scriban's own documentation lists a `fs` namespace for reading files. **`fs` is not available here** — templates cannot touch the file system. Examples using it will fail. The complete list of what *is* available is below.
:::

## Scriban built-ins

These namespaces are available in every template. They behave exactly as Scriban documents them, so we link out for the individual functions rather than restating them.

| Namespace | What it does | Reference |
| --- | --- | --- |
| `array` | Sort, filter, join, take, and other list operations | [array functions](https://scriban.github.io/doc#array-functions) |
| `date` | Format and calculate with dates | [date functions](https://scriban.github.io/doc#date-functions) |
| `html` | Escape, strip and encode HTML | [html functions](https://scriban.github.io/doc#html-functions) |
| `math` | Round, format, and arithmetic helpers | [math functions](https://scriban.github.io/doc#math-functions) |
| `object` | Inspect and convert values | [object functions](https://scriban.github.io/doc#object-functions) |
| `regex` | Match, replace and split with regular expressions | [regex functions](https://scriban.github.io/doc#regex-functions) |
| `string` | Trim, pad, case, truncate, split, replace | [string functions](https://scriban.github.io/doc#string-functions) |
| `timespan` | Durations | [timespan functions](https://scriban.github.io/doc#timespan-functions) |
| `empty` / `blank` | The empty value, for comparisons | — |
| `include` | Include another template | — |

The ones that come up constantly in product templates:

```plaintext frame="none"
{{ record.description | html.escape }}
{{ record.product_name | string.truncate 60 }}
{{ record.price | math.format '0.00' }}
{{ record.release_date | date.to_string '%F' }}
```

`date.to_string` takes the same format strings as [Scriban's `date.to_string`](https://scriban.github.io/doc#dateto_string) — `%F` gives `2026-09-03`.

## heavendata functions

Four namespaces we add. These are specific to product data and are documented in full here, because they are not in Scriban's documentation.

### Assets

#### `asset.url`

The full public URL of an asset.

```plaintext frame="none"
{{ myImage | asset.url }}
{{ myImage | asset.url 'my-variant' }}
{{ myImage | asset.url 'shop-thumb' 'thumb.png' }}
```

| Argument | Description |
| --- | --- |
| *variant* | An [image variant](/en/assets/asset-variants.html) key. Omit for the original file. |
| *filename* | Force a file name in the URL instead of the stored one. |
| *sanitize* | `true` strips characters that are not valid in a Windows file name. |

#### `asset.updated`

When the asset was last modified. Assets uploaded before 9 September 2022 return that date.

```plaintext frame="none"
{{ myImage | asset.updated }}
{{ myImage | asset.updated | date.to_string '%F' }}
```

### Languages

#### `i18n.t`

The value of a translatable attribute in one language, with an optional fallback.

```plaintext frame="none"
{{ record.my_translatable_attr | i18n.t 'en-US' }}
{{ record.my_translatable_attr | i18n.t 'en-US' 'No value available' }}
```

#### `i18n.has`

True if the attribute has a value in that language. Use it when you want to skip an element entirely rather than emit an empty one.

```plaintext frame="none"
{{ if record.description | i18n.has 'de-DE' }}
  <description>{{ record.description | i18n.t 'de-DE' }}</description>
{{ end }}
```

### The channel run

#### `export.culture_codes` · `export.language_codes`

The languages in this channel. `culture_codes` gives `en-US`; `language_codes` gives `en`.

#### `export.culture_code_uc`

A culture code with an underscore instead of a dash: `en-US` → `en_US`.

#### `export.attribute`

Every configured attribute, keyed by code — `id`, `name`, `required`, `translatable`, `labels`. See [attribute metadata](/en/channels/template-data.html#attribute-metadata).

#### `export.attr_label`

An attribute's label in one language, falling back to the attribute name.

```plaintext frame="none"
{{ export.attr_label 'color' 'en-US' }}
```

#### `export.custom_entity`

Look up records of a custom entity. Fully described under [reference attributes](/en/channels/template-data.html#reference-attributes--custom-entities).

#### `export.variants_by`

Group the current product's variants by an attribute, and reach each group's variants through `_variants`. Written for the common case of grouping by colour and listing sizes underneath.

```plaintext frame="none"
{{ for color in export.variants_by 'color_code' }}
  <color code="{{ color.color_code }}">
    {{ for v in color._variants }}
      <size>{{ v.size }}</size>
    {{ end }}
  </color>
{{ end }}
```

Each group also carries the values of its first variant, so `color.color_name` works without reaching into `_variants`.

#### `export.collect_attribute_values`

Every distinct value of an attribute across a list of variants — for a summary line such as all sizes a product comes in.

```plaintext frame="none"
{{ variants | export.collect_attribute_values 'size' | array.join ', ' }}
```

Pass `true` as a second argument to flatten values that are themselves lists.

#### `export.account_id`

Your account's internal id.

### Escaping and strings

#### `export.xmlize`

Escapes `&`, `<`, `>`, `'` and `"` so a value is safe inside an XML document. **Use it on every value you place in XML** — a single ampersand in a product name produces an invalid file.

```plaintext frame="none"
<name>{{ record.product_name | export.xmlize }}</name>
```

For HTML, use Scriban's `html.escape`.

#### `export.sanitize_filename`

Replaces characters that are not valid in a file name with underscores.

#### `export.to_sorting_number`

Turns a string into an integer usable as a sort key. Empty values give `0`.

#### `export.xml_attr_labels`

Builds a set of XML attributes carrying an attribute's label in every language of the channel.

```plaintext frame="none"
<field {{ export.xml_attr_labels 'color' 'label_' }}/>
```
```xml frame="none"
<field label_en-US="Color" label_de-DE="Farbe" />
```

Pass `true` as a third argument to use underscores in the language codes (`label_en_US`).

#### `export.sv_additional_information`

Builds SmartView `additionalInformation` XML elements for an attribute. Specific to SmartView output — ignore it unless you are building that format.

### Debugging

#### `debug.dump`

Prints all available template data as formatted JSON. The fastest way to find out what you can actually reach. See [testing and debugging](/en/channels/template-testing.html#see-everything-that-is-available).

## Limits

| | |
| --- | --- |
| Loop iterations | 100,000 per template |
| File system access | Not available |
