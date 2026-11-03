---
title: "Price lists"
description: "What a price list is — name, currency, type and external IDs — how an import finds, creates and renames price lists, and how to create, edit and delete them under Settings → Price lists."
sidebar:
  order: 1.7
---

A **price list** is a named set of prices in one currency — retail prices in euros, or wholesale prices in Swiss francs. Every price a product variant has belongs to exactly one price list. Imports create the price lists their prices need and find them again on the next run; you see and edit every list under **Settings → Price lists**.

## What a price list has

| Part | What it is |
| --- | --- |
| **Name** | What the list is called, such as `Retail DE`. Required. Two lists can have the same name if they differ in currency, type or external IDs |
| **Currency** | The currency of every price in the list, such as `EUR`. Required |
| **Type** | Optional. What kind of prices the list holds, typed as text, such as `retail` or `wholesale` |
| **External IDs** | The IDs other systems give the list — at most one per **system**. The system is a short code you or an import type, such as `erp` or `shop` |

A change to a price list reaches every price in it at once, on draft and published products alike, without publishing anything. A feed shows it from its next run; files already delivered are not sent again.

Prices are not attributes — how they differ from a money attribute is in [Money attributes and prices](/en/concepts/money-attributes.html#money-attributes-and-prices).

## How an import finds a price list

An import gives each price a price list name, a currency, an optional type and, optionally, an external ID with its system. It looks for the list like this:

| The price brings | The import uses the list that | If there is none | If there is one |
| --- | --- | --- | --- |
| **An external ID** | has that external ID **under the same system**, with the same currency and type | It creates a list with the price's name, currency, type and that external ID | It sets the list's name to the name the import brings, and changes nothing else |
| **No external ID** | has **no external IDs**, and the same name, currency and type | It creates a list with that name, currency and type | Nothing changes — the name is what it matched |

- **The system is part of the match.** `4711` under `erp` and `4711` under `shop` are two different external IDs.
- **The currency, the type and the name are compared exactly**, case included: `EUR` and `eur` are two currencies, `retail` and `Retail` two types. Spaces around an external ID or a system are ignored.
- **A list with several external IDs** is found by any one of them.
- **Within one import, the last name given for a list wins.**
- **A deleted list is never found again.** An import that brings its prices creates a new list.
- **An external ID or a system with a tab, a line break or another invisible character** is refused, and that product is not imported: *Couldn't import "‹product›". Its price list external ID or system contains tabs, line breaks, or other invisible characters — remove them in the source data and run the import again.* The rest of the file is imported.

An import that brings prices for a product variant replaces all of that variant's prices. An import that brings none for it leaves them as they are.

### Which system each import uses

| Prices imported by | System |
| --- | --- |
| The **Build price** node of a field processing pipeline | What its **Price list external ID system** field gives — `erp` unless you change it |
| An Intex connection | `intex` |
| A Topix connection | `topix` |

**Build price** takes the price list's name, external ID, system and type from its fields, each a fixed value or a column of the file — so the system can differ from row to row. **Price list name** is required even with an external ID. Its fields are listed in [Field processing pipeline nodes](/en/reference/pipeline-nodes.html#nodes).

So to set up a list by hand for prices that **Build price** imports, give its external ID the system `erp` — or whatever the node's system field gives — with the currency and type the file sends.

### What makes the next import create another list

An import looks for exactly the values it brings. If a list no longer has them, the import doesn't find it and creates another:

| You change, on the list | The next import that brings the old values |
| --- | --- |
| The currency, or the type | Creates another list |
| An external ID or its system — changed or removed | Creates another list |
| The name, on a list **without** external IDs | Creates another list with the old name — the name is what it matches |
| The name, on a list **with** an external ID | Finds the list, and sets the name back to the one it brings |
| A first external ID, on a list that had none | Creates another list, unless the import brings that external ID too |

Changes on the import's side work the same way: a file that changes the case of its currency, or a **Build price** node whose system changes from `erp` to `shop`, finds no list and creates one.

## Settings → Price lists

**Settings → Price lists** in the sidebar lists every price list of the account, sorted by name, with the columns **Name**, **External IDs**, **Currency**, **Type** and **Status**. You can also open it from the **Price lists** card on the **Settings** overview: its link is **Manage price lists**.

- **External IDs** shows each ID with its system in brackets: `4711 (erp), SHOP-17 (shop)`.
- **Status** reads **No prices** for a list that can be deleted — see [Delete a price list](#delete-a-price-list).
- **Search price lists** finds lists by name or external ID.

The page needs the permission **Manage price lists**. Organization administrators have it. How a permission is given to a user is in [User management](/en/organization-settings/user-management.html). Importing prices needs no permission of its own.

### Create or edit a price list

1. Under **Settings → Price lists**, select **New price list** — or select a list's row to edit it.
2. Under **General**, fill in:
   - **Name**. Its hint, *An import that brings this price list overwrites the name.*, holds for a list with an external ID; on a list without one, see [what makes the next import create another list](#what-makes-the-next-import-create-another-list).
   - **Currency** — choose from the list. *Changing the currency doesn't convert any amount.*
   - **Type** — optional, such as `retail` or `wholesale`.
3. Under **External IDs**, select **Add external ID** for each system that knows the list, and fill in **System** and **External ID**. Remove a row with its trash button.
4. Select **Save**. A new list says *Price list created*; a changed one *Price list saved*. **Cancel** goes back to **Price lists** and asks first if you have unsaved changes.

On a list that already exists, the page warns that changing the currency, the type or an external ID makes the next import create another price list — [the table above](#what-makes-the-next-import-create-another-list) has every case.

**Save** shows every problem at once, under its field:

| Message | Why |
| --- | --- |
| *Enter a name.* | **Name** is empty |
| *Choose a currency.* | No **Currency** is chosen |
| *Enter a system.* · *Enter an external ID.* | A row of **External IDs** is missing one of the two |
| *This price list already has an external ID for this system. Use another system, or remove the other row.* | Two rows have the same system. A list holds one external ID per system |
| *Remove the tabs, line breaks, and other invisible characters from this value.* | A system or an external ID contains an invisible character |
| *The external ID ‹ID› is already in use by "‹name›" with the same currency and type. Change the external ID, the currency, or the type.* | Another list has this external ID under this system, with the same currency and type — an import couldn't tell the two apart |
| *The name "‹name›" is already in use by another price list with no external ID, the same currency and the same type. Change the name, add an external ID, or change the currency or the type.* | The list has no external IDs, and another list without any has the same name, currency and type |

Spaces at the start and end of a value are removed; capital and small letters are kept as typed.

### Delete a price list

**Only a price list that no product has a price in can be deleted.** Such a list shows **No prices** under **Price lists**, and its page has a **Delete** button at the end of the action bar. A list in use has no **Delete** button.

1. Open the list and select **Delete**.
2. The dialog asks *Delete "‹name›"?* and says *No product has a price in it. This can't be undone, though a later import that brings prices for it creates the price list again.*
3. Select **Delete price list**.

If a product got a price in the list meanwhile, the page says *Couldn't delete the price list. A product now has a price in it. Reload the page.*

**A list your imports no longer use stays until you delete it.** Its prices leave a product variant when an import brings that variant other prices. A product variant the import no longer mentions keeps its old prices. Published products count too: a list stays in use while a published product still has a price in it.

## Prices in an export

Each exported price carries its price list: the list's own `id`, which never changes, its name, currency and type, and its external IDs. The keys, in a template and in a JSON feed, are listed in [Record keys](/en/reference/record-keys.html#prices).

## Related articles

- [Money attributes](/en/concepts/money-attributes.html) — an amount in one currency as an attribute, and how it differs from a price
- [Field processing pipeline nodes](/en/reference/pipeline-nodes.html#nodes) — **Build price** and every other node
- [Data sources](/en/import/data-sources.html) — importing files again and again, such as a price file
- [Record keys](/en/reference/record-keys.html#prices) — what an exported price carries
