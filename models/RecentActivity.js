const mongoose = require("mongoose");

const RecentActivitySchema = new mongoose.Schema({
  test: { type: String, required: true },
  date: { type: String, required: true }, // You can also use Date type
  score: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("RecentActivity", RecentActivitySchema);
