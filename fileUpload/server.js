const express = require("express");
const fileUpload = require("express-fileupload");
const server = express();
const dbConnect = require("./config/database");
const cloud = require("./config/cloudinary");
const uploadRoutes = require("./routes/fileUpload");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

server.use(express.json());
server.use(fileUpload());
server.use("api/v1/", uploadRoutes);

dbConnect();
cloud.cloudinaryConnect();

server.listen(PORT, () => {
  console.log("Server is started at 8080.");
});

server.get("/", (req, res) => {
  res.send("<center><h1>Server is started successfully</h1></center>");
});
