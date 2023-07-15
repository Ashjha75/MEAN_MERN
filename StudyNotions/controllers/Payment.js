const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender ");
// const {courseEnrollementEmail}=require("../mail/templates/courseEnrollementEmail");

// capture the payment and initiate the razorpay order

exports.CapturePayment = async (req, res) => {
  const { course_id } = req.body;
  const userId = req.user.id;

  if (!course_id) {
    return res.status(401).json({
      success: false,
      message: "Please provide course id",
    });
  }
  let course;

  try {
    course = await Course.findById(course_id);
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
      data: {
        courseName: course.courseName,
        courseDescriptions: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Issue while initiating order",
      error: error.message,
    });
  }
};

// verify Signature

exports.verifySignature = async (req, res) => {
  const webhookSecret = "12345678";
  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.Hmac("sham256", webhookSecret);
  // give input to shasum
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature == digest) {
    console.log("payment is authorized");
    const { courseId, userId } = req.body.payload.payment.entity.notes;
    try {
      // fullfill yhe action
      // find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "course not found",
        });
      }

      // find the student update the course in list of enrolledcourseLit

      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );

      // send confirmation mail
      const emialResponse = await mailSender(
        enrolledStudent.email,
        "Enrolled successfully"
      );

      return res(200).json({
        success: true,
        message: "SuccessFully Enrolled",
      });
    } catch (err) {
      return res(200).json({
        success: true,
        message: "SuccessFully Enrolled",
        error: err.message,
      });
    }
  } else {
    return res(400).json({
      success: false,
      message: "Signature not matched",
    });
  }
};
