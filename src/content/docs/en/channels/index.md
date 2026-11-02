---
title: "Channels & feeds"
description: "Get product data out, in the shape the receiving system demands."
sidebar:
  order: 0
  label: "Overview"
---

A **channel** takes a selection of your products, formats it, and delivers it
somewhere — a feed URL, a file server, or an inbox.

Formatting is one choice with two branches. Use a **standard format** (CSV,
Excel, JSON and others) when the receiving system will take a table, and shape
each field with the per-field pipeline. Use a
[**custom template**](/en/channels/templates.html) when the output has to match an exact
document structure the other side specified.

## Saving a channel before Publishing is complete

A channel that publishes by **File transfer** or **Email** can be saved before its
**Publishing** step is complete. Until the step has what the channel needs to deliver,
the channel is saved disabled: it does not run on its schedule, and it can be neither
enabled nor run by hand.

| Publishing | The channel can be enabled once it has |
|---|---|
| **File transfer** | a host name, and for SFTP a username |
| **Email** | a **Subject**, and at least one address under **Recipients**, one address per line. Addresses typed on one line, separated by commas, semicolons or spaces, keep the channel disabled. |

## Versions

**Every time you save a channel, the version it replaces is kept.** The **Versions** page
lists them, shows what each save changed, and restores an earlier version when a change
needs undoing — a template edit, a mapping, a schedule.

To open it, open the channel from **Channels** and choose **Versions** in the list on the
left, after **Dashboard** and **Run history**. Only users with the **Edit channels**
permission see it, because a version holds the channel's whole configuration.

### What is kept

| | |
|---|---|
| **A save** | Keeps the channel as it was before the save. A save that changes nothing keeps nothing, so choosing **Save** without an edit adds no version. |
| **Creating a channel** | Keeps nothing: there is no earlier version yet. Versions are kept from October 2026 on, so a channel last saved before then has only its current version until its next save. |
| **How many** | Up to 500 earlier versions per channel, besides the current one. The save that would keep a 501st deletes the oldest. |
| **Passwords** | Never part of a version. A version holds no password, and the page never shows one. |
| **Deleting the channel** | Deletes its versions with it. A deleted channel cannot be brought back from them. |

### The list

The list starts with the channel as it is now, marked **Current**, followed by the earlier
versions, newest first. Each page holds 50 earlier versions.

| Column | What it shows |
|---|---|
| **Saved on** | When the save that made this version happened, in your time zone, written as month/day/year and time — `10/20/26, 6:24 PM`. |
| **Saved by** | The name of the user who made that save. **Unknown** where none was recorded — always so on the oldest version kept. |
| *(actions)* | **Current** on the first row; **Restore** on every other row. |

### See what a save changed

Select a row, and **Changes** below the list shows what that row's save changed, compared
with the version before it. The channel's settings are shown as they are stored — as JSON,
with the keys the channel keeps rather than the editor's labels. A removed line is marked
`−`, an added line `+`, and a long run of unchanged lines is folded behind
**Show ‹n› unchanged lines**.

To see what restoring a version would replace, select its row and choose **Current version**
under **Compare with**; **Previous version** goes back to what the save changed. The first
row has no **Compare with**, because it is the current version.

Instead of a comparison, the page says:

- *No earlier versions yet. A version is kept each time you save the channel.* — the channel
  has only its current version.
- *This is the oldest version kept, so there is nothing to compare it with.* — the version
  before it is no longer kept.

### Restore a version

1. Select the version's row, and compare it with the **Current version** to check what
   restoring it replaces.
2. Choose **Restore** on the row.
3. Choose **Restore version** in the dialog.

The channel's settings are replaced with the version's, and the restored version becomes the
current one. **Restoring is a save**, so the version it replaces is kept like any other: to
undo a restore, restore that version. The restore goes through the same checks as **Save**
in the channel editor, and the channel runs on the restored version's schedule.

| What happens to… | When you restore |
|---|---|
| **Passwords** | They stay as they are now. A restore never brings back an old password, so it cannot undo a password change. |
| **A version with a different publishing method** | If the version delivers by another publishing method than the channel does now — **File transfer** where the channel now uses **FTP server**, say — that method has no password after the restore. The dialog says so; enter the password under **Publishing** before the channel runs. |
| **An HTTP pull version with a different authentication method** | If the version and the channel both use **HTTP pull** but with different authentication methods — a username and password in one, an access key in the other, or none now — the version comes back without its password or access key. The dialog does not warn about this case. Enter it again under **Publishing**. |
| **A version that cannot run** | It is restored as disabled, the same way the editor saves an enabled channel whose **Publishing** step is incomplete ([Saving a channel before Publishing is complete](#saving-a-channel-before-publishing-is-complete)). A message says what to fill in, for example *Version restored as disabled. Enter a host name under Publishing to enable this channel.* |

If a restore fails, the channel is unchanged, and the message says why:

| Message | What to do |
|---|---|
| *Couldn't restore the version. Some of its settings are no longer valid, so the channel is unchanged. Edit the channel to set them by hand.* | The version no longer passes today's checks — for example, a filter condition in it is incomplete. You can still compare it; copy the settings you need into the channel by hand. |
| *Couldn't restore the version. Its username for the heavendata FTP server is already in use. …* | The version publishes by **FTP server** with a username another channel uses now. Edit the channel by hand, with another username. |
| *Couldn't restore the version. It no longer exists. Reload the page.* | The version, or the channel, was deleted in the meantime. |

If two people save the same channel at once, the last save wins, a restore included. Both
earlier states are kept as versions.
