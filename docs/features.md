---
id: features
title: Features
description: Implemented capabilities of the Intern Calendar Teams application.
sidebar_position: 1
---

# Features

Intern Calendar is a Microsoft Teams tab for the Korea ABS STU team. It combines a shared calendar, an approval queue, role administration, Outlook data import, and standards-based calendar export in one React application.

## Month and week calendars

Users can switch between month and week views. Events are shown with their category, date or date range, optional time, assignees, and approval status. Dates are stored as local `YYYY-MM-DD` values so day placement remains stable in the team calendar.

## Event creation and editing

The event dialog supports:

- Title, description, and location
- Category: education, hackathon/customer, meeting, support, leave, or other
- Start and end dates
- Optional `HH:mm` start and end times
- One or more intern assignees

The API validates required values and checks approved events for assignee conflicts. Members create pending events; administrators create approved events immediately. Existing events can be edited or deleted through authorized API routes.

## Approval workflow

The administrator side panel lists events that need attention. An administrator can approve, put on hold, or reject an event and optionally record a reason. Each decision updates the event and creates an audit record.

| Status | Meaning |
| --- | --- |
| `pending` | Waiting for an administrator decision |
| `approved` | Confirmed on the team calendar |
| `on_hold` | Paused while details or availability are reviewed |
| `rejected` | Declined by an administrator |

## Three application roles

| Capability | Intern | Member | Admin |
| --- | :---: | :---: | :---: |
| View the shared calendar | Yes | Yes | Yes |
| Be assigned to an event | Yes | Yes | Yes |
| Create an event | Yes | Yes | Yes |
| Upload Outlook SQL events | Own calendar | No | API only; selected users |
| Approve, hold, or reject | No | No | Yes |
| Change user roles | No | No | Yes |

The Express API enforces administrative operations. The current role provider reads roles from SQLite and can later be replaced by another provider, such as Entra group mapping.

## User management

Administrators can review the seeded team roster and change user roles. The backend prevents an update that would remove the final administrator. User colors are stored with each profile and used for calendar avatars and visual identity.

## Outlook SQL import

The import workflow is shown in the UI to interns for their own calendar. The API also permits administrators to import for selected users, although the current admin interface does not expose an upload button. It accepts SQL `INSERT` statements exported from the previous Outlook-oriented data model. The parser reads the statements as data rather than executing the uploaded SQL, validates categories and statuses, and limits each upload to 4 MB and 1,000 events.

The preview groups events by title. Internal organizers are selected by default and external organizers are initially excluded. Events with the same ID are skipped; events with the same normalized title, dates, and times are merged by adding assignees instead of creating duplicate rows. A CLI migration script also supports dry-run and reset modes.

## ICS export

Each authenticated user can download an event as an iCalendar (`.ics`) file and open it in Outlook or another compatible calendar client. All-day events use date values; timed events are converted to UTC using `Asia/Seoul` by default. The file can include the title, description, location, status, organizer, and assignees.

The current application does **not** send email or automatically synchronize Outlook calendars. Export is a user-initiated download.

## Teams-hosted experience

The React SPA runs as a static Teams tab at `/tabs/home`. The Teams JavaScript SDK supplies host context and supports the production sign-in flow. Local development falls back to a clearly identified development mode with user switching when Entra configuration is absent.