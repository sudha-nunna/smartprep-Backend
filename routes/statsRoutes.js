const express = require('express');
const router = express.Router();
const {
  getStats,
  createStats,
  updateStats,
} = require('../controllers/statsController');
const { protect } = require('../controllers/authController');


router
  .route('/')
  // @route   GET /api/stats
  .get(getStats)
  // @route   POST /api/stats
  .post(protect, createStats)
  
  .put(protect, updateStats);

module.exports = router;
