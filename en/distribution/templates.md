---
layout: default
title: Template based channels
parent: Sharing product data
---

# Template Based Channels

Template based channels allow you to provide a custom template to render the output. As an example, you could provide all products in an XML document according to the specifications of your target system.

As with all other channels, you can distribute the result as an http feed or copy it to a file server.

## Scriban Template Language

Templates are written using the Scriban template language. 

{% raw %}
    <product>
      <name>{{ variant.name }}</name>
    </product>
{% endraw %}

Please refer to the following docs for further information:

* [Template language](https://github.com/scriban/scriban/blob/master/doc/language.md)
* [Functions](https://github.com/scriban/scriban/blob/master/doc/builtins.md)
 
## Accessing Product Attribute Values

Product data is available as variable `product` in the record template:

    {% raw %}
        {{ record.attribute_code }}
    {% endraw %}

Please replace `attribute_code` with the code of an attribute of your instance. To see available attributes, navigate to settings > attributes & sections.

If a product has variants, you can access the variants like so:

{% raw %}
    {{ for variant in variants }}
        {{ variant.color_code }}
    {{ end }}
{% endraw %}

This code fragment will iterate over all variants of the current product and output the attribute with code `color_code` for each.

### Translatable Attributes

To output the value of translatable attribute, you need to provide the language ISO code:

{% raw %}
     {{ record.my_translatable_attr | i18n.t 'en-US' }}
{% endraw %}

You can provide a default value if there is no translation for the requested culture available:

{% raw %}
     {{ record.my_translatable_attr | i18n.t 'en-US' 'No value available' }}
{% endraw %}

See Settings > Languages for a list of available languages in your account. Remember to use the exact ISO code as configured. If you included the region code in the configuration (e.g. en-US) you must provide the region code, if you configured the language code only (e.g. en) you must not provide a region code in the template too.

### Escaping values for XML / HTML

Attributes may contain characters that need to be escaped in XML documents: 

{% raw %}
    {{ variant.description | html.escape }}
{% endraw %}

### Asset Attributes (Images, PDFs, Files)

Each attribute of type asset contains a list of assets. To access the assets, ensure to iterate over this list or access items by their index.

#### Examples

This example iterates over all images stored in the attribute with code "my_images" and outputs their public urls.

{% raw %}
    {{ for a in variant.my_images }}
      {{ a | asset.url }}
    {{ end }}
{% endraw %}

This examples outputs the url of the asset variant "example_thumbnail" instead of the original image.

{% raw %}
    {{ for a in variant.my_images }}
      {{ a | asset.url 'example_thumbnail' }}
    {{ end }}
{% endraw %}

#### The Asset Object

Property | Description
---------| -----------
id | The internal asset id.
filename | The filename of the original file when it was uploaded.
mimeType | Mime type (also known as content type) of binary, e.g. "image/png"

    // Example: name-as-uploaded.png
    myImage.filename

#### Asset Functions

`asset.url` prints the full, public http url for an asset.

    // output public asset url
    myImage | asset.url

    // output url for configured asset variant
    myImage | asset.url 'my-variant'

    // output variant url and force filename
    myImage | asset.url 'shop-thumb' 'thumb.png'

`asset.updated` returns the last modified date of an asset or Sept, 9 2022 for assets uploaded before this date.

    // date in default format
    myImage | asset.updated

    // format the date
    // example: 2022-10-30
    myImage | asset.updated | date.to_string "%F"
    
See [date.to_string](https://github.com/scriban/scriban/blob/master/doc/builtins.md#dateto_string) for a full list of all supported formats.

### Meta Information

#### Cultures
`i18n.culture_codes` contains a list of all cultures included in an export / channel. Included are the selected cultures or all configured cultures. `i18n.language_codes` provides a list of ISO language codes (without the country code part).

{% raw %}
    {{ for code in i18n.culture_codes }}
      {{ c }}
    {{ end }}

    // example output
    en-US
    fr-FR

    {{ for code in i18n.language_codes }}
      {{ c }}
    {{ end }}

    // example output
    en
    fr
{% endraw %}

See [Settings > Languages](../settings/languages.md) how to configure system languages. If languages are configured without a region, `culture_codes` will contain the language code only.

Note that the term "culture" (or "locale") is used in technical environments and describes a language "as spoken is a specific region" while we use just "language" in the PIM user interface. Both are the same.
