const expressEdge = require("express-edge");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");

const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
// Controllers
const createUserController = require("./controllers/createUser");
// creating user
const storeUserController = require("./controllers/storeUser");
// Store User
const loginController = require("./controllers/login");
// login controller
const loginUserController = require("./controllers/loginUser");
// userLogin check

const app = new express();
app.use(
  expressSession({
    secret: "secret"
  })
);
// session being used for the users

mongoose
  .connect("mongodb://localhost:27017/node-blog", { useNewUrlParser: true })
  .then(() => "You are now connected to Mongo!")
  .catch(err => console.error("Something went wrong", err));

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", __dirname + "/views");
// will render public folder

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storePost = require("./middleware/storePost");
// Middleware that will validate data

app.use("/posts/store", storePost);

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", createPostController);
app.post("/posts/store", storePostController);
// requests to the server
app.get("/auth/login", loginController);
// login route
app.post("/users/login", loginUserController);
// userLog in
app.get("/auth/register", createUserController);
// register
app.post("/users/register", storeUserController);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
