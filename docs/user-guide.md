---
id: user-guide
title: User Guide
description: Use the InternPing calendar, requests, approvals, Outlook upload, and export workflows.
sidebar_position: 4
---

# User Guide

InternPing is a Microsoft Teams tab for reviewing intern availability and managing assignment requests. Available actions depend on the signed-in user's role.

| Role | Main capabilities |
| --- | --- |
| Intern | Review personal assignments, upload Outlook events, and submit requests |
| Member | Review the calendar, submit requests, and edit owned requests before approval |
| Admin | Manage all events, make approval decisions, and manage user roles |

## 1. Review the calendar

The app opens in **Week** view by default. Each row represents an intern and each column represents a date, making open days and existing assignments easy to compare.

1. Use the previous and next controls to change the displayed period.
2. Select **Week** or **Month** view.
3. Use the status filters to show or hide approved, pending, on-hold, and rejected events.
4. Use the assignee filter to focus on one intern.
5. Select an event to review its title, period, location, organizer, assignees, and status.

At widths of 640px or less, the calendar grid changes to a date-based agenda. Event details open in a sheet from the bottom of the screen.

{/* SCREENSHOT: calendar-week-overview | Full week view and primary controls */}
{/* SCREENSHOT: calendar-month-and-mobile | Month view or mobile agenda */}

## 2. Submit an assignment request

1. Select **Assignment request** in the upper-right corner. Admins see **Create event** in the same location.
2. Enter the event title.
3. Add a description and location when needed.
4. Choose Education, Hackathon/Customer, Meeting, Support, Leave/Absence, or Other.
5. Set the start and end dates.
6. For a timed event, enter start and end times. Leave both fields empty for an all-day event.
7. Select at least one assignee.
8. Review the details and save the event.

Events created by non-admin users start as **Pending**. Events created by an admin are immediately **Approved**.

The app warns when an assignee already has an overlapping approved event. An all-day event conflicts with another event on an overlapping date. Two timed events conflict only when their time intervals overlap.

{/* SCREENSHOT: create-event-dialog | Complete assignment request form */}
{/* SCREENSHOT: event-conflict-warning | Overlapping assignment warning */}

## 3. Edit or delete an event

1. Select an event in the calendar.
2. Select **Edit** or **Delete** in the details panel.
3. When editing, update the fields and save the event.

Admins can edit or delete any event. A non-admin can edit an event only when they requested it and it has not been approved. An assignee can remove an imported Outlook event from their own calendar. If an imported event has multiple assignees, removing it as an assignee removes only that user from the event.

Changes are not pushed to other open sessions in real time. Change the displayed period or refresh the page when another user's update is not visible.

{/* SCREENSHOT: event-detail-actions | Edit and delete actions in event details */}

## 4. Review and decide requests

The right-side panel shows pending and on-hold events to admins.

1. Select the event to review.
2. Check its details and any existing approved assignments for the selected interns.
3. Enter an optional decision note.
4. Select one of the available decisions.

| Decision | Result |
| --- | --- |
| Approve | Confirms the event on the team calendar |
| Hold | Leaves the event waiting for additional details or coordination |
| Reject | Declines the request |

Creation, updates, decisions, and deletion are retained in the event history. A decision does not automatically send a Teams message or email.

{/* SCREENSHOT: admin-approval-queue | Admin approval queue */}
{/* SCREENSHOT: admin-decision-history | Decision controls and event history */}

## 5. Upload Outlook events

The **Upload schedule** action is currently shown to interns. An intern's upload is always assigned to that intern. The server API also supports admin uploads for selected assignees, but the current admin interface does not expose an upload button.

1. Select the prepared Outlook `.sql` file.
2. Review the number of detected events and the title-grouped preview.
3. Check the default selection. Events organized by registered team members are selected, while externally organized events are initially excluded.
4. Clear titles that should not be imported or reselect required external events.
5. Start the upload and review the created, merged, duplicate, malformed, and rejected counts.

Each upload is limited to 4 MB and 1,000 events. If an event with the same normalized title, dates, and times already exists, InternPing adds missing assignees instead of creating another row. Uploaded SQL is never executed; the server extracts values only from supported `INSERT INTO events` statements and validates them before saving.

:::warning The `requested_by` field
Use the Outlook organizer's name or email in `requested_by`. A user GUID copied from another database cannot be matched to an InternPing user.
:::

{/* SCREENSHOT: outlook-upload-select | SQL file selected */}
{/* SCREENSHOT: outlook-upload-preview | Title selection and import result */}

## 6. Add an event to Outlook

1. Select the event in the calendar.
2. Select **Add to Outlook (.ics)** in the details panel.
3. Open the downloaded `.ics` file.
4. Confirm the destination calendar in Outlook and save the event.

The ICS file includes available title, description, location, status, organizer, and assignee details. This is a manual file export, not automatic or two-way Outlook synchronization.

{/* SCREENSHOT: event-ics-download | ICS action in event details */}
{/* SCREENSHOT: outlook-save-ics | ICS event opened in Outlook */}

## 7. Manage user roles

1. Sign in as an admin and open **User management**.
2. Choose Admin, Member, or Intern for the target user.
3. Confirm that the updated role is displayed.

The final admin cannot be demoted because the team would lose its approval capability. Accounts listed in the `ADMIN_EMAILS` environment variable also cannot have their admin role removed in the app.

{/* SCREENSHOT: user-role-management | User management and role selector */}

## Status reference

| Status | Meaning | Next action |
| --- | --- | --- |
| Pending | An admin has not made a decision | Wait for an admin review |
| Approved | The assignment is confirmed | Use it as the team schedule or export it to Outlook |
| On hold | Details or availability require coordination | Confirm the required information with an admin |
| Rejected | The request was declined | Review the decision note and submit a replacement if needed |

## Troubleshooting

- **An event is missing:** Check the current period, status filters, and assignee filter.
- **The Edit action is missing:** Non-admin users cannot edit an approved event.
- **The upload action is missing:** The current interface displays Outlook SQL upload only for intern accounts.
- **The event did not appear automatically in Outlook:** Open the downloaded ICS file and save it manually.
- **Another user's update is not visible:** Refresh the page because the app has no real-time synchronization.
- **A user switcher appears in the header:** The server is running without Entra configuration in unauthenticated development mode. Do not use that mode in a hosted deployment.