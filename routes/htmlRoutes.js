var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
      res.render("index");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
});

app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/login/members");
    } else {
      res.render("login")
    };
  });

  app.get("/login/members", isAuthenticated, function(req, res) {
    res.render('members');
  });
};