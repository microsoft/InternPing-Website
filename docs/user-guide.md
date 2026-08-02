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

## Workflow at a glance

Use one workspace to review availability, filter schedules, create assignments, export events to Outlook, and manage existing schedules.

![Annotated overview of the complete InternPing workflow, including calendar views, filters, assignment creation, Outlook export, and event management](/img/user-guide/en/06-workflow.png)

*The complete workflow from calendar review to schedule management.*

## 1. Review the calendar

The app opens in **Week** view by default. Each row represents an intern and each column represents a date, making open days and existing assignments easy to compare.

1. Use the previous and next controls to change the displayed period.
2. Select **Week** or **Month** view.
3. Use the status filters to show or hide approved, pending, on-hold, and rejected events.
4. Use the assignee filter to focus on one intern.
5. Select an event to review its title, period, location, organizer, assignees, and status.

At widths of 640px or less, the calendar grid changes to a date-based agenda. Event details open in a sheet from the bottom of the screen.

![Annotated overview of the InternPing main screen showing the calendar, filters, pending requests, event details, upload action, and assignment request action](/img/user-guide/en/00-overview.png)

*Main screen: calendar, filtering controls, pending requests, and event details.*

### Filter by status

Select one or more status buttons to limit the calendar to approved, pending, on-hold, or rejected schedules. Select an active status again to remove it from the filter.

![Annotated InternPing week view highlighting the approved, pending, on-hold, and rejected status filters](/img/user-guide/en/02-1-filter-status.png)

*Status filters narrow the calendar to the selected workflow states.*

### Filter by intern

Open the intern selector and choose either all interns or one person. The calendar updates to show only schedules assigned to that selection.

![Annotated InternPing week view highlighting the intern filter dropdown](/img/user-guide/en/02-2-filter-intern.png)

*The intern filter focuses the calendar on one assignee.*

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

![Annotated InternPing assignment form showing the title, category, location, dates, times, assignees, request reason, and submit action](/img/user-guide/en/01-add-schedule.png)

*Complete the assignment details, select the target interns, and submit the request.*

{/* SCREENSHOT: event-conflict-warning | Overlapping assignment warning */}

## 3. Edit or delete an event

1. Select an event in the calendar.
2. Select **Edit** or **Delete** in the details panel.
3. When editing, update the fields and save the event.

Admins can edit or delete any event. A non-admin can edit an event only when they requested it and it has not been approved. An assignee can remove an imported Outlook event from their own calendar. If an imported event has multiple assignees, removing it as an assignee removes only that user from the event.

Changes are not pushed to other open sessions in real time. Change the displayed period or refresh the page when another user's update is not visible.

### Delete a schedule

Select the schedule, review the right-side details, and use the trash icon. The server applies the ownership and role rules described above before deleting the event or removing the current assignee.

![Annotated InternPing schedule details highlighting the selected event and trash icon](/img/user-guide/en/03-delete-schedule.png)

*The trash icon appears in the selected schedule's detail panel when deletion is allowed.*

### Edit a schedule

Select an editable schedule from the calendar or pending list, then use the pencil icon in the detail panel to reopen the event form.

![Annotated InternPing schedule details highlighting a pending event and the pencil icon](/img/user-guide/en/04-edit-schedule.png)

*The pencil icon opens the selected schedule for editing when the user has permission.*

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

![Annotated InternPing schedule details highlighting the Add to Outlook ICS download action](/img/user-guide/en/05-add-to-outlook.png)

*Select Add to Outlook to download the selected event as an ICS file.*

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