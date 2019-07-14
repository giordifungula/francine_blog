const mongoose = require("mongoose");
// linking to the database

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String
  //   Database content
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
