const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String }, // URL for school logo
  description: { type: String },
  gender: { type: String, enum: ["Boys", "Girls", "Mixed", "Any"], default: "Any" },
  regionId: { type: mongoose.Schema.Types.ObjectId, ref: "Region", required: true }
});

module.exports = mongoose.model("RegionalSchool", schoolSchema);

