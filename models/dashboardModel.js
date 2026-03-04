const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  practiceTests: { type: Number, required: true },
  avgDuration: { type: String, required: true },
  studentsTested: { type: Number, required: true },
  avgRating: { type: Number, required: true },
});

module.exports = mongoose.model("Dashboard", dashboardSchema);
