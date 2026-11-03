---
title: "Sign up and sign in"
description: "Sign up for heavendata with your work email address, a Google account or a Microsoft account, and sign in afterwards."
sidebar:
  order: 0.5
---

Sign up at `https://www.heavendata.app/sign-up` with your work email address, a Google
account or a Microsoft account. Signing up creates three things at once: your **user**,
which is how you sign in; an **organization** for your company, which is billed; and the
organization's first **account**, which holds your product data at its own web address,
such as `https://your-company.heavendata.app`.

**If a colleague invited you, don't sign up.** Accept the invitation from its email
instead. Signing up creates a second, separate organization that your colleagues can't see.

## Use your work email address

Addresses at the large personal email providers are refused on sign-up: an address ending
in `@gmail.com`, `@outlook.com`, `@hotmail.com`, `@yahoo.com`, `@aol.com`, `@icloud.com` or
`@live.com`. The sign-up form then says **This email address is not allowed. Please use
your business email.** Sign up with your company's address instead. The rule is the same
when you sign up with Google or Microsoft: a Google account with a `@gmail.com` address is
refused too.

## Sign up with your email address

1. Open `https://www.heavendata.app/sign-up`, or select **Sign up here** below the sign-in
   form.
2. Enter your **Email address**.
3. Tick **I agree to heavendata terms & conditions and privacy policy**.
4. Select **Sign Up**. The page shows **Check your inbox**.
5. Open the email **Confirm email** and select **Confirm**. heavendata confirms your
   address, signs you in and opens **Create your account**.
6. Enter your **Given name**, **Family name** and a **Password** of at least 6 characters.
   **Phone number (optional)** and **Company (optional)** can stay empty; the organization
   is named after **Company**, or after your name when you leave it empty.
7. Under **Subdomain**, choose your account's web address: at least 6 letters, digits or
   hyphens. It becomes `https://‹your choice›.heavendata.app`.
8. Select **Start app**.

Your new account opens and asks how to set it up — see
[Setup options](/en/start/setup-options.html).

**No email arrived, or it says *Your Sign-Up*?** If the address already has a heavendata
user, the screen still says **Check your inbox**, but the email you get is **Your
Sign-Up**, telling you that a user with your address already exists. Sign in instead, or
use [Forgot your password?](/en/organization-settings/sign-in-security.html#forgot-your-password).
Otherwise check your spam folder.

## Sign up with Google or Microsoft

1. Open `https://www.heavendata.app/sign-up` and select **Sign up with Google** or **Sign up
   with Microsoft**. Microsoft accepts work or school accounts and personal accounts.
2. Sign in at Google or Microsoft and agree to share your name and email address with
   heavendata. heavendata asks for nothing else, such as your files, mail or contacts.
3. Back on the sign-up form, your address is shown. Tick **I agree to heavendata terms &
   conditions and privacy policy** and select **Sign Up**.
4. **Create your account** says **You're signing up as ‹your address›. Choose your account's
   web address to finish.** Check your name, choose the web address under **Subdomain** and
   select **Start app**.

When Google or Microsoft confirms your address, you skip the **Confirm email** email and
choosing a password: you sign in with Google or Microsoft, and can
[set a password](/en/organization-settings/sign-in-security.html#set-a-password) later.
When they don't confirm it, the sign-up continues as an email sign-up from **Check your
inbox**.

**Your address already has a heavendata user?** When Google or Microsoft confirms your
address, you're signed in instead: heavendata adds Google or Microsoft as a way to sign in
to your user and sends you the email **Google added to your sign-in** or **Microsoft added
to your sign-in**. No second user or organization is created.

## When a sign-up is refused

| The page says | What to do |
| --- | --- |
| **This email address is not allowed. Please use your business email.** | [Use your work email address](#use-your-work-email-address). |
| **Couldn't verify the sign-up. Try again, and contact support if it fails again.** | The bot check couldn't confirm you. Try again; if a puzzle appears, solve it. The sign-up page loads the bot check from Google: behind a firewall, allow the addresses in [Data center → Web addresses](/en/reference/data-center.html#web-addresses). |
| **Account URL key cannot be used.** | That web address is taken or reserved. Choose another under **Subdomain**. |
| **Couldn't use your Google account. Google didn't share your email address. Sign in or sign up with your email address.** (or Microsoft) | Sign up with your email address instead. |
| **Couldn't finish the sign-up. The sign-up page was open for more than 5 minutes. Sign up again.** | Start again from **Sign up with Google** or **Sign up with Microsoft**. |
| **Something went wrong...** after selecting **Confirm** in the email | The confirmation link is no longer valid. Sign up again for a new one. |

## Sign in

Open your account's address, such as `https://‹account›.heavendata.app`. When you aren't
signed in, it takes you to the sign-in page, **Login to your account**.

- **With your password:** enter your **Email address** and **Password** and select **Login**.
- **With Google or Microsoft:** select **Sign in with Google** or **Sign in with Microsoft**.

If you have two-factor authentication on, heavendata then asks for the code from your
authenticator app, or a recovery code — see
[Two-factor authentication](/en/organization-settings/sign-in-security.html#two-factor-authentication).

| The page says | What to do |
| --- | --- |
| **Couldn't sign in. Check your email address and password, or choose another way to sign in.** | Check both, or use [Forgot your password?](/en/organization-settings/sign-in-security.html#forgot-your-password). |
| **Locked out**, or **Couldn't verify the code. Too many wrong codes were entered. Try again in 5 minutes.** | Ten wrong passwords or codes in a row lock you out for 5 minutes. Wait, then try again. |
| **Couldn't sign in with Google. Your email address isn't confirmed. Reset your password to confirm it.** (or Microsoft) | Use [Forgot your password?](/en/organization-settings/sign-in-security.html#forgot-your-password): resetting the password confirms your address. |
| **Couldn't verify the code. Check that your device's time is correct, and enter the newest code.** | Enter the code your authenticator app shows now. |
