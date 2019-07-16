const express = require("express");

const app = new express();

const path = require("path");

const expressEdge = require("express-edge");
// expressEdge will use template engine
const mongoose = require("mongoose");
// mongoose data base
const router = express.Router();

const bodyParser = require("body-parser");
// body parser to collect data from forms
const Post = require("./database/models/Post");

app.use(express.static("public"));
// load the static pages
app.use(expressEdge);
app.set("views", __dirname + "/views");
// will render the routing pages
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// setting up body parser
app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {
    posts
  });
});
// Fetch Data from database

// // Requests will be here
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "pages/index.html"));
// });

// app.get("/", (req, res) => {
//   res.render("index");
// });
// Renders the home page

app.get("/posts/new", (req, res) => {
  res.render("create");
  // will go to the views and find the create edge file
});
app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/about.html"));
});
// render the about page
app.get("/contact", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/contact.html"));
});
// render the contact page

app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  // Get the current item id ( which is like number on the database )
  res.render("post", {
    post
  });
});

app.post("/posts/store", (req, res) => {
  console.log(req.body);
  Post.create(req.body, (error, post) => {
    res.redirect("/");
  });
  // About to create a post
});

// Database
mongoose
  .connect("mongodb://localhost:27017/node-blog", { useNewUrlParser: true })
  .then(() => "You are now connected to Mongo!")
  .catch(err => console.error("Something went wrong", err));

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
