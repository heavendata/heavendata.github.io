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
| Runs of an asset inbox that syncs from a remote server | **Settings → Assets → Inboxes** → the row menu → **Run history**. An inbox that does not sync from a remote server has nothing to run, and the menu does not offer the item |
| Everything this account has run | **Settings → Background jobs** |
| The runs you started yourself, right now | The **Active jobs** button in the header |

The **Last run** column keeps itself up to date while you watch it. You do not need to reload the page to see a run start, progress or finish — and that applies to every run, not only the ones you started. A run begun by a schedule, by the API, or by a colleague appears in the column the same way.

A cell reading **Not run yet** means exactly that: this channel or data source has no runs at all.

### Starting a run yourself

Hover over the **Last run** cell and a play button appears beside the status. It starts a run of that entry, after asking you to confirm. The same action is in the row menu as **Run now**.

Not everything can be run on demand, and the control is simply absent where it cannot: a data source that **receives** pushed files has nothing to fetch, so neither the play button nor **Run now** appears on its row. The same is true of a channel whose connector does not support being run manually.

Starting a run does not cancel one that is already going. If a run is already queued or running, the confirmation says so, and starting another adds a second run rather than replacing the first.

## What a status means

| Status | What it means |
| --- | --- |
| **Queued** | Created, but not started yet — it is waiting for a free worker, or, for an import, for another import into the account to finish |
| **Running** | In progress now |
| **Finished** | Ended without an error |
| **Failed** | Stopped because of an error. The details will say what went wrong |
| **Skipped** | Superseded by a newer run of the same thing, so this one did not need to run |

**Finished does not mean every record was updated.** A run can finish having skipped records it could not match, or having written warnings. To see what actually happened, open the run and read its steps.

### A run that failed without getting started, or without finishing

Two failures are not about your data at all. The run's step says which it was:

| The step says | What happened | What to do |
| --- | --- | --- |
| *Couldn't start the run. Another import into this account is still running. Try again once it has finished.* | Only one import into an account runs at a time. This one waited 60 minutes for the import ahead of it, which was still running | Import again once the other import has finished |
| *Couldn't finish the run. It stopped responding and was ended automatically. Run it again.* | The run was still **Queued** or **Running** 6 hours after it was created, so it was ended and marked **Failed** rather than left showing as in progress | Run it again |

## Reading a run

Selecting the status in a **Last run** cell opens the run in a window titled **Run details**. **Run history** lists an entry's earlier runs, in a window of that name; select one for the same details. On **Background jobs** the run opens in the panel beside the list rather than in a window.

However you got there, what you are looking at is the same thing.

A run is made of **steps**, one per unit of work it did. Each step carries its own message, and a step can attach:

- **log files**, which list what happened record by record — this is where to look when a run finished but the result is not what you expected;
- **files the step read or produced**, such as the file an import was given.

If a run failed, the step that failed is the one to read first: its message names the reason, and its log files carry the detail.

**The email shows the same steps.** If you asked, with **Notify me**, to be emailed when a run finishes, the email lists the same step messages, in the same words. A run nobody asked about sends no email, so a scheduled run's failure shows only in the app.

### Reading a log file

A step lists its own log files under **Log files** inside the step. **Log files** below the steps lists every log file of the run — the steps' files included — and is the only place an export's log files are listed. Select a file, or its **View**, and it opens in a window titled *Log file "‹name›"*, one entry per row:

| Column | What it shows |
| --- | --- |
| *(icon)* | How severe the entry is: **Error**, **Warning** or **Info** |
| **Row** | The row of the imported file the entry is about |
| **Record** | The record it is about |
| **Field** | The field it is about |
| **File** | The file it is about — shown only when the entries name more than one |
| **Message** | What happened, and what to do about it |
| **Time** | When it was written |

A column no entry fills is left out. An export's log has no **Row**, for example: the records an export writes come from your catalog, not from a file.

- **Errors**, **Warnings** and **Info**, above the grid, each show how many entries the file has of that severity. Clear one to hide those entries.
- **Search** keeps only the entries whose message, row, record, field or file contains what you type.
- Select a column's header to sort by it. The window opens in the order the entries were written.
- **Download** saves the file as a **Text file (.txt)**, one line per entry, ready to paste into a ticket — or as a **JSON file (.json)** for a script: one entry per line, each a JSON object in the compact log event format (CLEF).

What an import's entries mean for your data:

| The entry | What it means |
| --- | --- |
| A warning on a field — *The record was imported without this field's value.* | The record went in, but without this one value. The rest of the message says what was wrong with it |
| A warning on a record — *The record was skipped.* | The record was left out, and the rest of the file went on |
| An error on a record or a field — *Couldn't import the record.* | That record was not written |
| An error on a row — *Couldn't import the row.* | That row was not imported, and the rest of the message says why — it has no value for the identifier, for example |

**A step that counts values the field processing pipeline couldn't build** — *12 values that the field processing pipeline couldn't build — see the log file* — finished with those fields left out. Its log file lists them on their fields, with the row or the record and why; what each reason means is on [Field processing pipeline nodes](/en/reference/pipeline-nodes.html#when-a-node-cant-build-a-value).

**A row that cannot be read at all stops the dataset.** Its log file has an error on that row, the dataset's step names the row, and the datasets after it in the run are not imported. Correct the row in the file and import again.

**Which file is which.** An import's step has one log file per dataset, named after the dataset's file with `.log.json` added — `products.csv.log.json`. The import's own steps, which belong to no dataset, share `run.log.json`. An export has one per feed, named after the file that feed writes, also ending in `.log.json`. A delivery by **File transfer** writes `ftp-publisher.log.json`, listed with the run's own files.

**A file ending in `.log` instead is plain text.** It opens as its lines, with no columns; the severity filters and **Search** still work on it, and **Download** saves it as it is.

### When a run can't reach a server

A data source that fetches its files from a server, and a channel that delivers its files to one with **File transfer**, fail when they cannot get through. The step that failed then says which of the cases below it was. It names the server by its host, written as it is in the settings, and — when the connection itself failed — the port it tried: the one set, or the protocol's default port where none is — so you can compare both with what the server actually uses. It ends with what to do next.

| What the step says happened | What it means | Where the fix usually is |
| --- | --- | --- |
| **No server was found** at the host | The host name leads to no server at all | **The settings.** The host is mistyped, or the server has moved to a new name |
| **The connection failed** on a port | A server was found, but the connection did not complete: nothing answered on that port in time, the port refused it, or the server answered in a different protocol — an FTP server on the SFTP port, for example | **Either end.** Compare the host, port, and protocol in the settings with what the server uses. If they match, the server may be down, or a firewall in front of it may not let us through — [our IP address](/en/reference/data-center.html) is the one to allow |
| **The sign-in was refused** | The server answered and turned down the username and password, or the token | **The settings** first. If the credentials there are right, the account on the server may have changed or been locked — ask whoever runs the server |
| **The file isn't there** — imports only | The connection and sign-in worked, but there is no file at the path the dataset names | **The dataset** — its file name, and the source's base path or base URL. Or the file has not been delivered yet |
| **The settings are incomplete** — no host, for example | The settings leave out something the connection needs, so there is nothing to connect to | **The settings.** Add what the message names |
| **An unexpected error**, a **download that failed**, or the server **reported an error** | Something other than the cases above went wrong on the way | **The step's log file.** Its error entry quotes what the connection or the server reported, which the step's message leaves out |
| **An error on our side** | The fault is ours, not the server's or the settings' | **Contact support**, and quote the reference the step gives. It is the same id the run's details show as **Reference** |

A data source's messages call its settings its *connection settings*: they are under **Connection and format** in the data source's editor. A channel's are in its **Publishing** step. What each import message says, and what to change, is in [when a file could not be fetched](/en/import/data-sources.html#when-a-file-could-not-be-fetched).

**A File transfer delivery that can't reach the server leaves two failed steps.** The first says why, as in the table. The second closes the export: it says the export couldn't finish, and at which stage it stopped — here, that the files couldn't be published. It does not repeat the reason, so read the step before it. A delivery that reached the server and then failed while sending says how many of the files were published. That step has no log file of its own: why the rest were not is in `ftp-publisher.log.json`, under the run's **Log files**.

### Downloading what a step read or created

A step's files sit under **Input and result files**, with a **Download** beside each one. A file listed as **Input** is the one that step actually read — the bytes the run worked from, kept as they were at the moment it read them.

That is the point of keeping them: by the time anyone looks into a run that went wrong, the file on the supplier's server has often been replaced, so downloading it again answers a different question. The copy under the step does not change.

**A channel run offers the file it created.** Each feed of the run has a step that says it created the feed, and that step has a **Download** button with the file's name. It saves the file exactly as that run wrote it, whatever has happened since to the copy it delivered. Runs from before 20 October 2026, and some from that day, have no such button.

That makes a run the way to check a channel's whole output before you rely on it. Start one with **Run now**: a channel does not have to be enabled to be run by hand, only its **Publishing** complete. The run delivers its file as **Publishing** says, like any other run, so make sure the other side expects it.

A run whose files have already been cleared lists none, and its downloads are no longer offered. That is expected — see [how long runs are kept](#how-long-runs-are-kept).

### An import's steps

An import has one step for each dataset in the run, naming that dataset's file. What those steps say, and what to do about each, is in [reading what a run did](/en/import/data-sources.html#reading-what-a-run-did).

## How long runs are kept

| What | How long it is kept |
| --- | --- |
| The run, its logs, and the download of the file a channel run created | 30 days |
| The import files the run read | 30 days, or the most recent 5,000 runs **of that data source** — whichever comes first |

After that the run no longer appears in **Run history** or in **Background jobs**, and its files can no longer be downloaded or used to start the run again. Because the two clean-ups run on their own schedules, a run's files can go a few hours before the run itself does.

Files you dropped on the [heavendata FTP server](/en/import/ftp-pull.html) are kept there under their own rule, which that page states.
