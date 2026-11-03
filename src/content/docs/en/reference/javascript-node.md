---
title: "JavaScript node"
description: "The JavaScript node of the field processing pipeline: the convert function, what it receives and may return, the limits a script runs within, every message about a failed script and what to do, and what happens to the field when a script fails."
sidebar:
  order: 7
---

The **JavaScript** node runs a function you write on a field's value. Your script defines a function named `convert`; the node calls it once per value, with the value and the record, and gives on what it returns. Each call has 150 ms, 100 statements and 1 MB of memory. It is offered in imports and in channel feeds alike, under **Code** in **Add node** — how to open a pipeline and add a node is on [Field processing pipeline nodes](/en/reference/pipeline-nodes.html#how-a-pipeline-works).

## The script

The node has one setting, **Script**. It must define a function named `convert`:

```js
function convert(input, record) {
  if (input === undefined) {
    return undefined;
  }
  if (!record.isNotEmpty('color')) {
    return input;
  }
  return input + ' ' + record.get('color');
}
```

With `T-Shirt` as the input and `red` in the record's `color` attribute, it gives `T-Shirt red`; with `color` missing or empty, `T-Shirt`. With no input it gives **No output**, so an import leaves the field's stored value as it is. The example works on text: for a value per language, read one language first, as in `input.get('en-US')`.

A new node starts with a script that gives its input on unchanged: `function convert(input, record) { return input; }`.

### What `convert` receives

**`input`** is the value of the node's **first** input. Connect one input: further inputs are not passed to the script. To use another field as well, read it from `record`.

| The input | `input` is |
| --- | --- |
| Text | a string |
| A number | a number |
| A yes/no value | `true` or `false` |
| A date | a `Date` |
| A list | an array, whole — so `input.map(…)` and `input.filter(…)` work. An empty item in it is `null` |
| A value per language | an object; `input.get('en-US')` gives the text of one language |
| A measurement set | an object with one number per measurement, by its code: `input.height` |
| No output, or an empty value | `undefined` — the script can't tell the two apart |

**`record`** is the whole record the field belongs to:

| Call | Gives |
| --- | --- |
| `record.get('color')` | The value of the field `color`; `null` when it is an empty value, `""` when it is empty text, and `undefined` when the record doesn't have it |
| `record.has('color')` | `true` when the record has the field, even with an empty value |
| `record.isNotEmpty('color')` | `true` when the record has the field and it isn't empty |

A custom attribute is read by its attribute code, as in `record.get('color')`.

### What `convert` may return

| Return | The node gives |
| --- | --- |
| A string, a number, `true` or `false`, a `Date` | That value |
| A value per language that the script received, as `input` or from `record` | That value. A script can pass one on, but can't build one |
| An array of these | A list. An `undefined` item is left out; a `null` item is an **Empty value** in the list |
| `undefined`, or no `return` | **No output** — an import leaves the stored value unchanged |
| `null` | **Empty value** — an import clears the stored value |
| Any other object | An error: see [Couldn't use the script's result](#messages-about-a-failed-script) |

When a script has nothing to give, return `undefined` to keep what is stored, and `null` only to clear it on purpose. To check which one a script gives, [test the node in the Preview](/en/reference/pipeline-nodes.html#test-a-node-in-the-preview): give it **No output** as its input and read **Output**.

## Limits

Loading the script, and each call to `convert`, run within three limits:

| Limit | What reaches it |
| --- | --- |
| **150 ms** | The time the call takes, from start to finish. A busy server counts too, so a script close to the limit can fail one run and pass the next |
| **100 statements** | Each statement the script runs counts, including those inside a loop or a function: a `for` loop over 100 list items reaches it |
| **1 MB of memory** | Large arrays and long strings built while the call runs |

The limits are per value, not per run. Work that needs more than they allow — a long lookup table, a loop over every item of a long list — belongs in other nodes: **Replace text** maps values to values, and **Pick item from list** takes one item of a list.

## Messages about a failed script

When a script fails, the message says why. A run's log file shows it with the value it failed on.

| Message | What happened | What to do |
| --- | --- | --- |
| *Couldn't load the script. It has an error on line 3: ‹what the error is›. Fix the script and try again.* | The script can't be read — a syntax error, or an error in code outside any function | Fix the line it names |
| *Couldn't run the script. It has no function named convert(). Add one that returns the field's value.* | No function `convert` is defined, or it is spelled differently | Name the function `convert` |
| *Couldn't run the script. It stopped with an error on line 5: ‹the error's message›. Fix the script and try again.* | `convert` threw an error, or one was raised while it ran, such as reading a property of `undefined`. Without a line, the message reads *It stopped with an error: ‹message›.* | Fix the line it names. Check for `undefined` before using `input` or `record.get(…)` |
| *Couldn't run the script. It took longer than 150 ms. Make it do less per value, or try again later.* | The call reached the time limit | Make the script do less. If it is close to the limit, a later run may pass |
| *Couldn't run the script. It ran more than 100 statements. Make it do less per value.* | The call reached the statement limit | Loop over fewer items, or do the work in other nodes |
| *Couldn't run the script. It used more than 1 MB of memory. Make it do less per value.* | The call reached the memory limit | Build smaller arrays and strings |
| *Couldn't use the script's result. convert() returned a type a field can't hold. Return text, a number, true or false, a date, or a list of these.* | `convert` returned an object, or something else no field can hold | Return one of the types it names. In an import's log file, this one reads *This value couldn't be converted for this field. Check the value in the file and the field's mapping, and import again.* |
| *Couldn't run the script because of a problem on our side. Try again later, or contact support with reference ‹reference›.* | The fault is ours, not your script's | Run it again. If it happens again, contact support and quote the reference |

## When a script fails

**The field is left out of the record**, as for any node that can't build a value — see [when a node can't build a value](/en/reference/pipeline-nodes.html#when-a-node-cant-build-a-value). The nodes after the JavaScript node don't run, so a field is never built from what was left after a failed script.

The log file has an entry per value for a script that failed while it ran, with the message from the table above — and **one entry per field** for a script that couldn't be loaded, with the number of records it affected, such as *Affected 1200 records.* — the script failed the same way for every one of them.

How to open the log file is in [reading a log file](/en/troubleshooting/background-jobs.html#reading-a-log-file).

### In the Preview

The node's **Preview** runs the script on your test inputs, with the same limits, so a failing script shows there before it reaches an import or a feed. For a script that fails, **Output** reads *Couldn't preview the node. Try again, and contact support if it fails again.* — the reason is not shown there. To find it, read the script for the cases in the table above, or run the import or feed and read the message in its log file.

## Related articles

- [Field processing pipeline nodes](/en/reference/pipeline-nodes.html) — every node, No output and Empty value, and the Preview
- [Background jobs](/en/troubleshooting/background-jobs.html) — a run's steps and its log files
