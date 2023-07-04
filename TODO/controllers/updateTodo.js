const Todo = require("../models/Todo");

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const response = await Todo.findByIdAndUpdate(
      { _id: id },
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
