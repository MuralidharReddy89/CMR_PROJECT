const Opportunity = require("../models/opportunityModel");

// Get Opportunities
exports.getOpportunities = async (req, res) => {
  try {
    const opps = req.user.role === "manager"
      ? await Opportunity.find({})
      : await Opportunity.find({ ownerId: req.user.id });
    res.json(opps);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



// Update Opportunity (stage/value)
exports.updateOpportunity = async (req, res) => {
  try {
    const opp = await Opportunity.findOne({ id: req.params.id });
    if (!opp) return res.status(404).json({ msg: "Opportunity not found" });
    if (req.user.role === "rep" && opp.ownerId !== req.user.id) return res.status(403).json({ msg: "Forbidden" });

    Object.assign(opp, req.body);
    await opp.save();
    res.json(opp);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
