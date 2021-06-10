const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { validate, response } = require("../utilities/serverHelper");
const { uploadImage, deleteImage } = require("../utilities/cloudinary");

// Models
const User = require("../models/User");
const Post = require("../models/Post");

// Add post
router.post("/add", auth, async (req, res) => {
  try {
    let image;
    const valid = validate(req.body, { image });
    if (!valid.success) return response(res, 400, true, valid.message);

    const user = await User.findById(req.user.id).select("-password");

    // Prepare an object with the available fields
    const createPost = {};
    createPost.user = req.user.id;
    createPost.fullName = `${user.firstName} ${user.lastName}`;

    // Upload the image to Cloudinary and save the neccessary info
    const reply = await uploadImage(req.body.image, "posts");

    createPost.image = {};
    createPost.image.publicID = reply.public_id;
    createPost.image.url = reply.secure_url;
    if (req.body.caption) createPost.caption = req.body.caption;

    let post = new Post(createPost);
    await post.save();

    return response(res, 200, true, "Post added successfully.", post);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

// Get all posts
router.get("/all", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    if (!posts) {
      return response(res, 500, false, "No posts found.");
    }

    return response(res, 200, true, "All posts fetched successfully.", posts);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

// Get all posts of a single user
router.get("/all/:id", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id }).sort({ date: -1 });

    if (!posts) {
      return response(res, 500, false, "No posts found.");
    }

    return response(res, 200, true, "All posts fetched successfully.", posts);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

//Get a single post
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return response(res, 400, false, "Post does not exist.");

    return response(res, 200, true, "Post fetched successfully.", post);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

// Delete a single post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Can only delete your own post
    if (post.user.toString() !== req.user.id)
      return response(res, 401, false, "Access denied.");

    // Delete the image from Cloudinary
    await deleteImage(post.image.publicID);

    await post.remove();

    return response(res, 200, true, "Post deleted successfully.");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

// Like the post
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if this user has already liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    )
      return response(res, 400, false, "Already liked the post.");

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return response(res, 200, true, "Post liked successfully.", post.likes);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

// UnLike the post
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if this user has already liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    )
      return response(res, 400, false, "Post has not been liked yet.");

    // Go through the list of likes and delete this user from it
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    return response(res, 200, true, "Post unliked successfully.", post.likes);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

// Add Comment on Post
router.post("/comment/:id", auth, async (req, res) => {
  try {
    let text;
    const valid = validate(req.body, { text });
    if (!valid.success) return response(res, 400, false, valid.message);

    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);

    const createComment = {};
    createComment.user = req.user.id;
    createComment.fullName = `${user.firstName} ${user.lastName}`;
    createComment.text = req.body.text;

    post.comments.push(createComment);

    await post.save();

    return response(
      res,
      200,
      true,
      "Comment added successfully.",
      post.comments
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

// Delete Comment from post
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Pull the comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) return response(res, 400, false, "Comment does not exist.");

    // Can only delete your own comment
    if (comment.user.toString() !== req.user.id)
      return response(res, 401, false, "Access denied.");

    await comment.remove();
    await post.save();

    return response(
      res,
      200,
      true,
      "Comment deleted successfully.",
      post.comments
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error.");
  }
});

module.exports = router;
