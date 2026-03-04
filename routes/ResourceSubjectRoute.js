// routes/subjectRoutes.js
const express = require("express");
const router = express.Router();
const { getSubjects } = require("../controllers/ResourceSubjectController");

router.get("/", getSubjects);

module.exports = router;
