---
title: "Products"
description: "Find, edit and publish products — one at a time or four hundred at once."
sidebar:
  order: 0
  label: "Overview"
---

The day-to-day work of maintaining a catalog: finding the products that need
attention, editing them, and getting them into a publishable state.

Most tasks start from the [product list](/en/products/product-list.html). If you are looking
for what a field or a product type *means* rather than how to change it, see
[Concepts](/en/concepts.html).

## What refuses a publish

A product variant can't be published while an attribute marked **Required** has no value for it. A value set on the product counts for each of its product variants. Saving is never refused for this: you can save a product with a required value still empty, and only publishing is refused.

| The **Required** attribute is | It needs, for the product variant to be published |
| --- | --- |
| Not translatable | A value. A text counts when it is not empty; a measurement set needs every one of its measurements. |
| Translatable, and no language is a [required language](/en/concepts/languages.html#required-languages) | Text in at least one of your languages. |
| Translatable, and one or more languages are required | A value of its own in each required language. A value in a language's [fallback language](/en/concepts/languages.html#fallback-languages) doesn't count. |

The same check runs however the product is published: from the product editor, with **Publish** on the [product list](/en/products/product-list.html), by a bulk edit, and by an import that publishes.

**The refusal names the attribute and each required language the value is missing in.** Publishing from the product editor shows *Couldn't publish the product* — or *Couldn't publish the product variants* when you publish chosen product variants — with, for example:

`"short_title" needs a value in American English (United States). Add a value, and save again.`

The attribute is named by its code. With several languages missing, the message lists them — `… needs a value in American English (United States) and British English (United Kingdom).` — and asks you to add a value in each language. For an attribute that is not translatable it names no language. Choose the language the message names as your [working language](/en/concepts/languages.html#working-language), fill in the value, and publish again. An import's log names the missing languages the same way: *This field needs a value in American English (United States).*

A publish is also refused when a value that must be unique is already in use, or when a file in a field didn't finish uploading.
