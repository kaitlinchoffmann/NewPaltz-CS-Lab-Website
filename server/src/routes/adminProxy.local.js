const express = require("express");
const router = express.Router();

/*
  Completely safe mock version of adminProxy.js for local development.

  - No token files
  - No privileged commands
  - No Hydra backend calls
  - Same validation + endpoints
  - Returns safe fake outputs so frontend never breaks
*/

function isValidAction(body) {
  if (!body || typeof body.action !== "string") return false;

  const allowed = ["testHello", "createUser", "getPm2Logs", "getJournalLogs"];
  if (!allowed.includes(body.action)) return false;

  if (body.action === "createUser") {
    if (body.id) return true;
    if (body.email && body.nId) return true;
    return false;
  }

  return true;
}

// Local mock generator for fake logs or output
function fakeLog(text) {
  return (
    "=== LOCAL MOCK LOG OUTPUT ===\n" +
    text +
    "\nTimestamp: " +
    new Date().toISOString()
  );
}

// /admin/createUser (mocked)
router.post("/admin/createUser", async (req, res) => {
  if (!isValidAction(req.body)) {
    return res.status(400).json({ error: "invalid input (local mock)" });
  }

  const body = req.body;

  return res.json({
    mock: true,
    stdout: fakeLog(`createUser executed locally\nInput: ${JSON.stringify(body)}`),
    input: body,
  });
});

// /admin/run (mocked)
// Handles: testHello, getPm2Logs, getJournalLogs
router.post("/admin/run", async (req, res) => {
  const body = req.body;

  if (!isValidAction(body)) {
    return res.status(400).json({ error: "invalid input (local mock)" });
  }

  let responseText = "";

  switch (body.action) {
    case "testHello":
      responseText = fakeLog("testHello mock successful!");
      break;

    case "getPm2Logs":
      responseText = fakeLog(
        "MOCK PM2 LOGS:\n(Real logs only available on server)\n\n" +
        "cs-lab-backend │ Mock log line 1\ncs-lab-backend │ Mock log line 2"
      );
      break;

    case "getJournalLogs":
      responseText = fakeLog(
        "MOCK JOURNALCTL LOGS:\n(Real logs only available on server)\n\n" +
        "hydra-backend.service │ Mock journal entry 1\nhydra-backend.service │ Mock journal entry 2"
      );
      break;

    default:
      responseText = fakeLog(`Unknown action: ${body.action}`);
  }

  return res.json({
    mock: true,
    stdout: responseText,
    input: body,
  });
});

module.exports = router;
