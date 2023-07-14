const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender ");
// const {courseEnrollementEmail}=require("../mail/templates/courseEnrollementEmail");

// capture the payment and initiate the razorpay order

exports.CapturePayment = async (req, res) => {
  try {
    const { course_id } = req.body;
    const userId = req.user.id;

    if (!course_id) {
      return res.status(401).json({
        success: false,
        message: "Please provide course id",
      });
    }

    try {
      const course = await Course.findById(course_id);
      if (!course) {
        return res.status(401).json({
          success: false,
          message: "Could not find the course",
        });
      }

      // check user is already present or not
      const uid = new mongoose.Types.ObjectId(userId);
      if (Course.studentsEnrolled.includes(uid)) {
        return res.status(401).json({
          success: false,
          message: "Student is already enrollled",
        });
      }
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Please provide course id2",
        error: error.message,
      });
    }

    const amount = course_price;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency: currency,
      reciept: Math.random(Date.now()).toString(),
      notes: {
        courseId: course_id,
        userId,
      },
    };
    try {
      // initiate the payment using razorpay

      const paymentResponse = await instance.orders.create(options);
      return res.status(201).json({
        success: true,
        message: "SuccessFully initiated order",
        data: [(courseName: course.co)],
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Issue while initiating order",
        error: error.message,
      });
    }
  } catch (err) {}
};
