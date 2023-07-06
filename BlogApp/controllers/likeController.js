const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    const savedLike = await like.save();

    const updatedLikes = await Post.findByIdAndUpdate(
      post,
      {
        $push: { like: savedLike._id },
      },
      { new: true }
    )
      .populate("like")
      .exec();
    res.status(200).json({
      success: true,
      message: "Successfully liked",
      data: updatedLikes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unsuccessfull liked ",
      error: err.message,
    });
  }
};

// Unlike posts
exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;
    console.log(req.body);
    const savedunlike = await Like.findOneAndDelete({ post: post, _id: like });
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { like: savedunlike._id } },
      { new: true }
    )
      .populate("like")
      .exec();
    res.status(200).json({
      success: true,
      message: "Successfully unliked",
      data: updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unsuccessfull unliked ",
      error: err.message,
    });
  }
};
