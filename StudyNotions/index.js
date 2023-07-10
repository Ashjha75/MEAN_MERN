const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8443;
app.listen(PORT, () => console.log("SERVER IS LISTENED AT 8080"));
app.get("/", (req, res) => {
  res.send("<center><h1>SERVER IS LISTENED AT 8080</h1></center>");
});
