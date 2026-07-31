---
id: features
title: Features
description: Capabilities of the Calendar Management App for Microsoft Teams.
sidebar_position: 1
---

# Features

Calendar Management App gives teams one governed place to request events, review them, and deliver calendar invitations. It replaces disconnected chat messages and spreadsheets with an auditable workflow inside Microsoft Teams.

## Teams integration

The application runs as a Teams tab, so members can open the dashboard from the same workspace where they collaborate. Teams identity establishes the signed-in user and determines the available actions.

## Calendar request management

Members submit an event title, date, start and end time, location or meeting link, description, and attendee list. Required fields and time ranges are validated before submission. Every request receives a stable identifier and enters the **Pending** state.

## Admin approval workflow

Admins review pending work in a dedicated queue. They can inspect all event details, approve a valid request, or reject it with a reason. Decisions are timestamped and associated with the reviewer. Approved requests continue automatically to invitation generation; rejected requests remain visible to the requester.

## Role-based access control

| Capability | Member | Admin |
| --- | :---: | :---: |
| Create a request | Yes | Yes |
| View own requests | Yes | Yes |
| View all requests | No | Yes |
| Approve or reject | No | Yes |
| Review delivery status | Own | All |

Authorization is enforced by the backend API. Hiding an admin control in the interface is never treated as a security boundary.

## Outlook ICS support

After approval, the backend generates an RFC 5545-compatible `.ics` file containing a unique event identifier, organizer, attendees, time zone-aware start and end values, location, and description. Email delivery attaches the file for Outlook desktop, Outlook on the web, and other compatible calendar clients.

## Request tracking dashboard

- **Pending**: awaiting an admin decision.
- **Approved**: accepted and queued for invitation delivery.
- **Rejected**: declined with a reviewer reason.
- **Sent**: the ICS invitation was accepted by the email provider.
- **Delivery failed**: sending failed and requires an admin retry.

Status, date, and requester filters help admins triage work while preserving the complete history.