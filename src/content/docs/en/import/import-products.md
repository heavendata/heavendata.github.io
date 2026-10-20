---
title: "Import or delete products from a file"
description: "Create or update products from a CSV, Excel or XML file, or delete the products a file lists, from the product list's Import menu — step by step, with what each option changes."
sidebar:
  order: 1
---

To import products from a file, open the [product list](/en/products/product-list.html) and select **Import** → **Products**. To delete the products a file lists, select **Import** → **Products to delete** instead. Both walk one file through a few steps and then run in the background.

Use these for a one-off file. For a file that arrives again and again — from a supplier, or every night — set up a [data source](/en/import.html), which keeps its mapping and runs on a schedule; a supplier can drop the files on [our FTP server](/en/import/ftp-pull.html). To run a file through a data source's existing mapping instead, use **Upload and import** on the data source — see [running files you have to hand](/en/import.html#running-files-you-have-to-hand).

| You want to | Select | Steps |
| --- | --- | --- |
| Create products, or change products you already have | **Import** → **Products** | **Upload** · **Map columns** · **Import options** · **Done** |
| Delete products | **Import** → **Products to delete** | **Upload** · **Map columns** · **Done** |

**Import** is a button in the product list's header, between **Export** and **New product**. If you cannot see it, you lack the permission to import products — ask an administrator for it. That one permission covers both menu items, deleting included.

## Before you start: the identifier attribute

An import finds each product by its **identifier attribute** — the attribute that holds a unique code for every product, in most catalogs the SKU. Every row of your file needs a value for it.

If your account has no identifier attribute yet, the **Upload** step says so instead of offering the upload:

> No identifier attribute defined. Please define which attribute stores the unique article number and should be used as product identifier.

Select **Fix it** beside the message and choose which of your attributes is the identifier. [Attribute roles](/en/concepts/attribute-roles.html) explains the role.

## Import products

### 1 · Upload

Drop your file on the upload area, or select **Upload files** and choose it. One file per import; a second file replaces the first, and the mapping starts again from the new file.

| Accepted | Not accepted |
| --- | --- |
| `.csv`, `.xlsx`, `.xml` | Anything else, including `.json` — the file is refused with *Only CSV, XLSX, or XML files can be uploaded.* |

The file's format is detected for you. Once it is, **Format Settings** shows what was detected — for a CSV file, for example, the character encoding, the field separator and which row holds the column names. Correct anything that is wrong and select **Apply** to read the file again.

**Check the preview before you go on.** Under **Preview**, the step shows about the first 200 rows of the file as they were read, before anything is imported. If columns are shifted or a value runs across two columns, the format settings are wrong — fix them here. If a row cannot be read at all, the step shows **Errors** instead of the preview, with that row's record number, line number and the row as it is in the file. Reading stops at that row, so fix it and upload the file again to find any further ones.

If the file cannot be read, the step says *Couldn't read the file* and why, and keeps your format settings so you can change them and try again.

To start over with another file, remove this one with the **×** beside its name.

### 2 · Map columns

Each row of this step is one column of your file. Choose the product attribute it fills under **Target Attribute**.

**The step opens already filled in.** Most columns get a suggested attribute, and where its values need it, a conversion; a column nothing fits is left for you to map. Each suggestion carries a tag that says where it came from:

| Tag | Where the suggestion comes from |
| --- | --- |
| **Earlier import** | The last import your account started with a column of this name — see [what is remembered](#what-is-remembered-for-the-next-file). |
| **Name match** | The column's name matches an attribute's code or name. |
| **Value match** | The column's values fit one attribute — every value is a GTIN, for example, or every value is one of an attribute's list values. It does not mean the values already exist in your catalog. |
| **AI suggestion** | A language model, for the columns the other three leave open. It sees the column names, up to 10 sample values of each, and your attributes — none of your stored products. |

The icon at the start of each tag shows how sure the suggestion is: a green check for **high**, a yellow exclamation mark for **medium**, a red triangle for **low**. **Check the low rows first.** A row you mapped or changed yourself has no tag.

If the values of a column do not fit the attribute it is mapped to, the row says so:

> The import misreads or rejects the value in 3 of the 10 rows checked for this attribute. Select Edit pipeline to change the conversion, or map the column to another attribute.

The warning does not stop the import. Change the conversion with the button at the left of the row, or map the column elsewhere.

Suggestions take a moment on a large file. The step shows *Getting mapping suggestions…* while it waits, and **Next** waits too. If the language model failed or could not answer in time, a note above the rows says how many columns it could not suggest for — map those yourself, or select **Auto map** to ask again.

| Control | What it does |
| --- | --- |
| **Auto map** | Suggests again, for the rows that are empty. It never changes a row you set yourself. |
| **Clear all mappings** | Empties every row. If that would empty a row you set or changed, it asks first. |
| **+** beside a row | Maps the same column to one more attribute. |
| *Show only unmapped values* | Hides the rows that are already mapped. |

A column you do not map is not imported, so **leave a column unmapped to leave that attribute unchanged** on your products. Each attribute can be filled from one column only; choosing one that another row already fills is refused, and the row says which attribute is taken.

**Translations** have one target per language: a translatable attribute *Name* is offered as **Name** and as **Name (en)**, **Name (de)** and so on, for each language of your account.

**Data Format**, under the rows, says how the file writes values that can be written more than one way:

| Option | What it sets | Default |
| --- | --- | --- |
| **Date format** | How dates in the file are written | **Date and time with offset**, such as `2011-12-03T10:15:30+01:00` |
| **Decimal Separator**, **Group Separator** | How numbers in the file are written: the decimal point, and what groups thousands | `.` and `,` |
| **Currency Decimal Separator**, **Currency Group Separator** | The same, for prices | `.` and `,` |
| **Value separator** | What separates several values in one cell | `\|` |
| **Timezone** | The time zone of dates and times that carry none | none |

When the step opens, both decimal separators are set to the one your file uses, and the group separators to the other character — a file that writes `12,50` opens with `,` and `.`.

**Next** stays disabled until a column is mapped to the identifier attribute. The step says which attribute it means.

#### What is remembered for the next file

When you select **Import now**, your account remembers each mapped column — its name, its attribute and its conversion. The next file with a column of the same name opens with it mapped, tagged **Earlier import**. Nothing is remembered from an import you do not start.

The **Data Format** and the **Import options** are not remembered; set them for each file.

### 3 · Import options

The options decide whether the import may create products, and what it publishes.

**Create New Products** is **off** when the step opens. Off, the import only changes products you already have: a row whose identifier matches no product is skipped, and the run still finishes without warnings. **Turn it on if your file contains new products.**

| Option | What it does |
| --- | --- |
| **Create New Products** | Lets a row whose identifier matches no product create one. |
| **Default product type** | The [product type](/en/concepts/product-types.html) a new product is created with when its row names none. Required while **Create New Products** is on — **Import now** stays disabled until you choose one. |
| **Publish new products** | Publishes the products and product variants the import creates. |
| **Create drafts, but not publish products** | Creates new products as drafts. Selected by default. |

Under **Existing products**, choose one of three:

| Option | What it does |
| --- | --- |
| **Update published products** | Applies the changes to the products and product variants that are already published, so channels get them. Nothing that was not published becomes published. |
| **Re-publish products** | Publishes each product variant a row addresses, including one never published before. A row found by its article number rather than its identifier addresses only the product, so it publishes no new product variant. |
| **Update drafts but do not modify published products** | Changes only the draft. What is published stays as it was until someone publishes it. Selected by default. |

These are the same three [publish settings](/en/import.html#publish-settings) a data source has, worded differently, and here you choose one or the other where a data source lets you combine them:

| Here | On a data source |
| --- | --- |
| **Publish new products** | **Publish new products** |
| **Update published products** | **Apply changes to published products** |
| **Re-publish products** | **Publish modified products** |

Select **Import now** to start the import. It starts at once — there is no further confirmation.

### 4 · Done

The step follows the import as it runs. **The import runs in the background**: you can leave the page or close your browser, and it carries on. When it has finished, **Continue to product list** takes you back.

What an import did to each product is in its log, row by row. To find the run again later, and read its steps and log files, see [background jobs](/en/troubleshooting/background-jobs.html). **The run is listed as *Import default*** — for every import and deletion from this menu — and its step names your file, as in *default (uploaded as products.csv)*.

The **Done** step's summary counts every row it read as imported — skipped rows too, so a finished import may have changed nothing. Select **View details** for what each row did: **Created**, **Updated**, **Skipped** and the other counts, and the log that names each skipped row. With **Create New Products** off, every new product in the file is skipped. The log also names the publish options the import ran with, as *chosen for this import*.

## Delete products

**Deleting is permanent.** There is no trash and no undo, and **Delete now** starts at once, without asking again. Keep an export of the products before you delete them if you might need them back.

Your file needs one column: the identifier of each product to delete. Any other columns are ignored.

1. On the product list, select **Import** → **Products to delete**.
2. **Upload** your file. Format detection, **Format Settings** and the preview work as they do [for an import](#1--upload). This step shows no **Errors** list: check the preview before you go on.
3. On **Map columns**, map the column that holds the identifiers to the identifier attribute: select **Select product** beside it and choose the one entry offered. The entry is the attribute's key — `data.` followed by its code, for example `data.product_sku` — rather than its name. A column headed with the code itself is mapped for you. **Delete now** stays disabled until the column is mapped.
4. Select **Delete now**. The deletion starts and the **Done** step follows it. It runs in the background, so you can leave the page.

| The row's identifier matches | What is deleted |
| --- | --- |
| A product | The product with all its product variants |
| One product variant | That product variant, with any product variants below it. The rest of the product stays |
| Nothing | Nothing — the row is skipped and the log says so |

What happens to a deleted product:

- It is **unpublished first**, so channels stop receiving it.
- **References to it from other products are removed.**
- If a published product or record still requires it, it is **not deleted**: the row is skipped with a warning in the log, and the other rows go on.

## If the import does not start

If you select **Import now** or **Delete now** and the import cannot start, the **Done** step says *Couldn't start the import* — or *Couldn't delete the products* — and why. Nothing was changed.

An import starts once. If you go back a step, change something and select **Import now** again, the step says:

> Couldn't apply your changes. The import has already started without them. To import with them, remove the file on the Upload step and upload it again.

The first import is still running, with the settings it started with.

## If you leave the page

**Leaving the page before the import starts loses the file, the mapping and the options.** Nothing asks you first. The mappings of earlier imports are still remembered — see [what is remembered for the next file](#what-is-remembered-for-the-next-file).

Once the import has started, leaving the page does not stop it.

<!-- Screenshot: the Map columns step with Earlier import, Name match and AI suggestion tags and their confidence icons. -->
