---
title: "Importing data"
description: "Get product data in, once or on a schedule — set up a data source, check it can reach the server, and run all of it or part of it."
reviewed: true
sidebar:
  order: 0
  label: "Overview"
---

Two ways in. A **manual import** walks one file through upload, mapping and options in
the app, and is right for a one-off change. A **data source** is a standing
configuration — a place to fetch from, the files to take, and the mapping to apply — and
is right for anything that repeats. **This page is about data sources.**

You do not have to wait for a schedule to use one: a data source can run on demand, and
it can run a file you supply yourself.

If you need somewhere to put the files, we host an
[FTP server](/en/import/ftp-pull.html) you can use.

## Data sources

A data source is one place we fetch from, plus the **datasets** it supplies. A
dataset is one file and the mapping that turns its columns into product data, so a
source with a product file and a price file has two datasets.

Data sources live under **Integrations → Data sources**.

| Connector | Direction | What it is for |
| --- | --- | --- |
| **SFTP pull** | We fetch | A supplier's SFTP server, or ours |
| **HTTP pull** | We fetch | A file served over HTTP or HTTPS |
| **FTP push** | You send | You upload to our FTP server and we import what arrives |

*(The app still writes these as `SFtp Pull`, `Http Pull` and `Ftp Push`.)*

What a source offers depends on what its connector can do. Everything that reaches a
server is missing for a push source, because there is nothing of ours for it to reach —
the files come to us.

| | SFTP pull | HTTP pull | FTP push |
| --- | --- | --- | --- |
| **Test connection** | Yes | Yes, once a base URL is set | No |
| **Browse** | Yes | No — a URL has no folders to list | No |
| **Download file** | Yes | Yes | No |
| **Load fields** | Yes | Yes | No |
| **Run now**, **Run selected datasets** | Yes | Yes | No — there is nothing to fetch |
| **Upload and import** | Yes | Yes | **Yes** — the one way to run a push source on demand |

A control a source cannot support is not offered, rather than offered and then refused.

## Checking a source before you rely on it

Everything in this section runs **on our servers, using the credentials the source
already has** — which is why none of it asks you for a password.

### Test connection

Under the source's endpoint settings, **Test connection** checks that the server can
be reached and that the credentials are accepted. The result appears on the same
line: **Connection works**, or the reason it did not.

It tests **what is on the screen**, not only what was saved — so you can change a host
or a user name and check the new value before saving it.

### If the server's certificate is not trusted

An **HTTP pull** source connects over HTTPS by verifying the server's certificate. If
that certificate is expired, self-signed, or issued for a different host name, the
connection fails.

**Fixing the certificate on the server is the right answer.** Where that is not in
your hands, the source has an **Accept untrusted certificates** option, which connects
anyway:

> Connects even when the server's certificate is expired, self-signed, or does not
> match its host name.

Turn it on only for a server you already trust by other means, and treat it as
temporary: it disables the check that would tell you the connection had been
tampered with.

The option is specific to HTTP sources. An SFTP server proves its identity by host key
rather than by certificate, so the setting does not apply to **SFTP pull**.

### Changing an SFTP password

On a saved **SFTP pull** source the password field is **empty**, with the hint *"Leave
empty to keep the saved password."* The stored password is still in place — it is not
shown back to you.

- To **keep** it, leave the field empty.
- To **change** it, type the new password and save.

There is no way to empty a stored password. A source without one cannot connect, so
if a source should stop running, disable or delete the source instead.

## Choosing the file for a dataset

Each dataset names the file it imports, relative to the source's base path. Three
controls sit beside that field.

**Save the data source first.** All three read the file using the saved source's
credentials, so on a source you have not saved yet they are inactive. The hint beside
them says *"Save the data source before loading its fields."* — it names loading fields,
but the rule is the same for all three.

| Control | What it does |
| --- | --- |
| **Load fields** | Reads the file's column names, so you can map them without typing them |
| **Download file** | Saves the file the dataset points at, without running an import |
| **Browse** | Opens the source's folders so you can pick the file instead of typing its path |

### Browse

**Browse** opens *Choose a file* on the source's own server. Open a folder to go into
it, **Up** to go back, and select a file to choose it. A long folder loads in pages,
with **Show more files** at the end.

Picking a file writes its path **relative to the source's base path**. A file chosen
two folders down is stored as `pub/example/products.csv`, not as `products.csv` — the
folders are part of where the file is, so the import can find it again.

Browsing never leaves the source's base path, so it shows you exactly what an import of
this source could read.

### Download file

**Download file** fetches the file the dataset is configured for and saves it to your
computer. Nothing is imported and nothing is changed.

Use it to answer "what is actually on the server right now" — for example when an
import produced something you did not expect and you want to see the file the supplier
left, without running an import to find out.

### Load fields

**Load fields** reads the file and offers its column names for mapping, so setting up a
new dataset does not start with typing them by hand.

The column names come from the file itself, so the file has to have them where the
dataset's format settings say they are. When nothing usable is found, the result says:

> Couldn't read the fields. No column names were found — check that the file has a
> header row, then try again.

When the file cannot be read at all — it is not there, or it is not a format we can
read — the message says that instead:

> Couldn't read the fields. Check that the file is on the server, then try again.

Either way the mapping you have already done is left alone: loading fields replaces the
list of columns the file offers, not what you have mapped them to.

## Running a data source

A source runs on its schedule. You can also start one yourself from the row menu (⋮)
in **Integrations → Data sources**.

| Action | What runs |
| --- | --- |
| **Run now** | Every dataset the source has, fetching each file from the server |
| **Run selected datasets** | Only the datasets you tick, each fetched from the server |
| **Upload and import** | Only the datasets you give a file to, using the file you upload |

### Running only some datasets

**Run selected datasets** lists the source's datasets so you can choose which to
import:

> Choose the datasets to import. The others are not imported.

A dataset you leave out is not part of the run at all — it is not skipped with an
error, it simply is not in this run. Use it when one supplier file is late, or when a
single file needs re-importing and the others are fine.

### Running files you have to hand

**Upload and import** runs **your** file through **the source's existing mapping**:

> Choose a file for each dataset you want to import. The others are not imported.

Give a file to one dataset or to several; datasets you leave empty are not part of the
run. This is the way to correct a supplier file yourself — fix it locally, upload it,
and it is imported with the same mapping and options as a scheduled run, without
waiting for the supplier to send a new one.

It is offered for **every** source, including **FTP push** — which is the only way to
run a push source on demand.

**Your file keeps its own name.** If you upload `preisliste-kw38.csv` for a dataset
configured as `artikel.csv`, the run history names both — the dataset, so you can see
which mapping it went through, and your file, so you can see what was actually
imported.

### Running a past import again

Open a past run and it offers **Run stored files**, which imports **the files that run
read** rather than fetching anything.
[Background jobs](/en/troubleshooting/background-jobs.html) covers finding a run.

This is for the case where the **mapping** was wrong, not the file. The new run uses
the files the old one read, together with the source's configuration **as it is now** —
so you fix the mapping, run it again, and the same input goes through the corrected
setup. Fetching the file again would be beside the point, and the supplier may have
replaced it in the meantime.

The new run stores its own copy of those files, so it can itself be run again.

If a run has no stored files, it cannot be started this way. The button is not there at
all, and a message stands in its place:

> No files are stored for this import. Start a new run of the data source instead.

A run keeps its files for a while and not for ever, so an old run will eventually reach
this state —
[how long runs are kept](/en/troubleshooting/background-jobs.html#how-long-runs-are-kept).

## Reading what a run did

**Each dataset the run took on leaves a step**, and that step is where you find out what
happened to its file. A run also leaves steps of its own — a final status, and any error
it hit — so a run of one dataset can still show more than one step.

A dataset's step names its file. When that file was read, the step also carries the
dataset's counts, its own log file, and a copy of the file itself; a step for a dataset
whose file never arrived carries the reason instead, and one for a dataset the run never
reached carries only that.

| The step says | What it means |
| --- | --- |
| A count of records imported | The file was read and those records went in |
| A count imported, and a count of records with values that could not be read | Some values in the file were not accepted. Read the step's log file before assuming the rest of those records went in — it names each one and what was wrong with it |
| Records that could not be imported | Those records were not written. The step's log file lists them |
| Not imported, naming an earlier file | The run stopped at that earlier dataset, so this one never ran |

A run that stops part-way still leaves a step for every dataset **it took on**, so you
can see where it stopped rather than finding the history simply ending. Datasets you
left out of a partial run were never in it, and have no step.

A step for a file you uploaded names both the dataset and your file — for example
`artikel.csv (uploaded as preisliste-kw38.csv)` — so you can tell which mapping ran and
which file went through it.

### The files a run kept

Every import stores the files it read, under the run that read them — which is what
makes running it again possible, and what to download when you need the data an import
actually worked from. The files hang off the run's steps:
[downloading what a step read](/en/troubleshooting/background-jobs.html#downloading-what-a-step-read).
