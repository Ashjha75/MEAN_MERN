const express = require("express");
const router = express.Router();
const {
  localFileUpload,
  fileUpload,
  videoUpload,
} = require("../controllers/fileUpload");
router.post("/localFileUpload", localFileUpload);
router.post("/fileUpload", fileUpload);
router.post("/videoUpload", videoUpload);
module.exports = router;
