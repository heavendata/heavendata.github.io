---
title: "Template language basics"
description: "The Scriban syntax you need for a product template: output, conditions, loops, filters and whitespace."
---

Templates are written in **Scriban**. This page covers the syntax you need for a product template. For what data is available to put in it, see [the data in a template](/en/channels/templates/data.html); for the functions, see the [function reference](/en/channels/templates/functions.html).

Examples with a **Try it** link open in Scriban's own playground, with the example and its sample data filled in. The playground runs the current Scriban release and has none of the heavendata functions, which is why examples using `export`, `asset`, `i18n` or `debug` carry no link.

:::note
Everything here is Scriban. If **Options → Template language** on your channel says **Liquid**, none of this applies — see [Which template language?](/en/channels/templates.html#which-template-language).
:::

## Output a value

Anything between `{{` and `}}` is evaluated and its result written into the output. Everything outside stays as it is.

```xml frame="none" try model='{"record":{"sku":"A-100"}}'
<sku>{{ record.sku }}</sku>
```

## Statements

`{{` … `}}` also runs statements. Assign with `=`; the assignment itself prints nothing — but the line break after it does, which is what the `-` is for (see [whitespace](#whitespace)).

```plaintext frame="none" try model='{"record":{"price":19.95}}'
{{ shipping = 4.95 -}}
{{ total = record.price + shipping -}}
Total: {{ total }}
```

Several statements can share one block, one per line:

```plaintext frame="none" try model='{"record":{"price":19.95}}'
{{
  shipping = 4.95
  total = record.price + shipping
}}
Total: {{ total }}
```

## Comments

```plaintext frame="none" try
{{# this never appears in the output #}}
```

Do not use your output format's comment syntax to hide template logic — an XML comment is still written to the file.

## Conditions

```plaintext frame="none" try model='{"record":{"stock":0,"restock_date":"2026-10-01"}}'
{{ if record.stock > 0 }}
  <availability>in stock</availability>
{{ else if record.restock_date }}
  <availability>expected {{ record.restock_date }}</availability>
{{ else }}
  <availability>sold out</availability>
{{ end }}
```

An attribute that has no value is **absent** from the record, and an absent value is false. So the common "only output this if it is set" is just:

```plaintext frame="none" try model='{"record":{"description":"A fine thing"}}'
{{ if record.description }}
  <description>{{ record.description }}</description>
{{ end }}
```

### What counts as false

Only two things are false in a condition: a value that is **absent** (or null), and the boolean **`false`**. Everything else is true — including the values other languages treat as empty.

| Value | `{{ if x }}` |
| --- | --- |
| Absent attribute, `null` | false |
| Boolean `false` | false |
| Boolean `true` | true |
| Number, **including `0`** | true |
| Text, **including `''`** | true |
| List, **including an empty one** | true |
| Translatable attribute | true |

So `{{ if record.price }}` is true when the price is `0`, and `{{ if record.description }}` is true when the description is stored as an empty string. When the value has to be present *and* non-empty, test for that — one guard per type:

```plaintext frame="none"
{{# number — false when absent, false when 0 #}}
{{ if record.price > 0 }}

{{# text — false when absent, empty, or only whitespace #}}
{{ if !(record.description | string.whitespace) }}

{{# list (assets, references) — test it exists before asking for its size #}}
{{ if record.my_images && record.my_images.size > 0 }}
```

### Comparing values of different types

`==` compares by value within a type. Across types it converts where it can and is false where it cannot — except that a **list or a translatable attribute compared to a number stops the run**.

| Comparison | Result |
| --- | --- |
| `0 == '0'`, `1 == '1'` | **true** — a numeric string compares as a number |
| `0 == false`, `1 == true` | **true** — booleans compare as `0` and `1` |
| `'' == 0`, `'' == false` | false |
| `null == false`, `null == 0`, `null == ''` | false — an absent value equals only `null` |
| `record.my_images == 0` | **error** — `Unable to convert type 'array' to int` |
| `record.my_translatable_attr == 0` | **error** — same, for a translatable attribute |

Ordering follows the same rules: `record.price > 0` is false when the price is absent, with no error, while `record.my_images > 0` stops the run. Text is converted too — `'a' > 0` is true — so compare numbers to numbers.

Reading a member of a missing value — `record.my_images.size`, `record.manufacturer[0]` — stops the whole run; a bare `{{ record.missing }}` just renders nothing. See [reading errors](/en/channels/templates/testing.html#reading-errors).

## Loops

```plaintext frame="none" try model='{"record":{"sku":"A-100"},"variants":[{"ean":"4006381333931"},{"ean":"4006381333948"}]}'
{{ for variant in variants }}
  <variant>{{ variant.ean }}</variant>
{{ end }}
```

Scriban provides a loop object:

| | |
| --- | --- |
| `for.index` | Position, starting at 0 |
| `for.first` / `for.last` | True on the first / last pass |
| `for.even` / `for.odd` | Alternating |

```plaintext frame="none"
{{ for c in export.culture_codes }}
  {{ c }}{{ if !for.last }},{{ end }}
{{ end }}
```

There is a **loop limit of 100,000 iterations per top-level loop**, counted afresh for each record — so two loops after one another each get the full budget, while nesting one inside another spends a single budget between them. A normal product template never approaches it; hitting it usually means a loop over the wrong thing.

`break` and `continue` work as expected.

## Filters — the `|` pipe

A pipe passes the value on the left as the **first argument** of the function on the right. These two are identical:

```plaintext frame="none" try model='{"record":{"description":"Fits <b>all</b> sizes & shapes"}}'
{{ record.description | html.escape }}
{{ html.escape record.description }}
```

Extra arguments follow the function name, separated by spaces:

```plaintext frame="none"
{{ for a in record.my_images }}
  <image>{{ a | asset.url 'shop-thumb' }}</image>
{{ end }}
```

You can also use parentheses with commas — `string.truncate(record.product_name, 20)`. What does **not** work is mixing them: spaces *and* commas without parentheses is a parse error. Some functions need parentheses, notably [`export.load_custom_entities`](/en/channels/templates/custom-entities.html#reading-every-linked-record--exportload_custom_entities) as a `for` loop's source.

Pipes chain left to right, which is how most real lines are built:

```plaintext frame="none"
{{ record.product_name | string.truncate 60 | export.xmlize }}
```

## Whitespace

Templates are usually indented for readability, and that indentation lands in the output. Harmless in XML, fatal in a fixed-width text format.

Add `-` to a delimiter to strip whitespace on that side:

```plaintext frame="none" try model='{"record":{"sku":"A-100"}}'
{{- record.sku -}}
```

- `{{-` removes whitespace **before** the block
- `-}}` removes whitespace **after** it

To keep a large XML template readable without shipping blank lines, put `-` on the control statements:

```xml frame="none" try model='{"record":{"description":"A fine thing"}}'
<product>
  {{- if record.description }}
  <description>{{ record.description }}</description>
  {{- end }}
</product>
```

## Strings and escaping

Single and double quotes both work. Concatenate with `+`.

```plaintext frame="none" try model='{"record":{"sku":"A-100"}}'
{{ 'SKU-' + record.sku }}
```

**Escaping is not automatic.** A product name containing `&` or `<` will break an XML document unless you escape it. Use `export.xmlize` for XML and `html.escape` for HTML — see the [function reference](/en/channels/templates/functions.html#escaping-and-strings).

## What to read next

- [The data in a template](/en/channels/templates/data.html) — `record`, `variants`, and plain attributes
- [Translatable attributes](/en/channels/templates/translations.html), [assets](/en/channels/templates/assets.html) and [custom entities](/en/channels/templates/custom-entities.html) — the value types that need a function
- [Template function reference](/en/channels/templates/functions.html) — everything callable
- [Testing and debugging templates](/en/channels/templates/testing.html)
