const RESPONSES_SHEET_NAME = "Responses";

const HEADERS = [
  "Submitted At",
  "Submission ID",
  "Name",
  "Business",
  "WhatsApp or Email",
  "Revenue",
  "Costs",
  "Profit",
  "Cash on Hand",
  "Monthly Spend",
  "Runway (Months)",
  "Typical Sale Price",
  "Direct Delivery Cost",
  "True Margin",
  "Profit Surprised?",
  "Runway Surprised?",
  "Margin Surprised?",
  "Surprised Count",
];

function doGet() {
  return jsonResponse_({ ok: true, message: "SmartSMB form endpoint is ready." });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const params = (e && e.parameter) || {};
    if (!params.name || !params.contact) {
      return jsonResponse_({ ok: false, error: "Name and contact are required." });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet =
      spreadsheet.getSheetByName(RESPONSES_SHEET_NAME) ||
      spreadsheet.insertSheet(RESPONSES_SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      safeText_(params.id),
      safeText_(params.name),
      safeText_(params.business),
      safeText_(params.contact),
      number_(params.revenue),
      number_(params.costs),
      number_(params.profit),
      number_(params.cash),
      number_(params.spend),
      number_(params.runway),
      number_(params.price),
      number_(params.dcost),
      number_(params.margin),
      safeText_(params.surprised_profit),
      safeText_(params.surprised_runway),
      safeText_(params.surprised_margin),
      number_(params.surprisedCount),
    ]);

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function safeText_(value) {
  const text = value == null ? "" : String(value).trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function number_(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
