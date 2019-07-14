const express = require("express");

const app = new express();

const path = require("path");
const router = express.Router();

app.use(express.static("public"));
// load the static pages

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/index.html"));
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

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
