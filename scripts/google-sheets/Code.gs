/**
 * Koret enquiry form → Google Sheet.
 *
 * Paste this into Extensions → Apps Script on the sheet that should receive enquiries,
 * then deploy it as a web app (steps in README.md next to this file). Every form
 * submission becomes one row, and a notification email goes to NOTIFY_EMAIL.
 *
 * Two sites post here during the homepage A/B test:
 *   - variant A (the React site) sends one { name, email, phone, company, services, message }.
 *   - variant B (b/index.html) sends { kind: 'lead', leadId, name, phone, company, ... } first,
 *     then optionally { kind: 'details', leadId, channels, volume, services, email, message },
 *     which fills in the same row rather than adding a new one.
 *
 * Columns are found by their header text, never by position, so the team can reorder,
 * add or rename their own columns freely. A column this script needs and can't find is
 * added once, at the far right.
 */

const SHEET_NAME = 'Enquiries';
const NOTIFY_EMAIL = 'koretconsult@outlook.com'; // set to '' to turn notifications off

// Header text of each column this script writes. Changing a value here points the script
// at a differently named column; it does not rename anything in the sheet.
const COL = {
  submitted: 'Submitted',
  name: 'Name',
  email: 'Email',
  company: 'Company',
  services: 'Services',
  details: 'Details', // the team's call notes; never written by the script
  message: 'Message',
  phone: 'WhatsApp',
  variant: 'Variant',
  leadId: 'Lead ID',
  channels: 'Lead channels',
  volume: 'Enquiries per week',
};
// Order used only when the sheet is brand new and empty.
const NEW_SHEET_ORDER = ['submitted', 'name', 'email', 'company', 'services', 'details', 'message', 'phone', 'variant', 'leadId', 'channels', 'volume'];

const VARIANT_RE = /^[A-Za-z0-9_-]{1,20}$/;
const LEAD_ID_RE = /^[A-Za-z0-9-]{8,64}$/;
const MIN_FILL_MS = 2500; // a human can't fill the form faster than this

function doPost(e) {
  const lock = LockService.getScriptLock();
  let locked = false;
  let toNotify = null; // sent after the lock is released, so a slow MailApp holds no one up
  try {
    lock.waitLock(10000); // two submissions at once must not overwrite the same row
    locked = true;

    const data = JSON.parse(e.postData.contents);

    // Honeypot / too-fast: answer ok so the bot moves on, but store nothing.
    if (data.website) return json({ ok: true });
    if (typeof data.elapsed === 'number' && data.elapsed < MIN_FILL_MS) return json({ ok: true });

    const sheet = getSheet();
    const cols = columns(sheet);
    const variant = VARIANT_RE.test(String(data.variant || '')) ? String(data.variant) : '';
    const kind = data.kind || 'lead';
    if (kind !== 'lead' && kind !== 'details') return json({ ok: false, error: 'Unknown kind' });
    const leadId = LEAD_ID_RE.test(String(data.leadId || '')) ? String(data.leadId) : '';

    if (kind === 'details') {
      const row = findLeadRow(sheet, cols, leadId);
      if (!row) return json({ ok: false, error: 'Unknown lead' });
      const put = (key, value) => { if (value) sheet.getRange(row, cols[key]).setValue(clean(value)); };
      put('channels', data.channels);
      put('volume', data.volume);
      if (data.email && !sheet.getRange(row, cols.email).getValue()) put('email', data.email);
      if (data.services) {
        const current = String(sheet.getRange(row, cols.services).getValue() || '');
        put('services', current ? current + ', ' + data.services : data.services);
      }
      if (data.message) put('message', data.message);
      toNotify = Object.assign({ followUp: true }, readRow(sheet, cols, row));
      return json({ ok: true });
    }

    // A retry after a lost response must not create a second row for the same lead.
    if (leadId && findLeadRow(sheet, cols, leadId)) return json({ ok: true });

    const lead = {
      submitted: new Date(),
      name: clean(data.name),
      email: clean(data.email),
      company: clean(data.company),
      services: clean(data.services),
      message: clean(data.message),
      phone: asText(clean(data.phone)),
      variant: variant,
      leadId: leadId,
    };
    if (!lead.name || (!lead.email && !lead.phone)) {
      return json({ ok: false, error: 'Missing name, or both email and WhatsApp number' });
    }

    const width = sheet.getLastColumn();
    const row = new Array(width).fill('');
    Object.keys(lead).forEach((key) => { row[cols[key] - 1] = lead[key]; });
    sheet.appendRow(row);

    // The row is saved; a mail quota error must not make the visitor resubmit.
    toNotify = lead;
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    if (locked) lock.releaseLock();
    if (toNotify) safeNotify(toNotify);
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
    const headers = NEW_SHEET_ORDER.map((k) => COL[k]);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#e6faff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(7, 420);
  }
  return sheet;
}

// { key: 1-based column index } for every COL entry, adding any missing header at the end.
function columns(sheet) {
  const width = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, width).getValues()[0].map((h) => String(h).trim().toLowerCase());
  const out = {};
  Object.keys(COL).forEach((key) => {
    let i = headers.indexOf(COL[key].toLowerCase());
    if (i === -1) {
      headers.push(COL[key].toLowerCase());
      i = headers.length - 1;
      sheet.getRange(1, i + 1).setValue(COL[key]).setFontWeight('bold').setBackground('#e6faff');
    }
    out[key] = i + 1;
  });
  return out;
}

function findLeadRow(sheet, cols, leadId) {
  if (!leadId || sheet.getLastRow() < 2) return 0;
  const hit = sheet
    .getRange(2, cols.leadId, sheet.getLastRow() - 1, 1)
    .createTextFinder(leadId)
    .matchEntireCell(true)
    .matchCase(true)
    .findNext();
  return hit ? hit.getRow() : 0;
}

function readRow(sheet, cols, row) {
  const values = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  const out = {};
  Object.keys(cols).forEach((key) => { out[key] = values[cols[key] - 1]; });
  return out;
}

// Strings starting with = + - @ would run as formulas when the sheet opens them
// (spreadsheet formula injection), so they get a leading apostrophe. Also caps length.
function clean(value) {
  const s = String(value == null ? '' : value).trim().slice(0, 5000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

// Sheets turns "08012345678" into the number 8012345678 and drops the leading zero, so a
// phone number is always stored as text.
function asText(s) {
  return s && s.charAt(0) !== "'" ? "'" + s : s;
}

function safeNotify(lead) {
  try {
    notify(lead);
  } catch (err) {
    console.error('Notification failed: ' + err);
  }
}

function notify(lead) {
  if (!NOTIFY_EMAIL) return;
  const phone = String(lead.phone || '').replace(/^'/, '');
  const mail = {
    to: NOTIFY_EMAIL,
    subject: oneLine((lead.followUp ? 'More details — ' : 'New enquiry — ') + lead.name + (lead.company ? ' (' + lead.company + ')' : '') + (lead.variant ? ' [' + lead.variant + ']' : '')),
    body: [
      'Name: ' + lead.name,
      'Email: ' + (lead.email || '—'),
      'WhatsApp: ' + (phone ? phone + '  (https://wa.me/' + waDigits(phone) + ')' : '—'),
      'Company: ' + (lead.company || '—'),
      'Interested in: ' + (lead.services || '—'),
      lead.channels ? 'Enquiries come in via: ' + lead.channels : null,
      lead.volume ? 'Enquiries per week: ' + lead.volume : null,
      'Site variant: ' + (lead.variant || '—'),
      '',
      lead.message || '—',
      '',
      'Sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    ].filter((l) => l !== null).join('\n'),
  };
  if (lead.email) mail.replyTo = String(lead.email).replace(/^'/, '');
  MailApp.sendEmail(mail);
}

function oneLine(s) {
  return String(s).replace(/[\r\n]+/g, ' ');
}

// wa.me needs international digits; a Nigerian local number (0801…) becomes 234801….
function waDigits(phone) {
  const d = String(phone).replace(/\D/g, '');
  return d.length === 11 && d.charAt(0) === '0' ? '234' + d.slice(1) : d;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
