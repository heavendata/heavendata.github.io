---
layout: default
title: Attributes & Sections
parent: Settings
nav_order: 1
---

Goal of a product information management system is to be the single source of truth for all your product data in best possible quality. You can store text information, product relations and other data types as well as binary assets and categories.

In this document describes what attributes are and how to manage them.

## Concept
We must not store all product data in one big text field. We need more detailed information in dedicated fields. We call this fields "product attributes".

Example:

* Wrong: one text attribute "description" containing "... weight: 200g"
* Correct: Separate attribute "weight" with value "200g"

## Product Attributes
An attribute is the place where we store one piece of information about your product. If you're working with Excel or databases, it's similar to one column in a worksheet.

### Edit attributes

1. Go to Settings > Attributes & Sections
2. Select the section that contains the attributes you want to edit or create a new section
3. Add or update attributes
4. Save it
5. Go to Settings > Product types and enable new attributes where you need them

### Attribute Sections
An attribute is always part of one attribute section. Just a group for better readability.

Example:

* Section "Technical details" with attributes "power consumption", "voltage", ...
* Section "Common" with "name", "long description", "short description", "price", ...