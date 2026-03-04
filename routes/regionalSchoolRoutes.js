const express = require("express");
const router = express.Router();
const { getAllSchools, getSchoolsByRegion } = require("../controllers/regionalschoolController");;

// GET all schools
router.get("/", getAllSchools);

// GET schools by regionId
router.get("/region/:regionId", getSchoolsByRegion);

module.exports = router;
