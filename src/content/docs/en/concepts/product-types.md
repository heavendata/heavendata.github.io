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
4. Select the card. The create page opens, titled with the product type's name.

If nothing matches, the page says *No product types match "‹your search›"* and offers **Clear search**.

<!-- Screenshot: the New product type page with `sneaker` typed, showing Shoes with Covers "Sneakers" and Socks & hosiery with Covers "Sneaker Socks". -->

### Choose its attributes

The create page shows the product type: its **Variant configurations** by name, then its **Attributes** as one panel per section with one tile per attribute. Every attribute is ticked. Above them it says *Untick the attributes you don't need. A New badge marks one your account doesn't have yet.*

| What you see | What it means |
| --- | --- |
| **New** badge on a section or attribute | Your account does not have it yet. **Create** creates it. |
| A ticked attribute you can untick | A new attribute no variant configuration splits by. Untick it and it is not created and not put on the product type. **Select all** in the section's header ticks or unticks all of them at once. |
| A ticked, locked attribute with the hint *The variant configuration "Color, then size" splits a product into product variants by this attribute, so this attribute is always added.* | A variant configuration needs it, so it is always included. |
| A ticked, locked attribute with no hint | Your account already has this attribute. It is reused as it is, not created again, and the product type includes it. It is shown under the section of yours that holds it, whatever that section is called. To leave it out, untick it in the product type editor after creating. |
| **Already in your account** in a section's header | Every attribute in that section is already yours. Nothing in it is created. |
| *Your account already has every attribute this product type needs. Create adds only the product type.* | Nothing new is created; **Create** adds the product type alone. |

Reuse works by the attribute's [role](./attribute-roles.html#a-ready-made-product-type-assigns-the-required-roles), not its name: an attribute an earlier ready-made product type created is reused even after you renamed it, and an attribute you built by hand is not recognized, even with the same name, so the ready-made product type creates its own beside it.

<!-- Screenshot: the create page for Tops & shirts in an account that already has General products: the General, Media and links, and Weight and dimensions sections marked Already in your account, the Fashion section with its New badge and Select all, and Size locked with its hint. -->

### Create it

Choose **Create**. The attributes and sections are created, then the product type, and the message *Product type "Tops & shirts" created* confirms it. The **Product types** list opens with the new product type in it. **Cancel** returns to the **New product type** page without creating anything.

What **Create** creates:

| | What happens |
| --- | --- |
| Attributes | Each ticked attribute your account does not have is created, not required and not translatable, with its values to pick from where it has a list. A value list also accepts any other value. |
| Sections | A new section is created for each new attribute's section, named after the ready-made section. A section of yours with exactly that name is used instead. A section whose attributes you all unticked is not created. |
| Roles | SKU, Article number, Name and Images get the [required roles](./attribute-roles.html#a-ready-made-product-type-assigns-the-required-roles), unless an attribute of yours already holds the role. |
| The product type | Created with the ticked attributes and the variant configurations shown. Its **Key** is the English name in kebab case, `tops-and-shirts`, whatever language the name is in. An import that names a product type uses this key. |

**Create** is refused, and nothing is saved, when an attribute of yours that a variant configuration splits by cannot split products: it is translatable, or it is not a text or number attribute. The message names the attribute and the variant configuration: *Couldn't create the product type. The variant configuration "Color, then size" splits products by "Color", which must be a text or number attribute that isn't translatable. Change "Color" under Attributes & sections, then try again.*

### Create the same one twice

Creating a ready-made product type your account already has creates a second product type with the same name. Every attribute the first one created is reused, so the create page marks those sections **Already in your account**; an attribute you unticked the first time is offered again as **New**, and is created now unless you untick it again. When nothing is new, the page says so and **Create** adds the product type alone. The two product types differ only in their key: the second gets `tops-and-shirts-2`, the next `-3`. Rename the second one in the product type editor so you can tell them apart.

### Which language a ready-made product type is created in

The ready-made product types exist in English and German. The app shows and creates them in German when your account's languages include German and not English, and in English in every other case, including an account with both. The rule applies to the product type's name, its sections, its attributes and their values. Attribute codes and the product type's key are English in every account, so an import mapping works the same way in a German account. The app's own text on these pages stays English.

Because the attributes are created not translatable, Name and Description hold one value per product. If your products need names in several languages, create a translatable Name attribute yourself and give it the `product.name` role before you create ready-made product types; they then reuse yours.

## Create a product type from a blank one

**Blank product type**, the first card on the **New product type** page, opens the product type editor empty. Create its attributes first under **Settings → Attributes & sections**; a blank product type includes attributes, it does not create them. See [Attributes & sections](./attributes.html).

1. In the sidebar, open **Settings → Product types** and choose **New product type**, then **Blank product type**.
2. Give it a **Name**, and a **Key** if an import will name it; a blank product type starts without one.
3. Under **Attribute Sections**, choose **Add / remove sections** and tick the sections whose attributes it should have.
4. Tick every attribute that should be available for this kind of product.
5. Choose **Save**.

## Change a product type

Open **Settings → Product types** and select the product type. The same editor opens for a product type created from a ready-made one.

### General

| Form field | What it is |
| --- | --- |
| Name | The product type's name as the app shows it. |
| Key | What an import uses to name the product type ([how a ready-made product type gets its key](#create-it)). |

### Attribute sections

This is where you define which attributes a product of this type has. Choose **Add / remove sections** and tick the sections that should be visible, then tick each attribute that should be available. **Select/Deselect all** in a section's header ticks or unticks the whole section, as **Select all** does on the create page; **New section** adds a section.

Each section lists its attributes as rows, one per attribute. A row starts with the attribute's tick, then shows the attribute type's icon and name, the attribute's label in your working language ([Name and labels](./attributes.html#name-and-labels)) with its code, and a word for each property the attribute has: **Common**, **Translatable**, **Internal**, **Required**. One line above the sections says what each of those words means; [A section's attributes](./attributes.html#a-sections-attributes) lists them. Each section's title ends with how many of its attributes the product type includes, such as *4 of 5 included*, and the count changes as you tick and untick. A section with nothing included shows no count: a warning under its attributes says *No attribute is active. You may want to enable some or all attributes...* instead.

| The tick | What it means |
| --- | --- |
| Ticked | The attribute is available, and shown when editing or importing products of this type. |
| Unticked | The attribute is not available for this product type, and not shown when editing a product of this type. The row looks the same otherwise: the tick alone says the attribute is left out. |
| Ticked and locked, the row marked **Common** | A common attribute, which every product type includes. You cannot untick it here. The line under its row says *Every product type includes this attribute. Change that on Common attributes.*, and links to [Common attributes](./common-attributes.html), where you change it. |

To change a section's attributes from here, choose the section's pencil, **Edit section**. The section opens in a window that lists its attributes as [Attributes & sections](./attributes.html#a-sections-attributes) does. Its **Save** saves the section at once, not when you save the product type, and a change reaches every product type that includes the attribute. Where the window creates a new section, the button is **Create**. While the section or one of its attributes is marked **New** or **Changed**, the pencil is not available and the line *Save the product type first.* is shown under the section's title.

### Variants

A product type's variant configurations are listed under **Variants**: whether products of this type have product variants and which attributes split them, level by level. **New variant** adds a variant configuration. A ready-made product type comes with its variant configurations, for example *Color, then size* and *No product variants*; the [list](/en/start/ready-made-product-types.html) names them. See [Product variants](./product-variants.html).

## Related articles

- [Ready-made product types](/en/start/ready-made-product-types.html) — the 149 product types you can create from
- [Attribute roles](./attribute-roles.html) — which roles a ready-made product type assigns
- [Common attributes](./common-attributes.html) — attributes every product has
- [Attributes & sections](./attributes.html) — managing the attributes a blank product type chooses from
- [Product variants](./product-variants.html) — variant configurations
- [Optimize catalog structure](/en/start/optimize-catalog-structure.html) — attributes and product types in a growing catalog
