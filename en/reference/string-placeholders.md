---
layout: default
title: String Placeholders
parent: Reference
---

# String Placeholders

String placeholders allow you to add dynamic elements to text values, for example to add the current date to a filename.

Example

{% raw %}
    // output filename with full date and time
    feed_{yyyy}{MM}{dd}_{HH}{mm}{ss}.xml
{% endraw %}

For a full reference of all supported formats, see https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
