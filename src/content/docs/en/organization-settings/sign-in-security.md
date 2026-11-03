---
title: "Security for your sign-in"
description: "Turn on two-factor authentication, keep recovery codes, add or remove Google and Microsoft, set or reset your password, and what signs you out elsewhere."
sidebar:
  order: 3
---

Your **Security** page at `https://www.heavendata.app/security` is where you manage how
you sign in to heavendata: your password, your Google and Microsoft sign-ins, and
two-factor authentication with an authenticator app. Each user manages their own.

## Open your Security page

Go to `https://www.heavendata.app/security`. If you aren't signed in, heavendata asks you
to sign in first and then opens the page. The page is titled **Security** and shows
**How you sign in to heavendata**, with three sections: **Password**, **Google and
Microsoft** and **Two-factor authentication**. **Back to heavendata** at the top takes you
to your profile.

If you sign in only with Google or Microsoft, your profile links to it too: in the app,
open the user menu, select **Edit profile**, then **Change password**, which says **You
don't have a password yet. Set one on the Security page.** — select **Security**.

## Two-factor authentication

Two-factor authentication asks for a six-digit code from an authenticator app each time
you sign in, after your password or after Google or Microsoft. An authenticator app, such
as Google Authenticator or Microsoft Authenticator, shows a new code every 30 seconds on
your phone.

### Turn it on

1. On your Security page, under **Two-factor authentication**, select **Turn on**.
2. Scan the QR code with your authenticator app. If you can't scan it, enter the key shown
   under **Can't scan it? Enter this key in your authenticator app instead:**.
3. Enter the code the app shows under **Code from the app** and select **Turn on**.
4. **Save your recovery codes** shows ten recovery codes. Select **Download** or **Copy**,
   keep them somewhere safe, away from your phone, and select **Done**. The codes are shown
   only this once.

The section then says **On · 10 recovery codes left**.

If your organization requires two-factor authentication, heavendata asks you to turn it on
when you sign in — see
[Require two-factor authentication](/en/organization-settings/user-management.html#require-two-factor-authentication).

### Sign in with the code

After your password, or after Google or Microsoft, enter the six-digit code your
authenticator app shows. Tick **Trust this browser for 30 days** to skip the code in this
browser for 30 days.

If your phone is out of reach, select **Use a recovery code instead** and enter one of your
recovery codes. Each code works once.

**Lost your phone and your recovery codes?** Contact support to turn off two-factor
authentication.

### Create new recovery codes

Do this when you're running out of codes, or think someone else has seen them.

1. On your Security page, select **Create new recovery codes**.
2. Enter the code from your authenticator app — a recovery code isn't accepted here — and
   select **Create new recovery codes**.
3. Save the ten new codes as when you turned two-factor authentication on, and select **Done**.

Your old recovery codes stop working.

### Turn it off

1. On your Security page, select **Turn off**.
2. Enter a code from your authenticator app, or one of your recovery codes, under **Code
   from the app or a recovery code**.
3. Select **Turn off two-factor authentication**.

Your recovery codes stop working. While an organization you belong to requires two-factor
authentication, **Turn off** can't be selected, and the page names that organization.

## Google and Microsoft

You can sign in with a Google account or a Microsoft work, school or personal account
instead of a password, or as well as one.

**To add one,** select **Add** beside **Google** or **Microsoft** and sign in there. The
page then says **Google sign-in added** (or Microsoft). If that Google or Microsoft account
already belongs to another heavendata user, the page says **Couldn't add Google. Another
user already signs in with this Google account.**

Signing in with Google or Microsoft from the sign-in page adds it the same way, when its
email address is the one your heavendata user has and Google or Microsoft confirms it.

**To remove one,** select **Remove** beside it, then **Remove Google sign-in** (or
Microsoft). You can add it again at any time.

You can't remove your only way to sign in: the page says **Couldn't remove Google. It's
your only way to sign in. Set a password first.** [Set a password](#set-a-password) first.

## Passwords

### Set a password

If you signed up with Google or Microsoft, you have no password. To sign in with your email
address too:

1. On your Security page, under **Password**, select **Set password**.
2. Enter a password of at least 6 characters and select **Set password**.

The page then says **Password set**. Once you have a password, you can change it, but not
remove it.

### Change your password

On your Security page, select **Change password**. Enter your **Current password** and your
**New password** twice, and select **Change password**.

### Forgot your password?

1. On the sign-in page, select **Forgot your password?**.
2. Enter your email address and select **Send email**.
3. Open the email **Reset password** and follow its link.
4. Enter your new password under **New password** and again under **Confirm password**,
   and select **Save new password**.
5. The page says **Password changed**. Select **Sign in** to sign in with the new password.

If no email arrives within a few minutes, check the address and your spam folder.

## What signs you out on your other devices

Some changes sign you out everywhere else, so that someone who signed in with your old
details can't stay signed in. The browser you made the change in stays signed in, except
after a password reset.

| Change | Other browsers and devices | This browser |
| --- | --- | --- |
| Turn on two-factor authentication | Signed out within the hour | Stays signed in |
| Turn off two-factor authentication | Signed out within the hour | Stays signed in |
| Remove Google or Microsoft | Signed out within the hour | Stays signed in |
| Change your password | Signed out within the hour | Stays signed in |
| Reset your password with **Forgot your password?** | Signed out within the hour | Signed out too |
| Add Google or Microsoft, set a first password, create new recovery codes | Stay signed in | Stays signed in |

## Emails about your sign-in

heavendata emails you after each of these changes, so that you notice one you didn't make.

| Email | Sent when |
| --- | --- |
| **Two-factor authentication turned on** | You turned it on. |
| **Two-factor authentication turned off** | You or support turned it off. |
| **Google added to your sign-in** · **Microsoft added to your sign-in** | Google or Microsoft was added, on the Security page or by signing in with it. |
| **Google removed from your sign-in** · **Microsoft removed from your sign-in** | You removed it. |
| **Password changed** | Your password was changed or reset. |
| **Recovery code used** | A recovery code was used to sign in. It says how many codes you have left. |

**If you didn't make the change,** reset your password with **Forgot your password?** on the
sign-in page and contact support. Each email has a **Reset password** button when you have
a password.
