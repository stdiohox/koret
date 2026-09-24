# Enquiry form → Google Sheet

Each submission of the "Start a Project" form becomes one row in a Google Sheet, and a
notification email goes to `koretconsult@outlook.com`. It takes about 5 minutes and is free.

## 1. Create the sheet

1. Go to [sheets.new](https://sheets.new) (signed in to the Google account that should own the data).
2. Name it, e.g. **Koret Enquiries**. You don't need to add headers; the script creates them.

## 2. Add the script

1. In the sheet: **Extensions → Apps Script**.
2. Delete everything in `Code.gs` and paste in the contents of [`Code.gs`](./Code.gs) from this folder.
3. Click **Save** (the disk icon).

## 3. Deploy it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, then **Authorize access**. Pick your account. On "Google hasn't verified
   this app", click **Advanced → Go to (project name) (unsafe)**. This is your own script,
   and Google shows the warning for every personal script. Then click **Allow**.
5. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/AKfy.../exec`.

To check it's working, open that URL in your browser. It should say
`"Koret enquiry endpoint is live."`

## 4. Connect the website

Create a file called `.env.local` in the project root (next to `package.json`):

```
VITE_FORM_ENDPOINT=https://script.google.com/macros/s/AKfy.../exec
```

Restart `npm run dev`. On your hosting provider (Vercel, Netlify, …), add the same variable
under the project's **Environment Variables** and redeploy. The value is built into the site at
build time.

## Changing the script later

If you edit `Code.gs`, go to **Deploy → Manage deployments → ✏️ Edit → Version: New version →
Deploy**. That keeps the same URL. **New deployment** would create a new URL, and you'd have to
update `VITE_FORM_ENDPOINT`.

## Notes

- **Notification emails:** change or clear `NOTIFY_EMAIL` at the top of `Code.gs`. Hitting
  Reply on a notification replies to the person who filled in the form.
- **Spam:** a hidden field catches basic bots, and those submissions are silently dropped.
- **Columns:** Submitted, Name, Email, Company, Services, Budget, Message.
