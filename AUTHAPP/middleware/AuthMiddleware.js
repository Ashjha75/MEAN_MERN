const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }
    // verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode; // user will contain role
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
        error: err.message,
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Issue while authentications",
      error: err.message,
    });
  }
};

// isStudent middleware

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role != "Student") {
      return res.status(401).json({
        success: false,
        message: "Protected route for Student",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Issue while student authorization",
      error: err.message,
    });
  }
};

// isAdmin middleware

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role != "Admin") {
      return res.status(401).json({
        success: false,
        message: "Protected route for Admin",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Issue while admin authorization",
      error: err.message,
    });
  }
};
