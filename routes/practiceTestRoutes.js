const express = require("express");
const router = express.Router();
const {
  getAllTests,
  getTestById,
  createTest
} = require("../controllers/practiceTestController");

router.get("/", getAllTests);      // GET /api/practice-tests
router.get("/:id", getTestById);   // GET /api/practice-tests/:id
router.post("/", createTest);      // POST /api/practice-tests

module.exports = router;
