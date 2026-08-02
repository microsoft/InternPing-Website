---
id: installation
title: Install
description: How to download the InternPing package and sideload it into Microsoft Teams.
sidebar_position: 3
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Install

InternPing is installed by uploading a Teams app package (`.zip`). The package connects to the InternPing server that is already deployed, so you do not need to set up a server yourself.

## Before you start

- Microsoft Teams desktop app or a web browser
- A work or school Microsoft 365 account
- Permission to upload custom apps in Teams

## 1. Download the package

<a className="download-cta" href={useBaseUrl('/download/internping.zip')} download>Download the InternPing package (.zip)</a>

The current version is 1.0.0.

## 2. Upload it to Teams

1. Open **Apps** from the Teams app bar.
2. Select **Manage your apps → Upload an app → Upload a custom app**.
3. Open the `internping.zip` file you downloaded.
4. Select **Add** to open it as a personal tab, or add it to a team or a chat.

:::info If you cannot see the upload option
Custom app upload is blocked in your tenant. Ask your Teams administrator to allow custom app upload in the app setup policy.
:::

## 3. Verify the installation

1. Check that your name and role appear in the InternPing tab.
2. Create an assignment request and confirm that it is saved as pending approval.
3. Confirm that a conflict notice appears when the dates overlap a confirmed event.
4. Download a confirmed event as ICS and open it in Outlook.
5. Check the event list and the detail panel on a phone or a narrow window.

## Common problems

| Symptom | What to check |
| --- | --- |
| No upload option in Teams | Check the custom app upload policy in Teams. |
| The tab opens as a blank screen | Restart Teams and confirm that you signed in with your work account. |
| Sign-in works but no events appear | Confirm that your account belongs to the tenant where InternPing is deployed. |
| No approval controls | Approve, hold, and reject are only visible to admins. Ask an admin to change your role. |
| A new version is not applied | Remove the existing app and upload the latest package again. |

## If you want to build and deploy it yourself

Running InternPing on your own Azure subscription requires the source code. The application lives in the `intern-calendar/` folder of the [Microsoft_Intern_Project](https://github.com/kimsunki12/Microsoft_Intern_Project) repository. It is built with Node.js 24 and the Microsoft 365 Agents Toolkit (`atk`), and deployed to Azure App Service. The server layout and its constraints are described in [Architecture](./architecture.md).

The package on this page carries the tab URL and the Entra app ID of the hosted instance, so it cannot be used against another deployment. If you deploy your own, you also have to build your own package.
