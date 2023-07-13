const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "This email is not registerd to studyNotions",
      });
    }
    //   generate unique user id
    const token = crypto.randomUUID();
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetTokenExpires: Date.now() + 5 * 60 + 1000,
      },
      { new: true }
    );
    const url = `http://localhost:3000/update-password/${token}`;
    await mailSender(email, "Password Reset Link", `click here : ${url}`);
    return res.status(200).json({
      success: true,
      message: "Reset Email send successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Issue while reset password",
      error: err.message,
    });
  }
};

// reset password
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
    if (!password || !confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "please fill required fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirmPassword should have same value.",
      });
    }

    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }
    if (userDetails.resetTokenExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "This Link is expired",
      });
    }
    const hashedPassword = bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token: token },
      {
        password: hashedPassword,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Issue while reseting password",
    });
  }
};
