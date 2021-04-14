---
layout: default
title: Asset Variants
parent: Settings
nav_order: 10
---

# Asset Variants

These settings apply to all assets of type image. This includes

* Images used in product attributes
* Images stored in cloud drive

We'll create all defined variants for all images. When accessing the images, you define which variant to use by providing the key as part of the asset url.

## Variant Settings

|Field|Description |
|--|-- |
|Width, height|Output size. Leave empty if you don't want to resize the image.
|Resize mode| Defines if width x height should be fully filled (but image might be cropped) or if it should fit withing these dimensions (and in most cases, one side will we smaller than defined). We'll always keep the aspect ratio.
|File format|Output file format

### Transformations
Allow you to modify the image.

|Transformation|Description |
|--|-- |
|Remove background color| It's typically used to remove white backgrounds if you need an image with transparent backgrounds. Note that this transformation may need some adjustments or can produce bad quality results. You'll have to remove the background manually in an external tool like Adobe and upload the result in this case.
|Add background color| Adds a background color to images with transparent background.
|Optimize file size| Optimizes the image size to reduce load times.