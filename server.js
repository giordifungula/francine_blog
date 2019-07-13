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

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
