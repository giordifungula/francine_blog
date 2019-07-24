const User = require("../database/models/User");

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      return res.redirect("/auth/register");
    }
    res.redirect("/");
    // if you have created the user redirect then to home page
  });
};
