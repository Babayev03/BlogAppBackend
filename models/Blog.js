const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  avatar: {
    type: String,
    default: "https://loremflickr.com/640/480/landscape",
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
