const express = require("express");
const router = express.Router();
const { createActivity, getActivities } = require("../controllers/recentActivityController");

// POST → insert new activity
router.post("/", createActivity);

// GET → fetch all activities
router.get("/", getActivities);

module.exports = router;
