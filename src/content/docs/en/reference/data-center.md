---
title: "Data Center"
reviewed: false
sidebar:
  order: 3
---
## Location

Our solution is hosted by Azure in Europe.

## Web addresses

To use heavendata behind a firewall that lets through only the web addresses on a list, allow these. The app and its sign-in moved to `heavendata.app` on 1 November 2026.

| Allow | What it is |
| --- | --- |
| `*.heavendata.app` and `heavendata.app` | The app at `https://‹account›.heavendata.app/pim`, sign-in and sign-up at `https://www.heavendata.app`, and Organization settings at `https://profile.heavendata.app`. List both: many firewalls do not count `heavendata.app` as part of `*.heavendata.app` |
| `*.40three.net` and `40three.net` | Everything that did not move: links to your files, feeds, the heavendata FTP server, the API, and the services the app calls in the background. The app does not work without it, and it lets the old addresses below through to their new ones. A shop, a feed reader or an integration that uses one of these addresses needs no change |
| `assets.eu.40three.net`, `feeds.eu.40three.net` and `ftp.eu.40three.net` | Your files, feeds and the heavendata FTP server, by name — for a firewall whose wildcard covers only one level of name |
| `*.productdata.cloud` | Brand portals |

Signing up also loads Google's bot check from `www.google.com` and `www.gstatic.com`; without them, the sign-up is refused. Signing in with Google or Microsoft goes through their own sign-in pages, such as `accounts.google.com` and `login.microsoftonline.com`. Allow those too if your people sign up, or sign in that way, from behind the firewall.

### The old addresses still open

| Old address | Opens |
| --- | --- |
| `https://‹account›.40three.net/pim`, `https://‹account›.40three.net` | `https://‹account›.heavendata.app/pim` |
| `https://www.40three.net`, `https://auth.40three.net`, `https://40three.net` | `https://www.heavendata.app` |
| `https://profile.40three.net` | `https://profile.heavendata.app` |

The rest of the address is kept, so a bookmark, or a link in an email sent before the move, opens the same page at the new address. The old addresses keep working indefinitely.

The first time you open heavendata at the new address, you sign in again.

## Our IP Address

Requests initiated from our production systems will use the IP address: 40.119.145.134

Please be aware that the IP address used for outgoing requests may change without prior notice. Ensure that your firewall and network configurations are set to accommodate potential changes. Regularly verify your settings to maintain uninterrupted service.

Please DO NOT restrict the access to test systems by IP. If you restrict the access to test systems, we're no longer able to analyze eventual issues that need investigation from the engineering team.
