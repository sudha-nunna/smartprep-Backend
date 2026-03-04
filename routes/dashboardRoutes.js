const express = require("express");
const router = express.Router();
const { getDashboard, updateDashboard } = require("../controllers/dashboardController");

router.get("/", getDashboard);
router.put("/:id", updateDashboard);

module.exports = router;
