---
title: "User management"
description: "Invite or add users to your organization, verify an email domain, and require two-factor authentication."
sidebar:
  order: 2
---

You add users to your organization in [Organization settings](/en/organization-settings.html):
invite anyone by email, or add them at once when your organization has verified
their [email domain](#email-domains). You can also
[require two-factor authentication](#require-two-factor-authentication) for every user.

## Users

Each user is one person who signs in to heavendata, and can belong to more than one
organization. Select a user under **Team** > **Users** to give them permissions on
your accounts, directly or through a user group, or to make them an
**Organization administrator**.

What else you can do with a user depends on how they joined:

| The user | You can |
| --- | --- |
| Joined by invitation, or already had a heavendata login | Change their permissions, and remove them from your organization with **Remove from organization**. You can't edit their profile or delete them, even after you verify their email domain. |
| Was added in one of your verified email domains | Change their permissions, edit their profile with **Edit user profile**, and delete them with **Delete user**. Their email address can't be changed. The **Managed** column of the users list marks them. |

## Adding users

1. [Open Organization settings](/en/organization-settings.html#open-organization-settings).
2. In the menu bar, select **Team** > **Users**.
3. Select **New user** at the top right. The **Invited Users** page, under **Team** >
   **Pending Invitations**, has the same button.
4. Enter the user's **Email**, **Given name** and **Family name**.
5. Select the button at the bottom of the page. What it reads depends on the address:

| The address ends in | The button reads | What happens |
| --- | --- | --- |
| A domain your organization hasn't verified | **Invite user** | We email the user an invitation to join your organization. You can add a message of your own to it first. You then see **Invited Users**, which lists your organization's invitations and whether each was accepted or declined. Once the user accepts, they're on the users list. |
| One of your verified email domains | **Add user** | You can also set the user's **User interface language** and **Preferred language**. The user is added at once, without an invitation, and we send them no email — so tell them yourself. They sign in for the first time through **Forgot your password?** on the sign-in page. If the address already has a heavendata login, that user is only added to your organization, as an accepted invitation would add them. |

**Cancel**, or the Back button at the top of the page, asks before it discards what
you typed.

## Email domains

Verify an email domain — the part of an address after the *@*, such as
`example.com` — to add users whose addresses end in it without an invitation, and
to fully manage the users you add that way. Without one, you can still invite any
user and give them permissions on your accounts.

To verify the domain, you need access to its web server or to its DNS
configuration. If you're not familiar with either, ask your system administrator.

1. [Open Organization settings](/en/organization-settings.html#open-organization-settings).
2. In the menu bar, select **Settings** > **Domains**.
3. Select **New email domain**.
4. Enter the **Domain name**, such as `example.com`, without `http://` or anything else.
5. Select **Add email domain**.
6. Prove that your organization owns the domain in one of the two ways the next page
   shows:
   - add the TXT record it shows to the domain's DNS, or
   - place the verification file it names, holding the code it shows, in the root
     folder of the domain's web server.
7. Select **Re-verify now**. Once the domain is verified, the page says so.

## Require two-factor authentication

As your organization's administrator, you can require every user to sign in with two-factor authentication (2FA): after their password,
they enter a six-digit code from an authenticator app.

1. [Open Organization settings](/en/organization-settings.html#open-organization-settings).
2. In the menu bar, select **Dashboard**, then **Edit organization**.
3. Tick **Require two-factor authentication**. A dialog shows how many of your
   users don't have two-factor authentication on yet.
4. In the dialog, select **Require two-factor authentication**.
5. Select **Save**.

What happens to your users:

- A user who doesn't have it on yet is signed out within the hour. At their next
  sign-in they're asked to turn it on, and they can't skip that step.
- A new user is asked to turn it on at their first sign-in.
- While your organization requires it, a user can't turn it off.
- A user who belongs to several organizations is asked as soon as any one of them
  requires it.

To check that the rule is met, select **Team** > **Users**: the
**Two-factor authentication** column shows **On** or **Off** for each user.

To stop requiring it, clear **Require two-factor authentication** on the same page
and select **Save**.
