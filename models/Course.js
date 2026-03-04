const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  color: { type: String },
  avgTime: { type: String },
  tests: { type: Number },
  difficulty: { type: String },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);