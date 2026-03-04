const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String }, // frontend maps string → actual icon
  color: { type: String },
  tests: { type: Number, default: 0 },
  avgTime: { type: String },
  difficulty: { type: String },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
