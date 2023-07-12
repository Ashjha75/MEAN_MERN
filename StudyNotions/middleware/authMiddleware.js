const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.headers("Authorisation").replace("Bearer", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
        error: err.message,
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
        error: err.message,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Authentication fails",
      error: err.message,
    });
  }
};

// isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route",
        error: err.message,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Isue in Student role",
      error: err.message,
    });
  }
};

// isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route",
        error: err.message,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Isue in Instructor role",
      error: err.message,
    });
  }
};

// isAdmin

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route",
        error: err.message,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Isue in Admin role",
      error: err.message,
    });
  }
};
