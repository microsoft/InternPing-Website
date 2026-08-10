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

The current version is 1.2.0. It installs a Chat tab that sends event notifications alongside the calendar tab.

## 2. Upload it to Teams

1. Open **Apps** from the Teams app bar.
2. Select **Manage your apps** at the bottom left.
3. Select **Upload an app**, then choose **Upload a custom app** in the dialog.
4. Open the `internping.zip` file you downloaded.

**Submit an app** in the same dialog sends the package to your IT admin for org-wide approval. To use it just for yourself or your team, choose **Upload a custom app**.

![The Teams manage apps screen with the upload dialog showing the custom app upload and submit an app options](/img/installation/ko/00-upload-app.png)

*Choose Upload a custom app under Manage your apps → Upload an app.*

:::info[If you cannot see the upload option]
Custom app upload is blocked in your tenant. Ask your Teams administrator to allow custom app upload in the app setup policy.
:::

## 3. Add the app

Once the package is read, the InternPing app dialog opens.

1. Check the app name, the publisher (Microsoft Intern Team), and the description.
2. Select **Add**.

![The InternPing app details in Teams with the Add button and the personal app and tab capabilities](/img/installation/ko/01-1-add-app.png)

*Review the app details, then select Add.*

After it is added, Teams asks where you want to use the app.

- Select **Open** to run it right away as a personal tab.
- Or pick a channel or a chat in the search box below to add it there as a tab.

![The Teams dialog after the app is added, showing the Open button and the channel and chat pickers](/img/installation/ko/01-2-added.png)

*Open it as a personal tab, or add it as a tab in a channel or chat.*

## 4. Consent to the sign-in permissions

The first time you open the app, you go through a one-time consent flow. Events cannot load until you finish it.

1. Select **Continue** in the **Almost there!** dialog.
2. Confirm the work account you want to use in the Microsoft sign-in window.
3. Review the requested permissions (view your basic profile, maintain access to data you have given it access to) and select **Accept**.

![The InternPing tab showing the additional permissions notice and the Continue button](/img/installation/ko/02-consent-prompt.png)

*The additional permissions notice appears only on the first run.*

![The Microsoft consent screen requesting basic profile access and maintained data access](/img/installation/ko/03-permissions.png)

*Review the requested permissions, then select Accept.*

:::note[About the unverified label]
The consent screen shows `unverified` under the app name along with "This application is not published by Microsoft or your organization". That is expected: InternPing is an internal project app registered in Entra, not a marketplace listing. Confirm the app name is `intern-calendar-aad` before you continue.
:::

Even after you finish the consent, the tab can still show the error `Authorization: Bearer <token> 헤더가 필요합니다.` Select **···** at the top right of the tab and choose **Reload app**; the tab picks up the token again and the app opens normally.

<div className="image-row">

![The InternPing tab showing the error about a required Authorization Bearer token header](/img/installation/ko/04-auth-error.png)

![The tab overflow menu at the top right highlighting the Reload app command](/img/installation/ko/04-1-reload-app.png)

</div>

*When you see the error on the left, reload the app from **··· → Reload app**.*

If the same error remains after reloading, go through the consent flow again from the start.

## 5. Verify the installation

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
| `Authorization: Bearer <token> 헤더가 필요합니다.` error | It can appear even after you consented. Select **··· → Reload app** at the top right of the tab. If it persists, finish the consent flow with **Continue → Accept**. |
| The consent screen says unverified | Expected for an internal app that is not listed in the marketplace. Confirm the app name is `intern-calendar-aad`. |
| Sign-in works but no events appear | Confirm that your account belongs to the tenant where InternPing is deployed. |
| No approval controls | Approve, hold, and reject are only visible to admins. Ask an admin to change your role. |
| A new version is not applied | Remove the existing app and upload the latest package again. |

## If you want to build and deploy it yourself

Running InternPing on your own Azure subscription requires the source code. The application lives in the `intern-calendar/` folder of the [Microsoft_Intern_Project](https://github.com/kimsunki12/Microsoft_Intern_Project) repository. It is built with Node.js 24 and the Microsoft 365 Agents Toolkit (`atk`), and deployed to Azure App Service. The server layout and its constraints are described in [Architecture](./architecture.md).

The package on this page carries the tab URL and the Entra app ID of the hosted instance, so it cannot be used against another deployment. If you deploy your own, you also have to build your own package.
