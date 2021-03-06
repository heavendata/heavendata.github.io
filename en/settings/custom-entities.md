---
layout: default
title: Custom Entities
parent: Settings
nav_order: 20
---

# Custom Entities

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

