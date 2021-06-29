---
layout: default
title: Custom product feeds
parent: Sharing Product Data
---

# Custom Product Feeds

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

This tab defines what attributes to include in a feed. On the left side, you see "source attributes". That's the product data in your heavendata database. On the right side you see "output columns" that will be written to your feed.

Option A: Select attributes first
1. Note the "add targets" panel and click "select". In the popup, select all attributes you want to include in your feed.
2. Click on the output column name if you need to rename the column

Option B: Define output columns first
1. Type the fields / column names you need below "add targets". Separate multiple names by comma and press return. This will add the output columns.
2. Click left beside each column to select which data to write to this column

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
Allows you to create custom templates, e.g. XML or HTML for your feed. It's a very powerful way to format your output using Liquid template syntax. The following article is a good starting point: https://github.com/scriban/scriban/blob/master/doc/liquid-support.md

### File Transfer
Defines how other systems can access this feed.

| Transfer | Description
| --- | ---
| Http pull | We will provide a URL. The other system simply reads this URL and imports the products. This is the most common option. 
| Ftp server | We store the generated feed on our ftp server. Other system can log-in to this server using the username and password you provide to read the products.
| File transfer | We save the generated file on external file servers.
| E-mail | We send the generated file as an e-mail