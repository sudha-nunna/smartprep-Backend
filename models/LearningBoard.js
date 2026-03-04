// backend/models/LearningBoard.js
const mongoose = require('mongoose');

const QuestSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["completed", "in-progress", "pending"],
  },
});

const ScoreSchema = new mongoose.Schema({
  subject: String,
  score: Number,
});

const LearningBoardSchema = new mongoose.Schema({
  // This should link to your User model when you have one
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true }, // Store user's name for leaderboard
  avatar: { type: String, default: "/placeholder.svg?height=40&width=40" },
  role: {
    type: String,
    enum: ["child", "parent", "teacher"],
    required: true,
  },
  attendance: { present: Number, absent: Number },
  streaks: { current: Number, longest: Number, total: Number },
  progress: { overallScore: Number, testsTaken: Number, badges: Number },
  leaderboard: {
    points: { type: Number, default: 0, index: true }, // Index for fast sorting
  },
  quests: [QuestSchema],
  scores: [ScoreSchema],
  funStats: { problemsSolved: Number, mathSkillUp: Number },
  powerUps: { streakDays: Number, leaderboardRank: Number, badgesWon: Number },
}, { timestamps: true });

module.exports = mongoose.model('LearningBoard', LearningBoardSchema);
