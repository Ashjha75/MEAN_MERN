const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const fileUpload = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileUpload.post("save", async function (doc) {
  try {
    console.log("doc", doc);
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // send mail

    await transporter.sendMail({
      from: `Ashish jha`,
      to: doc.email,
      subject: `New file successfully uploaded on cloudinary`,
      text: "file uploaded",
      html: `<center><h2>File uploaded </h2></center> <p> Hi ${doc.name}, You have successfully uploaded the image on cloudinary. </p><br/> <div>View here :   <a href="${doc.fileUrl}">${doc.fileUrl}/><br/></div><br/><br/><h5>Thanking You</h5><br/><p> Cloudinary </p>`,
    });
  } catch (err) {
    console.log("error in transporter");
    console.log(err.message);
  }
});
module.exports = mongoose.model("File", fileUpload);
