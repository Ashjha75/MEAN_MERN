const mongoose = require("mongoose");

const fileUpload = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model("File", fileUpload);
