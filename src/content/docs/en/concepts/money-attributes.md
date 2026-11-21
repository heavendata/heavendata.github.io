---
title: "Money attributes"
description: "What a money attribute holds — an amount in the one currency you set on the attribute — how to set its Currency, what changing it does, and what import and export do with the amount."
sidebar:
  order: 1.5
---

A money attribute holds an amount of money, such as `129.95`, in the currency set on the attribute, such as euros. Every product's amount in that attribute is in that currency. The amount is stored as a number. The currency is stored with the attribute, not with each amount.

Use it for a fixed amount that describes a product, such as a deposit, a recycling fee or a declared customs value — or for a selling price: see [Money attributes and prices](#money-attributes-and-prices).

## What a money attribute holds

| Part | Where it is set | What it is |
| --- | --- | --- |
| **Amount** | Per product or product variant, in the product editor | A decimal number. It can be negative. The product editor keeps every decimal place you type. |
| **Currency** | Once per attribute, in the attribute's settings | An ISO 4217 currency code, such as `EUR` or `CHF`. Optional — but set it: see [Set the currency](#set-the-currency). |

**To keep amounts in two currencies, create two money attributes**, for example *Deposit EUR* and *Deposit CHF*.

A money attribute can be **translatable**. It then holds one amount per language, all in the attribute's one currency. Like the type, this is chosen when the attribute is created and cannot be changed later.

## Create a money attribute

1. Go to **Settings → Attributes & sections** and select a section.
2. Click **New attribute** and choose **Money**.
3. On the **General** tab, enter its **Name** — the **Code** is filled in from it — and decide whether it is **Translatable**.
4. On the **Settings** tab, choose the **Currency** — see [Set the currency](#set-the-currency).
5. Click **Done**, then **Save** the section.
6. Enable the attribute in **Settings → Product types** where you need it.

The type can't be changed after the attribute is created. To turn an existing attribute into a money attribute, see [Attributes & sections → Change attribute type](/en/concepts/attributes.html#change-attribute-type-or-translatable-settings-later).

## Set the currency

**Currency** is on the attribute's **Settings** tab, after **Default value**. Choose the currency from the list; it names each currency in the app's language, followed by its ISO 4217 code, such as *Swiss Franc (CHF)*.

Set it when you create the attribute. A money attribute without a currency shows its amounts as bare numbers, with no currency anywhere in the app.

:::caution[Changing the currency converts nothing]
You can change **Currency** at any time. The amounts stay exactly as they are: an amount of `100` in euros becomes `100` in Swiss francs. No exchange rate is applied and the app does not warn you. If the amounts must change too, update them — for example with an [import](/en/import/import-products.html).
:::

## Where the amount shows

Every screen writes an amount the same way: the number, then a space and the attribute's currency code, such as `129.95 EUR`. The number has at least as many decimal places as the currency uses — two for euros, none for yen — and every further decimal place stored, never rounded: `129.90 EUR`, `1,200 JPY`, `1,234.567 EUR`. Without a currency it is the number alone, with the decimal places it has, such as `5` or `1,234.567`. Digits are grouped and separated the way the app's own language writes numbers, for example `1.234,567 EUR` when the app is in German.

| Where | What you see |
| --- | --- |
| **Product editor** | The amount in the input, with the currency code after the input. Without a currency there is no code. |
| **Product list** column | The amount and the currency code. With **List product variants** off, a product's row lists the amounts of its product variants, separated by commas: `129.95 EUR, 99.00 EUR`. |
| **Custom entity** list column | The amount and the currency code. A translatable attribute has no column in that list. |
| **Brand portal** product list, and a product's own page | The amount and the currency code. |

A column's header names the attribute, not the currency; each cell names the currency.

## Import and export

**An import reads the amount as a number.** Map the column onto the money attribute as you would a number. The currency comes from the attribute, so the column needs only the amount. With the default **Data format**, where the decimal separator is `.`:

| In the file | Stored |
| --- | --- |
| `12.50` | `12.50` |
| `12.50 EUR` | `12.50` — the currency text is dropped |
| `$9.00` | `9.00` |

**Only the mapping step looks at the currency.** On **Map columns**, a column whose amounts carry another currency than the attribute's — or two currencies, when the attribute has none — is not suggested for the attribute, and a remembered mapping that places it there is marked with how many rows it would import wrong. If you map such a column yourself, the import does not check the currency: a column of US dollar amounts mapped onto a euro attribute is stored as euros. How decimal and thousands separators in the file are read is set under **Data format** on that step — see [Import products](/en/import/import-products.html).

**An export carries the amount without the currency.** In a feed or a template the money attribute is a plain number, `record.<code>`. If the receiving system needs the currency code, add it yourself — in a template, write the code as text next to the amount.

## Money attributes and prices

You can keep a product variant's selling prices in either of two ways. Both are supported:

- **Money attributes** — one for each kind of selling price, for example *Wholesale price* and *MSRP*. Recommended while you have one price list's worth of prices, each in one currency. There is no reason to move them to price lists while that is all you need.
- **Prices in price lists** — a product variant's **prices**, each in a [**price list**](/en/concepts/price-lists.html), a named set of prices in one currency, such as retail prices in euros. Recommended once you need a second price list (for example a list of its own for each customer you sell to), prices that change on set dates, or the same price in a second currency.

| | Money attribute | Prices |
| --- | --- | --- |
| Currency | One per attribute, optional | One per price list, required |
| Validity dates, sale price | No | Yes |
| Setting up | An attribute, like any other | Price lists, and prices added in the product editor or mapped in an import |
| In an export | A number, without currency | `prices`, each price with its price list's currency — the key is listed in [Record keys](/en/reference/record-keys.html) |

To say what a money attribute holds, you can give it a [role](/en/concepts/attribute-roles.html#other-roles): `offer.price` for the selling price, `40three.msrp` for the suggested retail price. The roles are optional.

## Related articles

- [Attributes & sections](/en/concepts/attributes.html) — create and manage attributes
- [Product types](/en/concepts/product-types.html) — enable attributes for product types
- [Import products](/en/import/import-products.html) — map columns and set the file's number format
