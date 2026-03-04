const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// GET all courses with count
router.get("/", courseController.getCourses);

// POST a new course
router.post("/", courseController.addCourse);

module.exports = router;