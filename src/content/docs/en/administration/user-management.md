---
title: "User management"
sidebar:
  order: 2
---
## Users
Each user represents a single person with access to the heavendata platform. You can invite users to join your organization and give them all or some permissions on your account(s), but you cannot edit or delete the user itself, e.g., the username or email address. To edit a user's profile or delete the user, verify their [email domain](#email-domains) first; the email address itself can never be changed.

## Inviting Users
Follow this procedure to add users to your organization:

* [Start the account administration app](../administration.html)
* In the menu bar, select **Team** > **Users**
* Select **New user** at the top right
* Enter the user's email address and name
* Submit the form

What happens next depends on whether the user's email domain is verified:

|The user's email domain|The button reads|What happens|
|---|---|---|
|Not verified|**Invite User**|We send the user an email inviting them to join your organization. In the menu bar, **Team** > **Pending Invitations** shows your invitations and whether each has been accepted. After the user accepted your invitation, you'll see the user in the user list (**Team** > **Users**).|
|Verified|**Create**|You can also set the user's languages. The user is added at once, without an invitation, and we send them no email, so tell them about their account yourself: they sign in for the first time through **Forgot your password?** on the login page.|

## Email domains
Verify an email domain to fully manage the users whose addresses end in it: you can then add them without an invitation, edit their profiles and delete them. You typically don't need one — without it, you can still invite users and permit them access to your account(s).

|Email domain|Manageable users|
|---|---|
|example.com|anyuser@example.com|

There are two verification options available:
* Upload a text file containing a verification key to your web server
* Add a TXT record in your name server

You need access to your web server or the DNS configuration for your domain to continue. Please get in touch with your system administrator if you are not familiar with those technical topics.

To add and verify an email domain
* [Start the account administration app](../administration.html)
* In the menu bar, select **Settings** > **Domains**
* Select **Add Domain**
* Follow the steps in the user interface
