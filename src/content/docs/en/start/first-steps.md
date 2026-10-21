---
title: "First steps"
description: "From an empty account to your first product: create a product type from the ready-made list, review what it created, add a product and show its data in the product list."
sidebar:
  order: 2
---

A new account looks empty until it has a product type. This guide takes you from there to your first product: you create one product type from the ready-made list, look at what it created, add a product by hand and show its data in the product list. It takes about ten minutes. If you chose [Standard setup](./setup-options.html#standard-setup), your account already has the product type *General products* and you can start at [Add your first product](#add-your-first-product).

## How product data is structured

heavendata stores product data in a structure you define. Two things make it up:

- **Attributes** are the fields that hold product data: *Name*, *Color*, *Description*, *Size*. Every attribute belongs to one **section**, a named group that becomes a heading in the product editor, such as *General* or *Weight and dimensions*.
- **Product types** say which attributes a kind of product has, and how its product variants are organized. Every product has exactly one product type. *Name* belongs to every kind of product; *Screen size* belongs to televisions and not to shoes, so it goes on the product type for televisions only.

You can build attributes and product types one by one under **Settings → Attributes & sections** and **Settings → Product types**. The faster way is a ready-made product type, which brings its attributes and sections with it. The list, in groups from fashion to vehicle accessories, is on [Ready-made product types](./ready-made-product-types.html).

## Create a product type from the ready-made list

1. In the sidebar, open **Settings → Product types** and choose **New product type**.
2. The **New product type** page lists the ready-made product types as cards, in groups. Type what you sell into **Search product types**, for example `shoes`, or scroll to the group.
3. Select the card. The create page opens, titled with the product type's name, and lists its variant configurations and every attribute it brings, all ticked.
4. Untick any attribute you don't need ([what each tick, badge and lock means](/en/concepts/product-types.html#choose-its-attributes)).
5. Choose **Create**. The product type is created with its attributes and sections, and the **Product types** list opens.

Now look at what was created:

- **Settings → Attributes & sections** shows the new sections and attributes, with the [roles](/en/concepts/attribute-roles.html) the app needs already assigned.
- **Settings → Product types** shows the new product type. Open it to see which attributes it includes and which variant configurations it has.

Repeat the steps for each kind of product you sell. A second ready-made product type reuses the attributes the first one created and adds only its own. To shape the structure further, read [Optimize catalog structure](./optimize-catalog-structure.html).

## Add your first product

Most accounts import product data from an existing system and enhance it in heavendata. To see the structure work, add one product by hand first.

1. Open **Products** in the sidebar.
2. Choose **New product**. A panel asks you to select the product type.
3. Select the product type you created. If it has more than one variant configuration, select one next; for a single product without variants, choose **No product variants**.
4. The product editor opens. Fill in some attributes, at least the product name.
5. Choose **Done**.

You have created your first product. To import many at once, see [Importing data](/en/import.html).

### Show product data in the product list

The product list shows no attribute columns when you open it for the first time. To add some:

1. Open **Products**.
2. Choose **Columns**.
3. Select the columns you want to see and close the dialog.

The list remembers your columns in your browser, so this is a one-time step. More on the list is on [Product list](/en/products/product-list.html).

### Published and internal version

Every product has two versions:

- an **internal** version, the one you see and edit in the app;
- a **published** version, the one channels read.

This lets you prepare a product without pushing incomplete data to your channels. The product list shows each product's status:

| Status | Meaning |
| --- | --- |
| Draft | Not visible to channels. No published version exists yet. |
| Published | Visible to channels, with the latest saved changes. |
| Modified | Visible to channels, without the latest saved changes. An older version is published and there is a newer internal version. |
| Partially published | Only some of the product's variants are visible to channels. |
