---
title: "Template based channels"
reviewed: false
sidebar:
  order: 2
---
Template based channels allow you to provide a custom template to render the output. As an example, you could provide all products in an XML document according to the specifications of your target system.

As with all other channels, you can distribute the result as an http feed or copy it to a file server.

## Scriban Template Language

Templates are written using the Scriban template language. 

    <product>
      <name>{{ record.product_name }}</name>
    </product>

Please refer to the following docs for further information:

* [Template language](https://scriban.github.io/docs/language/)
* [Functions](https://scriban.github.io/docs/builtins/)
 
## Accessing Product Attribute Values

Product data is available as variable `record` in the record template:

    {{ record.attribute_code }}

Please replace `attribute_code` with the code of an attribute of your instance. To see available attributes, navigate to settings > attributes & sections.

### Variants

All variants of a product are available as `variants`, so it is common to iterate over them:

    {{ for variant in variants }}
        {{ variant.color_code }}
    {{ end }}

This code fragment iterates over all variants of the current product and outputs the attribute with code `color_code` for each. Inside the loop, `variant` gives you the attribute values of that variant, while `record` still refers to the product.

For products without variants, `variants` contains a single item — the product itself. A template written as a loop over `variants` therefore works for both, and there is no need to handle products with and without variants separately.

### Translatable Attributes

To output the value of translatable attribute, you need to provide the language ISO code:

     {{ record.my_translatable_attr | i18n.t 'en-US' }}

You can provide a default value if there is no translation for the requested culture available:

     {{ record.my_translatable_attr | i18n.t 'en-US' 'No value available' }}

See Settings > Languages for a list of available languages in your account. Remember to use the exact ISO code as configured. If you included the region code in the configuration (e.g. en-US) you must provide the region code, if you configured the language code only (e.g. en) you must not provide a region code in the template too.

### Escaping values for XML / HTML

Attributes may contain characters that need to be escaped in XML documents: 

    {{ record.description | html.escape }}

### Asset Attributes (Images, PDFs, Files)

Each attribute of type asset contains a list of assets. To access the assets, ensure to iterate over this list or access items by their index.

#### Examples

This example iterates over all images stored in the attribute with code "my_images" and outputs their public urls.

    {{ for a in record.my_images }}
      {{ a | asset.url }}
    {{ end }}

This examples outputs the url of the asset variant "example_thumbnail" instead of the original image.

    {{ for a in record.my_images }}
      {{ a | asset.url 'example_thumbnail' }}
    {{ end }}

#### The Asset Object

Property | Description
---------| -----------
id | The internal asset id.
filename | The filename of the original file when it was uploaded.
mimeType | Mime type (also known as content type) of binary, e.g. "image/png"

```plaintext frame="none"
// Example: name-as-uploaded.png
myImage.filename
```

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
    
See [date.to_string](https://scriban.github.io/docs/builtins/#dateto_string) for a full list of all supported formats.

### Reference Attributes (Custom Entities)

An attribute of type "reference" links a product to records of a [custom entity](../settings/custom-entities.html). Such an attribute contains a list of references. Each reference carries the id, name and identifier of the linked record — but not its other attribute values.

Iterate over the list to output them. Using a loop also keeps the template working for products where the attribute is empty:

    {{ for m in record.manufacturer }}
      {{ m.target_name }}
    {{ end }}

#### The Reference Object

Property | Description
---------| -----------
target_id | Internal id of the linked record.
target_name | Name of the linked record, taken from the label attribute of the custom entity.
target_identifier | Value of the identifier attribute of the linked record.

#### Accessing the Data of a Linked Record

To output any other attribute of the linked record, look the record up with `export.custom_entity`. It takes the key of the custom entity as configured in Settings > Custom entities.

Look the record up either by its id or by its identifier:

    // by id, where r is a reference from the product
    export.custom_entity('manufacturer').get('id.entityid', r.target_id)

    // by identifier — note the ".value"
    export.custom_entity('manufacturer').get('meta.identifier', r.target_identifier.value)

The two forms must be used exactly as shown: `target_id` goes with `id.entityid`, and `target_identifier.value` with `meta.identifier`. If you mix them up, or leave out the `.value`, the lookup finds nothing.

This example outputs the support url and phone number stored on the linked manufacturer:

    {{ for r in record.manufacturer }}
      {{ m = export.custom_entity('manufacturer').get('id.entityid', r.target_id) }}
      {{ if m }}
        {{ m.support_url }}
        {{ m.support_phone }}
      {{ end }}
    {{ end }}

The `if` guards against a record that cannot be found — without it, the template fails with an error message such as "Cannot get the member ... for a null object".

Attributes of the linked record are available by their attribute code. Name, identifier and id are available like this:

Property | Description
---------| -----------
m.my_attribute_code | Value of the attribute with code "my_attribute_code".
m._meta.name | Name of the record.
m._meta.identifier | Identifier of the record.
m._id.entityid | Internal id of the record.

#### Looking Up Records by Any Text Attribute

Instead of `id.entityid` or `meta.identifier` you can look records up by any text attribute of the custom entity, using its attribute code. `get` returns the first matching record, `find` returns all of them:

    {{ for m in export.custom_entity('manufacturer').find('country_code', 'DE') }}
      {{ m._meta.name }}
    {{ end }}

The value you search for has to match the stored value exactly — the comparison is case sensitive and there is no partial matching.

Note that the first lookup loads all records of the custom entity. They are then kept for the rest of the export, but looking records up by a second attribute loads them again. In large exports, stick to one lookup attribute per custom entity.

### Meta Information
The `export` object provides data related to the export job and catalog setup as well as some common helper functions.

#### Cultures
`export.culture_codes` contains a list of all cultures included in an export / channel. Included are the selected cultures or all configured cultures. `export.language_codes` provides a list of ISO language codes (without the country code part).

    List of languages
    {{ for code in export.culture_codes }}
      {{ code }}
    {{ end }}

    // example output
    en-US
    fr-FR

    List of languages but language and culture separated by underscore
    {{ for code in export.culture_codes }}
      {{ code | export.culture_code_uc }}
    {{ end }}

    // example output
    en_US
    de_AT

    {{ for code in export.language_codes }}
      {{ code }}
    {{ end }}

    // example output
    en
    fr

See [Settings > Languages](../settings/languages.html) how to configure system languages. If languages are configured without a region, `culture_codes` will contain the language code only.

Note that the term "culture" (or "locale") is used in technical environments and describes a language "as spoken is a specific region" while we use just "language" in the PIM user interface. Both are the same.

#### Attribute Metadata
The `export.attribute` dictionary provides access to all configured data attributes.

Property | Description
---------| -----------
id | Internal attribute id
name | Attribute name, same as visible in PIM user interface
required | True if input is required
translatable | True if attribute value is language specific
labels | Dictionary of label translations (culture code, string)

    export.attribute.product_name.name
    // example output:
    Product name

    // use index access (['attribute-code']) if code contains the minus sign
    export.attribute['my-attribute'].name
    // example output:
    Product name


Use `export.attr_label` to access attribute label translations. This function returns the attribute name if no label translation is available.

    export.attr_label 'color' 'en-US'
    // example output:
    Color
