const mongoose = require("mongoose");

// Schema for Stats data
const StatsSchema = new mongoose.Schema({
  perfectScores: { type: Number, required: true },
  scoreImprovement: { type: Number, required: true },
  scholarships: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

// Export model
module.exports = mongoose.model("Stats", StatsSchema);
