const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  deletePosts,
  updatePosts,
} = require("../controllers/postController");
const { createComment } = require("../controllers/commentController");
const { likePost, unlikePost } = require("../controllers/likeController");

router.post("/comments/create", createComment);
router.post("/post/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);
router.delete("/posts/delete", deletePosts);
router.put("/posts/update/:id", updatePosts);
module.exports = router;
