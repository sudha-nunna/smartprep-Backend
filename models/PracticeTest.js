const mongoose = require("mongoose");

// Embedded Question schema
const QuestionSchema = new mongoose.Schema({
  id: Number,                // optional custom id
  question: String,
  type: String,
  options: [String],
  correctAnswer: String,
  explanation: String,
  topic: String,
}, { _id: false });          // disable MongoDB auto _id for each question

// Main PracticeTest schema
const PracticeTestSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  subject:    { type: String, required: true },
  questions:  { type: [QuestionSchema], required: true },
  timeLimit:  { type: Number, required: true },
  difficulty: { type: String, required: true },
  description: String,
  rating:     Number,
  attempts:   Number,
  topics:     [String],
}, { timestamps: true });

module.exports =
  mongoose.models.PracticeTest ||
  mongoose.model("PracticeTest", PracticeTestSchema);
