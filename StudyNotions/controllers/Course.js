const Course = require("../models/course");
const Tags = require("../models/categories");
const User = require("../models/User");

const { uploadImageToCloudinary } = require("../utils/imageUploader");

require("dotenv").config();
// createcourse handler function

exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, whatUwillLearn, price, tags } =
      req.body;

    const thumbNail = req.files.thumbNailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatUwillLearn ||
      !price ||
      !tags
    ) {
      return res.status(401).json({
        success: false,
        message: "Please fill required fields",
      });
    }

    // check for Instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }

    // check for Tag
    const tagDetails = await User.findById(tag);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag details not found",
      });
    }

    //Upload image to cloudinary

    const thumbNailImage = await uploadImageToCloudinary(
      thumbNail,
      process.env.FOLDER_NAME
    );

    // create an entry for new course
    const newCourse = Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatUwillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbNailImage.secure_url,
    });

    // update INSTRUCTOR
    await User.findOneAndUpdate(
      { _id: instructorDetails._id },
      { $push: { course: newCourse._id } },
      { new: true }
    );

    // update tags
    await User.findOneAndUpdate(
      { _id: tagDetails._id },
      { $push: { tags: tagDetails._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "course created successfully",
      data: newCourse,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
      message: "Issue while creating course",
    });
  }
};

exports.findAllCourse = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        instructor: true,
        price: true,
        thumbnail: true,
        ratingAndReview: true,
        studentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "course fetched successfully",
      data: newCourse,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
      message: "Issue while fetching course",
    });
  }
};
