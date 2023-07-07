const express = require("express");
const server = express();
const dbConnect = require("./config/database");
const user = require("./router/authRoute");
require("dotenv").config();
const cookiePareser = require("cookie-parser");
PORT = process.env.PORT;
server.use(express.json());
server.use(cookiePareser());
server.listen(PORT, () => console.log("SERVER STARTED @ 8080...."));
server.use("/api/v1", user);
server.get("/", (req, res) => {
  res.send("<center>this is base server page</center>");
});
dbConnect();
