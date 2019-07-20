const path = require("path");
const expressEdge = require("express-edge");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const Post = require("./database/models/Post");

const app = new express();

mongoose
  .connect("mongodb://localhost:27017/node-blog", { useNewUrlParser: true })
  .then(() => "You are now connected to Mongo!")
  .catch(err => console.error("Something went wrong", err));

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", __dirname + "/views");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {
    posts
  });
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});
let image = "";
app.post("/posts/blogz", (req, res) => {
  // image = req.files;
  // console.log(image);

  // image.mv(path.resolve(__dirname, "public/posts", image.name), error => {
  //   Post.create(
  //     {
  //       ...req.body,
  //       image: `/posts/${image.name}`
  //     },
  //     (error, post) => {
  //       res.redirect("/");
  //     }
  //   );
  // });
  console.log("we are inside the store ");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post
  });
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
