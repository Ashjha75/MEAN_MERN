const express = require("express");
const server = express();

// Load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware to parse json request body
server.use(express.json());

// import routes
const todoRoutes = require("./routes/todos");

// mount the todo ASPI routes
server.use("/api/v1", todoRoutes);

server.listen(8080, () => {
  console.log("Server ok1");
});

// connecting with database
const DBconnect = require("./config/dataBase");
DBconnect();

// default Routes
server.get("/", (req, res) => {
  console.log("OKKK  " + process.env.DATABASE_URL);
});
