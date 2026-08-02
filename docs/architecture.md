---
id: architecture
title: Architecture
description: Runtime components, data model, authentication, and event flows.
sidebar_position: 2
---

# Architecture

Intern Calendar is a single Node.js application that serves a React Teams tab and an Express JSON API. Shared TypeScript types keep the browser and server contracts aligned, while SQLite provides local persistence.

```mermaid
flowchart LR
    U[Teams user] --> T[Microsoft Teams tab]
    T --> R[React + Vite SPA]
    R -->|Bearer token + JSON| A[Express API]
    A --> J[Entra JWT verification]
    J --> P[Role provider]
    A --> S[(SQLite in WAL mode)]
    A --> C[Conflict and approval logic]
    A --> I[ICS generator]
    O[Outlook SQL export] --> X[Validated SQL parser]
    X --> A
    I --> D[ICS download]
    D --> OC[Outlook or calendar client]
```

## Runtime components

| Component | Implementation | Responsibility |
| --- | --- | --- |
| Teams host | Teams static tab and `@microsoft/teams-js` | Loads `/tabs/home`, supplies host context, and participates in authentication |
| Frontend | React, TypeScript, Vite | Month/week views, event dialogs, approval side panel, import, role management, and messages |
| Application host | `@microsoft/teams.apps` with `ExpressAdapter` | Starts the Node server and integrates Teams development tooling |
| API | Express route handlers | Authentication, authorization, validation, event transitions, and JSON contracts |
| Persistence | Node.js 24 `DatabaseSync` SQLite | Users, events, assignees, and audit logs |
| Shared domain | TypeScript types and date utilities | Roles, statuses, categories, request types, and local-date handling |
| Calendar export | Server-side ICS generator | Produces all-day or timed iCalendar downloads |

## Frontend composition

`App.tsx` owns the main React state and coordinates these views:

- `MonthCalendar` and `WeekGrid` for calendar navigation
- `EventDialog` for create and edit operations
- `SidePanel` for the administrator approval queue
- `UserManagement` for role changes
- `ImportDialog` for Outlook SQL migration
- `MessageBar` for operation feedback

The browser API client uses `fetch` and refreshes local state after mutations. There is no WebSocket or offline synchronization layer.

## API surface

All routes require authentication in Entra mode, including the ICS download.

| Method and route | Purpose |
| --- | --- |
| `GET /api/me` | Return the current user, authentication mode, and role-editing capability |
| `GET /api/users` | List the team roster |
| `PATCH /api/users/:id` | Change a user role as an administrator |
| `GET /api/events?from=&to=` | List events that overlap a date range |
| `GET /api/events/:id/history` | Return an event's audit history |
| `GET /api/events/:id/ics` | Download an authenticated event as `.ics` |
| `POST /api/events` | Validate and create an event |
| `POST /api/events/import` | Parse and import an Outlook SQL export |
| `PATCH /api/events/:id` | Update an authorized event |
| `POST /api/events/:id/decision` | Approve, hold, or reject an event as an administrator |
| `DELETE /api/events/:id` | Delete an authorized event |

## Data model

SQLite is stored in `data/intern-calendar.db` by default and uses write-ahead logging. The schema contains:

- `users`: identity, email, display name, role, and UI color
- `events`: content, category, local dates/times, status, requester, and organizer data
- `event_assignees`: many-to-many event assignments
- `audit_logs`: creation, update, decision, deletion, and role-change history

Prepared statements bind all database values. SQLite is appropriate for the current small team deployment, but its single-writer model and local file storage require deliberate backup and scaling plans.

## Authentication and authorization

Production mode is selected when both `ENTRA_TENANT_ID` and `ENTRA_CLIENT_ID` are configured. The API verifies bearer JWT signatures with Entra's remote JWKS and checks audience, issuer, tenant allowlist, the `tid` claim, and the presence of delegated scopes. Application-only tokens without `scp` are rejected. The database-backed role provider resolves the application role.

Without those variables, the server enters development mode and allows local identity switching. Development mode must not be exposed as a production deployment.

## Event lifecycle

```mermaid
stateDiagram-v2
    [*] --> Pending: Member creates event
    [*] --> Approved: Admin creates event
    Pending --> Approved: Admin approves
    Pending --> OnHold: Admin holds
    OnHold --> Approved: Admin approves
    Pending --> Rejected: Admin rejects
    OnHold --> Rejected: Admin rejects
    Approved --> ICS: User downloads event
```

1. The frontend validates the form and posts an `EventInput` payload.
2. The API verifies identity, resolves the database-backed role, and validates dates, times, and assignees.
3. Conflict detection checks whether selected assignees already have overlapping approved events.
4. SQLite stores the event as pending for members or approved for administrators.
5. Administrator decisions update status and append decision/audit data.
6. A user can request the event's ICS representation and import the downloaded file into Outlook.

## Operational boundaries

- The application is single-tenant and uses a static Korea ABS STU roster.
- Calendar dates assume a shared local timezone; recurring events are not implemented.
- ICS download requires the same bearer authentication as other API requests.
- There is no automatic email, Graph calendar synchronization, rate limiting, or real-time refresh.
- WAL improves SQLite concurrency but does not provide replication or automatic backup.