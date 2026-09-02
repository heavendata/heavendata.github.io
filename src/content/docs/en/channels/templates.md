---
title: "Template-based channels"
description: "Render a channel's output with your own template, when the receiving system needs an exact document shape."
sidebar:
  order: 20
---

A **template-based channel** renders its output with a template you write, instead of a fixed table format. Use one when the receiving system specifies an exact document shape — an XML file to a schema, a JSON structure, or a text layout that has to match character for character.

Every other format lays your data out as rows and columns. A template gives you the whole document.

## Choose it when you create the channel

A template is one of the **output formats**, chosen under **Format** in the channel editor. In the format list it is called **Text**.

:::note
**Format → Text is how you get a template channel.** The name is historical — a template is not limited to plain text, and most templates produce XML or JSON. Set the channel's **MIME type** on the same page to tell the receiving system what it is actually getting.
:::

A template channel is limited to **one dataset**. Other formats can carry several; this one cannot.

## The three templates

A template channel has three templates, and they run at different times:

| Template | Runs | What it can use |
| --- | --- | --- |
| **Header** | Once, before any products | No product data |
| **Record** | **Once per product** (or per custom entity record) | `record`, `variants`, and everything on [the data page](/en/channels/template-data.html) |
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
The channel editor has a **Template language** setting with two values, **Scriban** and **Liquid**.

**Liquid is legacy and only partially supported.** We do not document it, and no example on this site will work in a Liquid channel. It exists only for channels built years ago.

**Older channels can still be set to Liquid** — including channels where the setting was never touched. If a template that looks correct produces nothing or fails, check this setting before anything else. Switching an existing channel to Scriban means rewriting its templates, so test on a copy first.
:::

## Where to go next

| | |
| --- | --- |
| **[Template language basics](/en/channels/template-language.html)** | The syntax: outputting values, conditions, loops, and filters |
| **[The data in a template](/en/channels/template-data.html)** | What `record` and `variants` contain, and how to read each attribute type |
| **[Template function reference](/en/channels/template-functions.html)** | Every function available, including the ones we add |
| **[Testing and debugging templates](/en/channels/template-testing.html)** | See what your template produces before you publish it |
