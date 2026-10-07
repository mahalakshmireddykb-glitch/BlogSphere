const express = require("express");

const {
    createPost,
    getPosts,
} = require("../controllers/postController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all posts
router.get("/", getPosts);

// Create a post - login required
router.post("/", protect, createPost);

module.exports = router;