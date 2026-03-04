const express = require("express");
const { getMetrics, createMetrics } = require("../controllers/metricsController");

const router = express.Router();

router.get("/", getMetrics);
router.post("/", createMetrics);

module.exports = router;
