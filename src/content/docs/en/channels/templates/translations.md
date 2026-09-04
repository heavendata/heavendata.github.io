---
title: "Translatable attributes in a template"
description: "Read a translatable attribute in one language with a fallback, loop over the channel's languages, and output attribute labels per language."
sidebar:
  label: "Translatable attributes"
---

A translatable attribute holds one value per language, so reading it needs a language code — through **`i18n.t`**. Read it bare and you get the whole list of translations as `{key: "de", value: ...}` pairs, not a value. This page covers `i18n.t` and `i18n.has`, the channel's languages in `export.culture_codes`, and translated attribute labels.

## Read one language — `i18n.t`

```plaintext frame="none"
{{ record.my_translatable_attr | i18n.t 'en-US' }}
```

With a fallback when that language has **no entry**:

```plaintext frame="none"
{{ record.my_translatable_attr | i18n.t 'en-US' 'No value available' }}
```

A value stored as an empty string is an entry, so the fallback does not replace it. For "non-empty, or the fallback", add `object.default`:

```plaintext frame="none"
{{ record.my_translatable_attr | i18n.t 'en-US' | object.default 'No value available' }}
```

### Which code finds what

The codes are the ones configured under **Settings → Languages**. A code with a region also answers to its bare language code; the reverse is not true.

| Configured in the account | `i18n.t 'en-US'` | `i18n.t 'en'` |
| --- | --- | --- |
| `en-US` | finds it | finds it |
| `en` | finds nothing | finds it |
| `de-DE` **and** `de-AT` | — | `'de'` resolves to just **one** of them; pass the full code |

:::caution
A code that matches nothing returns an empty value **silently** — no error, no log entry.
:::

## Check whether a language has a value — `i18n.has`

True if the attribute has an entry stored for **exactly** that language.

```plaintext frame="none"
{{ if record.my_translatable_attr | i18n.has 'de-DE' }}
  <description>{{ record.my_translatable_attr | i18n.t 'de-DE' }}</description>
{{ end }}
```

:::caution[`i18n.has` and `i18n.t` do not answer the same question]
`i18n.has` checks only whether a key exists for that exact language. It does **not** follow the language fallback that `i18n.t` uses, and it returns `true` for a stored but empty value.

So the pairing above can still emit an empty `<description>`, and it can skip one where `i18n.t` would have produced a value from a fallback language. To guarantee a non-empty element, test the translated value instead:

```plaintext frame="none"
{{ desc = record.my_translatable_attr | i18n.t 'de-DE' }}
{{ if desc != '' }}
  <description>{{ desc }}</description>
{{ end }}
```
:::

## The channel's languages — `export.culture_codes`

`export.culture_codes` lists the languages in this channel — the ones selected, or all configured languages. `export.language_codes` gives the language part only, without the region.

```plaintext frame="none"
{{ for code in export.culture_codes }}{{ code }} {{ end }}
```
```plaintext frame="none"
en-US fr-FR
```

That is what lets one template serve every language:

```xml frame="none"
{{ for c in export.culture_codes }}
  <name lang="{{ c }}">{{ record.my_translatable_attr | i18n.t c }}</name>
{{ end }}
```

`export.culture_code_uc` swaps the dash for an underscore, which some systems require:

```plaintext frame="none"
{{ for code in export.culture_codes }}{{ code | export.culture_code_uc }} {{ end }}
```
```plaintext frame="none"
en_US fr_FR
```

:::note
**"Culture" and "language" mean the same thing here.** The template functions use *culture* — the technical term for a language as spoken in a particular region — while the app says *language*. If a language is configured without a region, `culture_codes` contains just the language code.
:::

## Attribute labels in each language

### `export.attr_label`

An attribute's label in one language, falling back to the attribute name when no translation exists.

```plaintext frame="none"
{{ export.attr_label 'color' 'en-US' }}
```

### `export.xml_attr_labels`

Builds a set of XML attributes carrying an attribute's label in every language of the channel.

```plaintext frame="none"
<field {{ export.xml_attr_labels 'color' 'label_' }}/>
```
```xml frame="none"
<field label_en-US="Color" label_de-DE="Farbe" />
```

Pass `true` as a third argument to use underscores in the language codes (`label_en_US`).

For the other attribute metadata — name, whether it is required or translatable — see [attribute metadata](/en/channels/templates/data.html#attribute-metadata).

## What to read next

- [The data in a template](/en/channels/templates/data.html) — `record`, `variants`, and plain attributes
- [Template function reference](/en/channels/templates/functions.html) — everything callable
- [Testing and debugging templates](/en/channels/templates/testing.html) — when a value comes out empty
