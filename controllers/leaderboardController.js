const LearningBoard = require("../models/LearningBoard.js");

// @desc    Get top 10 players for the leaderboard
// @route   GET /api/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const topPlayers = await LearningBoard.find()
      .sort({ "leaderboard.points": -1 }) // Sort by points descending
      .limit(10)
      .select("userId name avatar leaderboard.points") // Select only needed fields
      .lean();

    // Add rank and format the response to match frontend expectations
    const leaderboard = topPlayers.map((player, index) => ({
      _id: player._id,
      userId: player.userId,
      name: player.name,
      avatar: player.avatar,
      score: player.leaderboard.points, // Rename 'points' to 'score'
      rank: index + 1,
    }));

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getLeaderboard };