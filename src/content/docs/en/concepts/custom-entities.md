---
title: "Custom entities"
reviewed: false
sidebar:
  order: 7
---
Custom entities allow you to create your own data tables and link objects in these tables to your products. This way, you've reusable pieces of information and can save a lot of time and typos.

## Example use case

Let's assume you're a retailer for technical products and want to include the manufacturer's support resources in your products. We want to provide:

* Manufacturer name
* Manufacturer support website URL
* Manufacturer support phone number
* Manufacturer contact for repairs

We could create product attributes for those data, but then we'd have to type it for each product. With custom entities, we separate that information:

1. Create custom entity "Manufacturers"
2. Add the "name", "url", "phone number", "repair contact" attributes in custom entity settings
3. Go to **Settings > Attributes & sections** and, in a section, add an attribute "manufacturer" with **New attribute → Custom entity reference**, which creates an **Object reference** attribute. Select "Manufacturers" as its **Target**.
4. Enable the "manufacturer" attribute in relevant [product types](./product-types.html#attribute-sections).

## Custom entity settings

Navigate to "Settings" > "Custom entities". Click "New custom entity" or select an existing one.

### General

|Form field |Description |
--- | ---
|Name | Name of custom entity as used inside of app.
|Key  | Key to use as in URLs or technical export formats.
|Label attribute | The attribute whose value is shown as the record's name in lists, links and references. Every record needs a value for it, so its **Required** setting is always on.
|Identifier attribute | The attribute an import matches existing records on, unless a data source's **Match by** names another. Optional for the custom entity: without one, **Import** on the list creates a new record from every row. When it has one, every record needs a value for it, so its **Required** setting is always on.

While an attribute is the label attribute or the identifier attribute, its **Required** toggle cannot be switched off, and a hint under it says why. Choose a different attribute for the role and the toggle returns to the setting you gave it.

### Attributes

Here you define which data a record of the custom entity holds. **New attribute** offers the same attributes as it does in a section of [Attributes & sections](./attributes.html), except **Assets**.

**New attribute** adds an attribute, and ✎ **Edit attribute** on its row opens it again. The attributes are listed in their order, one row per attribute, as a section's attributes are on [Attributes & sections](./attributes.html#a-sections-attributes). Two things differ here:

| | On a custom entity |
| --- | --- |
| The property words | **Translatable** and **Required** only. **Required** shows while the attribute's **Required** toggle is on, and so always on the label attribute and the identifier attribute. Here **Required** means a record needs a value for the attribute to be saved, as the line above the rows says. |
| ⋯ **More actions** | **Delete**, **Move up** and **Move down**. |

Move an attribute by dragging its row by the handle, or with **Move up** and **Move down**. Every change to the attributes, a move included, is saved only when you choose **Save**, and lost if you leave the page without saving.

## Work with records

In the sidebar, every custom entity is listed by its name under **Catalog**, below **Products**. Select one to open its records, and select **New ‹name›** — for example **New Manufacturers** — to add a record by hand. **Import** in the page header reads records from a file, and **Export** beside it writes them to an Excel or a CSV file — see [Import records](#import-records) and [Export records](#export-records). To delete records, see [Delete records](#delete-records).

### Export records

**Export** in the page header writes the entity's records to an Excel or a CSV file. Use it to bulk-edit records in a spreadsheet and import them back, to hand the data to someone outside the PIM, or to copy an entity's records to another account.

Choose which records to export:

|Option |Exports |
--- | ---
|All | Every record of the entity.
|‹n› filtered | The records the list filter currently matches. Available once a filter is set and matches at least one record; until then it reads `Filtered` with no count.
|‹n› selected | The records you ticked in the list. Available once at least one row is selected; until then it reads `Selected` with no count.

The dialog starts on the narrowest option that applies — your selection if you have one, otherwise your filter, otherwise all records — and follows the list while it is open, so you can change the filter or the selection behind the dialog without reopening it. An option that does not apply is shown greyed out with a note saying what to do to enable it, rather than hidden.

Ticking rows works over any number of records: select all, then untick the few you do not want, and the export covers everything the filter matches except those.

Choose **Excel** or **CSV** as the format, then select **Export**. The file is produced as a background job, so it is safe to close the dialog or leave the page — the job keeps running. The dialog shows the job's progress in place and offers **Download** when it finishes. You can also find the job later under **Settings > Background jobs**, named `Export ‹entity name›` — see [Background jobs](/en/troubleshooting/background-jobs.html). That list needs its own permission, so you may be able to export without being able to open it; download from the dialog if you are not sure.

The file is named `‹account key›_‹entity key›`. The entity key is lower-cased and any character that is not a letter or a digit becomes `-`, so the key `sales_channel` gives `…_sales-channel`. The account key is used as it is.

#### What the file contains

Every attribute of the entity, one column each, whether or not the list shows it — there is no column choice.

|Attribute type |Columns |
--- | ---
|Plain | One column, named after the attribute's code.
|Translatable | One column per language, named `code.culture` — for example `description.de-DE`.
|Object reference | One column holding the **identifier** of the referenced record — its internal id when the referenced entity has no identifier attribute. Several references are joined into one cell.

Column headers are the attribute **codes**, not the attribute names, so a file exports and imports again without renaming anything.

The two formats differ on a translatable attribute that has no value in one language. **CSV** writes the value of that language's fallback language, so the cell is filled — unless the language has no fallback configured, in which case CSV leaves it empty too. **Excel** always leaves the cell empty. If you need to see which languages are genuinely untranslated, export to Excel.

Reference attribute columns hold the same identifiers the import reads, so an exported file can be corrected and imported again as it is — see [Reference attribute columns in an import file](#reference-attribute-columns-in-an-import-file) for how those values are matched, and what happens when one of them matches nothing.

Exporting needs the same permission as exporting products. If you cannot see the **Export** button, ask an administrator for it.

### Import records

#### Columns an import file needs

Which columns the file must have, and which rows are refused, depends on the custom entity's [General](#general) settings:

|The custom entity has… |The file needs a column for… |These rows are not imported |
--- | --- | ---
|An identifier attribute | The identifier attribute, always. The label attribute, for rows that create a record. | A row whose identifier is empty — it is never matched to an existing record. A row that creates a record and has no value for the label attribute.
|No identifier attribute | The label attribute. Every row creates a new record. | A row that has no value for the label attribute.

A row that updates an existing record keeps the record's name when the file has no column for the label attribute.

The **Map columns** step of the import warns while a column the file needs is not mapped. If no row could be imported — the identifier attribute is not mapped, or the label attribute is not mapped and the custom entity has no identifier attribute — **Next** stays on **Map columns** and says which attribute to map a column to. The import starts only from the **Review** step that follows, which says what the import will do; its button is named after the custom entity, for example **Import Manufacturers**. Each row that is refused for a missing value is listed in the import log with the attribute and what to add.

#### Reference attribute columns in an import file

A reference attribute is imported by the **identifier** of the record it points to — the value of that entity's identifier attribute, which is also what an export writes into the column. A multi-reference column holds several identifiers in one cell, separated by `|` (or by the **Value separator** set in the import's data format). An empty cell removes the references from the record.

A row may reference records of the same entity that appear **earlier in the same file**, so an export of an entity that references itself — categories with a parent, for example — imports again as it is, as long as each referenced row comes before the rows that point to it.

If an identifier matches no record of the referenced entity, the row is **not imported** and the import log names the attribute and the value. Fix the value, or create the missing record first, and import the row again.

#### Records a data source deletes

A dataset of a [data source](/en/import/data-sources.html) can delete the records that no row of its file matches, each time it is imported — the dataset's **Records not in the file** tab. A record that a published product or another record uses in a required field is **not deleted** by an import: the import log lists it as skipped and names what uses it, and the import goes on to delete the other records. To delete such a record, replace it where it is used and import again, or delete it on the list — see [Delete records](#delete-records).

## Delete records

Deleting a record removes it from every product and record that uses it, in required and optional fields alike. A record that nothing uses in a required field is deleted after one confirmation. When a published product or another record uses it in a required field, the app asks a second time, naming up to three of them — for example `"Shirt 42" and "Berlin store" use it in a required field.` — and saying what confirming also does:

| What uses the record in a required field | Confirming also… | The second question ends |
| --- | --- | --- |
| Published products | unpublishes those products | `Deleting it also unpublishes those products. This can't be undone.` |
| Other records | empties that field on those records | `Deleting it also empties that field on those records. This can't be undone.` |
| Both | does both | `Deleting it also unpublishes those products and empties that field on those records. This can't be undone.` |

| To delete | Go to | First question | Then, if something uses it in a required field |
| --- | --- | --- | --- |
| One record | The custom entity's list, ⋯ on the record's row → **Delete** | `Delete "‹name›"?` — **Delete record** | Asks again, with the same button |
| Every record of a custom entity | **Settings > Custom entities**, ⋯ on the custom entity's row → **Delete all records** | `Delete all records in "‹name›"?` — **Delete all records** | Asks again, with *them* in place of *it* and the same button |

The second question comes only when everything that uses the record in a required field is a published product or another record. When something else uses it there, or the app cannot say what does, it asks nothing more: it says it couldn't delete the record and what to replace first, and nothing is deleted.

**Cancel** at either question leaves everything as it was. After a confirmed delete that unpublished products, the message says how many, for example `"Acme" deleted and 2 products unpublished`. The unpublished products stay in the product list; publish them again once their required field has a value.

**Resetting the catalog keeps your records.** **Reset catalog**, on **Settings > Overview → Reset account**, deletes products, product types, sections and attributes, but not custom entities or their records. After you type your account key and select **Reset catalog permanently**, a record that uses products in a required field makes the app ask once more — `Reset the catalog?` — and **Reset catalog** resets it and empties that field on those records. Only an organization administrator can open **Reset account**.
