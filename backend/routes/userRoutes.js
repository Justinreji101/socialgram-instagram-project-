const express = require("express");
const User = require("../models/User");
const Post = require("../models/Post");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   UPDATE MY PROFILE
   PUT /api/users/profile/update
========================= */
router.put("/profile/update", protect, async (req, res) => {
  try {
    const { fullName, bio, profilePic } = req.body;

    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (bio !== undefined) user.bio = bio;

    // local image base64 / normal URL both supported
    if (profilePic !== undefined && profilePic !== "") {
      user.profilePic = profilePic;
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        bio: user.bio,
        profilePic: user.profilePic,
        followers: user.followers || [],
        following: user.following || []
      }
    });
  } catch (error) {
    console.log("Profile update error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Profile update failed"
    });
  }
});

/* =========================
   GET USER PROFILE
   GET /api/users/:id
========================= */
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const posts = await Post.find({ user: user._id })
      .populate("user", "username fullName profilePic")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      user,
      posts
    });
  } catch (error) {
    console.log("Get user error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* =========================
   FOLLOW / UNFOLLOW USER
   PUT /api/users/:id/follow
========================= */
router.put("/:id/follow", protect, async (req, res) => {
  try {
    const currentUserId = req.user?._id || req.user?.id;
    const targetUserId = req.params.id;

    if (!currentUserId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    if (targetUserId === currentUserId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself"
      });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    currentUser.following = currentUser.following || [];
    targetUser.followers = targetUser.followers || [];

    const alreadyFollowing = currentUser.following.some(
      (id) => id.toString() === targetUser._id.toString()
    );

    if (alreadyFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUser._id.toString()
      );

      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUser._id.toString()
      );
    } else {
      currentUser.following.push(targetUser._id);
      targetUser.followers.push(currentUser._id);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({
      success: true,
      message: alreadyFollowing ? "Unfollowed" : "Followed",
      following: currentUser.following,
      followers: targetUser.followers
    });
  } catch (error) {
    console.log("Follow error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;