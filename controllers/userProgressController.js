const LearningBoard = require("../models/LearningBoard");

// Shape this response to match FRONTEND userProgressSlice expectations.
exports.getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    const board = await LearningBoard.findOne({ userId }).lean();
    if (!board) {
      return res.status(404).json({ message: "LearningBoard not found for user." });
    }

    const subjectProgress = (board.scores || []).map((s) => ({
      subject: s.subject,
      totalTests: 1,
      completedTests: 1,
      averageScore: s.score || 0,
      bestScore: s.score || 0,
      timeSpent: 0,
      weakTopics: [],
      strongTopics: [],
    }));

    const response = {
      subjectProgress,
      achievements: [],
      studyStreak: {
        currentStreak: board.streaks?.current || 0,
        longestStreak: board.streaks?.longest || 0,
        lastStudyDate: new Date().toISOString().split("T")[0],
      },
      totalTestsCompleted: board.progress?.testsTaken || 0,
      totalTimeStudied: 0,
      overallAverageScore: board.progress?.overallScore || 0,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

