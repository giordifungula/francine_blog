const User = require("../database/models/User");

module.exports = (req, res, next) => {
  if (req.session.userId) {
    alert("Logged in");
    return res.redirect("/");
  }

  next();
};
