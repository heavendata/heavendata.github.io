---
title: "Template-based channels"
description: "Render a channel's output with your own template, when the receiving system needs an exact document shape."
sidebar:
  label: "Overview"
---

A **template-based channel** renders its output with a template you write, instead of a fixed table format. Use one when the receiving system specifies an exact document shape — an XML file to a schema, a JSON structure, or a text layout that has to match character for character.

Every other format lays your data out as rows and columns, or as one JSON object per record. A template gives you the whole document.

## Create it as a template channel

A channel is a template channel from the moment it is created. Under **Channels → Create New Channel**, pick one of the template cards and click **Create**:

| Card | One record per | Content type of the output |
| --- | --- | --- |
| **Template product feed** | product | `application/xml` |
| **Template "‹entity›" feed** — one card per custom entity type | record of that custom entity | `text/plain` |

The editor of a template channel has no **Feeds** and no **Format** step. In their place it shows **Header template**, **Record template**, **Footer template** and **Options**.

:::note
**An existing CSV, JSON or Excel channel cannot be turned into a template channel** — its **Format** step offers only those three. Create a new channel from a template card instead. In the channels list a template channel shows **Text** in the *Format* column; that is a label, not a choice you can make.
:::

**The content type is fixed by the card.** A product template feed is delivered as `application/xml`, a custom entity template feed as `text/plain`, and the editor has no field to change either. The file is named with a `.txt` extension unless you set **Filename** under **Options**.

A template channel is limited to **one feed**. Other formats can carry several; this one cannot.

## The three templates

A template channel has three templates, and they run at different times:

| Template | Runs | What it can use |
| --- | --- | --- |
| **Header** | Once, before any products | No product data |
| **Record** | **Once per product** (or per custom entity record) | `record`, `variants`, and everything on [the data page](/en/channels/templates/data.html) |
| **Footer** | Once, after all products | No product data |

:::caution
**`record` only exists in the record template.** The header and footer run once, before and after the products, so there is no product to refer to. This is the most common mistake when writing a first template — an opening XML tag belongs in the header, the products in the record template, and the closing tag in the footer.
:::

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

:::caution[Check your channel's template language first]
Under **Options**, the channel has a **Template language** setting with two values, **Scriban (recommended)** and **Liquid**.

**Liquid is legacy and only partially supported.** We do not document it, and the examples on this site are written and tested for Scriban only — Liquid's control flow (`{% if %}`) is different, so do not expect them to work unchanged. It exists only for channels built years ago.

**Three cases where a channel is on Liquid without anyone choosing it:**

- A channel created before the setting existed runs as Liquid, and shows **Liquid** under **Options → Template language**.
- A channel created from a **Template "‹entity›" feed** card is created without a language, which also means Liquid. Set **Template language** to **Scriban (recommended)** and save before you write anything.
- The **Template product feed** card's subtitle still says *Liquid template formatted*. The channel it creates is set to Scriban — the subtitle is out of date, not the channel.

If a template that looks correct produces nothing or fails, check this setting before anything else. Switching an existing channel to Scriban means rewriting its templates, so **Duplicate** the channel from the channels list and test on the copy first.
:::

## Where to go next

| | |
| --- | --- |
| **[Template language basics](/en/channels/templates/language.html)** | The syntax: outputting values, conditions, loops, and filters |
| **[The data in a template](/en/channels/templates/data.html)** | What `record` and `variants` contain, and how to read each attribute type |
| **[Template function reference](/en/channels/templates/functions.html)** | Every function available, including the ones we add |
| **[Testing and debugging templates](/en/channels/templates/testing.html)** | See what your template produces before you publish it |
