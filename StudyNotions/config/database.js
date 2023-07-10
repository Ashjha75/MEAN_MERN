const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Database is connected successfully.."))
    .catch((err) => {
      console.log("Issue while connecting with Database");
      console.error(err.message);
      process.exit(1);
    });
};
