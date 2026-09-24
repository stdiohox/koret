/**
 * Koret enquiry form → Google Sheet.
 *
 * Paste this into Extensions → Apps Script on the sheet that should receive enquiries,
 * then deploy it as a web app (steps in README.md next to this file). Every form
 * submission becomes one row, and a notification email goes to NOTIFY_EMAIL.
 */

const SHEET_NAME = 'Enquiries';
const NOTIFY_EMAIL = 'koretconsult@outlook.com'; // set to '' to turn notifications off
const HEADERS = ['Submitted', 'Name', 'Email', 'Company', 'Services', 'Budget', 'Message'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // two submissions at once must not overwrite the same row
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot: the site hides a "website" field from people, so only bots fill it.
    // Answer ok so the bot moves on, but store nothing.
    if (data.website) return json({ ok: true });

    const row = [
      new Date(),
      clean(data.name),
      clean(data.email),
      clean(data.company),
      clean(data.services),
      clean(data.budget),
      clean(data.message),
    ];
    if (!row[1] || !row[2]) return json({ ok: false, error: 'Missing name or email' });

    getSheet().appendRow(row);
    notify(row);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the web app URL in a browser shows this — a quick "is it deployed?" check.
function doGet() {
  return json({ ok: true, message: 'Koret enquiry endpoint is live.' });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#e6faff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(7, 420);
  }
  return sheet;
}

// Strings starting with = + - @ would run as formulas when the sheet opens them
// (spreadsheet formula injection), so they get a leading apostrophe. Also caps length.
function clean(value) {
  const s = String(value == null ? '' : value).trim().slice(0, 5000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function notify(row) {
  if (!NOTIFY_EMAIL) return;
  const [, name, email, company, services, budget, message] = row;
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: email,
    subject: 'New enquiry — ' + name + (company ? ' (' + company + ')' : ''),
    body: [
      'Name: ' + name,
      'Email: ' + email,
      'Company: ' + (company || '—'),
      'Interested in: ' + services,
      'Budget: ' + budget,
      '',
      message,
      '',
      'Sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    ].join('\n'),
  });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
