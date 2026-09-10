---
title: "Custom Entities"
reviewed: false
sidebar:
  order: 6
---
Custom entities allow you to create your own data tables and link objects in these tables to your products. This way, you've reusable pieces of information and can save a lot of time and typos.

## Example Use Case

Let's assume you're a retailer for technical products and want to include the manufacturer's support resources in your products. We want to provide:

* Manufacturer name
* Manufacturer support website URL
* Manufacturer support phone number
* Manufacturer contact for repairs

We could create product attributes for those data, but then we'd have to type it for each product. With custom entities, we separate that information:

1. Create custom entity "Manufacturer"
2. Add the "name", "url", "phone number", "repair contact" attributes in custom entity settings
3. Go to product attributes and add new attribute "manufacturer" or type "reference" and select "Manufacturers" as source.
4. Enable the "manufacturer" attribute in relevant product types.

## Custom Entity Settings

Navigate to "Settings" > "Custom entities". Click "New custom entity" or select an existing one.

### General

|Form field |Description |
--- | ---
|Name | Name of custom entity as used inside of app.
|Key  | Key to use as in URLs or technical export formats.
|Label attribute | We'll use the value of the selected attribute when generating links inside the app.
|Identifier attribute | Value of this attribute will be used as the unique identifier.

### Attributes

Here you define which data will be stored. All attributes are supported except of assets.

## Edit Records

Look at the app header navigation and click the arrow right beside "Products" to add or edit records. Next, select your entity in the dropdown and click "New" to add records manually or import existing records from Excel or CSV.

### Export records

**Export** in the page header writes the entity's records to an Excel or a CSV file. Use it to bulk-edit records in a spreadsheet and import them back, to hand the data to someone outside the PIM, or to copy an entity's records to another account.

Choose which records to export:

|Option |Exports |
--- | ---
|All | Every record of the entity.
|‹n› filtered | The records the list filter currently matches. Available once a filter is set and matches at least one record.
|‹n› selected | The records you ticked in the list. Available once at least one row is selected.

The dialog starts on the narrowest option that applies — your selection if you have one, otherwise your filter, otherwise all records — and follows the list while it is open, so you can change the filter or the selection behind the dialog without reopening it. An option that does not apply is shown greyed out with a note saying what to do to enable it, rather than hidden.

Ticking rows works over any number of records: select all, then untick the few you do not want, and the export covers everything the filter matches except those.

Choose **Excel** or **CSV** as the format, then select **Export**. The file is produced as a background job, so it is safe to close the dialog or leave the page — the job keeps running. The dialog shows the job's progress in place and offers **Download** when it finishes. You can also find the job later under [Background jobs](/en/troubleshooting/background-jobs.html), named `Export ‹entity name›`.

The file is named `‹account key›_‹entity key›`, with the entity key lower-cased.

#### What the file contains

Every attribute of the entity, one column each, whether or not the list shows it — there is no column choice.

|Attribute type |Columns |
--- | ---
|Plain | One column, named after the attribute's code.
|Translatable | One column per language, named `code.culture` — for example `description.de-DE`.
|Reference | One column holding the **identifier** of the referenced record. Several references are joined into one cell.

Column headers are the attribute **codes**, not the attribute names, so a file exports and imports again without renaming anything.

The two formats differ on a translatable attribute that has no value in one language. **CSV** writes the value of the fallback language, so the cell is filled. **Excel** leaves the cell empty. If you need to see which languages are genuinely untranslated, export to Excel.

Reference columns hold the same identifiers the import reads, so an exported file can be corrected and imported again as it is — see [Reference columns in an import file](#reference-columns-in-an-import-file) for how those values are matched, and what happens when one of them matches nothing.

Exporting needs the same permission as exporting products. If you cannot see the **Export** button, ask an administrator for it.

### Reference columns in an import file

A reference attribute is imported by the **identifier** of the record it points to — the value of that entity's identifier attribute, which is also what an export writes into the column. A multi-reference column holds several identifiers in one cell, separated by `|` (or by the list separator the channel is configured with). An empty cell removes the references from the record.

A row may reference records of the same entity that appear **earlier in the same file**, so an export of an entity that references itself — categories with a parent, for example — imports again as it is, as long as each referenced row comes before the rows that point to it.

If an identifier matches no record of the referenced entity, the row is **not imported** and the import log names the attribute and the value. Fix the value, or create the missing record first, and import the row again.

