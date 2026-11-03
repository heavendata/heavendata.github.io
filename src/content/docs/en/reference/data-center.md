---
title: "Data Center"
reviewed: false
sidebar:
  order: 3
---
## Location

Our solution is hosted by Azure in Europe.

## Web addresses

On 1 November 2026, the app and its sign-in moved to `heavendata.app`. If your network lets through only the web addresses on a list, allow these:

| Allow | What it is |
| --- | --- |
| `*.heavendata.app` and `heavendata.app` | The app at `https://‹account›.heavendata.app/pim`, sign-in and sign-up at `https://www.heavendata.app`, and Organization settings at `https://profile.heavendata.app` |
| `*.40three.net` | Everything that did not move: links to your files, feeds, the heavendata FTP server, the API, and the services the app calls in the background |
| `*.productdata.cloud` | Brand portals |

Many firewalls do not count `heavendata.app` itself as part of `*.heavendata.app`, so list both. A wildcard that covers only one level of name also misses three addresses one level deeper — `assets.eu.40three.net`, `feeds.eu.40three.net` and `ftp.eu.40three.net` — so list those by name too. Keep `*.40three.net` on the list: the app on `heavendata.app` still calls it, and without it the app does not work.

### What kept its address

Links to your files, feeds, the heavendata FTP server, the API and every address an integration calls are where they were. A shop, a feed reader or an integration that uses them needs no change.

### The old addresses still open

| Old address | Opens |
| --- | --- |
| `https://‹account›.40three.net/pim` | `https://‹account›.heavendata.app/pim` |
| `https://www.40three.net`, `https://auth.40three.net`, `https://40three.net` | `https://www.heavendata.app` |
| `https://profile.40three.net` | `https://profile.heavendata.app` |

The rest of the address is kept, so a bookmark, or a link in an email sent before the move, opens the same page at the new address. The old addresses keep working with no end date. The first time you open heavendata at the new address, you sign in again.

## Our IP Address

Requests initiated from our production systems will use the IP address: 40.119.145.134

Please be aware that the IP address used for outgoing requests may change without prior notice. Ensure that your firewall and network configurations are set to accommodate potential changes. Regularly verify your settings to maintain uninterrupted service.

Please DO NOT restrict the access to test systems by IP. If you restrict the access to test systems, we're no longer able to analyze eventual issues that need investigation from the engineering team.
