---
id: user-guide
title: User Guide
description: Daily workflows for members and administrators.
sidebar_position: 4
---

# User Guide

Calendar Management App opens as a tab in Microsoft Teams. The interface adapts to the signed-in user's `Member` or `Admin` role.

## For members

### Submit a request

1. Open **Calendar Management** in Teams and select **New request**.
2. Enter a clear title and useful description.
3. Choose the event date, start time, end time, and time zone.
4. Add a physical location or Teams meeting link.
5. Add attendee email addresses and verify their spelling.
6. Select **Submit request**.

The request appears in **My requests** as Pending. Submission does not send an invitation; an admin must approve it first.

### Track or correct a request

Filter by status or search by event title. Open a request to see its details, submission time, status, and reviewer message. If rejected, read the reason, correct the information, and create a new request. The rejected record remains unchanged for audit history.

## For admins

### Review pending work

Open **Approval queue** and select the oldest pending request. Verify the organizer, attendees, time zone, duration, location, and description. Check for duplicate or conflicting events before deciding.

### Approve or reject

Select **Approve** to lock the reviewed details and begin ICS delivery. Monitor the request until it reaches Sent. Select **Reject** to provide an actionable reason, such as a missing attendee, invalid meeting link, or scheduling conflict.

## Status reference

| Status | Meaning | Next owner |
| --- | --- | --- |
| Pending | Submitted and awaiting review | Admin |
| Approved | Accepted; invitation generation is running | System |
| Rejected | Declined with a reviewer reason | Member |
| Sent | Email provider accepted the invitation | Recipient |
| Delivery failed | Invitation could not be sent | Admin |

Use titles recipients will recognize, verify time zones for distributed teams, and avoid sensitive information in calendar fields because invitations may be forwarded.