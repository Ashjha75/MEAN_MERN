const Post = require("../models/postModel");
const Comment = require("../models/coomentModel");
exports.createComment = async (req, res) => {
  console.log(req.body);
  try {
    const { post, user, body } = req.body;
    const comment = new Comment({
      post,
      user,
      body,
    });
    const saveComment = await comment.save();

    // find the post by ID ,add the new comment to its array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: saveComment._id } },
      { new: true }
    )
      .populate("comments") //Populates the comment array with the comments document
      .exec();
    res.status(200).json({
      success: true,
      message: "Successfully comment created",
      data: updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: req.body,
      message: "Issue whtile creating comments",
      error: err.message,
    });
  }
};
