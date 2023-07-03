// import the  models
const Todo = require("../models/Todo");
//define the router handler
exports.createTodo = async (req, res) => {
  try {
    // export title and dexcription from req.body
    const { title, description } = req.body;
    // create a new Todo obj and insert in DB
    const response = await Todo.create(title, description);
    // Send he Json response with success flag
    res.status(200).json({
      sucess: true,
      data: response,
      message: "Entry Created SuccesFully",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      sucess: false,
      data: "Internal Server Error",
      message: err.message,
    });
  }
};
