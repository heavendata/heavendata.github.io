---
title: "Delete an account or an organization"
description: "Delete an account or a whole organization in Organization settings, what happens during the 30 days it is pending deletion, how to cancel the deletion, and the emails everyone with access receives."
sidebar:
  order: 4
---

You delete an account, or a whole organization with all its accounts, in
[Organization settings](/en/organization-settings.html). Nothing is deleted at once: for
30 days the account or organization is **pending deletion**, and the deletion can be
canceled. After those 30 days it can no longer be canceled, by you or by support.

## Before you delete: export your data

Once you delete, nobody can open the account, so export the data you want to keep first.
There is no single export of a whole account. Export your products from the product list —
see [Exporting products](/en/products/product-list.html#exporting-products) — and select
**Include asset files** to get your asset files with them.

## Account or organization — what differs

Whoever may delete an account or an organization may also cancel its deletion.

| | Delete an account | Delete an organization |
| --- | --- | --- |
| Covers | One account and its product data | The organization and every one of its accounts, with its users' access, user groups and billing details |
| Who may | A user who may manage accounts and that account's settings | An administrator of the organization |
| Where | **Accounts**, then the account | **Dashboard** |
| You confirm by | Selecting **Delete account** again | Typing the organization's name |
| Who still sees it while pending | Everyone who can open **Accounts** | The organization's administrators only |

## Delete an account

1. [Open Organization settings](/en/organization-settings.html#open-organization-settings)
   and select **Accounts** in the menu bar.
2. Select the account.
3. Under **Administration**, in **Delete account**, select **Delete account**.
4. The confirmation **Delete this account?** says that nobody can use the account from now
   on and gives the date its data is permanently deleted. Select **Delete account**.

The page says **Account pending deletion**. The account's status is now **Pending
deletion**, in the **Accounts** list and on its page.

## Delete an organization

1. [Open Organization settings](/en/organization-settings.html#open-organization-settings)
   for the organization and select **Dashboard** in the menu bar.
2. Under **Administration**, select **Delete organization**.
3. The page **Delete organization "‹name›"?** lists what is deleted and gives the date. Under
   **Organization name**, type the organization's name exactly as shown.
4. Select **Delete organization**.

The page says **Organization pending deletion** and takes you to your profile.

## While it is pending deletion

From the moment you delete, until the deletion is canceled:

- Nobody can open or use the account in heavendata, in the apps or through the API.
- No import or export runs, and nothing is delivered to your channels.
- Feeds, links to your files, FTP logins, the asset inbox and the brand portal stop
  answering, as for an account that doesn't exist.
- All data is kept, and the account keeps its web address, so nobody else can take it.
- The account can't be renamed and its plan can't be changed.

A user of the organization who opens the account's address sees **"‹name›" is pending
deletion**, with the date its data is permanently deleted and who can cancel the deletion.
Anyone else sees **Access denied**.

## Cancel the deletion

You can cancel a deletion until the date shown.

**An account:** in Organization settings, select **Accounts**, then the account, and select
**Cancel deletion**. The page says **Deletion canceled**, and the account works again as
before.

**An organization:** an administrator opens Organization settings for the organization,
selects **Dashboard** and, under **Administration**, **Cancel deletion**. This brings back
every account that was deleted with the organization. An account that was deleted on its
own before stays pending deletion, with its own date.

An account that was deleted together with its organization can't be canceled on its own:
the page says **The organization is pending deletion too.** Cancel the organization's
deletion first.

## Emails about the deletion

Everyone who had access when it was deleted receives these emails: the organization's
administrators, and every user with a permission on the account, directly or through a
user group. For an organization, each email lists its accounts. The emails are in English.

| Email | Sent |
| --- | --- |
| **Account "‹name›" pending deletion** · **Organization "‹name›" pending deletion** | Right after the deletion. It names who deleted it and the date, and has a **Cancel deletion** button for those who can cancel. |
| **Account "‹name›" is permanently deleted on ‹date›** · **Organization "‹name›" is permanently deleted on ‹date›** | The day before that date. |

Canceling the deletion stops the emails still to come.
