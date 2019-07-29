module.exports = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
    // res.send(401);
    console.log("Logged out");
  });
};
