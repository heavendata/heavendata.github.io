---
title: "Attribute roles"
description: "Roles tell heavendata which attribute holds the SKU, the base code, the name and the images. The five required roles, and how a ready-made product type assigns them for you."
sidebar:
  order: 2
---

A role tells heavendata what an attribute holds. Your catalog structure is yours to define, so the app has to learn which of your attributes holds the product name, which one holds the SKU it should match imports on, and which one holds the images. You tell it by giving the attribute a role: the attribute that holds the name gets the role `product.name`.

Roles are set on the attribute, under **Settings → Attributes & sections → the attribute → Roles**. A [ready-made product type](#a-ready-made-product-type-assigns-the-required-roles) assigns the required roles for you.

## Required roles

The app relies on these five roles. Assign each to one attribute.

| Role | What it marks |
| --- | --- |
| `system.identifier` | The attribute that identifies a product variant, in most cases the SKU. An import uses it to decide whether a row updates an existing product or creates a new one. |
| `system.basecode` | The code a product's variants share. Imported rows with the same base code are merged into one product with variants. |
| `product.name` | The product's name. The app shows it wherever it names a product. |
| `product.sku` | The stock keeping unit, the code that is unique for each product variant. |
| `product.image` | The asset attribute that holds the product's images. |

## A ready-made product type assigns the required roles

When you create a [ready-made product type](/en/start/ready-made-product-types.html), its attributes get the required roles without you doing anything:

| Attribute | Roles it gets |
| --- | --- |
| SKU | `product.sku`, its own role, and `system.identifier` |
| Article number | `system.basecode` |
| Name | `product.name` |
| Images | `product.images`, its own role, and `product.image` |

The roles `system.identifier`, `system.basecode` and `product.image` are added only when no attribute in your account holds them yet. If your own attribute already has `system.identifier`, the ready-made SKU attribute is created without it, and yours stays the identifier. `product.name` works the other way around: it is the Name attribute's own role, so an attribute of yours that holds it is reused as Name and no second Name is created.

Every attribute a ready-made product type creates carries a role of its own, such as `heavendata.net-weight` or `product.images`. That role is how a later ready-made product type finds the attributes it can reuse: it looks for the role, not for the name. A *Shoes* product type created after *Tops & shirts* finds the *Care instructions* attribute by its role and reuses it, even if you have renamed it to *Washing*. The Roles field shows these roles by their id and keeps them when you save the attribute. What reuse means on the create page is on [Product types](./product-types.html#choose-its-attributes).

## Other roles

Other roles are not required. They help the app map your data to the formats target systems expect, such as which attribute holds the GTIN or the brand. You can ignore them during setup.
