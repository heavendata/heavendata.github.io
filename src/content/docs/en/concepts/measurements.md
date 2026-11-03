---
title: "Measurements and units"
description: "Store weights and dimensions with a unit: the Unit setting on a number attribute, the Measurement set type for length × width × height, what changing a unit does, pasting values such as 20 x 10 x 5 cm, filtering, and what imports and exports do with them."
sidebar:
  order: 1.6
---

A unit belongs to the **attribute**, not to the value. Give a *Weight* attribute the unit kilograms, and every product's weight in it is a plain number read as kilograms. For a product's dimensions — length, width and height — use a **Measurement set** attribute: two to four numbers in one unit, edited and exported as one value.

Values are stored as entered. Units are converted only on the way in, when you paste or import a value in another unit, and on the way out, when a channel asks for another unit. **Changing an attribute's unit converts nothing**: the numbers stay and are read in the new unit — see [Changing a unit](#changing-a-unit).

## Two ways to store a measurement

| | Number with a unit | Measurement set |
| --- | --- | --- |
| **Use it for** | One measurement, such as a weight, a volume or a cable length | Dimensions: two to four measurements that belong together, such as length × width × height |
| **Attribute type** | **Integer number** or **Number with decimals**, with a **Unit** | **Measurement set** |
| **The value** | One number | One number per measurement, each in the set's unit. A measurement can be left empty. |
| **Unit** | Optional | Required |
| **Translatable** | Not while it has a unit | Never |
| **Indexed** | Yes, as any number | Never — filtering by a measurement works without an index |
| **Can split products into product variants** | Yes, as any number that isn't translatable | No — see [Product variants](/en/concepts/product-variants.html#which-attributes-can-split-a-product) |
| **Filter the product list by it** | Yes | By each measurement on its own |
| **Sort the product list by it** | Yes | No |

Both work on products, product variants and custom entities.

## Give a number attribute a unit

1. In the sidebar, open **Settings → Attributes & sections** and select the section that holds the attribute — or add a new one with **New attribute → Number**.
2. Open the attribute with ✎ **Edit attribute**, and go to its **Settings** tab.
3. Under **Type**, choose **Integer number** or **Number with decimals**.
4. Choose the **Unit**, such as **Kilograms (kg)**. The field is optional; **No unit** removes it.
5. Choose **Done**, then **Save** the section.

The unit list is grouped by what a unit measures. **Length**, **Weight**, **Volume**, **Area** and **Temperature** come first, each starting with its common units; every other quantity follows. Type in the list to filter it by a unit's name or symbol, such as `fl oz`.

| Group | Common units, first in the group |
| --- | --- |
| Length | mm, cm, m, in, ft |
| Weight | mg, g, kg, oz, lb |
| Volume | ml, cl, l, m³, fl oz (US fluid ounces) |
| Area | cm², m² |
| Temperature | °C, °F, K |

Switching **Type** between **Integer number** and **Number with decimals** keeps the unit.

**A unit and Translatable exclude each other.** An attribute with a unit holds one value for every language:

| The attribute | What the window does |
| --- | --- |
| New, with **Translatable** on | **Unit** is disabled: *Turn off Translatable first.* |
| New, with a unit | **Translatable** is disabled: *Remove the unit first.* |
| Saved, translatable | **Unit** is disabled for good, because **Translatable** can't be changed once an attribute is saved. To use a unit, create a new attribute without **Translatable**. |

## Create a measurement set

1. In the sidebar, open **Settings → Attributes & sections** and select a section.
2. Choose **New attribute**, then one of the three measurement sets: **Measurement set (length × width × height)**, **Measurement set (width × height)** or **Measurement set (width × height × depth)**. The window opens with those measurements filled in.
3. On the **General** tab, enter the **Name**, such as *Package size*.
4. On the **Settings** tab, choose the **Unit** — every measurement is in it.
5. Under **Measurements**, rename, reorder, add or remove measurements, until the set has the ones you need.
6. Choose **Done**, then **Save** the section, and include the attribute in the [product types](/en/concepts/product-types.html#attribute-sections) that need it.

On a custom entity type, **New attribute** offers the same three measurement sets.

Each measurement has a **Code** and a **Label**:

| | Rule |
| --- | --- |
| **Number of measurements** | From 2 to 4 |
| **Code** | Lowercase letters, digits and `_`, starting with a letter, such as `width`. Unique in the set, and never `unit`. Exports and templates name the measurement by it. |
| **Label** | What the app shows for the measurement, such as *Width*. A measurement has one label, the same in every language. |
| **Order** | The order the editor shows the inputs in, and the order exports write the numbers in. |
| **Minimum value**, **Maximum value** | Optional, on the **Settings** tab. Each applies to every measurement of the set. |

**After the first save**, you can still change the labels, the order and the unit. Which measurements a set has, and their codes, are fixed: **Add measurement** and each remove button are disabled. To change them, create a new attribute.

**Required** and **Internal** work on a measurement set as on any attribute. A required measurement set needs every one of its measurements before a product variant can be published.

## Changing a unit

You can change or remove the unit of a saved attribute at any time. **The stored numbers stay exactly as they are and are read in the new unit** — the window says so: *Changing it keeps the numbers as they are and doesn't convert them, so 10 kg becomes 10 lb.*

:::caution[Changing a unit converts nothing]
A weight of `10` in kilograms becomes `10` in pounds. No value is recalculated, and no other warning appears.
:::

This is how to fix a unit chosen wrongly: if the numbers were always millimeters but the attribute says centimeters, choose millimeters and the values are right. To convert the values themselves, change them — for example with an [import](/en/import/import-products.html) — before or after you change the unit.

## Enter and paste values

A number with a unit shows its unit's symbol after the input, such as `kg`. A measurement set shows one input per measurement, in the set's order, each labeled with its measurement, and the unit after the last.

**Typing takes a number only, in the attribute's unit.** **Pasting** reads a unit too and converts the value into the attribute's unit:

| Pasted into | The text | Gives |
| --- | --- | --- |
| A number in cm | `200 mm` | `20` |
| A number in kg (Integer number) | `2500 g` | `3` — an Integer number rounds a converted value to the nearest whole number |
| A number in cm | `20` | `20` — a number without a unit is taken to be in the attribute's unit |
| Any input of a set in cm | `20 x 10 x 5 cm` | `20`, `10`, `5`, filled in order from the first measurement |
| Any input of a set in cm | `200mm x 10 cm x 50 mm` | `20`, `10`, `5` |
| Any input of a set in cm | `20 × — × 5 cm` or `20 x  x 5 cm` | `20`, empty, `5` — a dash or an empty place leaves that measurement empty |
| One input of a set in cm | `25 mm` | `2.5`, in that input only |

What paste reads:

- **Separators** between the numbers: `x`, `X`, `×` or `*`, with or without spaces — `20x10x5`, `20 × 10 × 5`.
- **The unit** after each number (`20cm x 10cm x 5cm`), once at the end (`20 x 10 x 5 cm`), or not at all. `"` and `″` are read as inches.
- **Numbers** in the decimal separator of your language setting. A thousands separator is not read.
- A converted value keeps at most four decimal places.

**Text that paste can't read changes nothing**, and a message under the input says why:

| The pasted text | Message, for a set in cm |
| --- | --- |
| A unit of another kind, such as `kg` for a length | `"kg" is a weight unit. Use a length unit, such as cm.` |
| A unit the list does not hold | `"parsec" isn't a unit this attribute accepts. Use a length unit, such as cm.` |
| Too many or too few numbers for the set | `This attribute has 3 measurements: Length, Width, and Height. Paste 3 numbers, such as 20 x 10 x 5.` |
| No number | `Enter a number in cm, such as 20.` |

The input then holds the converted numbers, which you see before you save.

## Where a unit shows

Every screen writes a value with its unit's symbol after it, in the number format of your language: `1.5 kg`, `20 × 10 × 5 cm`. A measurement left empty shows as a dash: `20 × — × 5 cm`.

| Where | What you see |
| --- | --- |
| **Product editor**, custom entity records, **Add variant**, bulk edit | The unit's symbol after the input |
| **Product list** | A number with a unit: header *Weight (kg)*, cells `1.5 kg`. A measurement set: one column with the whole value, `20 × 10 × 5 cm`. Under **Columns**, each measurement is also offered on its own, as *Package size › Height*, with the header *Height (cm)* |
| **Custom entity** list | As in the product list; each measurement has its own column |
| **Filter** panel | Each measurement is its own field, *Package size › Height*, with the number conditions; the unit's symbol shows after the value |
| **Brand portal** | The value and its unit, in the product list and on a product's page. A measurement set is one column, without a column per measurement. |

**A filter takes a number in the attribute's unit.** It converts nothing: to find packages taller than 10 cm, filter *Package size › Height* for more than `10`.

## Import and export

**An import converts a value into the attribute's unit.** Map the column onto the attribute as you would any number:

| Mapped onto | The file holds | Stored |
| --- | --- | --- |
| A number in cm | `200 mm` | `20` |
| A number in cm | `20` | `20` |
| A measurement set in cm | `20 x 10 x 5 cm` or `200x100x50 mm` | `20`, `10`, `5` |
| A measurement set in cm | `20 x 10` | Nothing — see below |

Without a node in the field's pipeline, a measurement set's column is read as one text, `20 x 10 x 5 cm`, always with a decimal point. A value that can't be read, has a unit of another kind, or has the wrong count of numbers is not written: the rest of the row is imported, the value stored before stays, and the import's log has a warning that says why. For a value in three columns, a unit in its own column, or a decimal comma, add the [Text to measurements](/en/reference/measurement-nodes.html#text-to-measurements) node.

:::caution[A number attribute keeps the old reading when a unit can't be read]
Into a **number** with a unit, an import converts only a value whose unit it can read and that measures the same kind of thing. Anything else is read as it was before units existed: the first number is stored, with no warning — `5 kg` into a cm attribute stores `5`. Check such a column before you import it, or use **Text to measurements**, which refuses it.
:::

**An export writes the number in the attribute's unit**, as for any number. A measurement set goes out whole or one measurement at a time:

| In a | A measurement set is written as |
| --- | --- |
| CSV or Excel feed | The text `20 x 10 x 5 cm`: a decimal point, no thousands separator, the unit once at the end. A measurement left empty keeps its place: `20 x  x 5 cm`. |
| JSON feed | An object with one member per measurement code: `{"_type": "dictionary", "length": 20, "width": 10, "height": 5}`. A measurement left empty is left out. |
| Template channel | An object, and the text above when printed whole — see [Measurement sets in a template](/en/channels/templates/data.html#measurement-sets) |
| Field pipeline | Each measurement is also its own source field, such as *Package size › Height*: a number in the set's unit. Use it to send length, width and height as separate columns. |

To write another unit or another text shape, such as `200 x 100 x 50 mm` or the height alone in inches, use the [measurement nodes](/en/reference/measurement-nodes.html). In a template, use [`export.convert_unit`](/en/channels/templates/functions.html#exportconvert_unit).

## Related articles

- [Attributes & sections](/en/concepts/attributes.html) — create and manage attributes
- [Measurement nodes](/en/reference/measurement-nodes.html) — read, convert and write measurements in an import or a feed
- [The data in a template](/en/channels/templates/data.html#measurement-sets) — a measurement set's object, its unit and measurements
- [Money attributes](/en/concepts/money-attributes.html) — an amount in the currency set on the attribute
