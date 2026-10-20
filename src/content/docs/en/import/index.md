---
title: "Importing data"
description: "Two ways to get product data in: import a file once from the product list, or set up a data source for files that arrive again and again."
sidebar:
  order: 0
  label: "Overview"
---

There are two ways to get product data in from a file. For a file you import once, open
the [product list](/en/products/product-list.html) and select **Import**. For files that
arrive again and again — from a supplier, or every night — set up a **data source** under
**Integrations → Data sources**.

| | Import from the product list | Data source |
| --- | --- | --- |
| **Use it for** | A one-off file | Files that arrive again and again |
| **What it does** | Creates or updates products, or deletes the products a file lists | Imports each file through the mapping its dataset keeps |
| **How it runs** | Once, when you finish the steps | On a schedule, or when its files arrive (**FTP push**); you can also start it yourself |
| **Where the file comes from** | You upload it | Fetched from a server, or uploaded to the heavendata FTP server |
| **Read** | [Import or delete products from a file](/en/import/import-products.html) | [Data sources](/en/import/data-sources.html) |

## How a data source gets its files

Each data source has one **connection**:

| Connection | Direction | Use it when |
| --- | --- | --- |
| **SFTP pull** | We fetch the files | The files are on an SFTP server, such as a supplier's |
| **HTTP pull** | We fetch the files | The files are at a web address |
| **FTP push** | Someone uploads the files | You or a supplier can upload to the [heavendata FTP server](/en/import/ftp-pull.html#upload-files-for-a-data-source) |

Setting a connection up, testing it, and choosing each dataset's file are on
[Data sources](/en/import/data-sources.html).

## After an import

Every import runs in the background. [Background jobs](/en/troubleshooting/background-jobs.html)
shows each run, its result, and the files it read.
