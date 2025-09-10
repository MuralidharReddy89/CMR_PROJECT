const Lead = require("../models/leadModel");
const Opportunity = require("../models/opportunityModel");

// Helper to generate Lead ID
async function generateLeadId() {
  const lastLead = await Lead.findOne({}).sort({ id: -1 }).exec();
  if (!lastLead) return "l001";
  const lastNum = parseInt(lastLead.id.slice(1));
  return `l${String(lastNum + 1).padStart(3, "0")}`;
}

// Get Leads
exports.getLeads = async (req, res) => {
  try {
    const leads = req.user.role === "manager"
      ? await Lead.find({})
      : await Lead.find({ ownerId: req.user.id });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Create Lead
exports.createLead = async (req, res) => {
  try {
    const id = await generateLeadId();
    const lead = new Lead({ id, ...req.body, ownerId: req.user.id });
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update Lead
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({ id: req.params.id });
    if (!lead) return res.status(404).json({ msg: "Lead not found" });
    if (req.user.role === "rep" && lead.ownerId !== req.user.id) return res.status(403).json({ msg: "Forbidden" });

    Object.assign(lead, req.body);
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete Lead
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({ id: req.params.id });
    if (!lead) return res.status(404).json({ msg: "Lead not found" });
    if (req.user.role === "rep" && lead.ownerId !== req.user.id) return res.status(403).json({ msg: "Forbidden" });

    await lead.remove();
    res.json({ msg: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Convert Lead → Opportunity
async function generateOpportunityId() {
  const lastOpp = await Opportunity.findOne({}).sort({ id: -1 }).exec();
  if (!lastOpp) return "o001";
  const lastNum = parseInt(lastOpp.id.slice(1));
  return `o${String(lastNum + 1).padStart(3, "0")}`;
}

exports.convertLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({ id: req.params.id });
    if (!lead) return res.status(404).json({ msg: "Lead not found" });

    // Only owner or manager can convert
    if (req.user.role === "rep" && lead.ownerId !== req.user.id) return res.status(403).json({ msg: "Forbidden" });

    // Create opportunity
    const oppId = await generateOpportunityId();
    const opportunity = new Opportunity({
      id: oppId,
      title: `${lead.name} – Deal`,
      value: req.body.value || 0,
      ownerId: lead.ownerId,
      leadId: lead.id
    });
    await opportunity.save();

    // Update lead status
    lead.status = "Qualified";
    await lead.save();

    res.json({ lead, opportunity });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
