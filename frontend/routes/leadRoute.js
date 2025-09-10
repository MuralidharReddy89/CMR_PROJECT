const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getLeads, createLead, updateLead, deleteLead, convertLead } = require("../controllers/leadController");

// GET /api/leads → Get all leads (role-based)
router.get("/", auth, getLeads);

// POST /api/leads → Create new lead
router.post("/", auth, createLead);

// PUT /api/leads/:id → Update lead
router.put("/:id", auth, updateLead);

// DELETE /api/leads/:id → Delete lead
router.delete("/:id", auth, deleteLead);

// POST /api/leads/:id/convert → Convert lead to opportunity
router.post("/:id/convert", auth, convertLead);

module.exports = router;
