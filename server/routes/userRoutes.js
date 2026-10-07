const express = require("express");

const {
    getUserProfile,
    updateProfile,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get a user's profile
router.get("/:id", getUserProfile);

// Update logged-in user's profile
router.put("/profile", protect, updateProfile);

module.exports = router;