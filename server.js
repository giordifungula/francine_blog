const express = require("express");

const app = new express();

const path = require("path");

const expressEdge = require("express-edge");
// expressEdge will use template engine
const mongoose = require("mongoose");
// mongoose data base
const router = express.Router();

app.use(express.static("public"));
// load the static pages
app.use(expressEdge);
app.set("views", __dirname + "/views");
// will render the routing pages

// // Requests will be here
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "pages/index.html"));
// });

app.get("/", (req, res) => {
  res.render("index");
});

// Renders the home page
app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/about.html"));
});
// render the about page
app.get("/contact", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/contact.html"));
});
// render the contact page
app.get("/post", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/post.html"));
});
// render the post page

// Database
mongoose
  .connect("mongodb://localhost:27017/node-blog", { useNewUrlParser: true })
  .then(() => "You are now connected to Mongo!")
  .catch(err => console.error("Something went wrong", err));

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
