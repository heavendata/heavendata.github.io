---
layout: default
title: Overview
parent: System administration
nav_order: 2
---

# User Management

## Users
Each user represents a single person with access to the heavendata platform. You can invite users to join your organization and give them all or some permissions on your account(s), but you cannot edit or delete the user itself, e.g., the username or email address. To get full access to users, add the user's email domain as a trusted domain.

## Inviting Users
Follow this procedure to add users to your organization:

* [Start the account administration app](./index)
* In the header menu, click "Team" then "Users"
* Click "Add user" top right
* Enter the user's email address and name

If the email domain is registered as a trusted domain, you'll be able to add additional user details.

* Submit the form
* Done

We'll send an email to the user inviting him to join your organization. Click "Team" > "Invitations" to see all pending invitations. After the user accepted your invitation, you'll see the user in the user list ("Team" > "Users").

## Trusted Domains
To get full access to users, you'll need to prove the ownership of the email domain. Then you're allowed to manage users below it fully. 

|Trusted domain|Manageable users|
|---|---|
|example.com|anyuser@example.com|

There are two verification options available:
* Upload a text file containing a verification key to your web server
* Add a TXT record in your name server

You need access to your web server or the DNS configuration for your domain to continue. Please get in touch with your system administrator if you are not familiar with those technical topics.

To add an email domain as trusted domain
* [Start the account administration app](./index)
* Click "Settings" then "Domains" in the header menu
* Click "New trusted domain"
* Follow the steps in the user interface

Note that you typically don't need to setup trusted domains. Even without them, you can invite users and permit them access to your account(s).

