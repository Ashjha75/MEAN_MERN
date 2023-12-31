const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
  },
  courseDescription: {
    type: String,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  whatUwillLearn: {
    type: String,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratinAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratingAndReview",
    },
  ],
  price: {
    type: Number,
  },
  thumbNail: {
    type: String,
  },
  tags: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tags",
  },
  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
