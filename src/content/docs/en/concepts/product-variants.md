---
title: "Product variants"
description: "How a variant configuration splits a product into product variants, which attributes can split a product, and how to set up a variant configuration on a product type."
sidebar:
  order: 5
---
Product variants let you manage all versions of one product together. A typical example is a fashion product sold in several sizes.

| Product name | Size code | Material | SKU |
| --- | --- | --- | --- |
| Shirt with logo | S | Cotton | shirt1-s |
| Shirt with logo | M | Cotton | shirt1-m |
| Shirt with logo | L | Cotton | shirt1-l |
| Shirt uni | S | Linen | shirt2-s |
| Shirt uni | M | Linen | shirt2-m |
| Shirt uni | L | Linen | shirt2-l |

These are two products, each sold in three sizes. Without product variants they would be six independent products, and a changed text or a new product image would have to be entered six times.

With product variants, *Shirt with logo* and *Shirt uni* are two products with three product variants each. Two things decide how:

- **The attribute that splits a product into product variants**, here *Size code*. Each of its values becomes one product variant.
- **Which attributes hold one value for the whole product** and which hold one for each product variant. Here *Product name* and *Material* hold one value for the whole product, and *SKU* one for each product variant.

Both are set in a **variant configuration**, which belongs to a [product type](./product-types.html). A variant configuration can split a product more than once, into up to five levels: *Color, then size* first splits a product by color, then each color by size, and the sizes are its product variants. A product type can have several variant configurations, and each product uses one of them.

## Which attributes can split a product

Only Text, Integer number and Number with decimals attributes that are not translatable can split a product into product variants. When you choose the attribute for a level, the list offers only those. Saving a product type checks the same rule: if a variant configuration splits by any other attribute, **Save** is refused and the message names the attribute: *Couldn't save the product type. "Color" can't split products into product variants. Only Text, Integer number and Number with decimals attributes that aren't translatable can. Choose another attribute.*

An attribute a variant configuration splits by is always part of the product type: on the product type's page its tick cannot be removed ([Attribute sections](./product-types.html#attribute-sections)).

## Set up a variant configuration

1. In the sidebar, open **Settings → Product types** and select the product type, or create a new one ([Product types](./product-types.html)).
2. Under **Variant configurations**, choose **New variant configuration**.
3. Give it a **Name**, such as *Color, then size*.
4. Under **Level 1**, choose the attribute that splits a product first, such as *Color*. To split it again, choose **Add level** and choose the attribute for **Level 2**, such as *Size*. A variant configuration has up to 5 levels, and no two levels split by the same attribute.
5. Choose **Create**. The **Variant configuration** window opens, where you choose which attributes each level holds ([below](#choose-which-attributes-each-level-holds)). Close it when you are done; the variant configuration is listed under **Variant configurations**, and each attribute it splits by is now included in the product type.
6. Choose **Save** on the product type, or **Create** on a product type not yet created. Nothing about the variant configuration is saved before that.

**Allow products without product variants**, under **Variant configurations** and available once the product type has a variant configuration, decides whether a product of this type can also be created without product variants. Untick it if every product of this type has product variants.

### Choose which attributes each level holds

The **Variant configuration** window opens when you create a variant configuration, and again when you select one under **Variant configurations**. It has one column for the whole product and one for each level:

| Column | An attribute in it holds |
| --- | --- |
| **Whole product**, *One value for the whole product* | One value for the whole product, the same for every product variant, such as *Product name* or *Material*. |
| **Level 1**, *By color* | One value for each value of the level's attribute, such as one set of images for each color. |
| The last level, such as **Level 2**, *By Size* | One value for each product variant, such as its *SKU* or *GTIN*. |

Drag an attribute to the column where it belongs. The attribute that splits a level stays in that level's column. **Remove from level**, the minus beside an attribute, moves it back to **Whole product**.

<!-- Screenshot: the Variant configuration window for Color, then size, with Whole product, Level 1 By color and Level 2 By Size. -->

### Check it

Open **Products** in the sidebar and choose **New product**. Select the product type, then the variant configuration, and check that the product editor shows each attribute where you expect it.

## Variant fields in an export

An exported product row carries its variant structure as fields — **Variant dimensions**, **Variant path**, **Parent variant ID** and **Has product variants**. What each holds: [record keys](/en/reference/record-keys.html#product-keys).
