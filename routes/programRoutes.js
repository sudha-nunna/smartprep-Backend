const express = require("express");
const { getPrograms, createProgram } = require("../controllers/programController.js");

const router = express.Router();

// Get all programs
router.get("/", getPrograms);

// Add a new program
router.post("/", createProgram);

module.exports = router;
