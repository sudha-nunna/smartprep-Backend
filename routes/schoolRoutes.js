const express = require("express");
const routes = express.Router();
const { getAllSchools, getSchools } = require("../controllers/schoolController");

// Old route (all schools) — keep for backward compatibility
routes.get("/all", getAllSchools);

// New route: paginated endpoint
// Usage: GET /api/schools?page=1&limit=20
routes.get("/", getSchools);

module.exports = routes;
