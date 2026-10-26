---
title: "Data sources"
description: "Import files that arrive again and again — set up a data source, check it can reach the server, run all of it or part of it, and read what a run did."
reviewed: true
sidebar:
  order: 2
---

A data source imports the same kind of file again and again: it knows where the files
come from, which files to take, and how to map their columns. A source that fetches its
files runs on a schedule; an **FTP push** source runs when its files arrive. Set one up
under **Integrations → Data sources**. You can also start one yourself, or run it on a
file you upload — see [running a data source](#running-a-data-source).

Each file a data source imports is a **dataset**: one file and the mapping that
turns its columns into product data, so a source with a product file and a price file has
two datasets.

For a one-off file, use the product list's **Import** menu instead —
[Import or delete products from a file](/en/import/import-products.html).

## Connections

A data source's connection says how its files arrive:

| Connection | Direction | What it is for |
| --- | --- | --- |
| **SFTP pull** | We fetch | A file on an SFTP server, such as a supplier's |
| **HTTP pull** | We fetch | A file served over HTTP or HTTPS |
| **FTP push** | You send | You upload to the [heavendata FTP server](/en/import/ftp-pull.html#upload-files-for-a-data-source) and we import what arrives |

The controls a source offers depend on its connection:

| | SFTP pull | HTTP pull | FTP push |
| --- | --- | --- | --- |
| **Test connection** | Yes, once a host name and username are set | Yes, once a base URL is set | No |
| **Browse** | Yes, once a host name and username are saved | No — a URL has no folders to list | No |
| **Download file** | Yes, once a host name and username are saved | Yes | No |
| **Load fields** | Yes, once a host name and username are saved | Yes | No |
| **Run now**, **Run selected datasets** | Yes | Yes | No — there is nothing to fetch |
| **Upload and import** | Yes | Yes | **Yes** — the one way to run a push source on demand |

You can save an **SFTP pull** source before you know its server details. Until it has
a host name and a username, it is saved disabled: its schedule does not run it, and
**Run now** and **Run selected datasets** say what is missing instead of running.
Saving it says so:

> Data source saved as disabled. Enter a host name and a username under Config Source
> to enable this data source.

**Enabled** stays locked, with a sentence beside it saying what is still missing, until
both are entered under **Config Source**. Then tick **Enabled** and save.

### Setting up an FTP push source

Choose **FTP push** under **Config Source**, enter a **Username** and a **Password**, and
give each dataset the file name the uploaded file will have. These are the data source's
FTP credentials on the [heavendata FTP server](/en/import/ftp-pull.html#upload-files-for-a-data-source).
The username must not be in use anywhere else on heavendata.

**Enable the source before anyone uploads to it.** A data source is created with
**Enabled** unchecked, and the server refuses its FTP credentials until it is enabled. In
the save that enables it, type the password again: a source enabled without its password
being entered in the same save has FTP credentials with no password, and the server keeps
refusing them.

## Publish settings

Publish settings decide what an import makes visible in the published catalog. A data
source has three, under **Publish settings** in its editor, and each **product dataset**
imports with them — unless the dataset sets its own.

| Option | What it does |
| --- | --- |
| **Publish new products** | Publishes the products and product variants the import created. |
| **Apply changes to published products** | Updates product variants that are already published. Nothing new becomes visible. |
| **Publish modified products** | Publishes each product variant a record in the file matches, including one that was never published before. A record keyed by article number addresses only the product, so it publishes no new product variant. |

The settings apply to product datasets only; a custom entity dataset has none.

### Giving a dataset its own settings

A data source with several files often needs them to publish differently. Take a
source with two product datasets:

| Dataset | What the file carries | Settings it needs |
| --- | --- | --- |
| `variants.csv` | New and changed products, ready to go live | **Publish new products** and **Publish modified products** |
| `prices.csv` | Price changes only | **Apply changes to published products** only — a price change should reach what is live, but must not publish a product nobody has finished |

Set the data source's settings for the variant file, then give the price file its own:

1. In the data source's **Datasets**, edit the dataset with the pencil button.
2. On its **General** tab, under **Publish settings**, turn off **Use the data
   source's publish settings**. The three options start from the data source's values.
3. Set the three options for this dataset, then save the data source.

While **Use the data source's publish settings** is on, the three options are grayed out
and show the data source's current settings, saved or not. Turning it back on and saving
drops the dataset's own settings.

A dataset with settings of its own shows **Custom publish settings** on its card in
**Datasets**.

Actions on untouched products, the products an import did not include, follow the same split:

| Actions | Set under | Settings they use |
| --- | --- | --- |
| A dataset's own | the dataset's **Untouched Products** tab | the settings that dataset imports with |
| The data source's, on products **none** of its datasets included | the data source's **Options** | always the data source's, because those products belong to no dataset |

Each product dataset's log file names the settings it ran with —
[which publish settings a dataset used](#which-publish-settings-a-dataset-used).

## Connection settings

### Test connection

Under the source's connection settings, **Test connection** checks, from our servers,
that the server can be reached and that the credentials are accepted. It does not ask for
a password: leave the password field empty and it uses the saved one. The result appears
on the same line: **Connection works**, or the reason it did not.

The reason names the cause the way a failed run does: no server found at the host, a
connection that failed on a port, or a sign-in the server refused. An **HTTP pull** source
with no sign-in whose server answers that it needs one is told so, and pointed at its
authentication settings. The causes, and which end each points at, are in
[when a run can't reach a server](/en/troubleshooting/background-jobs.html#when-a-run-cant-reach-a-server).

It tests **what is on the screen**, not only what was saved — so you can change a host
name or a username and check the new value before saving it.

### The SFTP port

Leave **Port (optional)** empty and an **SFTP pull** source connects on port 22, the
SFTP default. Enter a port only when the server listens on a different one; the field
takes a whole number from 1 to 65535.

Port 21 belongs to FTP, and an FTP server cannot answer an SFTP request — so 21
usually means the supplier gave you FTP details. The field warns about 21, and about
989 and 990, the FTPS ports:

> SFTP servers usually listen on port 22 — 21 is the FTP port.

The warning still lets you save, because an SFTP server can listen on any port.

A data source cannot fetch over FTP. When a supplier offers only FTP:

- ask them for SFTP access instead;
- if they can publish the file at a web address, use an **HTTP pull** source;
- or have them upload the files to the [heavendata FTP server](/en/import/ftp-pull.html),
  with an **FTP push** source.

### If the server's certificate is not trusted

An **HTTP pull** source connects over HTTPS by verifying the server's certificate. If
that certificate is expired, self-signed, or issued for a different host name, the
connection fails.

Fix the certificate on the server where you can. Where that is not in your hands, the
source has an **Accept untrusted certificates** option, which connects
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

## Data Format

**Data Format**, under **Config Source**, says how the source's files write dates,
numbers and several values in one cell: **Date format**, the decimal and group separators
for numbers and for prices, **Value separator** and **Timezone**. It applies to every
dataset of the source. These are the settings a one-off import offers on its
[Map columns](/en/import/import-products.html#2--map-columns) step, and they mean the same
thing here. The choices of [Date format](/en/import/import-products.html#date-format), and
how to write a custom pattern, are explained there.

### A custom Date format needs a pattern

With **Date format** set to **Custom format** and **Pattern** left empty, the source cannot
be saved. The field turns red and says:

> Enter a pattern.

**Save** is refused, with the fields that need fixing marked in red:

> Couldn't save. Fix the fields marked in red and try again.

Enter the pattern the files use — `dd.MM.yyyy` for dates such as `03.04.2026` — or choose
one of the other formats, then save again.

### Timezone

The Data Format's **Timezone** is not used: a saved data source shows `UTC` there, and
the source reads its dates as [an import does](/en/import/import-products.html#date-format).
The schedule's **Timezone** is a separate setting.

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

An **SFTP pull** or **HTTP pull** source runs on its schedule, and an **FTP push** source
when the last file it expects arrives on the
[heavendata FTP server](/en/import/ftp-pull.html#upload-files-for-a-data-source). You can
also start one yourself from the row menu (⋮) in **Integrations → Data sources**.

| Action | What runs |
| --- | --- |
| **Run now** | Every dataset the source has, fetching each file from the server |
| **Run selected datasets** | Only the datasets you tick, each fetched from the server |
| **Upload and import** | Only the datasets you give a file to, using the file you upload |

### Running only some datasets

**Run selected datasets** lists the source's datasets so you can choose which to
import:

> Choose the datasets to import. The others are not imported.

The run imports only the datasets you tick. The others are left out of it, with no error
and no step of their own. Use it when one supplier file is late, or when a
single file needs re-importing and the others are fine.

### Running files you have to hand

**Upload and import** runs **your** file through **the source's existing mapping**:

> Choose a file for each dataset you want to import. The others are not imported.

Give a file to one dataset or to several; datasets you leave empty are not part of the
run. This is the way to correct a supplier file yourself — fix it locally, upload it,
and it is imported with the same mapping and options as a scheduled run, without
waiting for the supplier to send a new one.

To import a file with a mapping you set up just for it, without a data source, use the product
list's **Import** menu instead — [Import or delete products from a file](/en/import/import-products.html).

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
setup, even if the supplier has replaced the file since.

The new run stores its own copy of those files, so it can itself be run again.

A run with no stored files shows this message where **Run stored files** would be:

> No files are stored for this import. Start a new run of the data source instead.

A run keeps its files for a while and not for ever, so an old run will eventually reach
this state —
[how long runs are kept](/en/troubleshooting/background-jobs.html#how-long-runs-are-kept).

## Reading what a run did

**Every dataset in the run gets its own step**: a panel under **Steps** in the run's details.
That step is where you find out what happened to its file. A run also leaves steps of its
own — a final status, and any error it hit — so a run of one dataset can still show more
than one step.

A dataset's step names its file. When that file was read, the step also carries the
dataset's counts, its own log file, and a copy of the file itself. A step for a dataset
whose file could not be fetched says why, and what to change — see
[when a file could not be fetched](#when-a-file-could-not-be-fetched). One for a dataset
the run never reached says only that.

| The step says | What it means |
| --- | --- |
| A count of records imported | The file was read and those records went in |
| A count imported, and a count of records with values that could not be read | Some values in the file were not accepted. Read the step's log file before assuming the rest of those records went in — it names each one and what was wrong with it |
| Records that could not be imported | Those records were not written. The step's log file lists them |
| Not imported, naming an earlier file | The run stopped at that earlier dataset, so this one never ran |

A run that stops part-way still has a step for every dataset **in it**, so you
can see where it stopped rather than finding the history simply ending. Datasets you
left out of a partial run were never in it, and have no step.

A step for a file you uploaded names both the dataset and your file — for example
`artikel.csv (uploaded as preisliste-kw38.csv)` — so you can tell which mapping ran and
which file went through it.

### Which publish settings a dataset used

The log file of every product dataset the run imports says which
[publish settings](#publish-settings) it ran with, right after the *Importing dataset*
line and the *Type:* line under it:

```text
Info Publish settings configured on the data source — Publish new products: on; Apply changes to published products: on; Publish modified products: off
```

| The line says | When |
| --- | --- |
| **configured on the data source** | The dataset used the data source's settings |
| **configured on the dataset** | The dataset used settings of its own |
| **chosen for this import** | A manual import, which takes the options you pick while importing |

### When a file could not be fetched

A dataset whose file could not be fetched stops the run, and its step says why. The step
opens with *Couldn't import* and the file name, and ends with what to do next — for most
causes, what to check, then to run the data source again. What its message calls the
source's *connection settings* are under **Config Source**. For example:

> Couldn't import stock.csv. The connection to sftp.example.com on port 22 failed — check
> that the host, port, and protocol in this data source's connection settings match the
> server, then run the data source again.

| The step goes on to say | What to change |
| --- | --- |
| No server was found at ‹host› | The host |
| The connection to ‹host› on port ‹port› failed | The host, port, and protocol, so that they match the server. With no port set, the step names the protocol's default port instead — *on the default SFTP port*, for example |
| The server at ‹host› refused the username and password | The username and password of an **SFTP pull** source |
| The server at ‹host› didn't accept this data source's sign-in | The authentication settings of an **HTTP pull** source |
| It isn't on the data source | The dataset's file name, and the source's **base path** (SFTP) or **base URL** (HTTP) |
| No host name is set, or no username is set | The missing one, on an **SFTP pull** source |
| This data source has no connection to fetch files from | The base URL of an **HTTP pull** source, written in full with `https://` or `http://` — or give the dataset's file name as a whole web address |
| An unexpected error stopped the connection, the download failed, or the data source reported an error | Nothing yet — read the step's log file first, which keeps the server's own words |
| An error on our side stopped it | Nothing — contact support, and quote the reference the step gives |

What each case means, and when the fix is at the server's end rather than in the settings,
is in
[when a run can't reach a server](/en/troubleshooting/background-jobs.html#when-a-run-cant-reach-a-server).

### The files a run kept

Every import stores the files it read, under the run that read them — which is what
makes running it again possible, and what to download when you need the data an import
actually worked from. The files hang off the run's steps:
[downloading what a step read](/en/troubleshooting/background-jobs.html#downloading-what-a-step-read).
