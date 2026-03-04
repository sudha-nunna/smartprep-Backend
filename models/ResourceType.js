// models/ResourceType.js
const mongoose = require("mongoose");

const ResourceTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true, // e.g., "Practice Papers"
  },
  icon: {
    type: String, 
    required: true, // store icon name like "FileText", "Video"
  },
  count: {
    type: Number,
    required: true, // e.g., 150
  },
  description: {
    type: String,
    required: true,
  },
  button: {
    label: { type: String, required: true },  // e.g., "View Papers"
    action: { type: String, required: true }, // e.g., "/resources/practice-papers"
  },
   link: {
    type: String,
    required: false, // external/internal resource link (optional)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ResourceType", ResourceTypeSchema);
