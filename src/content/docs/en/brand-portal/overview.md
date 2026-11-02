---
title: "Brand portal settings"
description: "Who can see your brand portal, which settings decide what it shares, and how to set up its downloads and language."
sidebar:
  order: 1
  label: "Portal settings"
---

The brand portal's settings are under **Settings → Brand portal**. They decide the
portal's address and branding, the posts it shows under **News**, whether it shares
your product data and your cloud drive files, and what a visitor can download. A
visitor of the portal can browse your published products, read your posts and
contact details, and download:

- product data, for all products or for collections, with all attributes or with attribute sets;
- the images and files of a product;
- the files in your cloud drive.

## Who can see your brand portal

**The brand portal has no login.** Anyone who has its address — the **URL** under
**General settings** — can open it and sees everything you share there. There is no
invitation. What a visitor gets is decided by these settings:

| Setting | Where | What it controls |
|---|---|---|
| **Share product data** | **Settings → Brand portal**, section **Products** | On: visitors see your published products and their images and files, and can download product data. Off: the portal shows no products. |
| **Share cloud drive files** | **Settings → Brand portal**, section **Cloud drive** | On: the portal has a **Files** page with the files and folders of your cloud drive. Off: there is no **Files** page — see [Where files stay reachable](#where-files-stay-reachable). |
| **Internal**, on an attribute | The attribute's settings, under **Settings → Attributes & sections** | The attribute is never shown and never downloaded on the portal. Channels still export it. See [Attributes](/en/concepts/attributes.html). |
| **Make internal**, on a file or folder | The file's or folder's menu in the **Cloud drive** | The portal does not deliver the file, except in one download — see [Where files stay reachable](#where-files-stay-reachable). **Make public** undoes it. |

**Share product data** and **Share cloud drive files** are off when you enable the
brand portal. Turning one on or off is saved at once; it reaches visitors within a
minute, and a portal page that is already open changes when it is reloaded.

### Where files stay reachable

A file that is not internal stays downloadable to anyone who already has its link
while **Share product data** is on — also after you turn **Share cloud drive files**
off, which removes only the **Files** page. To keep a file away from visitors, make
it internal — and if it belongs to a product, remove it from the product too: a
product data download is the one download that still includes it (below).

Marking a folder internal hides the folder, not the files in it: each file keeps its
own setting, so make the files internal too.

A file marked internal is left out of every download but one:

| Download | Files marked internal |
|---|---|
| A ZIP from a product's page | Left out; the ZIP holds the product's other files. If every file asked for is internal, the download is refused. |
| A ZIP from the **Files** page | Left out. |
| **Download product data** with **Include files and download as ZIP** | **Included.** The ZIP holds the files in the downloaded attributes of the exported products, internal ones too. The option is offered only when those attributes include one that holds files. To keep such a file out, remove it from the product. |

## Settings

Before you share the portal's address, give your attributes the
[required roles](/en/concepts/attribute-roles.html#required-roles): the portal's
product list opens with the attributes that hold `system.basecode`, `product.sku` and
`product.name`, and a product's page is headed by its base code and name.

When the brand portal is disabled, **Settings → Brand portal** offers **Enable brand
portal**. It opens **General settings**, where **Subdomain**, **Public brand name**,
**Contact email**, **Contact name** and **Contact phone** are required. After you
save, the settings page shows these sections:

| Section | What you set |
|---|---|
| **General settings** | **Subdomain**, the start of the portal's address; **Public brand name**; **Description**, the text the portal's home page shows under **About** (the edit form heads it **Brand information**); **Contact**. **URL** shows the portal's address. **Edit** changes them. Under **Design**: the **Logo**, the **Header image** across the top of the portal's pages, and the **Primary design color**. |
| **News** | The posts the portal's home page shows. **New post** writes one. |
| **Products** | **Share product data**; the **Default sort order** of the portal's product list; under **Image variants**, which [image variants](/en/assets/asset-variants.html) a visitor can download; and under **Product data downloads**, the collections and attribute sets described [next](#product-data-downloads). |
| **Cloud drive** | **Share cloud drive files**. |
| **Danger zone** | **Disable brand portal** takes the portal offline and resets all its settings. This can't be undone. |

### Product data downloads

A visitor's product data download holds the products they choose and the attributes
they choose. The two lists under **Product data downloads**, in the **Products**
section, give them something to choose from; a visitor can pick one or more of each:

| | What it is | Its fields |
|---|---|---|
| **Collections** | A named selection of products, defined by a filter — typically a season or a product line. It presets which products a download holds; it does not hide any product from visitors. **New collection** creates one. | **Name**, which visitors see; **Description**; and under **Filter settings**, the conditions that decide which products belong to it. |
| **Attribute sets** | A named selection of attributes, so a download holds only the attributes a visitor needs — for example "operational data", "media data" or "technical details". **New attribute set** creates one. | **Name**, which visitors see; **Description**; and under **Attributes**, the attributes the download holds. |

A visitor who picks no collection downloads all products, or
the products they filtered or selected on the **Products** page; a visitor who picks
no attribute set downloads all attributes that are not internal.

## Language

A visitor chooses the portal's language from the menu at the top right, which shows
the current language as its code, for example `en-US`. It lists **English**,
**Deutsch (German)** and **Български (Bulgarian)**. The language changes the portal's
own texts — its menus, buttons and messages — and how it writes numbers and dates.

The portal opens in the first of these that applies:

1. The `lang` parameter in the address: `en-US`, `de-DE` or `bg-BG`. To send a
   partner a link that opens in Bulgarian, add `?lang=bg-BG` to the portal's **URL**.
   Any other value is ignored, and so is the language the portal remembered: the
   portal goes straight to the browser's languages (3).
2. The language the portal remembered in that browser.
3. The first language in the visitor's browser settings that the portal has, as
   `en-US`, `de-DE` or `bg-BG`, or as just `en`, `de` or `bg` — a browser that asks
   for Bulgarian gets Bulgarian. A regional variant such as `en-GB` or `de-AT` counts
   only when the browser also lists the language on its own. Otherwise, English.

The portal remembers the language in the visitor's browser for a year: the one from
the first visit, from a link with `?lang=`, or the one last chosen from the menu. A
later change to the browser's language settings does not change it; the menu does —
except on a page whose address still holds `?lang=`, where that language wins again
when the page reloads. Open another page of the portal first, then choose from the
menu.
