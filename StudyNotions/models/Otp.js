const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expire: 5 * 60,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
  } catch (err) {
    console.log(
      "error occurs while sending the otp verification mail ::  ",
      err
    );

    throw err;
  }
}

module.exports = mongoose.model("Otp", otpSchema);
