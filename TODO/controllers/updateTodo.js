const Todo = require("../models/Todo");

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const response = await Todo.findByIdAndUpdate(
      { _id: "64a3a4912040c545de66e183" },
      { title, description }
    );
    res.json(response);
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry Created SuccesFully",
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      er: req.params,
      mssage: "Internal Server Error😱",
    });
  }
};
