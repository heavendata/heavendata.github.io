---
title: "Image variants"
reviewed: false
sidebar:
  order: 1
---
These settings apply to all assets of type image. This includes

* Images used in product attributes
* Images stored in cloud drive

An image variant is made when an image is first requested under its key, and the result is reused for later requests. You specify which image variant to use by providing the key as part of the asset URL.

<iframe width="560" height="315" src="https://www.youtube.com/embed/mWZbFU9ICIU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Image variant settings

|Field|Description |
|--|-- |
|Width, height|Output size. Leave empty if you don't want to resize the image.
|Resize mode| Defines if width x height should be filled (**Cover**, but the image might be cropped) or if it should fit within these dimensions (**Contain**, and in most cases, one side will be smaller than defined). We'll always keep the aspect ratio. When **Cover** crops the image, the cut falls around the center of the image unless you choose a crop position.
|Crop position| Which part of the image to keep when **Cover** cuts it: **Top left**, **Top**, **Top right**, **Left**, **Center**, **Right**, **Bottom left**, **Bottom** or **Bottom right**. **Center** is the default. The field appears only while the resize mode is **Cover**; **Contain** never cuts an image, so it ignores the crop position. See [Crop position](#crop-position).
|File format|Output file format

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

To try a change first, create a second image variant with a new key and the crop position you want to compare. Then look at a few of your images under that key: select them in the cloud drive and download them as that image variant from the actions menu. Only when the result looks right, change the crop position of the image variant your channels use, or switch your channels to the new key.

### Transformations
Allow you to modify the image.

|Transformation|Description |
|--|-- |
|Remove background color| It's typically used to remove white backgrounds if you need an image with transparent backgrounds. Note that this transformation may need some adjustments or can produce bad quality results. You'll have to remove the background manually in an external tool like Adobe and upload the result in this case.
|Add background color| Adds a background color to images with transparent background.
|Optimize file size| Optimizes the image size to reduce load times.