//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//
//We will need the models folder to check passport agains
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/login/members");
});

app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    }).then(function() {
      console.log("redirect");
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.redirect("back")
    });
});

app.get("/api/user", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    console.log('fail')
    res.json({});
  }
  else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    console.log('pass')
    res.json({
      email: req.user.email,
    });
  }
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});



};
