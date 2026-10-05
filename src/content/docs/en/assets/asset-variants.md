---
title: "Image variants"
reviewed: false
sidebar:
  order: 1
---
An image variant is an image made from an asset to set its dimensions, file format and background. A channel links to it by its key. It is made when an image is first requested under its key, and the result is reused for later requests.

Image variants are made for PNG, JPEG, GIF, TIFF, WebP, BMP, PSD, AVIF and JXL images, and for PDF and Illustrator files. A PDF or Illustrator file is rendered to an image from its first page. Any other file, such as an SVG image, has no image variant. The images can come from asset attributes or from the Cloud drive.

To create one, go to **Settings** > **Assets** > **Thumbnails** and select **New variant**. Enter a **Name** and a **Url key**, then fill in the settings below.

## The key in the asset URL

You specify which image variant to use by providing the key as part of the asset URL: the public address of an asset is made of your account, the key and the asset ID. A file name can follow the asset ID, but it is ignored. Open an asset in the Cloud drive and select **Details** > **URLs** to see its URL for each image variant.

A key can contain letters, numbers and the characters `_`, `-` and `.`, and each key is used once. The URL does not change when you change the settings of an image variant.

Don't change the key of an image variant, or delete it, while a channel uses it. The stored images under the old key are removed in the background, and once that is done, every address that holds the old key stops returning an image.

## Image variant settings

|Field|Description |
|--|-- |
|Width, height|Output size. Leave both empty if you don't want to resize the image. If you fill in only one, the image is scaled to that size and keeps its proportions, and nothing is cut. An image that is smaller than the size in both width and height keeps its own size. A PDF or Illustrator file is always rendered at the size you set.
|Resize mode| Defines if width x height should be filled (**Cover**, but the image might be cropped) or if it should fit within these dimensions (**Contain**, and in most cases, one side will be smaller than defined). We'll always keep the aspect ratio. When **Cover** crops the image, the cut falls around the center of the image unless you choose a crop position. With **Cover**, an image that is smaller than the size in only one direction is scaled up to fill it. New image variants use **Contain**.
|Crop position| Which part of the image to keep when **Cover** cuts it: **Top left**, **Top**, **Top right**, **Left**, **Center**, **Right**, **Bottom left**, **Bottom** or **Bottom right**. **Center** is the default. The field appears only while the resize mode is **Cover**; **Contain** never cuts an image, so it ignores the crop position. It only matters when you fill in both width and height. See [Crop position](#crop-position).
|File format|Output file format: **PNG** (the default), **JPEG** or **GIF**. JPEG has no transparent areas, so choose PNG or GIF if your images need them.

### Crop position

**Cover** scales the image until it fills the width x height box, then cuts off what sticks out. The image is either taller or wider than the box in proportion, so the cut falls on one pair of edges only: the top and bottom, or the left and right. The crop position decides which part is kept on that pair. On the other pair there is nothing to cut, so the image stays centered. An image with exactly the proportions of the box isn't cut, and every crop position gives the same result.

Two kinds of asset are never cut, so the crop position leaves them as they are. An image smaller than the box in both width and height is kept at its own size. A PDF or Illustrator file is rendered large enough to fill the box, and the whole page is kept.

|Crop position|Image taller than the box: top and bottom are cut|Image wider than the box: left and right are cut|
|--|--|--|
|Top left|Keeps the top|Keeps the left
|Top|Keeps the top|Centered
|Top right|Keeps the top|Keeps the right
|Left|Centered|Keeps the left
|Center|Centered|Centered
|Right|Centered|Keeps the right
|Bottom left|Keeps the bottom|Keeps the left
|Bottom|Keeps the bottom|Centered
|Bottom right|Keeps the bottom|Keeps the right

"Keeps the top" means the image is aligned to the top edge of the box and the excess is cut from the bottom. The same goes for the other edges.

Choose a corner when your images come in both shapes and the subject sits in the same place in each. For a square image variant fed with portrait product shots and landscape lifestyle shots that both show the subject at the top left, **Top left** keeps the top of every portrait image and the left of every landscape image.

Changing the crop position of an image variant changes the images served under its key, including images that were already made. Saving clears the stored images in the background, and each image is made again with the new crop position on its next request. Clearing takes longer the more assets your account has, so for a while some requests still return the old image. A shop or marketplace that has already copied an image keeps its copy.

To try a change first, create a second image variant with a new key and the crop position you want to compare. Then look at a few of your images under that key: select them in the Cloud drive and download them as that image variant from the actions menu. Only when the result looks right, change the crop position of the image variant your channels use, or switch your channels to the new key.

### Transformations
Transformations change the look of the image after it is resized and converted to the file format. They run in the order they are listed.

|Transformation|Description |
|--|-- |
|Remove background color| It's typically used to remove white backgrounds if you need an image with transparent backgrounds. Choose the **Color to replace** (white by default) and a **Tolerance**. Only the background that touches the edge of the image is removed, so the same color inside the object stays. Choose PNG or GIF as the file format, because JPEG cannot be transparent. Note that this transformation may need some adjustments or can produce bad quality results. You'll have to remove the background manually in an external tool and upload the result in this case.
|Add background color| Adds a background color to images with transparent background.
|Transform color space| Converts the image to **SRGB**, **CMYK** or **Gray**.
|Optimize file size| Optimizes the image size to reduce load times. Images larger than 2 MB are not optimized.
