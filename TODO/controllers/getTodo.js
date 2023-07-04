const Todo = require("../models/Todo");
exports.getTodo = async (req, res) => {
  try {
    const response = await Todo.find({
      // title: { $in: ["Example Title 16", "Example Title 11"] },
    });
    res.status(201).json({
      success: true,
      data: response,
      message: "Data fetched SucessFully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server Error",
    });
  }
};
