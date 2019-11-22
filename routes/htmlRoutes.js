var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
//
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render('index');
  });

  app.get("/create-account", function(req, res) {
    res.render("create-account");
});


app.get("/login", function(req, res) {
  res.render("login");
});


app.get("/profile", function(req, res) {
  res.render("profile");
});


app.get('/auth', function(request, response) {
	if (request.session.loggedin) {
		response.render('index');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

  app.get("/login/members", isAuthenticated, function(req, res) {
    res.render('members');
  });

  app.get("*", function (req,res){
    res.render('404');
  })


};