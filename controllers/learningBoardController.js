const LearningBoard = require("../models/LearningBoard.js");
const mongoose = require("mongoose");
const User = require("../models/userModel");

// Get LearningBoard Data
const getLearningBoard = async (req, res) => {
  const { userId } = req.params;

  // The userId from your frontend is a string, not an ObjectId, so we remove the validation for now.
  // if (!mongoose.Types.ObjectId.isValid(userId)) {
  //   return res.status(400).json({ message: "Invalid User ID format" });
  // }

  try {
    let board = await LearningBoard.findOne({ userId }).lean(); // Use .lean() for faster reads

    // If no board is found, create a new one with default values
    if (!board) {
      console.log(`No LearningBoard found for userId: ${userId}. Creating a new one.`);

      // Attempt to derive name + role from User record
      let derivedName = "New User";
      let derivedRole = "child";
      try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
          const user = await User.findById(userId).lean();
          if (user) {
            derivedName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "New User";
            const role = (user.role || "").toLowerCase();
            if (role === "parent") derivedRole = "parent";
            if (role === "teacher") derivedRole = "teacher";
            if (role === "student") derivedRole = "child";
          }
        }
      } catch (e) {
        // If user lookup fails, continue with defaults
      }

      const defaultBoardData = {
        userId: userId,
        name: derivedName, // 'name' is required by your schema
        role: derivedRole,
        attendance: { present: 0, absent: 0 },
        streaks: { current: 0, longest: 0, total: 0 },
        progress: { overallScore: 0, testsTaken: 0, badges: 0 },
        leaderboard: { points: 0 }, // Only 'points' is in the schema, 'rank' is dynamic
        quests: [],
        scores: [],
        funStats: { problemsSolved: 0, mathSkillUp: 0 },
        powerUps: { streakDays: 0, leaderboardRank: 0, badgesWon: 0 },
      };

      const newBoard = new LearningBoard(defaultBoardData);
      await newBoard.save();

      // The new user's rank is calculated after creation.
      const rank = await LearningBoard.countDocuments({
        'leaderboard.points': { $gt: newBoard.leaderboard.points }
      }) + 1;

      const boardWithRank = {
        ...newBoard.toObject(), // Convert Mongoose doc to plain object
        leaderboard: { ...newBoard.leaderboard, rank: rank },
      };

      // Return the newly created board.
      return res.status(201).json(boardWithRank);
    }

    // If board exists, calculate its rank dynamically
    const rank = await LearningBoard.countDocuments({
      'leaderboard.points': { $gt: board.leaderboard.points }
    }) + 1;

    board.leaderboard.rank = rank; // Add the dynamic rank to the response

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Create LearningBoard Data
const createLearningBoard = async (req, res) => {
  try {
    const board = new LearningBoard(req.body);
    const saved = await board.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update LearningBoard Data
const updateLearningBoard = async (req, res) => {
  try {
    const { userId } = req.params;

    const updated = await LearningBoard.findOneAndUpdate(
      { userId: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "LearningBoard not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete LearningBoard Data
const deleteLearningBoard = async (req, res) => {
  try {
    const { userId } = req.params;

    const board = await LearningBoard.findOneAndDelete({ userId: userId });

    if (!board) {
      return res.status(404).json({ message: "LearningBoard not found" });
    }

    res.status(200).json({ message: "LearningBoard deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add or subtract points for a user
const updateUserScore = async (req, res) => {
  try {
    const { userId } = req.params;
    const { pointsToAdd } = req.body;

    if (typeof pointsToAdd !== 'number') {
      return res.status(400).json({ message: "pointsToAdd must be a number." });
    }

    const updatedBoard = await LearningBoard.findOneAndUpdate(
      { userId: userId },
      { $inc: { 'leaderboard.points': pointsToAdd } },
      { new: true, runValidators: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({ message: "LearningBoard not found for this user." });
    }

    res.status(200).json(updatedBoard);
  } catch (error) {
    console.error("Error updating user score:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getLearningBoard,
  createLearningBoard,
  updateLearningBoard,
  deleteLearningBoard,
  updateUserScore,
};
