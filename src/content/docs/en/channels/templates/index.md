---
title: "Template channels"
description: "Render a channel's output with your own template, when the receiving system needs an exact document shape."
sidebar:
  label: "Overview"
---

A **template channel** renders its output with a template you write, instead of a fixed table format. Use one when the receiving system specifies an exact document shape — an XML file to a schema, a JSON structure, or a text layout that has to match character for character.

## Create it as a template channel

Under **Channels → Create New Channel**, pick one of the template cards and click **Create**:

| Card | One record per | Content type of the output |
| --- | --- | --- |
| **Template product feed** | product | `application/xml` |
| **Template "‹entity›" feed** — one card per custom entity type | record of that custom entity | `text/plain` |

The editor of a template channel has no **Feeds** step — a template channel always has exactly **one feed** — and no **Format** step. In their place it shows **Header template**, **Record template**, **Footer template** and **Options**.

:::note
**An existing CSV, JSON or Excel channel cannot be turned into a template channel** — its **Format** step offers only those three. Create a new channel from a template card instead. In the channels list a template channel shows **Text** in the *Format* column; that is a label, not a choice you can make.
:::

**The content type is fixed by the card**, and the editor has no field to change it. The file is named with a `.txt` extension unless you set **Filename** under **Options**.

## The three templates

A template channel has three templates, and they run at different times:

| Template | Runs | What it can use |
| --- | --- | --- |
| **Header** | Once, before any products | Nothing — no product data and no functions |
| **Record** | **Once per product** (or per custom entity record) | [`record` and `variants`](/en/channels/templates/data.html), and [every function](/en/channels/templates/functions.html) |
| **Footer** | Once, after all products | Nothing — no product data and no functions |

A minimal XML feed, split across the three:

```xml frame="none"
<!-- Header -->
<?xml version="1.0" encoding="utf-8"?>
<products>
```

```xml frame="none"
<!-- Record -->
  <product>
    <sku>{{ record.sku }}</sku>
    <name>{{ record.product_name | export.xmlize }}</name>
  </product>
```

```xml frame="none"
<!-- Footer -->
</products>
```

## Which template language?

Templates are written in **[Scriban](https://scriban.github.io)**. Everything in this documentation is Scriban.

Under **Options**, the channel has a **Template language** setting with two values, **Scriban (recommended)** and **Liquid**. **Liquid is legacy and only partially supported.** We do not document it, and the examples on this site are written and tested for Scriban only — Liquid's control flow (`{% if %}`) is different, so do not expect them to work unchanged.

A channel can be on Liquid without anyone having chosen it:

| Channel | What **Options → Template language** shows | What to do |
| --- | --- | --- |
| Created before the setting existed | **Liquid** | Switching means rewriting its templates — **Duplicate** the channel from the channels list and convert the copy |
| Created from a **Template "‹entity›" feed** card | Created without a language, which runs as Liquid | Set **Scriban (recommended)** and save before you write anything |
| Created from the **Template product feed** card | **Scriban** — the card's subtitle still says *Liquid template formatted*; the subtitle is out of date, not the channel | Nothing |

:::caution
If a template that looks correct produces nothing or fails, check this setting before anything else — then [reading errors](/en/channels/templates/testing.html#reading-errors).
:::

## Where to go next

| | |
| --- | --- |
| **[Template language basics](/en/channels/templates/language.html)** | The syntax: outputting values, conditions, loops, and filters |
| **[The data in a template](/en/channels/templates/data.html)** | What `record` and `variants` contain, and how to read a plain attribute |
| **[Translatable attributes](/en/channels/templates/translations.html)** | Reading a value in one language, and looping over the channel's languages |
| **[Assets](/en/channels/templates/assets.html)** | Image, PDF and file URLs, including image variants |
| **[Custom entities](/en/channels/templates/custom-entities.html)** | Reading the records a reference attribute links to |
| **[Template function reference](/en/channels/templates/functions.html)** | Every function available, including the ones we add |
| **[Testing and debugging templates](/en/channels/templates/testing.html)** | See what your template produces before you publish it |
