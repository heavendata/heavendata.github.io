---
title: "Attributes & sections"
reviewed: false
sidebar:
  order: 1
---
The goal of a product information management system is to be the single source of truth for all your product data in the best possible quality. You can store text information, product relations and other data types, and binary assets and categories.

This document describes what attributes are and how to manage them.

## Concept
It's crucial to have all pieces of information in dedicated fields. We call these fields "product attributes." Typical examples for attributes are "product name", "width", "material", "color", ... If you're working with Excel or databases, one product attribute will store the data of one column in a worksheet.

Note: Do not add all those data in one single text attribute. Prefer one attribute for each fact.

A selling price is not an attribute: a product variant has its own prices, in price lists — see [Money attributes and prices](./money-attributes.html#money-attributes-and-prices).

### Attribute Sections
An attribute is always part of one attribute section — just a group for better readability.

Example:

* Section "Technical details" with attributes "power consumption", "voltage", ...
* Section "Common" with "name", "long description", "short description", "brand", ...

## Name and labels

An attribute has one **name**, the same in every language, and can have a **label** in each of your languages. Wherever the app shows an attribute — in the product editor, on the products list, and in every list, tile and picker under **Settings** — it shows the attribute's label in your working language, or its name where it has no label in that language.

| Field | Where you set it | What it is for |
| --- | --- | --- |
| **Name** | The attribute's **General** tab | Shown wherever the attribute has no label in your working language. |
| **Label translations** | The attribute's **Label translations** tab, one field per language | What the attribute is called in each language. Optional. |
| **Code** | The attribute's **General** tab, when you create it | Identifies the attribute in imports, exports and templates. The same in every language, and locked once the attribute is saved. |

Your **working language** is the language you see and edit product data in. It is your own choice, kept in your browser, and it is not the language of the app itself. Choose it with the language picker — the globe button showing a code such as `en-US` — on the products list or in the product editor. **Settings** has no language picker of its own and follows your working language. Until you choose one, the app uses the first language in the language picker's list. Labels do not use [fallback languages](./languages.html#fallback-languages): an attribute with no label in your working language shows its name. Two people with different working languages therefore see different words for the same attribute, in **Settings** too.

Labels are separate from **Translatable**. Every attribute can have labels; **Translatable** decides whether the attribute's *values* differ per language.

Searches match an attribute's label, its name and its code: the column filter on the **Attributes list** and every attribute picker find the attribute, and the search box on **Attributes & sections** finds the section that holds it. The **Attributes list** heads its first column **Label**, and its export writes what the list shows. When you process that export, match attributes on the **Code** column — the **Label** column changes with the language.

## Edit attributes

1. Go to Settings > Attributes & Sections
2. Select the section that contains the attributes you want to edit or create a new section
3. Add or update attributes
4. Save it
5. Go to Settings > Product types and enable new attributes where you need them

## How To...

### Change Attribute Type or Translatable Settings Later?
The attribute type and translatable settings affect how data is stored in database. For this reason, you cannot change those settings for existing attributes. If you need to change them, follow the following procedure:

1. Export products (product list > export) and select the product identifier column and the column you need to change
2. Verify your export and ensure it contains the proper data
3. Delete the attribute
4. Create a new attribute with the same name and code
5. Enable the new attribute in product types
6. Re-import products from step 2 (product list > import)

## Related Articles

* [Product types](./product-types.html) - enable attributes for product types
* [Common attributes](./common-attributes.html) - enable attributes for all products
* [Money attributes](./money-attributes.html) - amounts with a currency
* [Optimize catalog structure](../initial-setup/optimize-catalog-structure.html)
Guide covering attributes and product types management.