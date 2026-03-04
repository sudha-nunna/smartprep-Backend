const express = require("express");
const { getSuccessStories, createSuccessStory } = require("../controllers/successController");

const router = express.Router();

router.get("/", getSuccessStories);
router.post("/", createSuccessStory);

module.exports = router;
