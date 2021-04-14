---
layout: default
title: Product types
parent: Settings
nav_order: 2
---

# Product Types

Product types describe what data is stored for one kind of product and how it's organized. This includes

* Which attributes are available
* Are variants available and how should they be organized

## Prerequisites
Before starting to configure product types, ensure all product attributes are created. See [Attributes & Sections](./attributes.md) for details on how to create and update product attributes.

## Create or Modify Product Types

* Click "Settings" in app header
* Select "Product types" from menu
* Click "New product type" button or select an existing product type
* Click "Manage sections" and mark all sections you want to use
* Enable all attributes that should be available
* Click "Save"

## Product Type Settings 

### General

|Form field |Description |
--- | ---
|Name | Name of product type as used inside of app.

### Attribute Sections
That's where you define which attributes are available for this kind of product. To add / remove attributes, first click "Manage sections" and mark all sections that should be visible. Then mark each attribute that should be activated.

|Status|Description |
--- | ---
|![attribute disabled](images/pt-attribute-disabled.png) | If unchecked, the attribute is not enabled for this product type and will not be visible, when editing products of this type.
|![attribute enabled](images/pt-attribute-enabled.png) | Checked attributes are available and will be visible when editing or importing products.
|![common attribute](images/pt-attribute-common.png) | This attributes are available because you defined them as "common attributes" which are available for all products. See [Attributes & Sections](./attributes.md) for details.

### Variants
Here you define if products of this type have variants and how they are defined. Please see [variant settings](./product-variants.md) for details.

## Why do I Need Product Types?
Most catalogs contain different types of products and many attributes simply make no sense for some types. Let's assume a retailer sells shoes and TVs. For shoes we need an attribute "shoe size" and for TVs "display diagonal" and "operating system". Without product types our shoes would have an operating system and that wouldn't make sense (at least in 2021). To solve this, we create one product type "Shoe" and activate "shoe size" and another type "TV" and activate "display diagonal" and "operating system".