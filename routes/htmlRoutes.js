var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
//
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/profile");
    }
    res.render("index");

  });

  app.get("/create-account", function(req, res) {
    res.render("signup");
});

app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/profile");
    } else {
      res.render("login")
    };
  });

  app.get("/profile", isAuthenticated, function(req, res) {
    res.render('profile');
  });

  app.get("*", function (req,res){
    res.render('404');
  })


};