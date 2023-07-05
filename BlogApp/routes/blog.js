const express = require("express");
const router = express.Router();

const { Post } = require("../controllers/postController");
const { createComment } = require("../controllers/commentController");

router.post("/comments/create", createComment);
module.exports = router;
