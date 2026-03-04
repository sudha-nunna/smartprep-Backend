const mongoose = require('mongoose');

const MetricsSchema = new mongoose.Schema({
  practiceTests: { type: Number, required: true },
  avgDuration: { type: String, required: true },
  studentsTested: { type: Number, required: true },
  avgRating: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Metrics', MetricsSchema);
