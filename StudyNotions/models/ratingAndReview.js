const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    reqired: true,
  },
  review: {
    type: String,
    reqired: true,
  },
});

module.exports = mongoose.model(" ratingAndReview", ratingAndReviewSchema);
