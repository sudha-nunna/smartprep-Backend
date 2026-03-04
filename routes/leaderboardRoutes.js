const express = require("express");
const { getLeaderboard } = require("../controllers/leaderboardController.js");

const router = express.Router();

// GET /api/leaderboard
router.get("/", getLeaderboard);

module.exports = router;
