const mongoose = require("mongoose");

const TutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subjects: [String],
  experience: String,
  qualification: String,
  rating: Number,
  reviews: Number,
  location: String,
  rate: String, // e.g. "£80/hour"
  availability: String,
  specialties: [String],
  successRate: String, // e.g. "98%"
  image: String,
  description: String,
  teachingMethods: [String],
});

module.exports = mongoose.model("Tutor", TutorSchema);
