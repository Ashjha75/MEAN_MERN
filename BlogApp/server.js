// const express = require("express");
// const server = express();

// const DBconnection = require("./config/dataBase");
// const blogRoutes = require("./routes/blog");
// require("dotenv").config();

// const PORT = process.env.PORT || 8080;

// // middleware
// server.use(express.json());
// // Mount
// // server.use("/api/v1", blogRoutes);

// server.listen(8080, () => {
//   console.log("Succefully server listened");
// });
// server.get("/", (req, res) =>
//   res.send("<h1 class='bg-primary'>This is my 1st Tab</h1>")
// );
// DBconnection();

const express = require("express");
const DBconnection = require("./config/database");
const blogRoutes = require("./routes/blog");
require("dotenv").config();
const server = express();
server.use(express.json());
const PORT = process.env.PORT || 8080;
server.use("/api/v1", blogRoutes);
server.listen(PORT, () => console.log("server initialised"));

server.get("/", (req, res) => res.send("<h1>This is my 2nd Tab</h1>"));
DBconnection();
