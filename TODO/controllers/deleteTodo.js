const Todo = require("../models/Todo");
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Todo.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: response,
      message: `Successfully Deleted the $(id)`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal Server Error😱",
    });
  }
};
