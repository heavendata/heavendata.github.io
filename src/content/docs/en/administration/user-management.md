---
title: "User management"
sidebar:
  order: 2
---
## Users
Each user represents a single person with access to the heavendata platform. You can invite users to join your organization and give them all or some permissions on your account(s), but you cannot edit or delete the user itself, e.g., the username or email address. To get full access to users, add the user's email domain and verify it.

## Inviting Users
Follow this procedure to add users to your organization:

* [Start the account administration app](../administration.html)
* In the menu bar, select **Team** > **Users**
* Select **New user** top right
* Enter the user's email address and name

If the user's email domain is verified, you'll be able to add additional user details.

* Submit the form
* Done

We'll send an email to the user inviting them to join your organization. In the menu bar, select **Team** > **Pending Invitations** to see your invitations and whether each has been accepted. After the user accepted your invitation, you'll see the user in the user list (**Team** > **Users**).

If the user's email domain is verified, the form's button reads **Create** instead of **Invite User**, and the user is added at once, without an invitation. We send them no email, so tell them about their account yourself: they sign in for the first time through **Forgot your password?** on the login page.

## Email domains
To get full access to users, you'll need to prove the ownership of their email domain. Then you're allowed to fully manage the users whose addresses end in it.

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

Note that you typically don't need to verify an email domain. Even without one, you can invite users and permit them access to your account(s).
