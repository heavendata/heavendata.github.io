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
| Runs of an asset inbox that syncs from a remote server | **Settings → Assets → Inboxes** → the row menu → **Executions**. An inbox that does not sync from a remote server has nothing to run, and the menu does not offer the item |
| Everything this account has run | **Settings → Background tasks** |
| The runs you started yourself, right now | The **Active jobs** button in the header |

The **Last run** column keeps itself up to date while you watch it. You do not need to reload the page to see a run start, progress or finish — and that applies to every run, not only the ones you started. A run begun by a schedule, by the API, or by a colleague appears in the column the same way.

A cell reading **Not run yet** means exactly that: this channel or data source has no runs at all.

### Starting a run yourself

Hover over the **Last run** cell and a play button appears beside the status. It starts a run of that entry, after asking you to confirm. The same action is in the row menu as **Run now**.

Not everything can be run on demand, and the control is simply absent where it cannot: a data source that **receives** pushed files has nothing to fetch, so neither the play button nor **Run now** appears on its row. The same is true of a channel whose connector does not support being run manually.

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

Selecting the status in a **Last run** cell opens the run in a window titled **Run details**. **Run history** lists an entry's earlier runs, in a window still titled *Latest Executions*; select one for the same details. On **Background tasks** the run opens in the panel beside the list rather than in a window.

However you got there, what you are looking at is the same thing.

A run is made of **steps**, one per unit of work it did. Each step carries its own message, and a step can attach:

- **log files**, which list what happened record by record — this is where to look when a run finished but the result is not what you expected;
- **files the step read or produced**, such as the file an import was given.

If a run failed, the step that failed is the one to read first: its message names the reason, and its log files carry the detail.

### When a run can't reach a server

A data source that fetches its files from a server, and a channel that delivers its files to one with **File transfer**, fail when they cannot get through. The step that failed then says which of the cases below it was. It names the server by its host, written as it is in the settings, and gives the port where one is set, so you can compare both with what the server actually uses. It ends with what to do next.

| What the step says happened | What it means | Where the fix usually is |
| --- | --- | --- |
| **No server was found** at the host | The host name leads to no server at all | **The settings.** The host is mistyped, or the server has moved to a new name |
| **The connection failed** on a port | A server was found, but the connection did not complete: nothing answered on that port in time, the port refused it, or the server answered in a different protocol — an FTP server on the SFTP port, for example | **Either end.** Compare the host, port, and protocol in the settings with what the server uses. If they match, the server may be down, or a firewall in front of it may not let us through — [our IP address](/en/reference/data-center.html) is the one to allow |
| **The sign-in was refused** | The server answered and turned down the username and password, or the token | **The settings** first. If the credentials there are right, the account on the server may have changed or been locked — ask whoever runs the server |
| **The file isn't there** — imports only | The connection and sign-in worked, but there is no file at the path the dataset names | **The dataset** — its file name, and the source's base path or base URL. Or the file has not been delivered yet |
| **The settings are incomplete** — no host, for example | The settings leave out something the connection needs, so there is nothing to connect to | **The settings.** Add what the message names |
| **An unexpected error**, a **download that failed**, or the server **reported an error** | Something other than the cases above went wrong on the way | **The step's log file.** It keeps the server's own words, which the step's message leaves out |
| **An error on our side** | The fault is ours, not the server's or the settings' | **Contact support**, and quote the reference the step gives. It is the same id the run's details show as **Execution ID** |

A data source's messages call its settings its *connection settings*: they are under **Config Source** in the data source's editor. A channel's are in its **Publishing** step. What each import message says, and what to change, is in [reading what a run did](/en/import.html#reading-what-a-run-did).

**A File transfer delivery that can't reach the server leaves two failed steps.** The first says why, as in the table. The second closes the export: it says the export couldn't finish, and at which stage it stopped — here, that the files couldn't be published. It does not repeat the reason, so read the step before it. A delivery that reached the server and then failed while sending says how many of the files were published; its log file says why the rest were not.

**The email shows the same steps.** If you asked to be emailed when a run finishes — with **Notify me** before it finished — the email lists the same step messages, in the same words. A run nobody asked about sends no email, so a scheduled run's failure shows only here.

### Downloading what a step read

A step's files sit under **Input and result files**, with a **Download** beside each one. A file listed as **Input** is the one that step actually read — the bytes the run worked from, kept as they were at the moment it read them.

That is the point of keeping them: by the time anyone looks into a run that went wrong, the file on the supplier's server has often been replaced, so downloading it again answers a different question. The copy under the step does not change.

A run whose files have already been cleared lists none, and its downloads are no longer offered. That is expected — see [how long runs are kept](#how-long-runs-are-kept).

### An import's steps

An import leaves a step for each dataset it took on, naming that dataset's file. What those steps say, and what to do about each, is in [importing data](/en/import.html).

## How long runs are kept

A run whose files have already been removed is expected, not a fault — the run record and the files it read are cleared separately.

| What | How long it is kept |
| --- | --- |
| The run and its logs | 30 days |
| The import files the run read | 30 days, or the most recent 5,000 runs **of that data source** — whichever comes first |

After that the run no longer appears in **Run history** or in **Background tasks**, and its files can no longer be downloaded or used to start the run again. Because the two clean-ups run on their own schedules, a run's files can go a few hours before the run itself does.

Files you dropped on the [hosted FTP server](/en/import/ftp-pull.html) are kept there under their own rule, which that page states.
