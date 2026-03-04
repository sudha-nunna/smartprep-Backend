// models/Subject.js
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, required: true }, // store string like "Calculator"
  color: { type: String, required: true },
  description: { type: String, required: true },
  resources: { type: Number, required: true },
  difficulty: { type: String, required: true }
});

module.exports = mongoose.model("Subject", subjectSchema);
