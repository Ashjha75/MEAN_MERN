const mongoose = require("mongoose");
require("dotenv").config();
const DBconnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfull Connection with DATABASE"))
    .catch((err) => {
      console.log("Issue in Connection with DATABASE");
      console.error.err.message;
      process.exit(1);
    });
};
module.exports = DBconnect;
