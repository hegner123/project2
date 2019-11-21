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

<<<<<<< HEAD

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
=======
app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/login/members");
    } else {
      res.render("login")
    };
  });
>>>>>>> master

  app.get("/login/members", isAuthenticated, function(req, res) {
    res.render('members');
  });


};