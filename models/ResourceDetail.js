const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  q: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
});

const resourceDetailSchema = new mongoose.Schema({
  type: { type: String, required: true }, // practice-papers / video-tutorials / quizzes
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileLink: { type: String }, // for practice papers
  videoLink: { type: String }, // for videos
  duration: { type: String }, // for videos
  questions: [questionSchema], // for quizzes
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.ResourceDetail || mongoose.model("ResourceDetail", resourceDetailSchema);
