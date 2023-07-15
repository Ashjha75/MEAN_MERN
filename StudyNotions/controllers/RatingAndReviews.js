const ratingAndReview = require("../models/ratingAndReview");
const Course = require("../models/course");
const { default: mongoose } = require("mongoose");

// createRating
exports.createRating = async (req, res) => {
  try {
    // get user id
    const userId = req.user.id;
    // fetchdata from req body
    const { rating, review, courseId } = req.body;
    // check if user is enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $eleMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course.",
      });
    }
    const alreadyReviewed = await ratingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course is already revied by the user ",
      });
    }
    // create the review and rating
    const ratingReview = await ratingAndReview.create({
      rating,
      review,
      course: courseId,
      user,
    });
    // update course with this rating/review
    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: { ratingAndReview: ratingAndReview._id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Rating review created successfully ",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    // calculate avg rating
    const result = await ratingAndReview.aggregate([
      {
        $match: { course: new mongoose.Types.ObjectId(courseId) },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Average Rating is 0",
        averageRating: 0,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Issue in averageRating",
      error: err.message,
    });
  }
};

// get all Rating and Reviews
exports.getAllRatingAndReview = async (req, res) => {
  try {
    const allReviews = await ratingAndReview
      .find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({ path: "course", select: "courseName" })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successf",
      data:allReviews,
    });
  } catch (err) {return res.status(500).json({
    success: false,
    message: "Issue in fetching all Rating and review",
    error: err.message,
  });}
};
