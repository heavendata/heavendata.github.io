---
title: "Product types"
description: "What a product type is, how to create one from a ready-made product type or from a blank one, and how to change which attributes and variant configurations it has."
sidebar:
  order: 3
---

A product type describes what data is stored for one kind of product and how it is organized: which attributes a product of that kind has, and which variant configurations it can be split into product variants by. Every product has exactly one product type. You create one either from a [ready-made product type](#create-a-product-type-from-a-ready-made-one), which brings its attributes with it, or from a [blank one](#create-a-product-type-from-a-blank-one), choosing from attributes you have already created.

## Why product types

Most catalogs hold different kinds of products, and many attributes make no sense for some of them. A retailer who sells shoes and televisions needs *Shoe size* for the shoes and *Screen size* and *Operating system* for the televisions. Without product types every shoe would have an operating system. With a product type *Shoes* that includes *Shoe size* and a product type *Televisions* that includes *Screen size* and *Operating system*, each product shows only what describes it.

## Create a product type from a ready-made one

heavendata offers 149 ready-made product types in 18 groups, each with the attributes and variant configurations its kind of product needs. The full list is on [Ready-made product types](/en/start/ready-made-product-types.html). Creating one creates its attributes and sections in your account and reuses the ones you already have.

### Find it

1. In the sidebar, open **Settings → Product types** and choose **New product type**.
2. The **New product type** page shows **Blank product type** first, then the ready-made product types as cards in their groups. Each card shows the name, how many attributes and variant configurations it brings, and the kinds of product it covers, such as *T-shirts, blouses, shirts, polo shirts*.
3. Type into **Search product types** to filter. The search matches a product type's name, its group, and every kind of product it covers. A card that matches only by a covered product shows which one, as *Covers "Sneakers"*. One search often finds several cards: `sneaker` finds *Shoes* (*Covers "Sneakers"*) and *Socks & hosiery* (*Covers "Sneaker Socks"*). While a search is typed, *Blank product type* is hidden and the count beside the title shows how many cards match.
4. Select the card. The product type's page opens with everything the ready-made product type brings, and nothing is created yet.

If nothing matches, the page says *No product types match "‹your search›"* and offers **Clear search**.

<!-- Screenshot: the New product type page with `sneaker` typed, showing Shoes with Covers "Sneakers" and Socks & hosiery with Covers "Sneaker Socks". -->

### Choose its attributes

The page that opens is the page every product type has ([Change a product type](#change-a-product-type)), for a product type not yet created: its breadcrumb ends in **New product type**, and it has **Create** and **Cancel** at the bottom and no **Delete**. **Name** and **Key** are filled in, **Attribute sections** shows every section the product type brings with every attribute it brings included, and **Variant configurations** shows its variant configurations. Change any of it before you create the product type: rename it, change its key, leave out an attribute, add a section or change a variant configuration.

| What you see | What it means |
| --- | --- |
| **New** badge on a section or attribute | Your account does not have it yet. **Create** creates it, and an attribute you leave out is not created. The line above the sections says so: *A New badge marks attributes and sections your account doesn't have yet. They're created only when you select Create, and never if you leave without creating the product type. An attribute you leave out isn't created.* |
| An included attribute without a badge | Your account already has this attribute. It is reused as it is, not created again, and shown under the section of yours that holds it, whatever that section is called. Untick it to leave it out, unless it is a [common attribute](./common-attributes.html), which every product type includes. |
| An attribute that is not ticked, without a badge | An attribute of yours in one of those sections that the ready-made product type does not include. Tick it to include it. |
| A ticked attribute you cannot untick, with the line *The variant configuration "Color, then size" splits a product into product variants by this attribute, so this attribute is always included.* | A variant configuration splits products by it, so it is always included. |
| *Your account already has every attribute this product type needs. Create adds only the product type.* in place of the line | Nothing new is created; **Create** adds the product type alone. |

Reuse works by the attribute's [role](./attribute-roles.html#a-ready-made-product-type-assigns-the-required-roles), not its name: an attribute an earlier ready-made product type created is reused even after you renamed it, and an attribute you built by hand is not recognized, even with the same name, so the ready-made product type creates its own beside it.

<!-- Screenshot: the page of Wine, not yet created, in an account that already has General products: the Food & beverages section and its attributes with their New badges, the line above the sections, and Bottle size with its line. -->

### Create it

Choose **Create**. The new attributes and sections are created, then the product type, and the message *Product type "Tops & shirts" created* confirms it. The **Product types** list opens with the new product type in it.

**Cancel** returns to the **New product type** page without creating anything. Once you have changed something, it first asks *Discard "Tops & shirts"?*, with **Discard product type** and **Keep editing**. Leaving the page any other way after a change, by the breadcrumb, the sidebar or the browser's back button, asks *Create "Tops & shirts"?* instead: **Create** creates the product type and goes on, **Discard** leaves without creating it, and **Cancel** stays on the page.

What **Create** creates:

| | What happens |
| --- | --- |
| Attributes | Each new attribute still included is created, not required and not translatable, with its values to pick from where it has a list. A value list also accepts any other value. |
| Sections | A new section is created for each new attribute's section, named after the ready-made section. A section of yours with exactly that name is used instead. A new section none of whose attributes is still included is not created. |
| Roles | SKU, Article number, Name and Images get the [required roles](./attribute-roles.html#a-ready-made-product-type-assigns-the-required-roles), unless an attribute of yours already holds the role. |
| The product type | Created with the name, key, included attributes and variant configurations the page shows. The **Key** starts as the English name in kebab case, `tops-and-shirts`, whatever language the name is in. An import that names a product type uses this key. |

**Create** is refused, and nothing is created, when an attribute a variant configuration splits by cannot split products ([which attributes can](./product-variants.html#which-attributes-can-split-a-product)). The message names the attribute: *Couldn't create the product type. "Color" can't split products into product variants. Only Text, Integer number and Number with decimals attributes that aren't translatable can. Choose another attribute.* It is also refused when an attribute of yours that the product type reuses is deleted while the page is open: *Couldn't create the product type. The attribute "Care instructions" no longer exists. Leave it out, then select Create again.*

### Create the same one twice

Creating a ready-made product type your account already has creates a second product type, with the same name unless you change it. Every attribute the first one created is reused, so only an attribute you left out the first time is marked **New**, and it is created now unless you leave it out again. When nothing is new, the page says so and **Create** adds the product type alone. The key is made unique when the page opens: the second gets `tops-and-shirts-2`, the next `-3`. Change the **Name** before you choose **Create** so you can tell the two apart.

### Which language a ready-made product type is created in

The ready-made product types exist in English and German. The app shows and creates them in German when your account's languages include German and not English, and in English in every other case, including an account with both. The rule applies to the product type's name, its sections, its attributes and their values. Attribute codes and the product type's key are English in every account, so an import mapping works the same way in a German account. The app's own text on these pages stays English.

Because the attributes are created not translatable, Name and Description hold one value per product. If your products need names in several languages, create a translatable Name attribute yourself and give it the `product.name` role before you create ready-made product types; they then reuse yours.

## Create a product type from a blank one

**Blank product type**, the first card on the **New product type** page, opens the product type's page empty, titled *Unnamed product type* until you type a name. Create its attributes first under **Settings → Attributes & sections**; a blank product type includes attributes, it does not create them. See [Attributes & sections](./attributes.html).

1. In the sidebar, open **Settings → Product types** and choose **New product type**, then **Blank product type**.
2. Give it a **Name**, and a **Key** if an import will name it; a blank product type starts without one.
3. Under **Attribute sections**, choose **Add or remove sections**, tick the sections whose attributes it should have, and choose **Done**.
4. Tick every attribute that should be available for this kind of product. A section you add starts with none of its attributes ticked.
5. Choose **Create**.

## Change a product type

Open **Settings → Product types** and select the product type. It opens on the same page a new product type is created on, with **Save**, **Cancel** and **Delete** at the bottom. Everything below works the same before and after the product type is created, except where it says otherwise.

### General

| Form field | What it is |
| --- | --- |
| Name | The product type's name as the app shows it. |
| Key | What an import uses to name the product type ([how a ready-made product type gets its key](#create-it)). |

### Attribute sections

This is where you define which attributes a product of this type has. Choose **Add or remove sections** and tick the sections that should be visible, then tick each attribute that should be available. **Select all** in a section's header ticks or unticks the whole section; **New section** adds a section.

Each section lists its attributes as rows, as [A section's attributes](./attributes.html#a-sections-attributes) describes them, with the attribute's tick first. Each row shows the attribute's label in your working language ([Name and labels](./attributes.html#name-and-labels)). One line above the sections says what the property words on the rows mean. Each section's title ends with how many of its attributes the product type includes, such as *4 of 5 included*, and the count changes as you tick and untick. A section with nothing included shows no count: a warning under its attributes says *No attribute of this section is included. Select the attributes this product type includes.* instead.

| The tick | What it means |
| --- | --- |
| Ticked | The attribute is available, and shown when editing or importing products of this type. |
| Unticked | The attribute is not available for this product type, and not shown when editing a product of this type. |
| Ticked and locked, the row marked **Common** | A common attribute, which every product type includes. You cannot untick it here. The line under its row, *Every product type includes this attribute. Change that on Common attributes.*, links to [Common attributes](./common-attributes.html), where you change it. |
| Ticked, and cannot be unticked, with the line *The variant configuration "‹name›" splits a product into product variants by this attribute, so this attribute is always included.* | A [variant configuration](#variant-configurations) splits products by this attribute. To leave it out, change that variant configuration first. A section holding such an attribute cannot be removed either, and says *Change the variant configurations that split by this section's attributes first.* |

To change a section's attributes from here, choose the section's pencil, **Edit section**. The section opens in a window that lists its attributes as [Attributes & sections](./attributes.html#a-sections-attributes) does. Its **Save** saves the section at once, not when you save the product type, and a change reaches every product type that includes the attribute. Where the window creates a new section, the button is **Create**. While the section or one of its attributes is marked **New** or **Changed**, the pencil is not available and the line *Save the product type first.* is shown under the section's title, or *Create the product type first.* on a product type not yet created. A section that is itself new has no pencil before the product type is created.

### Variant configurations

A product type's variant configurations are listed under **Variant configurations**, each with the attributes that split it, level by level. **New variant configuration** adds one. **Allow products without product variants**, available once the product type has a variant configuration, lets a product of this type also be created without product variants. A ready-made product type comes with its variant configurations, for example *Color, then size*, and with **Allow products without product variants** ticked; the [list](/en/start/ready-made-product-types.html) counts that as the variant configuration *No product variants*. See [Product variants](./product-variants.html).

## Related articles

- [Ready-made product types](/en/start/ready-made-product-types.html) — the 149 product types you can create from
- [Attribute roles](./attribute-roles.html) — which roles a ready-made product type assigns
- [Common attributes](./common-attributes.html) — attributes every product has
- [Attributes & sections](./attributes.html) — managing the attributes a blank product type chooses from
- [Product variants](./product-variants.html) — variant configurations
- [Optimize catalog structure](/en/start/optimize-catalog-structure.html) — attributes and product types in a growing catalog
