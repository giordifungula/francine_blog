module.exports = (req, res) => {
  if (req.session.userId) {
    return res.render("create");
  }

  res.redirect("/auth/login");
};
// adding a session that will allow the loggin in user to post
