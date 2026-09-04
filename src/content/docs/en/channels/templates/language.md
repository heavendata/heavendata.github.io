---
title: "Template language basics"
description: "The Scriban syntax you need for a product template: output, conditions, loops, filters and whitespace."
---

Templates are written in **Scriban**. This page covers the syntax you need for a product template. For what data is available to put in it, see [the data in a template](/en/channels/templates/data.html); for the functions, see the [function reference](/en/channels/templates/functions.html).

:::note
Everything here is Scriban. If your channel's **Template language** is **Liquid** — legacy and only partially supported — none of this applies.

**Check the setting rather than assuming.** A channel where the language was never chosen runs as **Liquid** and shows Liquid under **Options → Template language** — an untouched older channel, or one created from a **Template "‹entity›" feed** card, is on Liquid without anyone having picked it. See [Template-based channels](/en/channels/templates.html#which-template-language).
:::

## Output a value

Anything between `{{` and `}}` is evaluated and its result written into the output. Everything outside stays as it is.

```xml frame="none"
<sku>{{ record.sku }}</sku>
```

## Statements

`{{` … `}}` also runs statements. Assign with `=`; the assignment itself prints nothing.

```plaintext frame="none"
{{ shipping = 4.95 }}
{{ total = record.price + shipping }}
Total: {{ total }}
```

Several statements can share one block, one per line:

```plaintext frame="none"
{{
  shipping = 4.95
  total = record.price + shipping
}}
```

## Comments

```plaintext frame="none"
{{# this never appears in the output #}}
```

Do not use your output format's comment syntax to hide template logic — an XML comment is still written to the file.

## Conditions

```plaintext frame="none"
{{ if record.stock > 0 }}
  <availability>in stock</availability>
{{ else if record.restock_date }}
  <availability>expected {{ record.restock_date }}</availability>
{{ else }}
  <availability>sold out</availability>
{{ end }}
```

An attribute that has no value is **absent** from the record, and an absent value is false. So the common "only output this if it is set" is just:

```plaintext frame="none"
{{ if record.description }}
  <description>{{ record.description }}</description>
{{ end }}
```

:::caution[Only an absent value is false]
This is narrower than it looks. An **empty string, a zero and an empty list are all true** in a template — only a value that is absent or explicitly null is false. So `{{ if record.price }}` is true when the price is `0`, and a guard like this will still emit an empty element if the attribute is stored with an empty value rather than left unset.

When it has to be non-empty, compare instead:

```plaintext frame="none"
{{ if record.description != '' && record.description }}
```
:::

That guard matters more than it looks. Reading a member of something that does not exist stops the template with an error like `Cannot get the member ... for a null object`, and one product missing one attribute fails the whole run.

## Loops

```plaintext frame="none"
{{ for variant in variants }}
  <variant>{{ variant.ean }}</variant>
{{ end }}
```

Inside the loop `variant` is the current one and `record` still refers to the product.

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

```plaintext frame="none"
{{ record.description | html.escape }}
{{ html.escape record.description }}
```

Extra arguments follow the function name, separated by spaces:

```plaintext frame="none"
{{ for a in record.my_images }}
  <image>{{ a | asset.url 'shop-thumb' }}</image>
{{ end }}
```

You can also use the bracketed form with commas — `string.truncate(record.product_name, 20)`. What does **not** work is mixing them: spaces *and* commas without brackets is a parse error. Some functions need the bracketed form, notably [`export.load_custom_entities`](/en/channels/templates/data.html#reference-attributes--custom-entities) as a `for` loop's source.

Pipes chain left to right, which is how most real lines are built:

```plaintext frame="none"
{{ record.product_name | string.truncate 60 | export.xmlize }}
```

## Whitespace

Templates are usually indented for readability, and that indentation lands in the output. Harmless in XML, fatal in a fixed-width text format.

Add `-` to a delimiter to strip whitespace on that side:

```plaintext frame="none"
{{- record.sku -}}
```

- `{{-` removes whitespace **before** the block
- `-}}` removes whitespace **after** it

To keep a large XML template readable without shipping blank lines, put `-` on the control statements:

```xml frame="none"
<product>
  {{- if record.description }}
  <description>{{ record.description }}</description>
  {{- end }}
</product>
```

## Strings and escaping

Single and double quotes both work. Concatenate with `+`.

```plaintext frame="none"
{{ 'SKU-' + record.sku }}
```

**Escaping is not automatic.** A product name containing `&` or `<` will break an XML document unless you escape it. Use `export.xmlize` for XML and `html.escape` for HTML — see the [function reference](/en/channels/templates/functions.html#escaping-and-strings).

## What to read next

- [The data in a template](/en/channels/templates/data.html) — `record`, `variants`, and each attribute type
- [Template function reference](/en/channels/templates/functions.html) — everything callable
- [Testing and debugging templates](/en/channels/templates/testing.html)
