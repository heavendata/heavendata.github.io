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
        {{ product.attribute_code }}
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
     {{ product.my_translatable_attr | t 'en-US' }}
{% endraw %}

You can provide a default value if there is no translation for the requested culture available:

{% raw %}
     {{ product.my_translatable_attr | t 'en-US' 'No value available' }}
{% endraw %}

### Escaping values for XML / HTML

Attributes may contain characters that need to be escaped in XML documents: 

{% raw %}
    {{ variant.description | html.escape }}
{% endraw %}