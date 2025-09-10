const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // o001, o002, etc.
  title: { type: String, required: true },
  value: { type: Number, required: true },
  stage: { type: String, enum: ["Discovery", "Proposal", "Won", "Lost"], default: "Discovery" },
  ownerId: { type: String, required: true }, // links to User id
  leadId: { type: String, required: true }   // links to Lead id
});

module.exports = mongoose.model("Opportunity", opportunitySchema);
