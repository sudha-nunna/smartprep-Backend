const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// Get all users
router.get('/', getAllUsers);

// Get user by email
router.get("/by-email/:email", authController.protect, getUserByEmail);

// Get user by ID
router.get('/:id', getUserById);

// Update user by ID
router.put('/:id', updateUser);

// Delete user by ID
router.delete('/:id', deleteUser);

module.exports = router;