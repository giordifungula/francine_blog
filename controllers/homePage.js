const Post = require("../database/models/Post");
// Require the database

module.exports = async (req, res) => {
  const posts = await Post.find({});

  res.render("index", {
    posts
  });
};
