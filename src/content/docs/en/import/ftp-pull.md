---
title: "FTP Server (hosted by heavendata)"
reviewed: false
sidebar:
  order: 1
---
This article describes how to connect to our ftp server to access import and export files. 

## Windows Desktop - WinSCP

WinSCP is a Windows application that allows you to manually connect to our ftp server and browse available files.

You can download it here: https://winscp.net/

## Windows Command Line - Curl

Curl allows you to download files from ftp servers on command line. This is perfect if you want to write a script to automatically download and import data.

Install Curl:

* Download and unzip Curl for Windows from https://curl.haxx.se/windows/
* Copy contents of */bin* folder to the folder where you saved your script

Now you can download files using a single command

     curl ftp://eu.ftp.40three.net/CHANNEL_ID/products.csv --user USERNAME:PASSWORD -o products.csv

     # example
     bin/curl.exe ftp://eu.ftp.40three.net/a28ca68c-bbb8-4753-ab35-30e83980ab7e/products.csv --user myuser@myaccount:secretpassword -o products.csv

You'll find the details in your channels configuration or use a desktop client to manually explore available files.

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
partial set waits there for the rest. A data source that is switched off never starts
an import either, so its files wait until you enable it.

**Archived imports are kept for 30 days, or the most recent 5,000 imports of that data
source — whichever comes first.** After that the folder and its files are removed. The
`import` folder is yours: nothing clears it automatically, so a file that never
completed a set stays until you remove it.

Runs themselves, with their logs, are listed in the app for the same 30 days — see
[Background jobs](/en/troubleshooting/background-jobs.html).

## FAQs

* Can I use the default Windows command line ftp client? No. This client does not support passive FTP and will not work in most environments. Active FTP means, that our ftp server would have to initiate data connections and this would be blocked by your firewall / router.