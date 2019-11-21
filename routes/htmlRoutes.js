var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
//
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
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

  app.get("*", function (req,res){
    res.render('404');
  })


};