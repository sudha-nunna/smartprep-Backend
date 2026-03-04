const express = require("express");
const router = express.Router();
const {
  getTutors,
  getTutorById,
  createTutor,
  updateTutor,
  deleteTutor
} = require("../controllers/tutorController");

router.get("/", getTutors);         // Get all tutors
router.post("/", createTutor);      // Add new tutor
router.get("/:id", getTutorById);   // Get tutor by ID
router.put("/:id", updateTutor);    // Update tutor
router.delete("/:id", deleteTutor); // Delete tutor

module.exports = router;
