---
title: "Measurement nodes"
description: "The three field pipeline nodes for measurements — Text to measurements, Convert unit and Measurements to text: every setting, the presets and the pattern placeholders, what each node outputs, and the log warning a refused value leaves."
sidebar:
  order: 5
---

Three nodes of the **Field processing pipeline** read, convert and write measurements — numbers with a unit, and [measurement sets](/en/concepts/measurements.html) such as length × width × height. All three are offered in imports and in channel feeds alike.

| Node | What it does | Category in **Add node** |
| --- | --- | --- |
| [Text to measurements](#text-to-measurements) | Reads numbers and their unit from text, such as `20x10x5 cm` | Text, Numbers |
| [Convert unit](#convert-unit) | Converts one number from one unit to another, such as cm to mm | Numbers |
| [Measurements to text](#measurements-to-text) | Writes measurements and their unit as text, such as `20 x 10 x 5 cm` | Text, Numbers |

**To add a node**, open the field's pipeline with the arrow button beside the field (pointing at it shows **Edit pipeline**) — on a feed's fields in a channel, on a data source dataset's **Mapping** tab, or on the **Map columns** step of an import. In the pipeline, point at a node and choose the **+** that appears beneath it.

**A node gets a unit from a Source field connected directly to it, or from Text to measurements.** A source field that reads a number with a unit, a measurement set or one of its measurements passes its unit on, and **Text to measurements** outputs the unit it read. Any other node's output carries no unit: **Convert unit** outputs a plain number, so to convert and then write text, set the unit in **Measurements to text** instead of chaining the two.

## Text to measurements

Reads numbers with their units. In an import, as the field's last node, it converts them to the unit of the attribute the field fills.

| Setting | Choices | Default |
| --- | --- | --- |
| **Inputs** | How the source gives the numbers — see the table below | **One text** |
| **Decimal separator** | **Dot (.)** · **Comma (,)** | **Dot (.)** |
| **Unit if the source has none** | **The attribute's unit**, or any unit from the list | **The attribute's unit** |

| **Inputs** | Connect | Example source |
| --- | --- | --- |
| **One text** | One input: one or more numbers and their units | `20 cm`, `20x10x5 cm`, `20cm x 100mm x 5cm` |
| **A number and a unit** | Two inputs: the number, then the unit | `200` and `mm` |
| **One per measurement** | One input per measurement, in the measurements' order; each a number, or a number with a unit | `20`, `10`, `5` |
| **One per measurement, then a unit** | One input per measurement, then one for the unit | `20`, `10`, `5` and `cm` |

The text is read as pasting reads it: `x`, `X`, `×` or `*` between the numbers, a unit after each number, once at the end, or not at all, and `"` as inches. An empty place or a dash leaves that measurement empty. See [What paste reads](/en/concepts/measurements.html#enter-and-paste-values).

**A number without a unit** is taken to be in the unit set under **Unit if the source has none**. With **The attribute's unit**, in an import, it is taken to be in the unit of the attribute the field fills; in a feed, it has no unit.

**Into a field with a unit**, as the field's last node, the node converts every number to the field's unit and keeps at most four decimal places; into an **Integer number** it rounds a converted number to the nearest whole number. The count of numbers must match the measurement set's measurements.

**Anywhere else** — in a feed, into a field without a unit, or before another node — it outputs as many numbers as the text holds, converted to the first unit the source names: `20cm x 100mm x 5cm` gives 20, 10 and 5 in cm. Their measurements have no codes then, so a **Custom pattern** in a following **Measurements to text** can use only `{unit}`, not a code such as `{width}`.

The canvas sums the node up as *Reads 3 inputs*, with *, assuming mm* when a unit is set.

## Convert unit

Converts a number to another unit of the same kind — a length to a length, a weight to a weight.

| Setting | Choices | Default |
| --- | --- | --- |
| **Unit it is in** | When the connected Source field has a unit: only *The source field's unit (cm)*. Otherwise any unit from the list, or empty. | The source field's unit; otherwise empty |
| **Unit to write** | Any unit from the list. Required. | — |

Left empty, **Unit it is in** uses the unit each value is in, and a number without a unit is left out. **Unit to write** must measure the same kind of thing as the number: *Choose a length unit, such as cm.*

The node takes **one number** — a number, a measurement, or a text that is a number written with a decimal point — and outputs a plain number in **Unit to write**, rounded to four decimal places. A list is converted item by item. **A whole measurement set is refused**: connect one measurement's Source field, such as *Package size › Height*, instead.

The canvas sums it up as *cm to mm*.

## Measurements to text

Writes measurements as text, in the unit and format a feed needs. It writes a source with a unit: a number with a unit, a measurement set, one measurement, or the output of **Text to measurements**.

| Setting | Choices | Default |
| --- | --- | --- |
| **Unit** | **The attribute's unit**, or any unit from the list to convert to | **The attribute's unit** |
| **Format** | One of the presets below, or **Custom pattern** | The first preset |
| **Pattern** | Shown with **Custom pattern** — see [The pattern](#the-pattern) | — |
| **Decimals** | 0 to 28. Empty writes each number as stored, without trailing zeros. | Empty |
| **Decimal separator** | **Dot (.)** · **Comma (,)** | **Dot (.)** |
| **Thousands separator** | **None** · **Comma (,)** · **Dot (.)** · **Single quote (')** · **Space** | **None** |

The presets are shown with the source's own unit:

| Source | Preset | Writes |
| --- | --- | --- |
| A measurement set | `20 x 10 x 5 cm` | The unit once, at the end |
| A measurement set | `20 cm x 10 cm x 5 cm` | The unit after every number |
| A measurement set | `20 x 10 x 5` | No unit |
| A number with a unit | `20 cm` | The number and its unit |
| A number with a unit | `20` | The number alone |

The unit is written as its symbol: `cm`, `in`, `fl oz`. A measurement left empty keeps its place empty: `20 x  x 5 cm`. The canvas sums the node up as the chosen format and the unit: *"20 x 10 x 5 cm" in mm*.

### The pattern

A pattern is literal text with placeholders in braces. Everything outside the braces is written as typed, spaces included.

| Source | Placeholders |
| --- | --- |
| A measurement set | Each measurement's code, such as `{length}`, `{width}`, `{height}`, and `{unit}` |
| A number with a unit | `{number}` and `{unit}` |

| Pattern, for a set of 40 × 20 × 10.5 cm, **Unit** millimeters | Writes |
| --- | --- |
| `{length} x {width} x {height} {unit}` | `400 x 200 x 105 mm` |
| `L {length} / W {width} / H {height}` | `L 400 / W 200 / H 105` |
| `{height}{unit}` | `105mm` |

A pattern can leave measurements out and repeat them. Every `{` needs a closing `}`; a `{` can't be written as text. To write `"` for inches, type it into the pattern in place of `{unit}`: `{height}"`.

| The pattern | Message under **Pattern** |
| --- | --- |
| Empty | `Enter a pattern.` |
| A code the set doesn't have | `"{depth}" isn't a measurement of this attribute. Use {length}, {width}, {height}, or {unit}.` |
| A placeholder other than `{number}` or `{unit}`, for a number | `"{weight}" isn't a placeholder for this attribute. Use {number} or {unit}.` |
| A `{` without `}`, as in `H {height` | `The { at position 3 has no closing }. Add the }, or remove the {.` |
| A name that isn't shaped as a code, as in `{Height}` | `"{Height}" isn't a placeholder. Use lowercase letters, digits, and _ in braces, starting with a letter, such as {unit}.` |

## Preview

Each node's **Preview** runs it on test inputs you type, with the unit of the Source field connected to it. For a Source field with a unit, the first test input offers **Number** or **Measurements** — for a measurement set, *Enter 3 numbers, such as 20 x 10 x 5 cm*. In a feed, it is the default; in an import, it is listed after **Text**.

## When a value is refused

A node that can't handle a value leaves **that field** out of the record. The rest of the record is written, and in an import the value stored before stays. The run's log has one warning for the value. Each message begins *The record was imported without this field's value.* in an import, or *The record was exported without this field's value.* in a feed, and goes on as below.

**Text to measurements**, and an import into a field with a unit — as an import writes them:

| Why | The rest of the message |
| --- | --- |
| The text isn't a number with a unit | `"20 by 10" isn't a number with a unit. Change the value in the file and import again.` |
| A unit the list doesn't hold | `"parsec" isn't a unit this field accepts. Use a length unit in the file and import again.` |
| A unit of another kind than the field's | `"kg" is a weight unit, and this field holds length values in cm. Change the unit in the file and import again.` |
| The count of numbers doesn't match the measurement set | `This value has 2 numbers, and this field has 3 measurements. Change the value in the file and import again.` |
| Measurements into a number without a unit | `"20 x 10 x 5 cm" was read as measurements, and this field holds a number without a unit. …` |
| Measurements into a field of another type | `"20 x 10 x 5 cm" was read as measurements, and this field can't hold them. …` |
| **Text to measurements** assumes a unit of another kind than the field's | `"Text to measurements" assumes kg, a weight unit, for numbers without a unit, and this field holds length values in cm. …` |

In a feed, the first four lines end *Change the value and export again.*, and the last *… and export again.* The two lines about measurements read the same in a feed: `"20 x 10 x 5 cm" was read as measurements, and this field can't hold them. Add Measurements to text after "Text to measurements", and export again.`

**Convert unit** and **Measurements to text** — as a feed writes them:

| Why | The rest of the message |
| --- | --- |
| **Convert unit** got something that isn't a number | `"n/a" isn't a number. Change the value and export again.` |
| **Convert unit** got a whole measurement set | `This value has 3 measurements, and "Convert unit" converts one number. Connect one measurement's field instead, or use Measurements to text in its place, and export again.` |
| **Convert unit** has no unit to convert from | `This value has no unit to convert from. In "Convert unit", choose the unit this value is in, and export again.` |
| A node converts between units of different kinds | `This value is in kg, a weight unit, and "Convert unit" converts to cm, a length unit. Choose a weight unit in "Convert unit" and export again.` |
| The converted number is too large to write | `Converted to nm, it is too large to write. Choose a larger unit in "Convert unit" and export again.` |
| **Measurements to text** got a value without a unit | `This value has no unit to write. Connect a field with a unit, or Text to measurements, and export again.` |
| The pattern names a placeholder the value has none for | `"{width}" isn't a placeholder for this value. Change the pattern in "Measurements to text" and export again.` |
| A node is set to a unit that no longer exists | `"Convert unit" is set to a unit that no longer exists. Choose another unit in "Convert unit" and export again.` |

In an import, these lines end *… and import again.*; a line that says *Change the value* reads *Change the value in the file and import again.*

## Related articles

- [Measurements and units](/en/concepts/measurements.html) — the Unit setting, measurement sets, and pasting values
- [Import or delete products from a file](/en/import/import-products.html) — the import's **Map columns** step
- [Data sources](/en/import/data-sources.html) — a dataset's **Mapping** tab
- [The data in a template](/en/channels/templates/data.html#measurement-sets) — measurement sets in a template channel
