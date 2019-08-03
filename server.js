if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// Check if we are in production

const expressEdge = require("express-edge");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const mongoStore = connectMongo(expressSession);
const edge = require("edge.js");

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
// logout
const logoutController = require("./controllers/logout");

const connectFlash = require("connect-flash");

const db = require("./config/keys").mongoURI;

// Connection URI
const CONNECTION_URI = 1;

const PORT = process.env.PORT || 4000;

const app = new express();

const storePost = require("./middleware/storePost");
// Middleware that will validate data
// userLogin check
const auth = require("./middleware/auth");

const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");

app.use(connectFlash());
// displaymessages

// app.use(
//   expressSession({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true
//   })
// );
// session being used for the users

mongoose
  .connect("mongodb://localhost:27017/node-blog", { useNewUrlParser: true })
  .then(() => "You are now connected to Mongo!")
  .catch(err => console.error("Something went wrong", err));
// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true
// });

// Resetting content back to normal
// mongoose
//   .connect(db, {
//     useNewUrlParser: true
//   })
//   .then(() => {
//     console.log("MongoDB Connected");
//   })
//   .catch(err => {
//     console.log(err);
//     console.log("MongoDB Not Connected");
//   });

mongoose.set("useCreateIndex", true);
// setCreate

app.use(
  expressSession({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", __dirname + "/views");
// will render public folder

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/posts/store", storePost);

// app.get("/", homePageController);
// app.get("/post/:id", getPostController);
// app.get("/posts/new", auth, createPostController);
// // only if user is logged inside
// app.post("/posts/store", storePostController);
// // requests to the server
// app.get("/auth/login", loginController);
// // login route
// app.post("/users/login", loginUserController);
// // userLog in
// app.get("/auth/register", createUserController);
// // register
// app.post("/users/register", storeUserController);
app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", auth, createPostController);
app.post("/posts/store", auth, storePost, storePostController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/auth/logout", logoutController);

app.listen(process.env.PORT || 4000);
