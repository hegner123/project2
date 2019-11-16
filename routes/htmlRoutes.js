var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
      res.render("index");
  });

  app.get("/create-account", function(req, res) {
    res.render("create_account");
});



app.get("/login", function(req, res) {
  res.render("login");
});

<<<<<<< HEAD
=======


>>>>>>> 5b178c655668d0d5960633f0c3a2a3d2adec8c51
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};