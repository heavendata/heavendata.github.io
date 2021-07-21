---
layout: default
title: Asset variants
parent: Settings
nav_order: 10
---

# Asset Variants

These settings apply to all assets of type image. This includes

* Images used in product attributes
* Images stored in cloud drive

We'll create all defined variants for all images. Then, when accessing the images, you specify which variant to use by providing the key as part of the asset URL.

<iframe width="560" height="315" src="https://www.youtube.com/embed/mWZbFU9ICIU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Variant Settings

|Field|Description |
|--|-- |
|Width, height|Output size. Leave empty if you don't want to resize the image.
|Resize mode| Defines if width x height should be filled (but the image might be cropped) or if it should fit within these dimensions (and in most cases, one side will be smaller than defined). We'll always keep the aspect ratio.
|File format|Output file format

### Transformations
Allow you to modify the image.

|Transformation|Description |
|--|-- |
|Remove background color| It's typically used to remove white backgrounds if you need an image with transparent backgrounds. Note that this transformation may need some adjustments or can produce bad quality results. You'll have to remove the background manually in an external tool like Adobe and upload the result in this case.
|Add background color| Adds a background color to images with transparent background.
|Optimize file size| Optimizes the image size to reduce load times.