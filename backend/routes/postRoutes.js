const express = require("express");
const Post = require("../models/Post");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { caption, imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required"
      });
    }

    const post = await Post.create({
      caption,
      imageUrl,
      user: req.user._id
    });

    const populatedPost = await post.populate(
      "user",
      "username fullName profilePic"
    );

    res.status(201).json({
      success: true,
      post: populatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username fullName profilePic")
      .populate("comments.user", "username profilePic")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.put("/:id/like", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    const alreadyLiked = post.likes.includes(req.user._id);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("user", "username fullName profilePic")
      .populate("comments.user", "username profilePic");

    res.json({
      success: true,
      post: updatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.post("/:id/comment", protect, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required"
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    post.comments.push({
      text,
      user: req.user._id
    });

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("user", "username fullName profilePic")
      .populate("comments.user", "username profilePic");

    res.json({
      success: true,
      post: updatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own post"
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: "Post deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;