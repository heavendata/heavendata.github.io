---
title: "Assets in a template"
description: "Output an image, PDF or file from an asset attribute — its public URL, an image variant, and when its file and its name last changed."
sidebar:
  label: "Assets"
---

An asset attribute holds a **list** of assets, even when there is only one file, and an asset becomes a URL through **`asset.url`**. This page covers the attribute itself, `asset.url`, `asset.updated` for cache-busting, and `asset.metadata_updated` for a renamed asset.

## The asset attribute

Loop over it rather than indexing into it unless the attribute is required — `[0]` on an absent attribute stops the run (see [reading errors](/en/channels/templates/testing.html#reading-errors)).

```plaintext frame="none"
{{ for a in record.my_images }}
  <image>{{ a | asset.url }}</image>
{{ end }}
```

Each asset carries:

| Property | Description |
| --- | --- |
| `id` | The internal asset id |
| `filename` | The file name as uploaded |
| `mime_type` | Content type of the file, for example `image/png` |
| `name` | The asset's name, which is not its file name |
| `description` | The asset's description |
| `updated` | When the asset's file last changed. Empty when no date is recorded — [`asset.updated`](#assetupdated) gives a date for every asset |
| `metadata_updated` | When the asset's name or file name last changed. Empty until such a change is recorded — [`asset.metadata_updated`](#assetmetadata_updated) gives a date for every asset |
| `stored` | `true` when the asset's file is stored, otherwise `false` |

## `asset.url`

The full public URL of an asset.

```plaintext frame="none"
{{ for a in record.my_images }}
  {{ a | asset.url }}
  {{ a | asset.url 'original' }}
  {{ a | asset.url 'shop-thumb' }}
  {{ a | asset.url 'shop-thumb' 'thumb.png' }}
  {{ a | asset.url 'shop-thumb' 'thumb.png' true }}
{{ end }}
```

:::caution[Only `'original'` keeps the file extension]
With no image variant, `asset.url` gives the **`default`** image variant, not the uploaded original. Every image variant other than `'original'` may be stored in a different format, so its URL is built without an extension — `picture.png` becomes `…/picture`. If the system consuming your feed requires an image URL ending in `.png` or `.jpg`, either pass `'original'` or set the *filename* argument yourself.
:::

| Argument | Description |
| --- | --- |
| *variant* | An [image variant](/en/assets/asset-variants.html) key, or `'original'`; omit for `default`. |
| *filename* | Force a file name in the URL instead of the stored one. |
| *sanitize* | `true` replaces characters that are not safe in a file name with underscores. |

## `asset.updated`

When the asset's file last changed. **Replacing the file in the asset library moves the date** to that upload, on every product and custom entity record that uses the asset — published products included, without publishing them again. Renaming the asset does not move it; that is [`asset.metadata_updated`](#assetmetadata_updated). Assets with no recorded date — everything from before that field was introduced — return **27 September 2022**.

Takes an optional *variant*: with one, you get the later of the asset's own date and that image variant's last settings change, which is what you want for cache-busting an image variant URL.

```plaintext frame="none"
{{ for a in record.my_images }}
  {{ a | asset.updated }}
  {{ a | asset.updated 'shop-thumb' }}
  {{ a | asset.updated | date.to_string '%F' }}
{{ end }}
```

`date.to_string` is a Scriban built-in — see the [function reference](/en/channels/templates/functions.html#scriban-built-ins).

## `asset.metadata_updated`

When the asset's name or file name last changed — so a receiving system can tell it has to read the asset's name again, not only its file. Takes no image variant.

```plaintext frame="none"
{{ for a in record.my_images }}
  <image changed="{{ a | asset.updated | date.to_string '%F' }}" renamed="{{ a | asset.metadata_updated | date.to_string '%F' }}">{{ a | asset.url 'original' }}</image>
{{ end }}
```

**Until the asset is renamed, it returns the same date as `asset.updated`**, and 27 September 2022 when neither date is recorded. So it never renders empty, and comparing it with the date you last sent is enough to know whether anything changed.

The members `a.updated` and `a.metadata_updated` are the recorded dates as they are, with neither fallback: empty when none is recorded. A JSON channel writes the same two dates on each asset as `updated` and `metadataUpdated`, `null` when none is recorded.

## What to read next

- [The data in a template](/en/channels/templates/data.html) — `record`, `variants`, and plain attributes
- [Template function reference](/en/channels/templates/functions.html) — everything callable
- [Testing and debugging templates](/en/channels/templates/testing.html)
