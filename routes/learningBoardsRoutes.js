const express = require("express");
const { getLearningBoard, createLearningBoard, updateLearningBoard, deleteLearningBoard, updateUserScore } = require("../controllers/learningBoardController.js");

const router = express.Router();

// GET LearningBoard by userId
router.get("/:userId", getLearningBoard);

// POST create LearningBoard
router.post("/", createLearningBoard);

// PUT update LearningBoard
router.put("/:userId", updateLearningBoard);

// PATCH update a user's score
router.patch("/:userId/score", updateUserScore);

router.delete("/:userId", deleteLearningBoard);

module.exports = router;
