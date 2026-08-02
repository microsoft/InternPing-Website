---
id: installation
title: Installation Guide
description: Build, run, configure, and package the Intern Calendar Teams tab.
sidebar_position: 3
---

# Installation Guide

The application source lives in the upstream repository's `intern-calendar/` directory. It builds a Vite React frontend and a bundled Node/Express backend.

## Prerequisites

- Node.js 24, required for the stable built-in `node:sqlite` `DatabaseSync` API
- npm and Git
- A Microsoft 365 tenant for Teams installation
- Microsoft 365 Agents Toolkit for provision, deploy, and publish workflows
- Permission to create or use an Entra app registration for production authentication
- An HTTPS host for production

## 1. Get the application

```powershell
git clone https://github.com/kimsunki12/Microsoft_Intern_Project.git
cd Microsoft_Intern_Project\intern-calendar
npm install
```

## 2. Build the frontend and server

```powershell
npm run build
```

The build uses Vite for the React tab and `tsup` for the Node backend.

## 3. Run locally

```powershell
$env:PORT = "3978"
node .
```

Open `http://localhost:3978/tabs/home`. When Entra variables are not set, the server starts in development authentication mode and the UI supports local user switching.

The first run creates the SQLite database and seeds the static Korea ABS STU team roster. By default, data is stored in `data/intern-calendar.db`.

## 4. Runtime configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3978` | Express server port |
| `ENTRA_TENANT_ID` | none | Entra tenant used to validate production tokens |
| `ENTRA_CLIENT_ID` | none | Entra application/client ID and token audience |
| `ENTRA_AUDIENCE` | client ID defaults | Accepted token audiences, separated by commas |
| `ENTRA_ALLOWED_TENANTS` | home tenant | Tenant IDs allowed to sign in, separated by commas |
| `ADMIN_EMAILS` | none | Email addresses that must always receive the admin role |
| `DB_FILE` | `data/intern-calendar.db` | SQLite database file |
| `DATA_DIR` | `./data` | Runtime data directory |
| `DEFAULT_ROLE` | `member` | Role assigned to a newly recognized user |
| `CALENDAR_IANA_TIME_ZONE` | `Asia/Seoul` | IANA time zone used for timed ICS exports |

Example production shell configuration:

```powershell
$env:PORT = "3978"
$env:ENTRA_TENANT_ID = "<tenant-id>"
$env:ENTRA_CLIENT_ID = "<application-id>"
$env:ADMIN_EMAILS = "admin@contoso.com"
$env:DB_FILE = "D:\intern-calendar-data\intern-calendar.db"
node .
```

Do not deploy with development authentication enabled. Protect the database directory and back it up outside the application process.

## 5. Provision the Teams app

The repository includes these deployment inputs:

- `appPackage/manifest.json`: Teams app and static tab definition
- `aad.manifest.json`: Entra application definition and exposed scope
- `m365agents.yml`: provision, deploy, and publish lifecycle
- `m365agents.local.yml`: local development overrides

For local Teams testing, configure `ADMIN_EMAILS` in `env/.env.local`, then run:

```powershell
atk auth login m365
atk provision --env local -i false
atk deploy --env local -i false
npm run dev:teamsfx
```

Sideload `appPackage/build/internping.zip` in Teams. The deployed host must serve the tab at `/tabs/home`, be listed as a valid domain in the Teams manifest, and use HTTPS.

For Azure, run `atk provision --env dev` followed by `atk deploy --env dev`. The included infrastructure creates a Linux B1 App Service using Node 24 LTS, HTTPS, Always On, one worker, and persistent storage at `/home/data`.

## 6. Import legacy Outlook data

Use the UI import dialog or the migration script to inspect an Outlook SQL export:

```powershell
node scripts/import-outlook-sql.mjs "C:\path\to\events.sql" --dry-run
node scripts/import-outlook-sql.mjs "C:\path\to\events.sql"
```

Add `--reset` only when previously imported data should be removed and recreated. The parser extracts supported `INSERT` values; it does not execute the uploaded SQL file directly. The in-app upload accepts up to 4 MB and 1,000 events per request.

## 7. Verify the deployment

1. Open the static tab in Teams and confirm Entra authentication succeeds.
2. Create an event as a member and verify that it is pending.
3. Approve, hold, and reject test events as an administrator.
4. Change a test user's role and verify that the final administrator cannot be removed.
5. Assign an intern to overlapping approved events and confirm the conflict warning.
6. Download an all-day and a timed ICS file and open both in Outlook.
7. Restart the service and verify that SQLite data persists.

The repository does not currently define an automated test command, so these runtime checks are important before tenant publication.