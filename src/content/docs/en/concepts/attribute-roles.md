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

## The identifier and base code roles need an attribute that isn't translatable

The attribute that holds `system.identifier` or `system.basecode` must not be **Translatable**: a product is matched by one value, not one per language. Give either role to an attribute that is not translatable. The message the app shows, and what to do, are in [A translatable attribute cannot be indexed or identify a product](./attributes.html#a-translatable-attribute-cannot-be-indexed-or-identify-a-product).

| Where the role is refused | Title of the refusal |
| --- | --- |
| The section editor, when you choose **Save** — under **Settings → Attributes & sections**, or a section opened from a product type (**Create**, for a section created there) | `Couldn't save the section` |
| The **Assign attribute roles** dialog | `Couldn't assign the role` |

The **Assign attribute roles** button shows while a role the app needs is not assigned: in the product imports while no attribute holds `system.identifier`, in the product editor while no attribute holds `system.identifier` or `product.name`, and in the product list's search while no attribute holds any of `product.sku`, `system.basecode`, `product.gtin` and `product.name`.

## A ready-made product type assigns the required roles

When you create a [ready-made product type](/en/start/ready-made-product-types.html), its attributes get the required roles without you doing anything:

| Attribute | Roles it gets |
| --- | --- |
| SKU | `product.sku`, its own role, and `system.identifier` |
| Article number | `system.basecode` |
| Name | `product.name` |
| Images | `product.images`, its own role, and `product.image` |

The roles `system.identifier`, `system.basecode` and `product.image` are added only when no attribute in your account holds them yet. If your own attribute already has `system.identifier`, the ready-made SKU attribute is created without it, and yours stays the identifier. `product.name` works the other way around: it is the Name attribute's own role, so an attribute of yours that holds it is reused as Name and no second Name is created.

Every attribute a ready-made product type creates carries a role of its own, such as `heavendata.net-weight` or `product.images`. That role is how a later ready-made product type finds the attributes it can reuse: it looks for the role, not for the name. A *Shoes* product type created after *Tops & shirts* finds the *Care instructions* attribute by its role and reuses it, even if you have renamed it to *Washing*. The Roles field shows these roles by their id and keeps them when you save the attribute. What reuse looks like when you create a ready-made product type is on [Product types](./product-types.html#choose-its-attributes).

## Other roles

The **Roles** field offers 20 more roles. None of them is required on a product attribute. Each option shows the role's name and its id, such as *product price (offer.price)*; type the id to find it in the list. Any of them can be given to a product attribute of any type. The field also shows, by its id, any other role an attribute already holds, such as a ready-made product type's own role.

Where the app reads a role, the last column says what for. A dash means the role only says what the attribute holds. *Reused by ready-made product types*: a ready-made product type that brings an attribute with this role uses yours — see [A ready-made product type assigns the required roles](#a-ready-made-product-type-assigns-the-required-roles).

| Role | What it marks | What the app does with it |
| --- | --- | --- |
| `system.customEntityName` | The attribute whose value is shown as a custom entity record's name | Set for you when you choose the custom entity's **Label attribute** — see [Custom entities](./custom-entities.html#general) |
| `articleNumber` | An article number that groups the variants of an article | Reused by ready-made product types |
| `product.gtin` | The GTIN (Global Trade Item Number) | The product list's search looks in it. A product import suggests a column of GTINs for this attribute. Reused by ready-made product types |
| `product.ean` | The EAN (European Article Number), the 13-digit GTIN | — |
| `product.upc` | The UPC (Universal Product Code), the 12-digit GTIN | — |
| `product.isbn` | The ISBN (International Standard Book Number) | — |
| `product.asin` | The ASIN (Amazon Standard Identification Number) | — |
| `product.mpn` | The manufacturer part number | Reused by ready-made product types |
| `product.description` | The product description | Reused by ready-made product types |
| `product.brand` | The brand name | Reused by ready-made product types |
| `offer.url` | The product's landing page | Reused by ready-made product types |
| `offer.mobileUrl` | The product's landing page for mobile devices | — |
| `offer.availability` | The product's availability | — |
| `offer.availabilityStarts` | The date the product becomes available | — |
| `offer.availabilityEnds` | The date the product stops being available | — |
| `offer.price` | The selling price, kept in a money attribute — see [Money attributes and prices](./money-attributes.html#money-attributes-and-prices) | — |
| `40three.msrp` | The suggested retail price (MSRP), kept in a money attribute | — |
| `40three.stock` | Stock: how many of the product variant can be sold | — |
| `offer.itemCondition` | The product's condition | — |
| `40three.energyEfficiencyClass` | The energy efficiency class | — |
