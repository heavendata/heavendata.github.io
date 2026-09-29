---
title: "Custom product feeds"
reviewed: false
sidebar:
  order: 1
---
Product feeds are text files that contain all or a filtered set of your products. Typically we'll provide a URL where other systems can find and read
this feed and import your products from. This article describes how to create your own custom feeds or adjust feeds you've created from templates.

## Preconditions

We'll read all product data from our product database. If you can see the products under "Products" in header navigation, it's alright. If not, please import your products first.

## Create a new feed

* Click "Channels" in the header navigation
* Click "New channel" on the right
* Configure the channel as described below
* Click "Save" to save your channel

## General

These are some general setting for your feed.

| Field name | Description 
| --- | ---
| Name | Name of your channel. Used inside the user interface only.
| Enabled | Disabled channels will not be updated, so please enable them.
| Frequency | Defines how often the products in this feed will be updated.
| Do not execute before | This in an enhanced feature. Example: Let's assume you have an import job, that updates your prices once a day at 8 am and you want to create a feed that should be updated once a day too. Now we should generate this feed after the import was done, so e.g. not before 8.30 am to ensure we have up-to-date price data.
| Entities to export | Set the checkbox for 'Product data'

## Mapping

This tab defines what fields to include in a feed. On the left side, you see the source fields. That's the product data in your heavendata database. On the right side you see "output columns" that will be written to your feed.

Option A: Select fields first
1. Note the "add targets" panel and click "select". In the popup, select all fields you want to include in your feed.
2. Click on the output column name if you need to rename the column

Option B: Define output columns first
1. Type the fields / column names you need below "add targets". Separate multiple names by comma and press return. This will add the output columns.
2. Click left beside each column to select which data to write to this column

### Which fields you can map

A feed can write a product's other **fields** as well as your own attributes. Every entry in the source list is a field, and two kinds of field have names of their own:

| Kind | What it is | Examples |
| --- | --- | --- |
| **Custom attribute** | A field you define yourself, under **Settings → Attributes & sections**. Listed under **Attributes**. | Name, SKU, color |
| **System field** | A field the platform records for its own bookkeeping. | Variant ID, Created on, Last updated |

The rest — the product type, prices, delivery windows — are neither: they are part of what a product is, so they are simply fields.

Besides **Attributes**, the source list offers these fields for a product feed. The list's search finds a field by its name or by its key.

| Group | Field | Key |
| --- | --- | --- |
| Identifiers | Variant ID | `id.entityid` |
| Identifiers | Product ID | `meta.rootid` |
| Identifiers | Parent variant ID | `meta.parentid` |
| Dates | Created on | `meta.created` |
| Dates | Last updated | `meta.updated` |
| Classification | Product type name | `meta.producttype.name` |
| Classification | Product type key | `meta.producttype.key` |
| Product variants | Variant dimensions | `meta.variantdimensions` |
| Product variants | Variant path | `meta.dimensionpath` |
| Product variants | Has product variants | `meta.isvirtual` |
| Prices and availability | Prices | `prices` |
| Prices and availability | Delivery windows | `deliverywindows` |

What each key holds is in [record keys](/en/reference/record-keys.html#product-keys).

A custom entity feed offers **Record ID**, **Custom entity key**, **Created on** and **Last updated** besides its attributes. What each key holds, including the keys a record carries that the source list does not offer, is in [record keys](/en/reference/record-keys.html).

**Categories** are not offered as a source; a template reads them as `_categories` — see [categories in a template](/en/channels/templates/data.html#categories).

**Variant space ID** and **Language code** are not offered as sources. No exported record contains them, so a column mapped from either was always empty. A feed that still maps one keeps the column, and its mapping row shows *This field is no longer available, so this column stays empty. Remove the row or map another field.*

### Which fields an import can set

When you [import](/en/import.html) through a data source, the mapping works the other way round: the fields are targets rather than sources. **An import can set your custom attributes and the fields below; everything else is read-only.**

| Field | Key | What the import does with it |
| --- | --- | --- |
| Categories | `categories` | Sets the categories the product is in, given as [category keys](/en/concepts/categories.html). |
| Prices | `prices` | Sets the product variant's prices. |
| Delivery windows | `deliverywindows` | Sets the product variant's delivery windows. |
| Variant space ID | `variantspaceid` | Chooses the variant configuration a **new** product is created with — either its ID, or a product type key, in which case the best-matching variant configuration of that product type is used. |
| Language code | `meta.languagecode` | Names the language the row's values are in, for translatable attributes. |

The IDs, **Created on**, **Last updated** and the product type fields are read-only: the platform sets them, so they are never offered as import targets. A custom entity import can set its custom attributes only.

## Output

### File Content
Machines need a fixed format to be able to read a feed. When creating a feed, you need to specify which format the other system expects.

#### Comma separated values (CSV)
That's the most common format. It's just a text file where the first row contains the attribute names and then we'll write one line for each product.

#### Excel
Used if this channel is intended for manual processing. E.g. combine it with file transfer "e-mail" to send updates to other departments.

#### Json
This will create a JSON array with one json object for each product.

#### Text
Allows you to create custom templates, e.g. XML or HTML for your feed. It's a very powerful way to format your output using Liquid template syntax. The following article is a good starting point: https://scriban.github.io/docs/liquid-support/

### File Transfer
Defines how other systems can access this feed.

| Transfer | Description
| --- | ---
| Http pull | We will provide a URL. The other system simply reads this URL and imports the products. This is the most common option. 
| Ftp server | We store the generated feed on our ftp server. Other system can log-in to this server using the username and password you provide to read the products.
| File transfer | We save the generated file on external file servers. If a delivery can't reach the server, the run's step says why, and what to do next — see [when a run can't reach a server](/en/troubleshooting/background-jobs.html#when-a-run-cant-reach-a-server).
| E-mail | We send the generated file as an e-mail