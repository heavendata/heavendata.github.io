---
title: "Channels & feeds"
description: "Get product data out, in the shape the receiving system demands."
sidebar:
  order: 0
  label: "Overview"
---

A **channel** takes a selection of your products, formats it, and delivers it
somewhere — a feed URL, a file server, or an inbox.

Formatting is one choice with two branches. Use a **standard format** (CSV,
Excel, JSON and others) when the receiving system will take a table, and shape
each field with the per-field pipeline. Use a
[**custom template**](/en/channels/templates.html) when the output has to match an exact
document structure the other side specified.

A channel that publishes by **File transfer** or **Email** can be saved before its
**Publishing** step is complete. Until the step has what the channel needs to deliver,
the channel is saved disabled: it does not run on its schedule, and it can be neither
enabled nor run by hand.

| Publishing | The channel can be enabled once it has |
|---|---|
| **File transfer** | a host name, and for SFTP a username |
| **Email** | a **Subject**, and at least one address under **Recipients**, one address per line. Addresses typed on one line, separated by commas, semicolons or spaces, keep the channel disabled. |
