const mongoose = require("mongoose");
require("dotenv").config();

DBconnection = () => {
  mongoose
    .connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected successFully..."))
    .catch((err) => {
      console.log("Issue in connecting Database...");
      console.log(err.message);
      process.exit(1);
    });
};
module.exports = DBconnection;
