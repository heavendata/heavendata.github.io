---
layout: default
title: Attributes & sections
parent: Settings
nav_order: 1
---

# Product Attributes

The goal of a product information management system is to be the single source of truth for all your product data in the best possible quality. You can store text information, product relations and other data types, and binary assets and categories.

This document describes what attributes are and how to manage them.

## Concept
It's crucial to have all pieces of information in dedicated fields. We call these fields "product attributes." Typical examples for attributes are "product name", "width", "price", "color", ... If you're working with Excel or databases, one product attribute will store the data of one column in a worksheet.

Note: Do not add all those data in one single text attribute. Prefer one attribute for each fact.

### Attribute Sections
An attribute is always part of one attribute section — just a group for better readability.

Example:

* Section "Technical details" with attributes "power consumption", "voltage", ...
* Section "Common" with "name", "long description", "short description", "price", ...

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

* [Product types](./product-types.md) - enable attributes for product types
* [Common attributes](./common-attributes.md) - enable attributes for all products
* [Optimize catalog structure](../initial-setup/optimize-catalog-structure.md)
Guide covering attributes and product types management.