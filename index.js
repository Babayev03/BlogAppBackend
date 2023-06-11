const express = require("express");
const app = express();
const database = require("./config/db");
const blogRouter = require("./routes/BlogRoutes");
const env = require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(express.json());
app.use(cors());

// Connect to database
database.connect();

//
app.use((req, res, next) => {
  if (req.url == "/api/register"|| req.url == "/api/login") {
    next();
  } else {
    //kullanıcının bana gönderdiği tokenı header üzerinden aldım
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];
      try {
        jwt.verify(token, process.env.privateKey);
        next();
      } catch (error) {
        res.status(401).json({ msg: "Hayırdır komşu nereye böyle..." });
      }
    } else {
      res.status(401).json({ msg: "Hayırdır komşu nereye böyle..." });
    }
  }
});
app.use("/", blogRouter);

//
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
