---
title: "Background jobs"
description: "Find the run behind any import, export or sync — where each one is listed, what its status means, and how to read its steps and log files."
sidebar:
  order: 1
---
Anything the platform does for you runs in the background: an import, a channel export, an asset sync, a bulk change. Each time one of these runs it leaves a **run** — a status, a start time, a list of steps, and any log files those steps produced. Finding the run is the first step of almost every answer in this section.

Depending on the size of your catalog, a run may take a while. That is why this work happens in the background: once it has started, it is safe to close your browser or shut down your computer.

## Finding a run

There are several ways to a run, depending on what you already have in front of you.

| You want | Where to go |
| --- | --- |
| The latest run of one channel or data source | **Channels**, or **Integrations → Data sources**. The **Last run** column shows each entry's most recent run |
| The details of that run | Select the status in the **Last run** cell — it opens **Run details** |
| Older runs of one entry | The row menu (⋮) → **Run history** |
| Runs of an asset inbox sync | **Settings → Assets → Inbox settings** → the row menu → **Run history** |
| Everything this account has run | **Settings → Background tasks** |
| The runs you started yourself, right now | The activity button in the header |

The **Last run** column keeps itself up to date while you watch it. You do not need to reload the page to see a run start, progress or finish — and that applies to every run, not only the ones you started. A run begun by a schedule, by the API, or by a colleague appears in the column the same way.

A cell reading **Not run yet** means exactly that: this channel or data source has no runs at all.

### Starting a run yourself

Hover over the **Last run** cell of a channel or data source and a play button appears beside the status. It starts a run of that entry immediately, after asking you to confirm. The same action is in the row menu as **Run now**.

Starting a run does not cancel one that is already going. If a run is already queued or in progress, the confirmation says so, and starting another adds a second run rather than replacing the first.

## What a status means

| Status | What it means |
| --- | --- |
| **Queued** | Created, but not started yet — it is waiting for a free worker |
| **Running** | In progress now |
| **Finished** | Ended without an error |
| **Failed** | Stopped because of an error. The details will say what went wrong |
| **Skipped** | Superseded by a newer run of the same thing, so this one did not need to run |

**Finished does not mean every record was updated.** A run can finish having skipped records it could not match, or having written warnings. To see what actually happened, open the run and read its steps.

## Reading a run

Open a run — from the **Last run** cell, from **Run history**, or from **Settings → Background tasks** — and you get its **Run details**.

A run is made of **steps**, one per unit of work it did. Each step carries its own message, and a step can attach:

- **log files**, which list what happened record by record — this is where to look when a run finished but the result is not what you expected;
- **files the step read or produced**, such as the file an import was given.

If a run failed, the step that failed is the one to read first: its message names the reason, and its log files carry the detail.

## How long runs are kept

Runs are kept for **30 days**, after which they are deleted automatically. A run older than that is gone from **Run history** and from **Background tasks**, along with its steps and log files.
