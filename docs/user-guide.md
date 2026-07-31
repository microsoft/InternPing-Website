---
id: user-guide
title: User Guide
description: Calendar, event, approval, import, export, and role workflows.
sidebar_position: 4
---

# User Guide

Intern Calendar opens as a Microsoft Teams static tab. The interface displays a shared team calendar and exposes actions according to the signed-in user's `intern`, `member`, or `admin` role.

## Navigate the calendar

Use the view selector to switch between the month grid and the seven-day week grid. Move to the previous or next period with the calendar navigation controls. Event colors and labels communicate category and approval status.

Open an event to inspect its title, description, location, date range, optional time, requester, organizer, assignees, and current status.

## Create an event

Members and administrators can create events.

1. Select the create-event action.
2. Enter a title and, when useful, a description and location.
3. Choose a category.
4. Set the start and end dates.
5. Add start and end times for a timed event, or leave them empty for an all-day event.
6. Select the interns assigned to the event.
7. Review conflict warnings and submit.

A member's event starts as **Pending**. An administrator's event starts as **Approved**. Conflict warnings identify assignees who already have an overlapping approved event; they do not automatically resolve the overlap.

## Edit or delete an event

Open an event and choose the available edit or delete action. The API applies role checks in addition to the controls shown in the interface. After a successful change, refresh or reload calendar data if another session does not yet show the update; the app does not use real-time push updates.

## Administrator approval queue

Administrators can open the side panel to review pending and held events.

- **Approve** confirms the event.
- **Hold** pauses the event while information or availability is checked.
- **Reject** declines the event.
- A reason can be recorded with a decision.

Decisions are stored with the event workflow and audit data. Approval does not send an email or write directly to Outlook.

## Manage user roles

Administrators can open user management, select a roster member, and assign `intern`, `member`, or `admin`. The server rejects a change that would leave the application without an administrator.

## Import Outlook SQL data

The import dialog is intended for migration from the project's earlier Outlook-oriented schema.

1. Select the SQL export file.
2. Review the parsed event preview and validation messages.
3. Confirm the import.
4. Review the resulting calendar for duplicates and unsupported source values.

The importer parses supported `INSERT` statements as text and maps them to the current categories and statuses. It does not run arbitrary uploaded SQL against SQLite.

## Export an event to Outlook

Open an event and download its `.ics` file. Open the file in Outlook or another iCalendar-compatible client and save it to the desired calendar.

- All-day events export date-only start and end properties.
- Timed events export UTC timestamps generated from the stored wall-clock values.
- Title, description, location, and organizer are included when available.

ICS export is manual. There is no automatic email delivery or two-way Outlook synchronization.

## Status reference

| Status | User action |
| --- | --- |
| Pending | Wait for an administrator decision |
| Approved | Treat the event as confirmed; export it when an Outlook copy is needed |
| On hold | Review missing details or schedule conflicts with an administrator |
| Rejected | Read the decision reason and create or edit an appropriate replacement |

## Local development mode

When Entra configuration is absent, the app displays development identity controls. Use them only on a local machine. A hosted deployment must configure Entra token validation and must never expose development mode to untrusted users.