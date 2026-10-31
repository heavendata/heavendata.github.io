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

An attribute has one **name**, the same in every language, and can have a **label** in each of your languages. Wherever the app shows an attribute — in the product editor, on the products list, and in every list, tile and picker under **Settings** — it shows the attribute's label in your [working language](./languages.html#working-language), or its name where it has no label in that language. Two people with different working languages therefore see different words for the same attribute.

Labels do not use [fallback languages](./languages.html#fallback-languages). An attribute with no label in your working language shows its name, even when its fallback language has a label.

| Field | Where you set it | What it is |
| --- | --- | --- |
| **Name** | The attribute's **General** tab | The attribute's one name, the same in every language. Shown wherever the attribute has no label in your working language. |
| **Label translations** | The attribute's **Label translations** tab, one field per language | What the attribute is called in each language. Optional. |
| **Code** | The attribute's **General** tab, when you create it | Identifies the attribute in imports, exports and templates. The same in every language, and locked once the attribute is saved. To match attributes in a file you exported, use the code: a label changes with the working language. |

Labels are separate from **Translatable**: every attribute can have labels, while **Translatable** decides whether the attribute's *values* differ per language.

### Finding an attribute

| Where | What it matches | What it finds |
| --- | --- | --- |
| The **Label** column filter on the **Attributes list** | The label, the name and the code | The attribute |
| An attribute picker, as you type | The label, the name and the code | The attribute |
| The search box on **Attributes & sections** | A section's name, and each attribute's label, name and code | The section that holds the attribute |

The **Attributes list** heads its first column **Label**, and its export writes what the list shows under that header.

## Edit attributes

1. In the sidebar, open **Settings → Attributes & sections**.
2. Select the section that holds the attributes, or create a new section.
3. Add attributes with **New attribute**, change them, or change their order, as [A section's attributes](#a-sections-attributes) describes.
4. Choose **Save**. Nothing you changed in the section's attributes is saved before that, and leaving the page without saving loses it. A change to an attribute reaches every product type that includes it.
5. Open **Settings → Product types** and tick each new attribute in the product types that need it.

### A section's attributes

A section lists its attributes in their order, one row per attribute. Each row shows, from left to right:

| Part of the row | What it shows |
| --- | --- |
| The handle | Drag the row by it to move the attribute. |
| The type | The attribute type's icon and its name, such as **Text**, **Yes/no**, **Integer number** or **Number with decimals**. |
| The name and the code | The attribute's label in your working language, or its name, followed by its code. Both are shown in full, however long they are. |
| The properties | One word for each of these properties the attribute has, in this order: **Common**, **Translatable**, **Internal**, **Required**. A property the attribute does not have shows nothing. |
| ✎ **Edit attribute** | Opens the attribute's window. |
| ⋯ **More actions** | **Duplicate**, **Delete**, **Move up** and **Move down**. |

One line above the rows says what each property word on the page means:

| Word | What it means |
| --- | --- |
| **Common** | The attribute is in every product type and always included. See [Common attributes](./common-attributes.html). |
| **Translatable** | The attribute has one value per language. |
| **Internal** | The attribute is hidden from the brand portal. Channels still export it. |
| **Required** | A product variant needs a value for it to be published. |

The line names only the words that rows on the page show, and there is no line while no row shows one.

To move an attribute, drag its row by the handle; a line shows where the row will land, and Escape puts it back where it was. Without a mouse, choose **Move up** or **Move down** under ⋯: each moves the row one place. **Move up** is not available on the first row, **Move down** not on the last. A move, like every other change to the section's attributes, is saved with **Save**.

The section has no search of its own. Because every name and code is shown in full, your browser's find in page (Ctrl+F, or ⌘F on a Mac) finds an attribute in a long section by either.

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