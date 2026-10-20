---
title: "The heavendata FTP server"
description: "Connect to the heavendata FTP server to download a channel's files, upload files for a data source to import, or upload assets to an inbox — which credentials to use, and what you find there."
sidebar:
  order: 3
---

heavendata runs an FTP server at `ftp.eu.40three.net`. Other systems use it in three
ways, and each way has its own **FTP credentials** — a username and a password you set
in the app:

| You want to | Use the FTP credentials of | Set them in | After you connect you see |
| --- | --- | --- | --- |
| **Download** a channel's files (export) | the channel | the channel's **Publishing** step, publisher **Ftp server** | the channel's folder — [download a channel's files](#download-a-channels-files) |
| **Upload** files for a data source to import (import) | the data source | the data source's connection, **FTP push** | the data source's folder — [upload files for a data source](#upload-files-for-a-data-source) |
| **Upload** asset files to an asset inbox | the asset inbox | **Settings → Assets → Inboxes**, the inbox's **FTP Access** | an empty folder — [upload files to an asset inbox](#upload-files-to-an-asset-inbox) |

One set of credentials reaches one channel, one data source or one inbox, and nothing
else. To do two of these things, use two sets.

A username belongs to one channel or data source across all of heavendata, so choose
one nobody else is likely to have picked.

## Connect with encryption (FTPS)

The server accepts plain FTP and encrypted FTP (FTPS). Use FTPS: over plain FTP, your
password and your files cross the internet unencrypted.

| Setting | Value |
| --- | --- |
| Host | `ftp.eu.40three.net` — the name the server's certificate is issued for, so a client that checks the certificate accepts it |
| Port | 21 |
| Encryption | Explicit TLS on port 21. Do not use `ftps://` addresses or implicit encryption: nothing answers on port 990 |
| Mode | Passive |

There is no heavendata SFTP server. An **SFTP pull** data source cannot fetch from this
server.

### WinSCP (Windows)

[WinSCP](https://winscp.net/) is a Windows application for connecting to an FTP server
and browsing its files. In the login dialog, choose **FTP** as the file protocol and
**TLS/SSL Explicit encryption** as the encryption.

### curl (command line)

curl downloads and uploads files from the command line, so it suits a script that runs
on its own. Windows 10 and 11 include it as `curl.exe`; for other systems, see
[curl downloads](https://curl.se/download.html).

To download a channel's file:

```sh
curl --ssl-reqd --user USERNAME:PASSWORD -o products.csv ftp://ftp.eu.40three.net/CHANNEL_ID/products.csv
```

To upload a file for a data source:

```sh
curl --ssl-reqd --user USERNAME:PASSWORD -T products.csv ftp://ftp.eu.40three.net/DATA_SOURCE/import/
```

Replace `USERNAME` and `PASSWORD` with the FTP credentials, and `CHANNEL_ID` or
`DATA_SOURCE` with the folder you see after you connect.

`--ssl-reqd` makes curl encrypt the login and the file transfer, and stop with an error
rather than fall back to plain FTP. Do not use `--ssl` instead: it falls back to plain FTP
without telling you.

### The Windows `ftp` command

It does not work with this server. It supports only active FTP, in which the server
opens the data connection to your computer — and your firewall or router blocks that.
Use WinSCP or curl.

## Download a channel's files

This is the export direction: a channel whose publisher is **Ftp server** puts its files
on the server, and another system downloads them. Set the channel's FTP credentials in
its **Publishing** step — see [File transfer](/en/channels/setup-custom-product-feed.html#file-transfer).

After you connect you see one folder, named after the channel's id:

| Path | What is in it |
| --- | --- |
| `<channel id>/<file>` | One file for each of the channel's feeds, from the channel's latest run |
| `<channel id>/history/<run id>/` | One folder per run, with the files of that run |

The channel's **Feeds** list and its dashboard show each feed's address on the server,
in the form `ftp://ftp.eu.40three.net/<channel id>/<file name>` — the quickest way to the
exact path.

The folder is read-only: you can list and download, but not upload, rename or delete.

The files at the top change when a run has written all of the channel's feeds. Until
then you download the previous run's files.

## Upload files for a data source

This is the import direction: you, or a supplier, upload files, and a data source
imports them. Set up an **FTP push** data source with its FTP credentials first — see
[Data sources](/en/import/data-sources.html#connections).

**Enable a new data source before you upload to it.** A data source is created with
**Enabled** unchecked, and its FTP credentials work only once you have enabled it.
Until then the server refuses the login.

After you connect you see one folder for the data source, and two folders inside it.
The data source's folder is named after its key, or its id if it has none — browse the
root in an FTP client to see it.

| Path | What is in it |
| --- | --- |
| `<data source>/import` | Where you upload files |
| `<data source>/archive/<timestamp>-<id>` | One folder per import, holding the files that import read |

**An import starts when every file the data source expects has arrived** — one for
each of its datasets. A partial set waits in `import` for the rest.

When an import starts, the files it takes are moved out of `import` into a new folder
under `archive`. A file that has left `import` has been read.

**Archived imports are kept for 30 days, or the most recent 5,000 imports of that data
source — whichever comes first.** After that the folder and its files are removed. The
`import` folder is yours: nothing clears it automatically, so a file that never
completed a set stays until you remove it.

Runs themselves, with their logs, are listed in the app for the same 30 days — see
[Background jobs](/en/troubleshooting/background-jobs.html).

## Upload files to an asset inbox

An asset inbox takes new asset files. Its **FTP Access** block, under **Settings →
Assets → Inboxes**, shows the host, the port and the username to use. The password is
the inbox's **Secret**: an inbox without one has no FTP access. The default inbox has no
**FTP Access** block — create another inbox to upload over FTP.

After you connect you see an empty folder. Upload files into it; you cannot list,
download or delete them, or create folders.
