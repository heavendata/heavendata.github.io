---
layout: default
title: Setup options
parent: Initial setup
nav_order: 2
---

# First Steps

When you start your new PIM instance for the first time, it will look quite empty. This guide will lead you to your first working product information management system setup and show you how to optimize this setup.

## Prepare Your Catalog Structure
The heavendata platform uses a flexible database, which means you can adjust everything to your specific needs. In this first step, we configure what fields are available to store product data.

### Product Attributes
We call fields that store product data "product attributes". Most setups will have product attributes like "product name", "price", "description". You can define as many product attributes as you need to describe your products with all details.
We group those attributes in so-called "sections". Each section has a name that is used inside the user interface as a headline.

### Product Types
All products must have one "product type". Product types define which attributes are enabled for this type of product. Some attributes like "product name" will be used for all products, but many attributes will be related to products of a specific type only. As an example: The product attribute "screen size (inch)" is used for televisions but makes no sense for shoes.

### Add Attributes and Product Types
There are two options to add attributes and product types:

* Manually: Create attributes first, then create product types and enable required attributes.
* From template: Create a new product type from a template. This step will automatically add all required attributes.

For this guide, we'll create a product type from a template:

1. Go to Settings > Product types
2. Click "New product type"
3. Select template "Simple product"
4. Click "Install" and follow the procedure

Let's review what we've created:
* Go to Settings > Attributes and sections and review your product attributes.
* Go to Settings > Product types - you'll see the product type "Simple product".

To enhance your catalog structure, please read [Optimize catalog structure](./optimize-catalog-structure.md).

## Add Your First Product
Let's add the first product manually. In most cases, you'll import product data from an existing system and enhance it in our app, but let' start simple.

1. Navigate to "Products"
2. Click "New product"
3. Select "Simple product" and continue
4. Fill some attributes, at least the product name
5. Click "Done"

You've created your first product.

### Show Product Data in Product List
The product list will not show any columns when you open it the first time. Let's add some columns:

1. Navigate to "Products"
2. Click "Columns"
3. Select all columns you want to see in product list and close dialog

The list will remember all your settings in your browser so this is a one-time procedure.

### Published and Internal Version
There are two versions for each product.

* An internal version that's visible inside of user interface
* A published version that will be used in channels

This allows you to prepare products without pushing incomplete data to channels. You can see the current status of products in the product list:

Status | Description
--- | ---
Draft | There is no published version available. This product is not visible in channels.
Published | Product is visible in channels and all changes are published.
Modified | An older version of this product is published but there's a new internal version.

