const express = require("express");
const router = express.Router();
const accountRequests = require("../models/accountRequestsModel");

// Get all pending requests
router.get("/pending", async (req, res) => {
  try {
    const requests = await accountRequests.getPendingRequests();
    res.json(requests);
  } catch (err) {
    console.error("Error fetching pending requests:", err);
    res.status(500).json({ message: "Failed to fetch pending requests" });
  }
});

// Approve a request
router.put("/:id/approve", async (req, res) => {
  try {
    const rows = await accountRequests.approveRequest(req.params.id);
    if (rows === 0) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request approved successfully" });
  } catch (err) {
    console.error("Error approving request:", err);
    res.status(500).json({ message: "Failed to approve request" });
  }
});

// Deny a request
router.put("/:id/deny", async (req, res) => {
  try {
    const rows = await accountRequests.denyRequest(req.params.id);
    if (rows === 0) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request denied successfully" });
  } catch (err) {
    console.error("Error denying request:", err);
    res.status(500).json({ message: "Failed to deny request" });
  }
});

// Delete a request
router.delete("/:id", async (req, res) => {
  try {
    const rows = await accountRequests.deleteRequest(req.params.id);
    if (rows === 0) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error("Error deleting request:", err);
    res.status(500).json({ message: "Failed to delete request" });
  }
});

module.exports = router;
