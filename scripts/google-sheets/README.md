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

Restart `npm run dev`. On Vercel, add the same variable under the project's **Settings →
Environment Variables** (Production and Preview) and redeploy. The value is built into the site
at build time.

**If the variable is missing from a build, nothing errors:** the form quietly falls back to
opening a pre-filled email, so no row reaches the sheet and no Meta Pixel `Lead` fires. To
check a live site, search its `assets/index-*.js` for `script.google.com`.

## Changing the script later

If you edit `Code.gs`, go to **Deploy → Manage deployments → ✏️ Edit → Version: New version →
Deploy**. That keeps the same URL. **New deployment** would create a new URL, and you'd have to
update `VITE_FORM_ENDPOINT`.

## Notes

- **Notification emails:** change or clear `NOTIFY_EMAIL` at the top of `Code.gs`. Hitting
  Reply on a notification replies to the person who filled in the form.
- **Spam:** a hidden field catches basic bots, and those submissions are silently dropped.
- **Columns:** the script finds each column by its header text (Submitted, Name, Email, Company,
  Services, Details, Message, WhatsApp, Variant, Lead ID, Lead channels, Enquiries per week), so
  columns can be moved and the team can add their own anywhere. A header the script needs and
  can't find is added once, at the far right. It never writes Details (the team's call notes).
- **A/B test:** `Variant` says which homepage the lead came from (`A` or `B`; see `AB-TEST.md`).
  Variant B sends three fields first and may send optional details a moment later; those fill
  in the same row, matched on `Lead ID`.
- **Email or WhatsApp:** a lead needs a name plus an email *or* a WhatsApp number (variant B
  doesn't ask for email up front).
