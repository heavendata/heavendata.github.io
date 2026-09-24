---
title: "Categories"
description: "How categories work: top-level categories and subcategories, their order, how a product gets its categories, and what an import changes when it maintains your categories."
sidebar:
  order: 6
---

Categories are how you file products: a tree you build once, with top-level categories and subcategories under them, in the order you drag them into. A product can be in any number of categories, in any of your trees. Attributes describe what a product is; categories say where it belongs.

The app sometimes calls a top-level category a **catalog** or a **category tree**. There is no separate catalog object: both words mean a top-level category and everything under it.

## The parts of a category tree

| Term | What it is |
| --- | --- |
| **Category** | A named place to file products. A category has one name, the same in every language of your account. |
| **Root** | A top-level category. Your account can have as many roots as you need, and each one is a tree of its own. |
| **Subcategory** | A category under another one, its **parent category**. A category has at most one parent category and any number of subcategories. |
| **Primary** | A setting on a root. The Categories section of a product shows the primary roots unless you choose to see all of them. |
| **Sort index** | A category's place in the whole category tree, read from top to bottom and counted from 1: a parent category comes before its subcategories, and sibling categories come in the order you dragged them into. You never type it. It changes when you move a category, and adding a category renumbers every category after it. |
| **Category key** | The identifier another system knows the category by. Unique in your account, and never the category's internal ID. A category can have no key. See [Categories an import maintains](#categories-an-import-maintains). |

## Building the tree

Your trees are under **Settings → Product categories**, which lists your roots by name. **New category tree** creates a root; click a root to open its tree.

In a tree:

- **Add subcategory** on a category's row adds a category under it.
- **Drag** a category to move it. Drop it onto another category to make it a subcategory there, or between two categories to put it at that place in the list. The order you set here is the order everywhere: in the tree, in a product's Categories section, and in the sort index a template reads.
- **Rename** a category by clicking its name, or with the pencil on its row, which opens the category's settings.
- **Delete** a category with the trash can on its row. A category that still has subcategories can't be deleted: delete its subcategories first.

A root's own page has its name and the **Primary** toggle. A new root is primary.

## How a product gets its categories

Open the product and go to its **Categories** section. It shows one panel for each primary root. **Show all** shows your other roots as well. Add a category by searching for its name under **Add category**, or pick it in the tree. Remove it with the **×** on its tile.

Three things to know when you do:

- **Assigning a subcategory doesn't assign its parent category.** A product filed under *Shirts* isn't also filed under *Clothing*. Filtering the product list by *Clothing* still finds it, because that filter includes subcategories.
- **A product and each of its variants have categories of their own.** The Categories section shows the categories of the level you opened, not the ones it inherits. If you open a variant of a product filed under *Shirts*, its Categories section can be empty.
- **In an export, a variant inherits.** A variant's categories are its own plus the product's. See [the data in a template → Categories](/en/channels/templates/data.html#categories).

To find products by category, use **Categories** in the [product list](/en/products/product-list.html) toolbar. It lists every root, primary or not, and shows the products in the category you pick or in any of its subcategories.

Categories reach an export through a template channel, which reads them as `_categories` — the name, the category key, the sort index and the path of each. CSV, Excel and JSON feeds don't carry a product's categories.

## Categories an import maintains

If an import maintains your categories, each of its runs sets them back to what the source system says. A rename or a drag you make in the app lasts only until the next run: then the category moves back.

**Which categories.** An import finds its categories by their **Category key**, so only a category with a key can be maintained by an import. To see a category's key, open the category with the pencil on its row in the tree.

**What each run changes.** For every category the import sends:

| You change this in the app | On the next run |
| --- | --- |
| The category's name | Set back to the name in the source system. |
| Its parent category — you dragged it under another category | Moved back under the parent category in the source system. |
| Its place among its sibling categories | Moved back to the order in the source system. Sibling categories the import doesn't send keep their order among themselves, after the ones it does. |
| **Primary**, on a root | Kept. |
| **Auto Assignment** | Kept. |
| Anything about a category the import doesn't send — including every category without a key | Kept. The import doesn't touch it. |
| You delete the category | The next run creates it again, as a new category with no products in it. |

**What it never does.** An import never deletes a category: one that no longer exists in the source system stays until you delete it. And it never takes over a category you created by hand, even one with the same name. A category the import doesn't know yet is created as a new one, next to yours; a new root is primary.

**A product's categories.** If an import also files products into categories, each run sets a product's own categories to the list from the source system. A category you added to the product in the app is removed again, and one you removed is added again. An import that sends no categories for a product leaves that product's categories as they are. Categories you assign to a variant are never changed by an import.

**To make a change that lasts, make it in the source system.** The next run brings it into the app.
