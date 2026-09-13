---
title: "Background jobs"
sidebar:
  order: 1
---
Here you'll find a list of running and finished background jobs with results.

Depending on the size of your product catalog, some tasks may take some time to complete. This includes import, export or update operations. For this reason, we run those tasks in the background and it's safe to close your browser or shut down your PC.

## Job results

Each run ends with a summary log that includes a high-level overview of what was done. If there are any problems, you'll find additional information in the attached log files.

## How long runs are kept

A run whose files have already been removed is expected, not a fault — the run record
and the files it read are cleared separately.

| What | How long it is kept |
|---|---|
| The run and its logs | 30 days |
| The import files the run read | 30 days, or the most recent 5,000 imports — whichever comes first |

After that the run no longer appears in the list, and its files can no longer be
downloaded or used to start the run again. Because the two clean-ups run on their own
schedules, a run's files can go a few hours before the run itself does.

Files you dropped on the [hosted FTP server](/en/import/ftp-pull.html) are kept there under
their own rule, which that page states.
