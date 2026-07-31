---
id: installation
title: Installation Guide
description: Configure and deploy Calendar Management App for Microsoft Teams.
sidebar_position: 3
---

# Installation Guide

This guide covers a production-oriented deployment of the React tab, Express API, database, and email service before the application is uploaded to Microsoft Teams.

## Prerequisites

- Node.js 20 or later and npm 10 or later
- A Microsoft 365 developer or organizational tenant
- Permission to create an Entra ID app registration and upload a Teams app
- A managed database reachable from the backend
- An email provider capable of sending `.ics` attachments
- HTTPS endpoints for both the frontend and API

## 1. Install dependencies

Run `npm ci` in each application package to install the exact locked dependency graph. Use `npm install` only when intentionally updating dependencies and committing a new lockfile.

## 2. Register the application

Create an app registration in Microsoft Entra ID. Record its client ID and tenant ID, add the frontend origin as a single-page application redirect URI, and expose the backend API scope. Create `Admin` and `Member` app roles, then assign users or groups through the enterprise application.

## 3. Configure the runtime

Set runtime configuration through the deployment platform, never in source control:

```dotenv
NODE_ENV=production
PORT=3000
CLIENT_ORIGIN=https://calendar.example.org
ENTRA_TENANT_ID=your-tenant-id
ENTRA_CLIENT_ID=your-client-id
ENTRA_API_AUDIENCE=api://your-client-id
DATABASE_URL=your-managed-database-connection
EMAIL_FROM=calendar@example.org
EMAIL_PROVIDER_API_KEY=stored-in-secret-manager
```

Replace the example values with tenant-specific settings. Rotate any credential that has been committed or shared in plaintext.

## 4. Prepare and deploy

Run database migrations before serving traffic. The schema must cover users, role assignments, requests, decisions, ICS UIDs, and delivery attempts. Build and host the React assets over HTTPS. Deploy Express on Node.js 20 with health checks, structured logging, secret injection, and a CORS allowlist containing only the frontend origin.

## 5. Create the Teams package

1. In Teams Developer Portal, create an app and complete its descriptions, privacy URL, terms URL, and support contact.
2. Add a personal or team tab whose content URL points to the deployed frontend.
3. Add the frontend host to **Valid domains**.
4. Configure single sign-on with the Entra client ID and API resource URI.
5. Download the package and upload it to your tenant or submit it to the organizational catalog.

## 6. Verify the deployment

Sign in as a Member and submit a request. Confirm that an Admin can approve it, the requester sees every transition, the recipient receives exactly one ICS attachment, and Outlook displays the expected local time and attendees. Repeat with a rejection and a simulated provider failure.