const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middleware/AuthMiddleware");
router.post("/signup", signup);
router.post("/login", login);

router.get("/test", auth, (req, res) => {
  res.status(201).json({
    success: true,
    message: "Test Portal",
  });
});
router.get("/student", auth, isStudent, (req, res) => {
  res.status(201).json({
    success: true,
    message: "Student Portal",
  });
});
router.get("/admin", auth, isAdmin, (req, res) => {
  res.status(201).json({
    success: true,
    message: "Admin Portal",
  });
});

module.exports = router;
