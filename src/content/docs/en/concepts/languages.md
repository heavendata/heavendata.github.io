---
title: "Languages"
reviewed: false
sidebar:
  order: 8
---
Define all languages used in your product data here. Those will be the languages available for translatable product attributes.

## Settings

|Form field |Description |
--- | ---
|Language |A language your product data is kept in 
|Fallback language |If no data is provided, we'll use this fallback language

### Fallback Languages
Fallback languages are great if you want to "overwrite" just some attribute values and don't want to translate others.

#### Region Specifics

|Language |Fallback language |
--- | ---
|English (GB) | -
|English (US) | English (GB)

Now you can provide different content in American English, but the British English content might be acceptable for most products.

## Working language

Your **working language** is the one of these languages you see and edit product data in. It decides which value of a translatable attribute you see, and which [label](./attributes.html#name-and-labels) each attribute is shown by — in **Settings** too. It is your own choice, kept in your browser, and it is not the language of the app itself.

Choose it with the language picker — the globe button showing a code such as `en-US` — on the products list or in the product editor. **Settings** has no language picker of its own and follows your working language. Until you choose one, the app uses the first language in the language picker's list.
