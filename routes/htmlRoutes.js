var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
//
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    res.render('index');
  });

  app.get("/book-preview", function(req, res) {
    res.render("book-preview");
});

  app.get("/book", function(req, res) {
    res.render("book");
});


  app.get("/create-account", function(req, res) {

      res.render("create-account");
});


app.get("/login", function(req, res) {
  res.render("login");
});

  app.get("/profile", isAuthenticated, function(req, res) {
    res.render('profile');
  });

  app.get("*", function (req,res){
    res.render('404');
  })


};