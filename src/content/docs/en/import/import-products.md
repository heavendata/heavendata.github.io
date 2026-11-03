---
title: "Import or delete products from a file"
description: "Create or update products from a CSV, Excel or XML file, or delete the products a file lists, from the product list's Import menu — step by step, with what each option changes."
sidebar:
  order: 1
---

To import products from a file, open the [product list](/en/products/product-list.html) and select **Import** → **Products**. To delete the products a file lists, select **Import** → **Products to delete** instead. Both walk one file through a few steps, end on a **Review** step that says what the job will do, and then run in the background.

Use these for a one-off file. For a file that arrives again and again — from a supplier, or every night — set up a [data source](/en/import/data-sources.html), which keeps its mapping and runs on a schedule; a supplier can upload the files to the [heavendata FTP server](/en/import/ftp-pull.html). To run a file through a data source's existing mapping instead, use **Upload and import** on the data source — see [running files you have to hand](/en/import/data-sources.html#running-files-you-have-to-hand).

| You want to | Select | Steps | The button that starts it |
| --- | --- | --- | --- |
| Create products, or change products you already have | **Import** → **Products** | **Upload** · **Map columns** · **Import options** · **Review** | **Import products** |
| Delete products | **Import** → **Products to delete** | **Upload** · **Map columns** · **Review** | **Delete products** |

**Import** is a button in the product list's header, between **Export** and **New product**. If you cannot see it, you lack the permission to import products — ask an administrator for it. That one permission covers both menu items, deleting included.

Every step has the same footer: **Cancel** at the left, and **Back** and the step's own button at the right — **Next** on every step before **Review**. Nothing is imported or deleted until you select the button on **Review**.

## Before you start: the identifier attribute

An import finds each product by its **identifier attribute** — the attribute that holds a unique code for every product, in most catalogs the SKU. Every row of your file needs a value for it.

If your account has no identifier attribute yet, the **Upload** step says so instead of offering the upload:

> Choose the identifier attribute before you import products. An import finds the product to update for each row by this attribute's value, usually the SKU.

Select **Assign attribute roles** beside the message and choose which of your attributes is the identifier. [Attribute roles](/en/concepts/attribute-roles.html) explains the role.

## Import products

### 1 · Upload

Drop your file on the upload area, or select **Upload file** and choose it. One file per import; a second file replaces the first, and the mapping starts again from the new file.

| Accepted | Not accepted |
| --- | --- |
| `.csv`, `.xlsx`, `.xml` | Anything else, including `.json` — the file is refused with *Only CSV, XLSX, or XML files can be uploaded.* |

The file's format is detected for you. While it is read, the step says *Reading the file…*. Once it is, **File format** shows what was detected — for a CSV file, for example, the character encoding, the field separator and which row holds the column names. Correct anything that is wrong and select **Apply** to read the file again.

**Check the preview before you go on.** Under **Preview**, the step shows about the first 200 rows of the file as they were read, before anything is imported. If columns are shifted or a value runs across two columns, the file format settings are wrong — fix them here. If a row cannot be read at all, the step shows **Errors** instead of the preview, with that row's **Row** and **Line** numbers, the **Columns found** and **Columns expected**, and the **Row as read**. Reading stops at that row, so fix it and upload the file again to find any further ones.

If the file cannot be read, the step says *Couldn't read the file* and why, and keeps your file format settings so you can change them and try again.

To start over with another file, remove this one with the **×** beside its name.

### 2 · Map columns

Each row of this step is one column of your file, under **Columns of the file**. Choose the product attribute it fills under **Fields to import into**.

**The step opens already filled in.** Most columns get a suggested attribute, and where its values need it, a conversion; a column nothing fits is left for you to map. Each suggestion carries a tag that says where it came from:

| Tag | Where the suggestion comes from |
| --- | --- |
| **Earlier import** | The last import your account started with a column of this name — see [what is remembered](#what-is-remembered-for-the-next-file). |
| **Name match** | The column's name matches an attribute's code or name. |
| **Value match** | The column's values fit one attribute — every value is a GTIN, for example, or every value is one of an attribute's list values. It does not mean the values already exist in your catalog. |
| **AI suggestion** | A language model, for the columns the other three leave open. It sees the column names, up to 10 sample values of each, and your attributes — none of your stored products. |

The icon at the start of each tag shows how sure the suggestion is — a green check for **high**, a yellow exclamation mark for **medium**, a red triangle for **low** — as a line above the rows repeats. **Check the low rows first.** A row you mapped or changed yourself has no tag.

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

**Next** stays disabled until a column is mapped to the identifier attribute. Until then the step names it — for an identifier attribute called *SKU*: *Map a column to "SKU", the identifier attribute, before you continue.*

**Data format**, under the rows, sets how numbers, lists and dates in the file are read:

| Option | What it sets | Default |
| --- | --- | --- |
| **Date format** | How dates written as text in the file are read — see [Date format](#date-format) | **Date and time with offset** |
| **Decimal separator**, **Thousands separator** | How numbers in the file are written: the decimal point, and what groups thousands | `.` and `,` |
| **Currency decimal separator**, **Currency thousands separator** | The same, for prices | `.` and `,` |
| **Value separator** | What separates several values in one cell | `\|` |
| **Timezone** | Not used on an import | none |

When the step opens, both decimal separators are set to the one your file uses, and the thousands separators to the other character — a file that writes `12,50` opens with `,` and `.`.

#### Date format

**Date format** says how the dates the file writes as text are read. Choose the one your file uses:

| Choice | Reads dates written like |
| --- | --- |
| **Date with offset** | `2011-12-03+01:00` |
| **Date and time with offset** — the default | `2011-12-03T10:15:30+01:00` |
| **RFC 1123 date and time** | `Tue, 03 Jun 2008 11:05:30 GMT` — the day always in two digits |
| **Custom format** | the pattern you enter in **Pattern** |

A date with an offset is converted to UTC; one without keeps the time as written.

A **Pattern** is a .NET custom date and time format string: it spells a date out with letters, and with the `.`, `/`, `-`, `:` or space between them that the file writes. The letters most files need are these, and the app lists the same ones under the box:

| Letters | Stand for | Example |
| --- | --- | --- |
| `d`, `dd` | day, `dd` with a leading zero | `3`, `03` |
| `M`, `MM` | month, `MM` with a leading zero | `4`, `04` |
| `yy`, `yyyy` | year, in two or four digits | `26`, `2026` |
| `H`, `HH` | hour, 0 to 23, `HH` with a leading zero | `9`, `09` |
| `hh` | hour, 1 to 12, with a leading zero — use it with `tt` | `09` |
| `mm` | minutes, with a leading zero | `05` |
| `ss` | seconds, with a leading zero | `07` |
| `tt` | `AM` or `PM` | `PM` |
| `zzz` | offset from UTC | `+01:00` |

So `dd.MM.yyyy` reads `03.04.2026`, `MM/dd/yyyy` reads `04/03/2026`, `yyyy-MM-dd HH:mm` reads `2026-04-03 09:05`, `MM/dd/yyyy hh:mm tt` reads `04/03/2026 09:05 PM`, and `yyyy-MM-dd HH:mm:sszzz` reads `2026-04-03 09:05:07+01:00`. Every other letter is in Microsoft's [custom date and time format strings](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings), which the app links too; names of months and days are read in English.

A custom format needs a pattern: until you enter one, **Next** stays disabled and the step says `Enter a pattern for the date format first.`

| In the file | What happens |
| --- | --- |
| A date that does not match the format you chose | It is not read: the product is imported without that value, and the import's log names the value as not recognized as a date. |
| A date written another way, while the Date format is still the default | It is still read where it can be, month before day — so choose a format whenever your file writes the day first. |
| An Excel cell formatted as a date | It is read as the date it is, whatever the Date format says. |

#### What is remembered for the next file

When the import starts, your account remembers each mapped column — its name, its attribute and its conversion. The next file with a column of the same name opens with it mapped, tagged **Earlier import**. Nothing is remembered from an import you do not start.

The **Data format** and the **Import options** are not remembered; set them for each file.

### 3 · Import options

The options decide whether the import may create products, and what it publishes — for new products, and for the existing products the file changes.

**Create new products** is **off** when the step opens. Off, the import only changes products you already have: a row whose identifier matches no product is skipped, and the run still finishes without warnings. **Turn it on if your file contains new products.**

| Option | What it does |
| --- | --- |
| **Create new products** | Lets a row whose identifier matches no product create one. |
| **Default product type** | The [product type](/en/concepts/product-types.html) a new product is created with when its row names none. Required while **Create new products** is on — **Next** stays disabled until you choose one. |
| **Publish new products** | New products are published, so channels get them. |
| **Create drafts without publishing** | New products aren't published — channels get them only once you publish them. Selected by default. |

**Default product type**, **Publish new products** and **Create drafts without publishing** can be changed only while **Create new products** is on.

Under **Existing products**, choose what channels get when a row updates a product that already exists:

| Option | What it does |
| --- | --- |
| **Apply changes to published products** | Published products get the values from the file, so channels get them. Nothing that was not published becomes published. |
| **Publish modified products** | Each product variant the import finds by a row's identifier attribute value is published with all its changes, including one never published before. A row without an identifier attribute value publishes nothing. |
| **Save changes without publishing** | Published products change, but channels see the new values only once you publish the changes. Selected by default. |

So to import existing products without publishing anything, keep the default, **Save changes without publishing**; the changed products show their unpublished changes until someone publishes them.

These are the [publish settings](/en/import/data-sources.html#publish-settings) a data source has, under the same names. Here you choose one of the three options for existing products, where a data source lets you tick both of its settings:

| Here | On a data source |
| --- | --- |
| **Publish new products** | **Publish new products** ticked |
| **Create drafts without publishing** | **Publish new products** not ticked |
| **Apply changes to published products** | **Apply changes to published products** ticked |
| **Publish modified products** | **Publish modified products** ticked |
| **Save changes without publishing** | Neither of those two ticked |

### 4 · Review

**Review** says what the import will do before it starts, in sentences: which file it reads — and, for an Excel file, which sheet — what happens to a row that matches no product, what is published, every mapping under **Mappings**, and last a warning:

> Existing values in the attributes you map are replaced, and an empty cell clears the value. This can't be undone.

If something is not what you want, go **Back** and change it. Select **Import products** to start the import. Nothing asks again.

### After you start the import

The job then takes the place of the steps, and **the import runs in the background**: you can leave the page or close your browser, and it carries on. While it is queued or running you can have an email sent when it completes — enter the address and select **Notify me**.

When it has ended, the page shows how it ended — **Completed**, or **Failed** with *Couldn't finish "Import default". Select View details to see why.* — and what became of your file's records, as one sentence:

> default (uploaded as products.csv): imported — 57 records created, 1,180 updated, and 3 skipped

A count of none is left out. If some records could not be imported, the sentence counts them after the others, and if every record was refused, it says the file couldn't be imported. Every form the sentence takes, and what each means, is in [reading what a run did](/en/import/data-sources.html#reading-what-a-run-did). With **Create new products** off, every new product in the file is counted as skipped.

**Download** beside your file's name gives you back the file the import read, **View details** opens the run with its log file, which names each skipped record and the publish options the import ran with, as *chosen for this import*, and **Continue to product list** takes you back. To find the run again later, see [background jobs](/en/troubleshooting/background-jobs.html). **The run is listed as *Import default*** — for every import and deletion from this menu.

## Delete products

**Deleting is permanent.** There is no trash and no undo. Keep an export of the products before you delete them if you might need them back.

Your file needs one column: the identifier of each product or product variant to delete. Any other columns are ignored.

1. On the product list, select **Import** → **Products to delete**.
2. **Upload** your file. Format detection, **File format** and the preview work as they do [for an import](#1--upload). This step shows no **Errors** list: check the preview before you go on.
3. On **Map columns**, map the column that holds the identifiers to the identifier attribute: select **Select product** beside it and choose the one entry offered, the identifier attribute, shown with its key — `data.` followed by its code, for example `data.product_sku`. A column headed with the code itself is mapped for you. **Next** stays disabled until the column is mapped.
4. On **Review**, read what will be deleted. The step names your file and the column it reads, and ends with a warning:
   > Deleted products and product variants are unpublished first, so channels stop getting them. This can't be undone.
5. Select **Delete products**. The deletion starts and its job takes the place of the steps, as [for an import](#after-you-start-the-import); its sentence counts the records deleted — `default (uploaded as delete.csv): imported — 12 records deleted`. It runs in the background, so you can leave the page.

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

If you select **Import products** or **Delete products** and the job cannot start, **Review** says so first — *Couldn't start the import.* or *Couldn't start deleting the products.* — and why. Nothing was changed, and you can select the button again.

## If you leave the page

**Once you have chosen a file, every way out of the steps asks first** — **Cancel**, the back button in the header, the breadcrumb, the sidebar and your browser's back button:

> Discard your import settings?

Select **Discard settings** to leave and lose the file, the mapping and the options, or **Keep editing** to stay. Reloading the page or closing the tab gets your browser's own warning instead. The deletion steps ask *Discard your deletion settings?* the same way. Before a file is chosen there is nothing to lose, and nothing asks.

The mappings of earlier imports are remembered whatever you choose — see [what is remembered for the next file](#what-is-remembered-for-the-next-file). Once the import has started, leaving the page does not stop it, and nothing asks.

<!-- Screenshot: the Map columns step with Earlier import, Name match and AI suggestion tags and their confidence icons. -->
