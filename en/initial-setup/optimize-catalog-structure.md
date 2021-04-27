---
layout: default
title: Optimize catalog structure
parent: Initial setup
nav_order: 2
---

# Optimize Catalog Structure

Different types of products need different attributes to describe them. That's why the heavendata platform is fully customizable. In this article, you'll learn about the basic building blocks to configure your product catalog to perfectly match your or your customers product requirements.

## Define Product Attributes
Product attributes describe which data fields are available for your products.
Go to settings > attributes and define which attributes you need. A minimal list could be:

* name (text)
* description (text)
* price (money)
* gtin (text)
* article_number (text)

The article [Attribute Settings](../settings/attributes.md) describes how to configure attributes and sections.

## Define a Product Type
Different types of products may need a different set of attributes to describe them. For example, we'll need an attribute
"display size" for tvs but not for shoes. Product types define which attributes should be available.

1. Go to settings > product types
2. Click "add" (top right)
3. Name it e.g. "TV"
4. Add all attributes
5. Save it and we're done

The article [Product Type Settings](../settings/product-types.md) describes how to configure product types. You'll find details how to configure variants in [Product Variants](../settings/product-variants.md).

### Common attributes

You'll typically have some attributes like "product name" or "sku" that are shared by all products. To simplify the setup you should
add those attributes as "common attributes".

1. Go to settings > common attributes
2. Add all sections that contain attributes shared by all products
3. Check the attributes
4. Click "Save"

The article [Common Attributes](../settings/attributes.md) describes how to configure common attributes.

## Done
After creating attributes and at least one product type, you're ready to add or import your products.