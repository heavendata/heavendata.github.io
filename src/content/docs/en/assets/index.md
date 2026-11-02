---
title: "Assets & media"
description: "How folders in the cloud drive are named and moved, and how images are made into the sizes your channels need."
sidebar:
  order: 0
  label: "Overview"
---

Images used on products are processed into the sizes you configure. See
[image variants](/en/assets/asset-variants.html).

## Folders in the cloud drive

The cloud drive keeps the files that are not assigned to products, in folders you
create. Open it from the sidebar: **Catalog** > **Cloud drive**.

**A folder name is used once in each folder.** Two folders in the same folder
can't have the same name. Names are compared exactly, so case matters: `Photos`
and `photos` are two different names and can sit side by side. Files are not
limited this way, and any number of files in one folder can share a name.

| What you do | What happens when the name is taken |
|--|--|
| Create a folder with **New folder** | The folder isn't created, and a message names the folder that already exists. Choose a different name. |
| Rename a folder with **Rename** | The folder isn't renamed, and a message names the folder that already exists. Choose a different name. |
| Move a folder with **Move to folder** into a folder that already has a folder of that name | The whole move is refused and nothing is moved, including the other files and folders you selected. Rename one of the two folders and try again. |
| Upload with **Add folders** | Nothing is refused. Files go into the folder of that name that is already there, and a folder that doesn't exist yet is created once, even when several uploads need it at the same time. |

**A folder can't be moved into itself or into a folder inside it.** In **Move to
folder**, the folders you are moving are grayed out, so you can't choose them or a
folder inside them. If such a move is made anyway, for example while someone else
moves folders at the same time, it is refused, a message says why, and nothing is
moved. Choose another folder. When two moves would put two folders inside each
other, one of them is refused, so no folder is lost.

Folder moves in your account run one after another. When many are waiting, a move
can fail with *Couldn't move the assets. Try again, and contact support if it fails
again.* Nothing was moved; try again in a moment.
