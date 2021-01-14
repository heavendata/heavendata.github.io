---
title: "Setup from empty account"
date: 2021-01-12T11:02:05+01:00
type: "post"
weight : 2
---

The heavendata platform is fully customizable. If you start with an empty account, you have to do the product database setup manually
before you can add or import products.

## Define Product Attributes
Product attributes describe which data fields are available for your products.
Go to settings > attributes and define which attributes you need. A minimal list could be:

* name (text)
* description (text)
* price (money)
* gtin (text)
* article_number (text)

## Define a Product Type
Different types of products may need a different set of attributes to describe them. For example, we'll need an attribute
"display size" for tvs but not for shoes. Product types define which attributes should be available.

1. Go to settings > product types
2. Click "add" (top right)
3. Name it e.g. "TV"
4. Add all attributes
5. Save it and we're done

### Common attributes

You'll typically have some attributes like "product name" or "sku" that are shared by all products. To simplify the setup you should
add those attributes as "common attributes".

1. Go to settings > common attributes
2. Add all sections that contain attributes shared by all products
3. Check the attributes
4. Click "Save"

## Done
After creating attributes and at least one product type, you're ready to add or import your products.