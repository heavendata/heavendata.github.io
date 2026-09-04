---
title: "Custom entities in a template"
description: "Read the records a reference attribute links to, load their own attributes with export.load_custom_entities, and look custom entity records up by any value."
sidebar:
  label: "Custom entities"
---

A **reference** attribute links a product to records of a [custom entity](/en/concepts/custom-entities.html) — its certificates, its manufacturer, its care instructions. The attribute itself carries only each linked record's id, name and identifier; **to read anything else you need `export.load_custom_entities`**, or `export.custom_entity` for lookups that are not driven by a reference. This page covers all three.

## The reference attribute

When it has links, it holds a **list**, even if there is only one.

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

## Reading every linked record — `export.load_custom_entities`

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

`_meta.name` and `_meta.identifier` always match the reference's own `target_name` and `target_identifier`, so a loop over `export.load_custom_entities` does not need to carry the reference alongside it.

A wrong attribute code, an attribute that is not a reference attribute, or a reference to something other than a custom entity (a product reference, for example) is reported in the job log — see [background jobs](/en/troubleshooting/background-jobs.html) — rather than left for you to guess at from an empty result.

## Reading one linked record you already have a reference for

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
**The long form still works, but it has a trap.** `get('id.entityid', r.target_id)` and `get('meta.identifier', r.target_identifier.value)` are the two valid pairings, and the `.value` is required — mix them up or drop the `.value` and the lookup silently finds nothing. `get(r)` exists so you never need either.
:::

:::caution
**`get` returns nothing for a reference whose target has since been deleted** — an account's data can always drift out of sync with what a product still links to. `get(r)` returns null in that case, same as any other unmatched lookup; the `if` above guards against it. Without it the template stops with `Cannot get the member ... for a null object`. `export.load_custom_entities` (above) does not need this guard — it skips a deleted target and reports it in the job log instead of leaving a gap in the list.
:::

## Looking up by any text attribute

For a lookup that is not reference-driven — every manufacturer in Germany, say, rather than the one(s) a product links to — use `export.custom_entity(key).get` or `.find` with any attribute code, passing the custom entity's key from **Settings → Custom entities**:

```plaintext frame="none"
{{ for m in export.custom_entity('manufacturer').find('country_code', 'DE') }}
  {{ m._meta.name }}
{{ end }}
```

`get` returns the first match, `find` returns all of them. The value must match exactly — the comparison is case sensitive, with no partial matching.

:::note[Performance]
The first lookup on a custom entity loads **all** of its records and keeps them for the rest of the run — including every record `export.load_custom_entities` resolves, since it shares this same cache. A second lookup **attribute** adds an index over those same records rather than loading them again, so looking up by several attributes of the same custom entity is cheap.
:::

## `export.custom_entity` — reference

| | |
| --- | --- |
| `.get` *attribute*, *value* | The first matching record. Also accepts a reference directly — `export.custom_entity('manufacturer').get(r)` — as a shortcut for a template that already holds one. The value must match exactly: case sensitive, no partial matching. |
| `.find` *attribute*, *value*, *limit* | **All** matching records, optionally capped. Use it where one value matches several records. Same exact-match rule. |
| `.key` | The custom entity's key, as stored. |

## The old `<attribute>.data.<attribute>` fields

Older templates may read a linked record through keys like `record.manufacturer.data.support_url`. Those keys are gone; replace them with `export.load_custom_entities` (above).
