const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getOpportunities, updateOpportunity } = require("../controllers/opportunityController");

// GET /api/opportunities → Get all opportunities (role-based)
router.get("/", auth, getOpportunities);

// PUT /api/opportunities/:id → Update opportunity (stage/value)
router.put("/:id", auth, role(["manager", "rep"]), updateOpportunity);

module.exports = router;
