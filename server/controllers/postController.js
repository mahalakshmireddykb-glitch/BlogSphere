const Post = require("../models/Post");

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content, category, image } = req.body;

        if (!title || !content || !category) {
            return res.status(400).json({
                message: "Please provide title, content and category.",
            });
        }

        const post = await Post.create({
            title,
            content,
            category,
            image: image || "",
            author: req.user.id,
        });

        const populatedPost = await Post.findById(post._id)
            .populate("author", "name email");

        res.status(201).json({
            message: "Post created successfully.",
            post: populatedPost,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create post.",
            error: error.message,
        });
    }
};

// Get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch posts.",
            error: error.message,
        });
    }
};

module.exports = {
    createPost,
    getPosts,
};