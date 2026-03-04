// routes/resourceTypeRoutes.js
const express = require("express");
const { getAllResourceTypes } = require("../controllers/resourceTypeController");

const router = express.Router();

router.get("/", getAllResourceTypes);

module.exports = router;
