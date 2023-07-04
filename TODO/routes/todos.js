const express = require("express");
const router = express.Router();

// import controller
const { createTodo } = require("../controllers/createTodo"); // Assuming createTodo is a function within the controller file
const { getTodo } = require("../controllers/getTodo");
const { updateTodo } = require("../controllers/updateTodo");
const { deleteTodo } = require("../controllers/deleteTodo");
// define API routes
router.post("/createTodo", createTodo);
router.get("/getTodo", getTodo);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);
module.exports = router;
