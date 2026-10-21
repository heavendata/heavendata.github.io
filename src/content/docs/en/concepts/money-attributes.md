---
title: "Money attributes"
description: "What a money attribute holds — an amount in the one currency you set on the attribute — how to set its Currency, what changing it does, and what import and export do with the amount."
sidebar:
  order: 1.5
---

A money attribute holds an amount of money, such as `129.95`, in a currency you set once on the attribute, such as euros. Every product's amount in that attribute is in that currency. The amount is stored as a number. The currency is stored with the attribute, not with each amount.

Use it for a fixed amount that describes a product, such as a deposit, a recycling fee or a declared customs value. For the amount a product is sold for — retail, wholesale, in several currencies, with validity dates — use prices instead: see [Money attributes and prices](#money-attributes-and-prices).

## What a money attribute holds

| Part | Where it is set | What it is |
| --- | --- | --- |
| **Amount** | Per product or product variant, in the product editor | A decimal number. It can be negative. The product editor takes up to 3 decimal places. |
| **Currency** | Once per attribute, in the attribute's settings | An ISO 4217 currency code, such as `EUR` or `CHF`. Optional — but set it: see [Set the currency](#set-the-currency). |

So one attribute has one currency. **To keep amounts in two currencies, create two money attributes**, for example *Deposit EUR* and *Deposit CHF*.

A money attribute can be **translatable**. It then holds one amount per language, all in the attribute's one currency. Like the type, this is chosen when the attribute is created and cannot be changed later.

## Create a money attribute

1. Go to **Settings > Attributes & sections** and select a section.
2. Click **New attribute** and choose **Money**.
3. On the **General** tab, enter its **Label** — the **Code** is filled in from it — and decide whether it is **Translatable**.
4. On the **Settings** tab, choose the **Currency**.
5. Click **Ok**, then **Save** the section.
6. Enable the attribute in **Settings > Product types** where you need it.

The type can't be changed after the attribute is created. To turn an existing attribute into a money attribute, see [Attributes & sections → Change attribute type](/en/concepts/attributes.html#change-attribute-type-or-translatable-settings-later).

## Set the currency

**Currency** is on the attribute's **Settings** tab, under **Default value**. Choose the currency from the list; it lists every currency by its ISO 4217 code and English name.

Set it when you create the attribute. A money attribute without a currency shows its amounts in the product editor as US dollars.

:::caution[Changing the currency converts nothing]
You can change **Currency** at any time. The amounts stay exactly as they are: an amount of `100` in euros becomes `100` in Swiss francs. No exchange rate is applied and the app does not warn you. If the amounts must change too, update them — for example with an [import](/en/import/import-products.html).
:::

## Where the amount shows

| Where | What you see |
| --- | --- |
| **Product editor** | The amount, with the attribute's currency. |
| **Product list** column | The amount alone, rounded to 2 decimal places. The currency is not shown. |

## Import and export

**An import reads the amount as a number.** Map the column onto the money attribute as you would a number. The currency comes from the attribute, so the column needs only the amount:

| In the file | Stored |
| --- | --- |
| `12.50` | `12.50` |
| `12.50 EUR` | `12.50` — the currency text is dropped |
| `$9.00` | `9.00` |

**The import does not compare the file's currency with the attribute's.** A column of US dollar amounts mapped onto a euro attribute is stored as euros. When the import suggests a mapping, it does not suggest a column in a different currency for the attribute; it leaves that column for you to map. How decimal and group separators in the file are read is set in the data set's **Data Format** — see [Import products](/en/import/import-products.html).

**An export carries the amount without the currency.** In a feed or a template the money attribute is a plain number, `record.<code>`. If the receiving system needs the currency code, add it yourself — in a template, write the code as text next to the amount.

## Money attributes and prices

A money attribute is not a price. A product variant's selling prices are its **prices**: each price belongs to a **price list** — a named set of prices in one currency, such as retail prices in euros. An import fills them.

| | Money attribute | Prices |
| --- | --- | --- |
| Currency | One per attribute, optional | One per price list, required |
| Several currencies | One attribute per currency | One price list per currency |
| Validity dates, sale price | No | Yes |
| In an export | A number, without currency | `prices`, each price with its price list's currency — see [Record keys](/en/reference/record-keys.html) |

## Related articles

- [Attributes & sections](/en/concepts/attributes.html) — create and manage attributes
- [Product types](/en/concepts/product-types.html) — enable attributes for product types
- [Import products](/en/import/import-products.html) — map columns and set the file's number format
