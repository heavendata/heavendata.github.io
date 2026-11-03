---
title: "Field processing pipeline nodes"
description: "Every node of the field processing pipeline, in imports and channel feeds alike: what each one does, its settings and their defaults, No output and Empty value, testing a node in the Preview, and what happens when a node can't build a value."
sidebar:
  order: 5
---

A **field processing pipeline** builds one field's value, node by node, before it is written: into the product in an import, into the feed's column in a channel. It has 26 nodes and 2 sources, and all of them are offered in imports and in channel feeds alike. This page lists every one with its settings, and says how to test a node before you run an import or a feed.

## How a pipeline works

A pipeline starts with a **source**: a **Source field**, which reads a field of the record, or a **Static value**. Each node after it takes the values connected into it and gives one value on. The value of the last node is what is written. When a node has nothing to give, it gives **No output**, and the field is left as it is — see [No output and Empty value](#no-output-and-empty-value).

**To open a field's pipeline**, use the arrow button beside the field. Pointing at it shows **Edit pipeline**; the number on it counts the field's nodes. The button is in three places:

| Where | The field's arrow |
| --- | --- |
| A channel's feed | On each row of the feed, between the source and the output column |
| A data source | The dataset's **Mapping** tab, at the left of a mapped field. It is disabled until the row has a field to map into |
| An import from the product list | The **Map columns** step, at the left of each row |

An empty pipeline offers **Add source**. In a pipeline, point at a node: a **+** after it adds the next node, a **+** before it adds a node in front, and **Add source** beside it adds another input. Each **+** opens **Add node**, with a search box and the categories down the side: **Text**, **Numbers**, **Boolean**, **Date & time**, **Lists**, **Assets** and **Code**. A node can be in more than one category. **Add source** opens the same panel with **Sources** only. Select a node to open its settings, with its [Preview](#test-a-node-in-the-preview) below them.

**A node that isn't complete** is refused when you save a channel's feed or a data source's dataset: it is marked *This node isn't complete.*, with the settings it still needs marked in red, and the field's row says *A node in this pipeline isn't complete. Select Edit pipeline and fix the settings marked in red.*

## No output and Empty value

These are two different results, and in an import they do opposite things:

| A node gives | In an import | In a feed |
| --- | --- | --- |
| **No output** | The field's stored value is **left unchanged** | The record has no value for the field |
| **Empty value** | The field's stored value is **cleared** | The column is empty; a JSON feed writes `null` |

Two nodes let you choose what they give when they have nothing to give: **Pick item from list**, under **Output if no item at this index**, and **Replace text**, under **Output if no match**. Both show the hint *In an import, No output leaves the field's stored value unchanged, and Empty value clears it.* A **Source field** gives **No output** for a field the record doesn't have, unless **Return empty value if field is missing** is ticked.

To see which of the two a node gives, before you import anything, [test it in the Preview](#test-a-node-in-the-preview).

## Sources

Added with **Add source** only — they start a pipeline, or give a node another input.

| Source | What it does | Settings: choices (default) |
| --- | --- | --- |
| **Source field** | Reads the value of a field of the record | **Source field**: the record's fields. **Return empty value if field is missing** (off), with the hint *In an import, this clears the field's stored value instead of leaving it unchanged.* |
| **Static value** | Gives a fixed value | **Value** (empty) |

## Nodes

In alphabetical order, as **Add node** sorts them. A setting in **bold** is the label on screen; the default is in brackets.

| Node | Categories | What it does | Settings: choices (default) |
| --- | --- | --- | --- |
| **Asset to public URL** | Assets | Gives the public URL of an asset's file | **Image variant**: *Original (key default)*, *Original (key original)*, then your [image variants](/en/assets/asset-variants.html) by name (*Original (key default)*). Both Original options give the same file under a different URL. |
| **Build price** | Numbers | Makes one price from columns or fixed values, and finds or creates its [price list](/en/concepts/price-lists.html) | Nine fields, each a [value source](#value-sources): **Amount** (Constant value 0) · **Sale price** · **Currency code** · **Valid from** · **Valid until** · **Price list name** · **Price list external ID** · **Price list external ID system** (Constant value `erp`) · **Price list type**. **Amount**, **Currency code** and **Price list name** are required, and without all three it makes no price. An amount of 0 is a price. |
| **Calculate** | Numbers | Adds, subtracts, multiplies or divides the inputs, or applies a formula | **Operation**: Add · Subtract · Multiply · Divide · Use formula (Add). **Value** (0): one more number the operation applies, after the inputs — the node sums itself up as *a + b + … + 0*. With Multiply or Divide, set **Value** to 1 to calculate with the inputs alone. With **Use formula**, **Formula**, in which the inputs are `a`, `b`, `c` and so on, in input order. Subtract and Divide start from the first input. |
| **Change text case** | Text | Changes the text's case | **Case** (Uppercase): Uppercase · Lowercase · Title Case · Sentence case · camel · PascalCase · snake · UP · kebab-case · Train-Case · SCREAMING-KEBAB-CASE · Capitalize Words · Capitalize first letter · Invert case · Altern |
| **Clean up HTML** | Text | Tidies HTML markup | **Remove element attributes, such as class or style** (off). It keeps `src` and `alt`, so an image still shows. |
| **Combine yes/no values** | Boolean | Gives one yes/no value from several | **Operation**: All inputs must be true · One or more inputs must be true · Exactly one input must be true (All inputs must be true). **Negate** (off) |
| **Convert unit** | Numbers | Converts a number from one unit to another, such as cm to mm | See [Measurement nodes](/en/reference/measurement-nodes.html#convert-unit) |
| **Extract part of text** | Text | Takes part of the text by position and length | **First character** (1) · **Length** (1). Characters count from 1; a negative **First character** counts from the end, so -1 is the last character. A **Length** of 0 takes the rest of the text, and a negative one takes the characters before **First character**. |
| **JavaScript** | Code | Runs your own function on the value | **Script**: a new node starts with `function convert(input, record) { return input; }`. See [JavaScript node](/en/reference/javascript-node.html) |
| **Join lists** | Lists | Joins several lists into one list | None. It skips inputs that give **No output** or **Empty value**, and with no input at all it gives **No output**. |
| **Join texts** | Text | Writes the inputs one after another, with a separator, or fills a pattern with them | **Separator** (`,`) · **Maximum length** (empty): an input is added only while the text stays shorter · **Default value** (empty). Under **Pattern**: **Pattern** (empty), in which `{0}` is the first input, `{1}` the second, as in `Hello {0}!` · **Apply when the inputs are empty** (off) |
| **Limit to range** | Numbers | Keeps the number between a minimum and a maximum | **Minimum value** · **Maximum value** (both empty). The minimum must be below the maximum. |
| **Measurements to text** | Text, Numbers | Writes measurements and their unit as text, such as `20 x 10 x 5 cm` | See [Measurement nodes](/en/reference/measurement-nodes.html#measurements-to-text) |
| **Number to text** | Text, Numbers | Writes a number as text | **Number of decimals** (2) · **Decimal separator** (`.`) · **Thousands separator** (empty) · **Insert before number** · **Insert after number** (empty). The panel shows an example output. |
| **Pick input as text** | Text, Lists | Takes one of its inputs, by position, as text | **Index** (0): the first input is 0 · **Default value** (empty), given when there is no input at that index. It counts the node's inputs, not list items — unlike **Pick item from list**: one list connected to it is one input. |
| **Pick item from list** | Lists | Joins all inputs into one list and takes one item, such as the first image | **Index** (0): the first item is 0 · **Output if no item at this index**: No output · Empty value · Specific value (No output); **Output value** for Specific value. It skips inputs that give **No output** or **Empty value**, so they take no position; empty text is an item. |
| **Regular expression** | Text, Code | Matches the text with a regular expression and replaces the match | **Pattern** (required), without the enclosing slashes, such as `[0-9a-z]` or `\s` · **Replacement** (empty), where `$1`, `$2` and so on insert the match's groups, counted from 1 · **Case-insensitive matching** (off) · **Return an empty value if the pattern doesn't match** (off) |
| **Replace text** | Text | Replaces one or more texts | One row per replacement: **Search**, **Case sensitive**, **Match word**, **Pattern is regular expression**, **Replacement**; **Add replacement** adds a row, and the replacements can be pasted from and copied to the clipboard. **Output if no match**: Unchanged input value · No output · Empty value · Specific value (Unchanged input value); **Output value** for Specific value. Here Empty value gives empty text, which an import also stores as cleared. |
| **Text template** | Text, Code | Builds text from a template | **Template**: `sources[0]`, `sources[1]` and so on are the inputs, and `record.` followed by an attribute code reads any field · **Per language** (on): applies the template for each language. The template language is [Scriban](/en/channels/templates/language.html); inside the node most `export.*` functions return nothing, and `record._categories` isn't available. |
| **Text to date** | Text, Date & time | Reads a date, or a date and time, from text | The format the text is in: **ISO standard** (the default), such as `2021-10-24` or `2021-10-24T15:30` · **RFC standard**, such as `Sun, 21 Oct 2018 12:16:24 GMT` · **Language-specific**, with **Language** · **Custom pattern**, with **Pattern**. Under **Output conversions**, **Output time zone**. Under **Empty value handling**, **Treat as empty before**: a date before it gives an empty value. Both are [value sources](#value-sources). |
| **Text to hash** | Text | Hashes the text | **Hash algorithm**: MD5 · SHA-1 · SHA-256 · SHA-512 (MD5) |
| **Text to measurements** | Text, Numbers | Reads numbers and their unit from text, such as `20x10x5 cm` | See [Measurement nodes](/en/reference/measurement-nodes.html#text-to-measurements) |
| **Text to number** | Numbers | Reads a number from text | **Decimal separator** (`.`). When the text holds more than the number, it reads the first run of digits, spaces, points, commas and minus signs, so `12 kg` gives 12. When that run isn't a number on its own, as in `ca. 12 kg` or `10 - 20 cm`, it gives **No output**. |
| **Text to yes/no** | Text, Boolean | Tests the text against a condition and outputs one value if it holds and another if it doesn't | **Operator**: `= (equals)` · `!= (not equal)` · contains · does not contain · starts with · does not start with · ends with · does not end with · is empty · is not empty · matches regex (`= (equals)`) · **Value** (empty) · **Case sensitive** (off). Under **Output**: **True - condition matches** and **False - no match** |
| **Trim whitespace** | Text | Removes whitespace at the start or end, or replaces duplicate whitespace with one space | **Remove whitespace at the start** (on) · **Remove whitespace at the end** (on) · **Replace duplicate whitespace with one space** (off) |
| **Yes/no to text** | Text, Boolean | Writes a yes/no value as text | **Output if yes** (`1`) · **Output if no** (`0`) · **Output if empty** (`0`) |

### Value sources

Each field of **Build price**, and **Output time zone** and **Treat as empty before** of **Text to date**, says where its value comes from:

| Choice | The value |
| --- | --- |
| **No value** | None |
| **Constant value** | What you type or pick beside it |
| **Input value** | One of the node's inputs, by **Input number**. Here the first input is **1** — unlike **Pick item from list**, **Pick input as text** and **Join texts**, which count from 0 |

## Test a node in the Preview

**Preview**, under a node's settings, shows what the node gives for test inputs you type. Nothing you enter there is saved, and nothing is imported or exported. Every node has one except the two sources.

Each input connected to the node has a row, named after the node it comes from; a node with nothing connected has one row, **Input**. For each row, choose what it gives the node:

| Test input | What to enter |
| --- | --- |
| **Text** (the default) | The text. Leave it empty for empty text |
| **List of texts** | One item per line. A blank line is no item; leave it all empty for an empty list |
| **No output** | Nothing — the input gives no output |
| **Empty value** | Nothing — the input gives an empty value |
| **Number**, **Measurements** | On the first row, when its Source field has a unit — see [Measurement nodes](/en/reference/measurement-nodes.html#preview) |

A row fed by a Source field also says what that field gives when the record doesn't have it: *If "‹field›" is missing, Source field gives No output.* — or *gives Empty value.* when **Return empty value if field is missing** is ticked. For a node that reads other fields of the record, such as **Text template** or **JavaScript**, add them under **Record (optional)**, one per line: `color: red`.

**Output** names what the node gives:

| Output | What it says |
| --- | --- |
| **No output** | *In an import, this leaves the field's stored value unchanged.* |
| **Empty value** | *In an import, this clears the field's stored value.* |
| **Empty text** | *In an import, this clears the field's stored value, and a JSON export writes it as "".* |
| **Empty list** | *In an import, this clears the field's stored value, and a JSON export writes it as [].* |
| **List of 3 items** | The items, one per line. An empty item reads *Empty text* or *Empty value* |
| The value itself | — |

Changing the node's settings keeps your test inputs, so you can switch **Output if no match** from **No output** to **Empty value** and watch the output change.

**The Preview reads numbers and dates with fixed settings**: a decimal point, ISO dates, and no account language. It does not use your import's **Data Format** or a channel's settings. So a number with a decimal comma, or a date written the way your language writes it, can come out differently in the Preview than in your import. Type test numbers with a decimal point, and test dates in ISO format, such as `2026-10-24`.

## When a node can't build a value

A node that can't build a value leaves **that field** out of the record. The rest of the record is written, and the run goes on. In an import the value stored before stays; in a feed the record has no value for the field. That happens when:

- a [JavaScript node's script fails](/en/reference/javascript-node.html#when-a-script-fails) — wherever it is in the pipeline, the nodes after it don't run;
- a node gets another node's error as its input, and can't do anything with it;
- a node gets a value of a type it can't take. A feed's log entry begins *Couldn't use a value because a node can't take it. Check the source data and the node's settings.*; an import's says *This value couldn't be converted for this field. Check the value in the file and the field's mapping, and import again.*

The run's step counts them. An import's step ends, for example, *products.csv: imported — 4,812 records created; 12 values that the field processing pipeline couldn't build — see the log file*. A feed's step reads *Created feed "‹feed›" with warnings. 1,200 records written, 12 values that the field processing pipeline couldn't build — see the log file for details*.

The step's log file has an entry per value, naming the field, and the record: by its row in an import, by its identifier in a feed. Its message says why — see [reading a log file](/en/troubleshooting/background-jobs.html#reading-a-log-file). The measurement nodes' own messages are listed on [Measurement nodes](/en/reference/measurement-nodes.html#when-a-value-is-refused).

## Related articles

- [JavaScript node](/en/reference/javascript-node.html) — the script, its limits, and every message about a failed script
- [Measurement nodes](/en/reference/measurement-nodes.html) — read, convert and write measurements and their units
- [Price lists](/en/concepts/price-lists.html) — how **Build price** finds or creates a price list
- [Import or delete products from a file](/en/import/import-products.html) — the import's **Map columns** step
- [Data sources](/en/import/data-sources.html) — a dataset's **Mapping** tab
- [Custom product feeds](/en/channels/setup-custom-product-feed.html) — a feed's fields
