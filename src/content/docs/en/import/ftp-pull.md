---
title: "The heavendata FTP server"
description: "Upload files for an import, collect the files a channel publishes, or drop assets into an inbox — on the FTP server heavendata runs. Host, encryption, FTP credentials, folders and clients."
sidebar:
  order: 1
---

The heavendata FTP server, **`ftp.eu.40three.net`**, has three uses: you upload files for a
data source to import, other systems download the files a channel publishes, and you drop
files into an asset inbox. You do not set the server up. You give a data source, channel or
inbox its **FTP credentials** — a username and password — in the app, and those credentials
open that one folder and nothing else.

| | |
| --- | --- |
| **Host** | `ftp.eu.40three.net` |
| **Port** | 21 |
| **Protocol** | FTP with explicit TLS (FTPS) — see [below](#connect-with-encryption-ftps) |
| **Transfer mode** | Passive |
| **Username and password** | The FTP credentials you set in the app — see [Which FTP credentials to use](#which-ftp-credentials-to-use) |

The heavendata FTP server speaks FTP and FTPS only. It does not offer SFTP.

## Connect with encryption (FTPS)

The server accepts plain FTP and encrypted FTP (FTPS). Use FTPS:
over plain FTP, your password and your files cross the internet unencrypted. Connect to
`ftp.eu.40three.net`, the name the server's certificate is issued for, so that a client
checking the certificate accepts it. The encryption is explicit, on port 21, not implicit:
nothing answers on port 990, so do not use `ftps://` addresses or implicit encryption.

## Which FTP credentials to use

Each data source, channel or inbox has FTP credentials of its own, and they see only its folder.

| You want to… | Set the FTP credentials in | Username and password | After you log in you see | You can |
| --- | --- | --- | --- | --- |
| **Upload files for an import** | A data source: **Config Source** → **Endpoint** **Ftp Push** → **Authentication** | Your choice | A folder named after the data source, with `import` and `archive` inside | Upload to `import`, download from `archive` |
| **Collect a channel's files** | A channel: **Publishing** → **Ftp server** | Your choice | A folder named after the channel's id | Download only |
| **Drop assets into an inbox** | **Settings → Assets → Inboxes** → the inbox's **⋮** → **Edit** → **FTP Access** | The username shown there; the password is the inbox's **Secret** | An empty folder | Upload only |

**A username is unique across heavendata**, not only within your account, so choose one
nobody else is likely to use — your company's name in it helps. If FTP credentials you have
just set are refused and the password is right, try another username.

When the FTP credentials start to work differs:

- **A data source's** — once you have enabled the data source. A data source is created with
  **Enabled** unchecked, and until it is enabled the server refuses its FTP credentials.
- **A channel's** — as soon as you save the channel, enabled or not. Its folder stays empty
  until the channel's first run.
- **An inbox's** — as soon as the inbox has a **Secret**. The default inbox has no FTP access;
  create another inbox to get one.

## Connect with a desktop client

Any FTP client that supports explicit TLS works. In [WinSCP](https://winscp.net/), for
example, the login dialog takes:

| Field | Value |
| --- | --- |
| File protocol | **FTP** |
| Encryption | **TLS/SSL Explicit encryption** |
| Host name | `ftp.eu.40three.net` |
| Port number | 21 |
| User name, Password | The FTP credentials — see [Which FTP credentials to use](#which-ftp-credentials-to-use) |

In FileZilla, choose **FTP** and **Require explicit FTP over TLS**.

Use passive mode, which most clients use by default. The command-line `ftp` program that comes
with Windows does not work: it has no passive mode and no encryption.

## Connect from a script with curl

curl transfers files from the command line, which makes it the usual choice for a script that
uploads or collects files on a schedule. Windows 10 and 11 include it as `curl.exe`; macOS and
Linux include it as `curl`.

In Windows PowerShell, type **`curl.exe`**, not `curl`: there `curl` is another command, and
it fails on the options below. On macOS and Linux, write `curl` wherever this page writes
`curl.exe`.

**Put the username and password in a file**, so that no shell has to read them and they stay
out of your command history. Create `ftp.cfg` next to your script:

```text
user = "USERNAME:PASSWORD"
ssl-reqd
```

Inside the quotes, write a `\` in the password as `\\` and a `"` as `\"`. `ssl-reqd` makes curl
encrypt the login and the file transfer, and stop with an error rather than fall back to plain
FTP. Do not use `ssl` instead: it falls back to plain FTP without telling you.

Then `-K ftp.cfg` gives curl the file. Replace the capitals with your own values.

**Upload files for an import** — to the `import` folder of the data source's folder:

```sh
curl.exe -K ftp.cfg -T "products.csv" ftp://ftp.eu.40three.net/DATA_SOURCE_FOLDER/import/
```

A data source that expects several files takes them in one command — the import starts once the
last one has arrived:

```sh
curl.exe -K ftp.cfg -T "{products.csv,prices.csv}" ftp://ftp.eu.40three.net/DATA_SOURCE_FOLDER/import/
```

**Download a channel's file:**

```sh
curl.exe -K ftp.cfg -o "products.csv" ftp://ftp.eu.40three.net/CHANNEL_ID/products.csv
```

**Upload an asset into an inbox** — to the top folder, since an inbox's FTP credentials have
no folders. Put the inbox's username and **Secret** in the `ftp.cfg`:

```sh
curl.exe -K ftp.cfg -T "4006381333931-front.jpg" ftp://ftp.eu.40three.net/
```

A URL that ends in `/` keeps the local file's name on the server, without its folder: `-T
"C:\export\products.csv"` arrives as `products.csv`.

## Import folders and how long files are kept

Each data source that receives files over FTP has a folder of its own at the root of
the server, and two folders inside it. Browse the root in an FTP client to see the
exact names — a data source appears under its key, or under its id if it has none.

| Path | What is in it |
|---|---|
| `<data source>/import` | Where you drop files. |
| `<data source>/archive/<timestamp>-<id>` | One folder per import, holding the files that import read. |

When an import starts, the files it takes are moved out of `import` into a new folder
under `archive`. That is why a file you uploaded is no longer in `import` — it has been
read, not lost.

**A file stays in `import`** until every file the data source expects has arrived, so a
partial set waits there for the rest.

**Archived imports are kept for 30 days, or the most recent 5,000 imports of that data
source — whichever comes first.** After that the folder and its files are removed. The
`import` folder is yours: nothing clears it automatically, so a file that never
completed a set stays until you remove it.

Runs themselves, with their logs, are listed in the app for the same 30 days — see
[Background jobs](/en/troubleshooting/background-jobs.html).

## A channel's folder

A channel's FTP credentials see one folder, named after the channel's id, holding the files of
the channel's latest run and a `history` folder with the earlier ones:

| Path | What is in it |
| --- | --- |
| `<channel id>/<file>` | One file per feed, from the latest run that completed. |
| `<channel id>/history/<run id>/` | One folder per run, holding the files that run wrote. |

You do not have to work out the address. The channel's **Feeds** list and its dashboard show
each feed as an `ftp://` address with the folder and file name in it; use it with the channel's
FTP credentials.

**A file's name** is the feed's output name, or the feed's type — `products.csv` for a product
feed in CSV — when it has none.

**A run replaces the files only when it has written all of them.** Until then the folder shows
the previous run's files, so a system that collects during a run gets a complete, older set
rather than a half-written one. A run that fails leaves the previous files in place.

The folder is read-only: you cannot upload, rename or delete files in it.

## When it does not work

| What you see | Why | What to do |
| --- | --- | --- |
| The login is refused (`530`) | The data source is not enabled yet, the inbox has no **Secret**, or the username or password is wrong | Enable the data source, or set the inbox's **Secret**, then check both values in the app |
| An upload is refused with *This data source only accepts files named …* | The file's name is not one of the data source's dataset files | Rename the file to the name the message lists |
| curl stops with error `60`, or your client warns that the certificate does not match | You connected to a different host name — the certificate names only `ftp.eu.40three.net` | Connect to `ftp.eu.40three.net` |
| Connecting on port 990 hangs until it times out | Implicit encryption — the server uses explicit encryption on port 21 | Choose explicit encryption, port 21 |
| You log in, but listing a folder or transferring a file hangs | The client is in active mode, or a firewall blocks the data connection | Switch to passive mode. If it still hangs, ask whoever runs your firewall to allow outbound FTP to `ftp.eu.40three.net` |
| PowerShell says a parameter name is *ambiguous*, or that *a positional parameter cannot be found* | `curl` in Windows PowerShell is another command | Type `curl.exe` |
| A file you uploaded is gone from `import` | An import read it and moved it to `archive` | Nothing — see [Import folders](#import-folders-and-how-long-files-are-kept) |
| A file waits in `import` and nothing runs | Not every file the data source expects has arrived | Upload the rest of the set |
| An inbox's folder is empty | An inbox's FTP credentials can upload only — they list nothing, even after an upload | Check the inbox in the app |
| An idle connection closes | The server closes a connection after about five minutes without activity | Connect, transfer and disconnect in one go; reconnect in a long-running client |
