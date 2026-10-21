---
title: "Attribute roles"
description: "Roles tell heavendata which attribute holds the SKU, the base code, the name and the images. The five required roles, and how a ready-made product type assigns them for you."
sidebar:
  order: 2
---

A role tells heavendata what an attribute holds. Your catalog structure is yours to define, so the app has to learn which of your attributes holds the product name, which one holds the SKU it should match imports on, and which one holds the images. You tell it by giving the attribute a role: the attribute that holds the name gets the role `product.name`.

Roles are set on the attribute, under **Settings → Attributes & sections → the attribute → Roles**. A [ready-made product type](#a-ready-made-product-type-assigns-the-required-roles) assigns the required roles for you.

## Required roles

Every account needs these five roles assigned, one attribute each.

| Role | What it marks |
| --- | --- |
| `system.identifier` | The attribute that identifies a product variant, in most cases the SKU. An import uses it to decide whether a row updates an existing product or creates a new one. The API uses it to address a single product. |
| `system.basecode` | The code a product's variants share. Imported rows with the same base code are merged into one product with variants. |
| `product.name` | The product's name. The app shows it wherever it names a product. |
| `product.sku` | The stock keeping unit, the code that is unique for each product variant. |
| `product.image` | The asset attribute that holds the product's images. |

## A ready-made product type assigns the required roles

When you create a [ready-made product type](/en/start/ready-made-product-types.html), its attributes get the required roles without you doing anything:

| Attribute | Roles it gets |
| --- | --- |
| SKU | `system.identifier` and `product.sku` |
| Article number | `system.basecode` |
| Name | `product.name` |
| Images | `product.image` |

A required role is added only when no attribute in your account holds it yet. If your own attribute already has `product.name`, the ready-made product type's Name attribute is created without it, and your attribute stays the name.

Every attribute a ready-made product type creates also carries a role that identifies it to heavendata, such as `heavendata.net-weight`. That role is how a second ready-made product type knows which of your attributes it can reuse: it looks for the role, not for the name. A *Shoes* product type created after *Tops & shirts* finds the *Size type* attribute by its role and reuses it, even if you have renamed it to *Sizing*. An attribute you built by hand has no such role, so a ready-made product type creates its own beside it. Reusing never changes your attribute: not its name, its values or its settings. The Roles field shows these roles by their id and keeps them when you save the attribute.

## Semantic roles

Other roles are not required. They help the app map your data to the formats target systems expect, such as which attribute holds the GTIN or the brand. You can ignore them during setup; the app asks for one when it needs it.
