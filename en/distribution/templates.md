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

    <product>
      <name>\{\{ variant.name \}\}</name>
    </product>

Please refer to the following docs for further information:

* https://github.com/scriban/scriban/blob/master/doc/language.md
* https://github.com/scriban/scriban/blob/master/doc/builtins.md
 
## Accessing Product Attribute Values

Product data is available in two objects:

    product.attribute_code
    variant.attribute_code

Please replace `attribute_code` with the code of an attribute of your instance. To see available attributes, navigate to settings > attributes & sections;

If a product has variants, you can access the variants like so:

    \{\{ for variant in variants \}\}
        \{\{ variant.color_code \}\}
    \{\{ end \}\}

### Translatable Attributes

To output the value of translatable attribute, you need to provide the language ISO code:

     \{\{ product.my_translatable_attr | t 'en-US' \}\}

### Escaping values for XML / HTML

Attributes may contain characters that need to be escaped in XML documents: 

    \{\{ variant.description | html.escape \}\}