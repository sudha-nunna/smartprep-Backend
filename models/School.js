const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    board: {
      type: String,
      enum: ["CBSE", "ICSE", "State", "IB", "Cambridge", "Other", "Grammar", "Independent",],
      default: "Other",
    },
    address: { type: String, default: "" },
    website: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
    phone: { type: String, default: "" },

    // 🔹 Extra Features
    rating: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    examDate: { type: String, default: "" },
    subjects: { type: [String], default: [] },
    description: { type: String, default: "" },
    successRate: { type: Number, default: 0 },
    fees: { type: String, default: "" },
    region: { type: String, default: "" },
    examBoard: { type: String, default: "" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("School", schoolSchema);
