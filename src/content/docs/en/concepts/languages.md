---
title: "Languages"
description: "The languages your account keeps product data in — how to add one, what the default, fallback and required languages do, which codes an import accepts for a language, and how your working language differs from all of them."
sidebar:
  order: 8
---
Your account's languages are the languages a translatable attribute can hold a value in. Each language can have a fallback language, which a CSV export, a template and copying values use when a value is missing, and can be a required language, which a product variant must have a value in before it can be published. Manage them under **Settings > Languages**.

## The Languages list

**Settings > Languages** lists your account's languages, sorted by name. **New language** adds one; a row's menu has **Edit** and **Delete**.

| Column | What it shows |
| --- | --- |
| **Name** | The language's name, followed by *(default)* for the default language. |
| **Language code** | The language's code, such as `en-GB`. |
| **Custom language codes** | The extra codes an import accepts for it — see [Language codes in an import](#language-codes-in-an-import). |
| **Fallback language** | Its fallback language, if it has one. |
| **Required** | A check mark when it is a [required language](#required-languages). |
| **Created**, **Updated** | When the language was added and last changed. |

## A language's settings

| Field | What it does |
| --- | --- |
| **Language** | The language itself, chosen from a list. It can't be changed after you save, because its translations are stored under it. To use another language, add a new language. |
| **Default language** | Values without a language are taken to be in this language, for example when an attribute is made translatable. One language at most is the default: turning it on for one language turns it off for the one that was the default before. |
| **Fallback language** | Optional. The language whose value is used for this one where a translatable attribute has no value in it — see [Fallback languages](#fallback-languages). It is chosen from your account's languages. |
| **Required language** | A product variant can't be published while a **Required** translatable attribute has no value in this language. A value in the fallback language doesn't count — see [Required languages](#required-languages). |
| **Custom language codes** | Optional. Codes your import files use for this language, if the accepted codes don't include them. Enter one per line. |
| **Accepted language codes** | Not a field you fill in: the codes an import accepts for this language, worked out from **Language** and **Custom language codes** as you edit them. |

Click **Save** to keep your changes, or **Cancel** to leave without saving.

## Fallback languages

A fallback language lets one language reuse another's values, so you write only the values that differ.

| Language | Fallback language |
| --- | --- |
| British English (United Kingdom) | — |
| American English (United States) | British English (United Kingdom) |

With these settings, you write a product's text once in British English and add an American English value only where the two differ, for example *color* where British English has *colour*.

**Where the fallback language is used.** When a translatable attribute has no value in a language, these use its value in the fallback language:

- a CSV export,
- a template,
- copying values between attributes.

An Excel export and a JSON export leave the value empty. The product editor and the product list show the value of your working language, or nothing; they never show the fallback language's value in its place.

**A fallback chains.** If the fallback language has no value either, its own fallback language is used next, and so on until a language has no fallback language.

## Required languages

A required language is one a product variant must have its own value in, for every **Required** translatable attribute, before it can be published. Turn on **Required language** on each language that must be filled in before a product goes out; several languages can be required at once.

| Your languages | When a variant is published, a **Required** translatable attribute needs |
| --- | --- |
| No language is required | Text in at least one language, whichever. |
| One or more languages are required | A value of its own in each required language. Languages that are not required are not checked. |

**A value in the fallback language doesn't count.** In the [example above](#fallback-languages), mark British English (United Kingdom) required and leave American English (United States) not required: a product variant can't be published without a British English name, and a CSV export or a template still fills the American English name from the British one. If you mark American English (United States) required instead, or as well, every variant needs an American English value of its own, even where it would be the same text.

**Only publishing checks it.** You can save a product with a required language still empty. While your working language is a required language, the product editor marks an empty **Required** translatable field with `Required.`

**When a publish is refused, the message names each missing language** by its name, for example:

`"short_title" needs a value in American English (United States). Add a value, and save again.`

Switch your working language to the language it names, fill in the value and publish again. What else refuses a publish: [Products → What refuses a publish](/en/products.html#what-refuses-a-publish).

A new language starts not required. Deleting a required language stops it being checked from the next publish on.

## Language codes in an import

An import puts a row's values into a language when the column mapped to **Language code** holds one of that language's accepted codes. Upper and lower case don't matter. The accepted codes come from the language itself — for British English (United Kingdom) they are `eng`, `en`, `en-GB`, `en_GB`, `English (United Kingdom)`, `GB` and `English`. If your files use a code that isn't among them, add it to **Custom language codes**, one per line.

## Working language

Your **working language** is the one of these languages you see and edit product data in. It decides which value of a translatable attribute you see, and which [label](./attributes.html#name-and-labels) each attribute is shown by — in **Settings** too. It is your own choice, kept in your browser, and it is not the language of the app itself. It is not a required language either: choosing it checks nothing.

Choose it with the language picker — the globe button showing a code such as `en-US` — on the products list, in the product editor and on custom entity pages. **Settings** has no language picker of its own and follows your working language. Until you choose one, the app uses the first language in the language picker's list.

## Related articles

- [Attributes & sections](/en/concepts/attributes.html) — make an attribute translatable or required
- [Products](/en/products.html) — what refuses a publish
- [Translatable attributes in templates](/en/channels/templates/translations.html) — reading a value in a language, with its fallback
