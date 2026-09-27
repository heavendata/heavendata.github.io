---
title: "Record keys"
description: "Every key a product or custom entity record carries in an export besides your custom attributes: what it holds, which field it is on the Mapping step, and how a template spells it."
sidebar:
  order: 4
---

Every record a channel exports carries a fixed set of keys next to your own custom attributes: **fourteen for a product row** and **six for a custom entity record**. The tables below list each key, the field name the Mapping step shows for it, and what it holds.

Three words are used on this page:

| Term | Meaning |
| --- | --- |
| **Field** | Any piece of data a product or a custom entity carries. Everything on this page is a field. |
| **Custom attribute** | A field you define yourself. Its key is `data.` followed by the attribute code, for example `data.color`. |
| **System field** | A field the platform records for its own bookkeeping: the ID, the created date and the updated date. |

Categories, prices, delivery windows and the product type are neither a custom attribute nor a system field. They are part of what a product is, so they are simply fields.

## One key, two spellings

The Mapping step and a template read the same record, but they spell its keys differently. The Mapping step shows the key as the record stores it. A template puts an underscore in front of it:

| On the Mapping step | In a template |
| --- | --- |
| `meta.created` | `_meta.created`, for example `record._meta.created` |
| `id.entityid` | `_id.entityid` |
| `meta.producttype.key` | `_meta.producttype.key` |
| `prices` | `_prices` |
| `deliverywindows` | `_deliverywindows` |
| `categories` | `_categories` |
| `data.color` | `color` — a custom attribute loses its `data.` prefix instead |

The rule: a key that starts with `id.` or `meta.`, and the three keys `prices`, `deliverywindows` and `categories`, get an underscore in a template. For categories the underscore also keeps the product's categories apart from a custom attribute you may have coded `categories`: the attribute stays `record.categories`, and the product's categories are `record._categories`. Don't give a custom attribute the code `prices` or `deliverywindows` — it takes the place of the product's own list in an export.

The dots in a key are levels in a template: `_meta.producttype.key` is read as `record._meta.producttype.key`.

In a *Text template* node of a field processing pipeline, `record._categories` is not available — see [the data in a template](/en/channels/templates/data.html).

## Product keys

A product feed writes one row per product variant, and one row for a product that has no product variants. A template channel also sees the levels above the product variants. These fourteen keys are on the row as well as your custom attributes. **Two of them are in the record but not offered as a source field on the Mapping step**; a template can still read both.

| Key | Field on the Mapping step | Group | What it holds |
| --- | --- | --- | --- |
| `id.entityid` | Variant ID | Identifiers | The ID of the product variant this row is. |
| `meta.rootid` | Product ID | Identifiers | The ID of the product the row belongs to. The same on every row of one product. |
| `meta.parentid` | Parent variant ID | Identifiers | The ID of the level above this row in the product's variants — the product itself, or an intermediate level for a product with several variant levels. Not on the product's top level. |
| `meta.created` | Created on | Dates | When the product was created. The same on every row of one product. |
| `meta.updated` | Last updated | Dates | When the product was last changed. The same on every row of one product. |
| `meta.producttype.key` | Product type key | Classification | The key of the product's product type, for example `shirt`. |
| `meta.producttype.name` | Product type name | Classification | The display name of the product's product type, for example `Shirt`. |
| `categories` | *Not offered* | — | The categories the row is in, as a list of objects with `key`, `name`, `sort_index`, `parent_key` and `path`. Always present, and an empty list when there are none. How to read it in a template: [Categories](/en/channels/templates/data.html#categories). |
| `meta.variantdimensions` | Variant dimensions | Product variants | The attribute codes that split the product into product variants, one list per level from the top, for example `[["color"], ["size"]]`. The same on every row of one product. |
| `meta.dimensionpath` | Variant path | Product variants | This row's values for those attributes, one entry per level from the top, for example `["red", "M"]`. Where one level splits on several attributes, their values are joined with a comma. Only on rows that are a product variant. |
| `meta.isvirtual` | Has product variants | Product variants | `true` on a row that has product variants below it, `false` on the lowest level. A feed mapped on the Mapping step writes the lowest level only, so there it is always `false`. |
| `prices` | Prices | Prices and availability | The row's prices, as a list. Only on rows that have prices. |
| `deliverywindows` | Delivery windows | Prices and availability | The row's delivery windows, as a list. Each has a `name` and an optional `from` and `until` date. Only on rows that have delivery windows. |
| `id.stage` | *Not offered* | — | `draft` or `live` — which version of the products the run exported. The same on every row of one run. |

Where a row "only" carries a key, a column mapped from it is empty on the other rows.

Two further fields appear on the Mapping step of an **import** but are not in an exported record: **Variant space ID** and **Language code**. See [which fields an import can set](/en/channels/setup-custom-product-feed.html#which-fields-an-import-can-set).

## Custom entity keys

A custom entity channel writes one row per record. These six keys are on the row as well as the custom entity's custom attributes. **Two of them are in the record but not offered as a source field on the Mapping step**; a template can still read both.

| Key | Field on the Mapping step | Group | What it holds |
| --- | --- | --- | --- |
| `id.entityid` | Record ID | Identifiers | The ID of the record. |
| `meta.typekey` | Custom entity key | Classification | The key of the custom entity the record belongs to, as set in its settings. |
| `meta.created` | Created on | Dates | When the record was created. |
| `meta.updated` | Last updated | Dates | When the record was last changed. |
| `meta.name` | *Not offered* | — | The value of the custom entity's **label attribute**. To map it, pick that attribute itself under **Attributes**. |
| `meta.identifier` | *Not offered* | — | The value of the custom entity's **identifier attribute**. To map it, pick that attribute itself under **Attributes**. |

`meta.name` and `meta.identifier` are left out of the Mapping step because they are the same values as two of your own custom attributes: the one you chose as the label attribute and the one you chose as the identifier attribute. See [custom entity settings](/en/concepts/custom-entities.html#custom-entity-settings).

In a template the two are `_meta.name` and `_meta.identifier`; reading them on a linked record is covered in [custom entities in a template](/en/channels/templates/custom-entities.html).

## Related

- [Custom product feeds → Mapping](/en/channels/setup-custom-product-feed.html#mapping) — picking these fields as sources
- [The data in a template](/en/channels/templates/data.html) — `record`, `variants` and attribute values
- [Product variants](/en/concepts/product-variants.html) — how a product type splits a product into product variants
