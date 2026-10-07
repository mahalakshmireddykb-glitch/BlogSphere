const express = require("express");

const {
    createComment,
    getComments,
} = require("../controllers/commentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get comments for a post
router.get("/:postId", getComments);

// Create a comment or reply - login required
router.post("/", protect, createComment);

module.exports = router;