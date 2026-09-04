---
title: "Assets in a template"
description: "Output an image, PDF or file from an asset attribute — its public URL, an image variant, and its modification date."
sidebar:
  label: "Assets"
---

An asset attribute holds a **list** of assets, even when there is only one file, and an asset becomes a URL through **`asset.url`**. This page covers the attribute itself, `asset.url`, and `asset.updated` for cache-busting.

## The asset attribute

Loop over it, or index into it — but only loop when the attribute may be empty, because `[0]` on an absent attribute stops the run.

```plaintext frame="none"
{{ for a in record.my_images }}
  <image>{{ a | asset.url }}</image>
{{ end }}
```

For a configured [image variant](/en/assets/asset-variants.html):

```plaintext frame="none"
{{ for a in record.my_images }}
  <image>{{ a | asset.url 'example_thumbnail' }}</image>
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
| `updated` · `stored` | When it was last modified, and when it was first stored |

## `asset.url`

The full public URL of an asset.

```plaintext frame="none"
{{ for a in record.my_images }}
  {{ a | asset.url }}
  {{ a | asset.url 'original' }}
  {{ a | asset.url 'my-variant' }}
  {{ a | asset.url 'shop-thumb' 'thumb.png' }}
{{ end }}
```

:::caution[Only `'original'` keeps the file extension]
With no variant, `asset.url` gives the **`default`** variant, not the uploaded original. Every variant other than `'original'` may be stored in a different format, so its URL is built without an extension — `picture.png` becomes `…/picture`. If the system consuming your feed requires an image URL ending in `.png` or `.jpg`, either pass `'original'` or set the *filename* argument yourself.
:::

| Argument | Description |
| --- | --- |
| *variant* | An [image variant](/en/assets/asset-variants.html) key. **Omitting it gives the `default` variant, not the original** — pass `'original'` explicitly for the uploaded file. |
| *filename* | Force a file name in the URL instead of the stored one. |
| *sanitize* | `true` replaces characters that are not safe in a file name with underscores. |

## `asset.updated`

When the asset was last modified. Assets with no stored modification date — everything from before that field was introduced — return **27 September 2022**.

Takes an optional *variant*: with one, you get the later of the asset's own date and that variant's last settings change, which is what you want for cache-busting a variant URL.

```plaintext frame="none"
{{ for a in record.my_images }}
  {{ a | asset.updated }}
  {{ a | asset.updated 'shop-thumb' }}
  {{ a | asset.updated | date.to_string '%F' }}
{{ end }}
```
