const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DATABASE connected successfully...."))
    .catch((err) => {
      console.log("ISSUE WHILE CONNECTING DB...");
      console.error(err.message);
    });
};

module.exports = dbConnect;
