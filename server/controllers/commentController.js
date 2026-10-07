const Comment = require("../models/Comment");

// Create a comment or reply
const createComment = async (req, res) => {
  try {
    const { content, postId, parentComment } = req.body;

    if (!content || !postId) {
      return res.status(400).json({
        message: "Comment content and post ID are required.",
      });
    }

    const comment = await Comment.create({
      content,
      post: postId,
      author: req.user.id,
      parentComment: parentComment || null,
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate("author", "name email");

    res.status(201).json({
      message: "Comment added successfully.",
      comment: populatedComment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add comment.",
      error: error.message,
    });
  }
};

// Get comments for a post
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("author", "name email")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch comments.",
      error: error.message,
    });
  }
};

module.exports = {
  createComment,
  getComments,
};