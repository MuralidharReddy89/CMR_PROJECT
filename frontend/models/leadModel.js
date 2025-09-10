const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // l001, l002, etc.
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  status: { type: String, enum: ["New", "Contacted", "Qualified"], default: "New" },
  ownerId: { type: String, required: true } // links to User id
});

module.exports = mongoose.model("Lead", leadSchema);
