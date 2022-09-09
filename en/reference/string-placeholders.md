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
    feed_{yyyyMMdd_HHmmss}.xml
{% endraw %}

Pattern | Output
--------| ------
yyyy | Full year, e.g. 2022
MM   | Month as number, e.g. 08
dd   | Day of month, e.g. 31
HH   | Hour, e.g. 13
mm   | Minute, e.g. 59
ss   | Seconds, e.g. 30


For a full reference of all supported formats, see https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
