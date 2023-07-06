const Post = require("../models/postModel");
const Comment = require("../models/coomentModel");
const Like = require("../models/likeModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });
    const savePost = await post.save();
    res.status(200).json({
      success: true,
      post: savePost,
      message: "Successfully Created Post",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Issue while creating posts",
      error: err.message,
    });
  }
};

// Get All Post

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("comments")
      .populate("like")
      .exec();
    res.status(200).json({
      success: true,
      post: posts,
      message: "Successfully Fetched Post",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Issue while fetching posts",
      error: err.message,
    });
  }
};

// Delete Controller for Post

exports.deletePosts = async (req, res) => {
  try {
    const { id, like, comment } = req.body;
    const deletePost = await Post.findByIdAndDelete(id);
    const deleteLike = await Like.findByIdAndDelete(like);
    const deleteComment = await Comment.findByIdAndDelete(comment);
    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
      message: "Issue while Deleting",
    });
  }
};

// Update controller for post

exports.updatePosts = async (req, res) => {
  try {
    const { title, body } = req.body;
    const { id } = req.params;
    const updatePosts = await Post.findByIdAndUpdate(
      { _id: id },
      {
        title,
        body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatePosts,
      message: "Successfully update",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
      message: "Issue while update",
    });
  }
};
