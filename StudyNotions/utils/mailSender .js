const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporte = nodemailer.createTransport({
      host: process.env.MAIL_USER,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.Mail_PASS,
      },
    });

    let info = await transporte.sendMail({
      from: "Study Notion - By Ashish",
      to: `${email}`,
      subject: `${title}`,
      html: `{body}`,
    });
  } catch (err) {
    console.log("ERROR WHILE SENDING MAIL....");
  }
};
