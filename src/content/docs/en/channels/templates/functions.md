---
title: "Template function reference"
description: "Every function available in a template — the Scriban built-ins we support, and the heavendata additions."
---

The functions a template can call. Two groups: the **[Scriban built-ins](#scriban-built-ins)** we make available, and the **[heavendata functions](#heavendata-functions)** we add for product data.

:::caution[Templates cannot read files]
There is no file system access from a template, and no template loader — so **`{{ include }}` always fails**, and `include_join` is not available at all. Anything in Scriban's documentation that loads a file or another template will not work here. The complete list of what *is* available is below.
:::

:::note[Two places a template runs]
This page describes a template used as a channel's **whole output** (`Format → Text`).

A template can also be used on a **single field**, through the *Text template* node in a field processing pipeline. There, the channel context does not exist: `export.culture_codes`, `export.language_codes` and `export.attribute` come back empty, `export.attr_label` and `export.xml_attr_labels` return an empty string, and `export.custom_entity` raises *"custom entity data is not available in mapper field templates"*. The Scriban built-ins, `string`, `math` and the like all behave normally.
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
{{ myImage | asset.url 'original' }}
{{ myImage | asset.url 'my-variant' }}
{{ myImage | asset.url 'shop-thumb' 'thumb.png' }}
```

:::caution[Only `'original'` keeps the file extension]
Every other variant may be stored in a different format, so the URL is built without one — `picture.png` becomes `…/picture`. If the system consuming your feed requires an image URL ending in `.png` or `.jpg`, either pass `'original'` or set the *filename* argument yourself.
:::

| Argument | Description |
| --- | --- |
| *variant* | An [image variant](/en/assets/asset-variants.html) key. **Omitting it gives the `default` variant, not the original** — pass `'original'` explicitly for the uploaded file. |
| *filename* | Force a file name in the URL instead of the stored one. |
| *sanitize* | `true` replaces characters that are not safe in a file name with underscores. |

#### `asset.updated`

When the asset was last modified. Assets with no stored modification date — everything from before that field was introduced — return **27 September 2022**.

Takes an optional *variant*: with one, you get the later of the asset's own date and that variant's last settings change, which is what you want for cache-busting a variant URL.

```plaintext frame="none"
{{ myImage | asset.updated }}
{{ myImage | asset.updated 'shop-thumb' }}
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

True if the attribute has an entry stored for **exactly** that language.

```plaintext frame="none"
{{ if record.description | i18n.has 'de-DE' }}
  <description>{{ record.description | i18n.t 'de-DE' }}</description>
{{ end }}
```

:::caution[`i18n.has` and `i18n.t` do not answer the same question]
`i18n.has` checks only whether a key exists for that exact language. It does **not** follow the language fallback that `i18n.t` uses, and it returns `true` for a stored but empty value.

So the pairing above can still emit an empty `<description>`, and it can skip one where `i18n.t` would have produced a value from a fallback language. To guarantee a non-empty element, test the translated value instead:

```plaintext frame="none"
{{ desc = record.description | i18n.t 'de-DE' }}
{{ if desc != '' }}
  <description>{{ desc }}</description>
{{ end }}
```
:::

### The channel run

#### `export.culture_codes` · `export.language_codes`

The languages in this channel. `culture_codes` gives `en-US`; `language_codes` gives `en`.

#### `export.culture_code_uc`

A culture code with an underscore instead of a dash: `en-US` → `en_US`.

#### `export.attribute`

Every configured attribute, keyed by code — `id`, `name`, `required`, `translatable`, `labels`. See [attribute metadata](/en/channels/templates/data.html#attribute-metadata).

#### `export.attr_label`

An attribute's label in one language, falling back to the attribute name.

```plaintext frame="none"
{{ export.attr_label 'color' 'en-US' }}
```

#### `export.load_custom_entities`

Every custom entity record a reference attribute links to, in link order. Takes the record (or a variant) and the attribute's code:

```plaintext frame="none"
{{ for cert in export.load_custom_entities(record, 'certificates') }}
  {{ cert.certificate_number }}
{{ end }}
```

Fully described under [reference attributes](/en/channels/templates/data.html#reference-attributes--custom-entities). Use parentheses around both arguments, especially as a `for` loop's source.

#### `export.custom_entity`

Look up records of a custom entity by any attribute — reference-driven or not. Fully described under [reference attributes](/en/channels/templates/data.html#reference-attributes--custom-entities).

| | |
| --- | --- |
| `.get` *attribute*, *value* | The first matching record. Also accepts a reference directly — `export.custom_entity('manufacturer').get(r)` — as a shortcut for a template that already holds one. |
| `.find` *attribute*, *value*, *limit* | **All** matching records, optionally capped. Use it where one value matches several records. |
| `.key` | The custom entity's key, as stored. |

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

Prints all available template data as formatted JSON. The fastest way to find out what you can actually reach. See [testing and debugging](/en/channels/templates/testing.html#see-everything-that-is-available).

## Limits

| | |
| --- | --- |
| Loop iterations | 100,000 per top-level loop, counted afresh per record |
| File system access | Not available — no `include`, no `include_join` |
