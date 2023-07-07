const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { options } = require("../router/authRoute");
require("dotenv").config();
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists ",
      });
    }

    let hashedpass;
    try {
      hashedpass = await bcrypt.hash(password, 10);
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "error while encryption",
      });
    }
    const user = await User.create({
      name,
      email,
      password: hashedpass,
      role,
    });
    res.status(200).json({
      success: true,
      message: "Successfully signup.",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
      message: "Issue while signup process, please Signup later.",
    });
  }
};

// Login controller

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    const options = {
      expiresIn: new Date(Date.now() + 30000),
      httpOnly: true,
    };

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill required fields ",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found! ",
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      res.cookie("token", token, options).status(201).json({
        success: true,
        message: "Successfully Logged in",
        token,
        user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password not matched! ",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
      message: "Issue while login process, please fill correct data.",
    });
  }
};
