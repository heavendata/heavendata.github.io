---
layout: default
title: Brand portal
parent: Settings
nav_order: 20
---

# Brand Portal

The brand portal is a website where retailers and partners can access all they need to list your products in their online (and offline) stores. This includes:

* Product listing data
* Product images and other assets (referenced or as download)
* Files stored in your cloud drive
* News

## Prerequisites
Please ensure that you've assigned the following roles to product attributes: system.sku, product.name - we need them to setup the public user interface.

## Settings

### Collections
Product collections are filtered groups of products. If you think of an Excel product list, this defines which rows will be included. Typical use cases are seasons.

|Field|Description |
|--|-- |
|Name|Display name, that's what users of brand portal will see.
|Filter|Defines which products to include. Example: Where attribute "launch season" equals "spring21".

### Attribute Sets
This defines what attributes (=columns) to export. Users can select one or multiple attribute sets. This way users will get less columns which can massively simplify working with those exports. Typical examples are "operational data", "media data", "technical details".

## Important Notes

### Visible Attributes
Users will be able to read all data stored in all public attributes. Please check if you have attributes containing private information. To hide attributes, edit the attribute settings and mark them as internal. 