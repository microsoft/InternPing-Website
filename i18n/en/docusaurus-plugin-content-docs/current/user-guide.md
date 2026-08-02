---
id: user-guide
title: User guide
description: How to use the InternPing calendar, assignment requests, approvals, Outlook upload, and export.
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# User guide

InternPing is a tab app that lives inside Microsoft Teams, where you check intern schedules and manage assignment requests. This page covers what you actually do on the screen. For the full list of capabilities and the per-role permission table, see [Features](./features.md#what-each-role-can-do).

Pick the environment you are using. The selected tab is kept in the page URL, so you can share the PC or mobile version of this guide with someone else.

<Tabs className="guide-platform-tabs" groupId="guide-platform" queryString="platform">
<TabItem value="pc" label="PC" default>

## Look around the main screen

The app opens on the **week view**. Each row is an intern and each column is a date, which makes it easy to compare open days against existing assignments.

1. Move the displayed period with the previous and next buttons.
2. Switch between the **week** and **month** views.
3. Show or hide confirmed, pending, on hold, and rejected events with the status filter.
4. Narrow the calendar to one intern with the people filter.
5. Select an event to see its title, period, location, organizer, assignees, and state.

On narrow screens, a per-date list replaces the calendar grid. Event details open in a sliding panel.

![The InternPing main screen showing the calendar, filters, pending list, event details, and the upload and request buttons](/img/user-guide/ko/00-overview.png)

*The main screen holds the calendar, the filters, the pending list, and the event details.*

## Add an event

1. Select **Request assignment**. Admins see **Create event** instead.
2. Enter the event title.
3. Add a description and a location if you need them.
4. Pick a category: training, hackathon/customer, meeting, work support, leave/absence, or other.
5. Set the start and end dates.
6. For a timed event, enter the start and end times; for an all-day event, leave both empty.
7. Select one or more assignees.
8. Review the details and save.

Events created by a regular user are saved as **pending approval**. Events created by an admin are **confirmed** right away.

If an assignee already has an overlapping confirmed event, a conflict notice appears. For how conflicts are decided, see [Double-booking checks](./features.md#double-booking-checks).

![The InternPing request dialog with title, category, location, dates, times, assignees, reason, and the submit button](/img/user-guide/ko/01-add-schedule.png)

*Fill in the assignment details, choose the assignees, and submit the request.*

{/* SCREENSHOT: event-conflict-warning */}

## Filter events

You can narrow the calendar by decision state and by person. The two filters apply together.

### Filter by status

Select one or more status buttons to see only confirmed, pending, on hold, or rejected events. Selecting an active status again removes it from the filter.

![The InternPing week view highlighting the confirmed, pending, on hold, and rejected status filters](/img/user-guide/ko/02-1-filter-status.png)

*Use the status filter to see only the events in the state you care about.*

### Filter by intern

Open the intern picker and choose everyone or a single person. The calendar then shows only that person's events.

![The InternPing week view highlighting the intern picker filter](/img/user-guide/ko/02-2-filter-intern.png)

*Use the intern filter to focus on one person's schedule.*

{/* SCREENSHOT: calendar-month-and-mobile */}

## Manage events

Admins can edit or delete any event. Regular users can only edit their own requests that are not confirmed yet. Assignees of an event imported from Outlook can remove themselves. On an event with several assignees, only the current user is removed.

Changes are not pushed to screens other people already have open. If you do not see someone else's change, move the displayed period or refresh the page.

### Delete an event

Select the event, review its details, and use the trash icon. The server checks your role and the ownership of the event, then either deletes the whole event or only removes you as an assignee.

![The InternPing screen highlighting a selected event and the trash icon in the detail panel](/img/user-guide/ko/03-delete-schedule.png)

*The trash icon appears in the detail panel when you have permission to delete.*

### Edit an event

Select an editable event in the calendar or in the pending list, then use the pencil icon in the detail panel to reopen the dialog.

![The InternPing screen highlighting a pending event and the pencil icon in the detail panel](/img/user-guide/ko/04-edit-schedule.png)

*The pencil icon reopens the event dialog when you have permission to edit.*

## More things you can do

### Review and approve events

The review panel on the admin screen lists pending and on-hold events.

1. Select the event you want to review.
2. Check the event details and the assignees' existing confirmed events.
3. Enter a reason if one is needed.
4. Choose approve, hold, or reject.

| Decision | Result |
| --- | --- |
| Approve | The event becomes a confirmed entry on the team calendar. |
| Hold | The event stays open while you wait for more information or coordination. |
| Reject | The assignment request is turned down. |

Requests, edits, approvals, holds, rejections, and deletions are all kept in the event history. Decisions are not sent out automatically as Teams messages or email.

{/* SCREENSHOT: admin-approval-queue */}
{/* SCREENSHOT: admin-decision-history */}

### Upload Outlook events

On the current screens the **Upload events** button is shown to interns. Events uploaded by an intern are always assigned to that intern. The server API also supports uploading on behalf of a person chosen by an admin, but there is no upload button on the admin screens today.

1. Select the Outlook `.sql` file you prepared.
2. Check the number of events found and the preview by title.
3. Review the default selection. Events organized by a registered team member are selected; externally organized events start out excluded.
4. Clear the titles you do not want, or re-select the external events you do want.
5. Run the upload and check how many entries were created, merged, duplicated, malformed, or excluded.

A single upload handles up to 4MB or 1,000 entries. For the merge rules and how the SQL is handled, see [Outlook SQL event upload](./features.md#outlook-sql-event-upload).

:::warning The `requested_by` field
Use the Outlook organizer's name or email in `requested_by`. A user GUID copied from another database cannot be matched to an InternPing user.
:::

{/* SCREENSHOT: outlook-upload-select */}
{/* SCREENSHOT: outlook-upload-preview */}

## Add an event to Outlook

1. Select an event in the calendar.
2. Select **Add to Outlook (.ics)** in the detail panel.
3. Open the `.ics` file you downloaded.
4. Confirm which calendar to save it to, then save.

This is a manual file export, not automatic or two-way Outlook sync. For what the file contains and how time zones are handled, see [ICS export for Outlook](./features.md#ics-export-for-outlook).

![The InternPing screen highlighting the Add to Outlook button in the event detail panel](/img/user-guide/ko/05-add-to-outlook.png)

*Add to Outlook downloads the current event as an ICS file.*

{/* SCREENSHOT: outlook-save-ics */}

## The whole flow

From a single screen you can check intern schedules, filter them, request an assignment, add it to Outlook, and manage existing events.

![The full InternPing flow covering calendar review, filtering, event creation, Outlook export, and event management](/img/user-guide/ko/06-workflow.png)

*The full path from reviewing the calendar to managing events.*

## Manage user roles

1. Open **User management** with an admin account.
2. Assign the admin, member, or intern role to a user.
3. Confirm that the new role is shown.

The last remaining admin and the accounts listed in `ADMIN_EMAILS` cannot lose admin rights from the app screens.

{/* SCREENSHOT: user-role-management */}

## What the states mean

| State | Meaning | What to do next |
| --- | --- | --- |
| Pending | An admin has not decided yet | Wait for the admin review. |
| Confirmed | The assignment is approved | Use it as a team event or export it to Outlook. |
| On hold | More information or coordination is needed | Check with the admin about what is missing. |
| Rejected | The assignment request was turned down | Read the reason and request again if needed. |

## Troubleshooting

- **No events are shown:** check the displayed period, the status filter, and the people filter.
- **No edit button:** regular users cannot edit confirmed events.
- **No upload button:** on the current screens, Outlook SQL upload is only shown to intern accounts.
- **Nothing appears in Outlook:** open the downloaded ICS file and save it into Outlook yourself.
- **Someone else's change is missing:** there is no live sync, so refresh the page.
- **A user switcher appears:** that is the unauthenticated development mode used when Entra is not configured. It must not be used on a production server.

</TabItem>
<TabItem value="mobile" label="Mobile">

## Look around the main screen \{#mobile-overview}

On mobile, per-date event cards replace the wide calendar grid.

1. Move between weeks with the previous and next buttons.
2. Tap **Today** to return to the current week.
3. Select one or more status filters.
4. Choose everyone or a single intern in the people filter.
5. Tap an event card to open the sliding detail panel.

![The InternPing mobile main screen showing the week's events, status filters, the pending count, and the request button](/img/user-guide/ko/mobile/00-overview.png)

*The mobile main screen puts the week's events and the main controls in one place.*

## Add an event \{#mobile-add-schedule}

1. Tap **+ Request assignment**.
2. Enter the title, plus a description and location if needed.
3. Set the category, the start and end dates, and times if the event is timed.
4. Select one or more assignees.
5. Review the details and submit.

Requests from regular users are saved as **pending approval**, and events created by an admin are **confirmed** immediately. Conflict warnings use the same rules as on PC.

![How to fill in an assignment request on InternPing mobile](/img/user-guide/ko/mobile/01-add-schedule.png)

*Fill in the dialog in order, then submit the request.*

## Filter events \{#mobile-filter}

You can narrow the list by decision state and by person.

### Filter by status \{#mobile-filter-status}

Tap **Confirmed**, **Pending**, **On hold**, or **Rejected** to include or exclude that state. Several states can be active at once.

![The status filter on InternPing mobile](/img/user-guide/ko/mobile/02-1-filter-status.png)

*Use the status buttons to show only the events in the state you need.*

### Filter by intern \{#mobile-filter-intern}

Open the intern picker and choose everyone or a single person. The event list updates immediately.

![The intern filter on InternPing mobile](/img/user-guide/ko/mobile/02-2-filter-intern.png)

*Use the people filter when you want one intern's schedule.*

## Manage events \{#mobile-manage}

Tapping an event card opens the detail panel. Which actions are available depends on your role, the ownership of the event, and its state.

### Delete an event \{#mobile-delete-schedule}

Tap the trash icon in the detail panel and confirm. For an imported Outlook event with several assignees, the permission rules may remove only you rather than the whole event.

![How to delete an event on InternPing mobile](/img/user-guide/ko/mobile/03-delete-schedule.png)

*The trash icon only appears in the detail panel when you have permission to delete.*

### Edit an event \{#mobile-edit-schedule}

Tap the pencil icon in the detail panel, change the details, and save. Regular users can only edit their own requests that are not confirmed yet.

![How to edit an event on InternPing mobile](/img/user-guide/ko/mobile/04-edit-schedule.png)

*The pencil icon reopens the dialog for an editable event.*

## More things you can do \{#mobile-extra}

### Review and approve events \{#mobile-approval}

Admins can use the pending count to find requests that need a decision. Open a pending or on-hold event, check the details and the assignees, then approve, hold, or reject it. The history and the permission rules are the same as on PC.

### Upload Outlook events \{#mobile-outlook-upload}

Interns can tap the upload icon and pick an Outlook `.sql` file stored on the device. Review the titles found and their selection state before importing. The 4MB and 1,000-entry limits also apply on mobile.

## Add an event to Outlook \{#mobile-add-to-outlook}

1. Tap an event card.
2. Tap **Add to Outlook (.ics)** in the detail panel.
3. Open the downloaded file with Outlook.
4. Confirm which calendar to save it to, then save.

![How to add an event to Outlook on InternPing mobile](/img/user-guide/ko/mobile/05-add-to-outlook.png)

*This downloads an ICS file; it does not sync two ways with Outlook.*

## The whole flow \{#mobile-workflow}

Open InternPing in Microsoft Teams mobile to check the week's events, filter them, request an assignment, and manage the event you selected.

![An overview of the full InternPing flow on mobile](/img/user-guide/ko/mobile/06-workflow.png)

*The full mobile path from reviewing events to managing them in detail.*

## What the states mean \{#mobile-status}

| State | Meaning | What to do next |
| --- | --- | --- |
| Pending | An admin has not decided yet | Wait for the admin review. |
| Confirmed | The assignment is approved | Use it as a team event or export it to Outlook. |
| On hold | More information or coordination is needed | Check with the admin about what is missing. |
| Rejected | The assignment request was turned down | Read the reason and request again if needed. |

## Troubleshooting \{#mobile-troubleshooting}

- **No events are shown:** check the week you are on, the active status filters, and the people filter.
- **The detail panel does not open:** tap the event card itself and make sure the Teams tab has finished loading.
- **Edit or delete is missing:** the event state, its ownership, or your current role does not allow that action.
- **No upload icon:** on the current screens, Outlook SQL upload is only shown to intern accounts.
- **The ICS file does not open:** choose Outlook in your device's share or open-with menu.
- **A recent change is missing:** there is no live sync, so refresh the Teams tab.

</TabItem>
</Tabs>
