const express = require("express");
const router = express.Router();

const { getUserProgress } = require("../controllers/userProgressController");

// GET /api/user-progress/:userId
router.get("/:userId", getUserProgress);

module.exports = router;

