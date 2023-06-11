const Blog = require("../models/Blog");
const express = require("express");
const User = require("../models/User");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const BlogController = {
  home: (req, res) => {
    res.send("Welcome to Blog API");
  },
  getAll: (req, res) => {
    Blog.find()
      .then((result) => {
        if (result.length === 0) {
          return res
            .status(404)
            .json({ success: false, errors: { msg: "No Blogs found" } });
        }
        res.json(result);
      })
      .catch((err) => res.json(err));
  },

  getById: (req, res) => {
    Blog.findById(req.params.id)
      .then((result) => {
        if (!result) {
          return res
            .status(404)
            .json({ success: false, errors: { msg: "Blog not found" } });
        }
        res.json(result);
      })
      .catch((err) => res.json(err));
  },

  create: (req, res) => {
    let newBlog = new Blog({
      title: req.body.title,
      description: req.body.description,
      avatar: req.body.avatar,
    });

    newBlog
      .save()
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },

  update: (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((result) => {
        if (!result) {
          return res
            .status(404)
            .json({ success: false, errors: { msg: "Blog not found" } });
        }
        res.json(result);
      })
      .catch((err) => res.json(err));
  },

  delete: (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
      .then((result) => {
        if (!result) {
          return res
            .status(404)
            .json({ success: false, errors: { msg: "Blog not found" } });
        }
        res.json(result);
      })
      .catch((err) => res.json(err));
  },
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({
          success: false,
          errors: { msg: "User already exists" },
        });
      }

      // Create a new user
      const newUser = new User({ email, password });
      // const salt = await bcrypt.genSalt(10);
      // const hash = bcrypt.hash(newUser.password, salt);
      // newUser.password = hash;
      await newUser.save();

      res.json({
        success: true,
        newUser,
      });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, errors: { msg: "Internal Server Error" } });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.json({
          success: false,
          errors: { msg: "User not found" },
        });
      }

      // Compare passwords
      if (password !== user.password) {
        return res.json({
          success: false,
          errors: {
            msg: "Invalid email or password",
          },
        });
      }

      // Generate a token
      let token = jwt.sign({ email: email }, process.env.privateKey, {
        // algorithm:'ES512'
        issuer: "Code Academy",
      });

      // Return the token to the client
      res.json({ success: true, token });
    } catch (err) {
      res.status(500).json({
        success: false,
        errors: { msg: "Internal Server Error", err: err },
      });
    }
  },
};

module.exports = BlogController;
