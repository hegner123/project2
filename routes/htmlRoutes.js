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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
  });
};