---
layout: default
title: FTP Server (hosted by heavendata)
parent: Sharing product data
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

## FAQs

* Can I use the default Windows command line ftp client? No. This client does not support passive FTP and will not work in most environments. Active FTP means, that our ftp server would have to initiate data connections and this would be blocked by your firewall / router.