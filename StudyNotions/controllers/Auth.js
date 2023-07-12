const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcrypt");
const OtpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered with this email.",
      });
    }
    let otp = OtpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // check unique Otp or not
    const isUniqueOtp = await Otp.findOne({ otp: otp });
    while (isUniqueOtp) {
      otp = OtpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      isUniqueOtp = await Otp.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    // create an entry in DB
    const otpBody = Otp.create(otpPayload);

    res.status(200).json({
      success: true,
      message: "Otp sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Otp can't sent successfully",
      error: err.message,
    });
  }
};

// SIGNUP HANDLER
expxorts.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "Please fill required fields.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirmPassword should have same value.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(402).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    // find most recent OTP stored for  the user
    const mostRecentOtp = await Otp.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    // validate otp
    if (mostRecentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP  FOUND.",
      });
    } else if (otp !== mostRecentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "OTP NOT VALID OR FOUND.",
      });
    }
    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create profile for additionalDetails
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      passwprd: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `
    https://api.dicebear.com/6.x/pixel-art/svg?seed=${firstName} ${lastName}`,
    });
    res.status(200).json({
      success: false,
      message: "User is registerd  successfully",
      error: err.message,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User can't be registerd Please try again ",
      error: err.message,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "please fill required fields",
      });
    }
    const user = await User.findOne({ email }.populate("additionalDetails"));
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registered please signup first",
      });
    }
    // generate JWT after password matches

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 + 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "password is incorrect",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login Failure ,please try again",
      error: err.message,
    });
  }
};

// Change password
exports.changePasword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(401).json({
        success: false,
        message: "please fill required fields",
      });
    }

    if (password == newPassword) {
      return res.status(400).json({
        success: false,
        message: "newPassword should be different from old Password .",
      });
    } else if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirmPassword should have same value.",
      });
    }

    const hashedNewPassword = bcrypt.hash(newPassword, 10);
    // update pass in Db
    // send mail
    //return response
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Issue while changing password.",
      error: err.message,
    });
  }
};
