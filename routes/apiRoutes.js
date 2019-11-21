var db = require("../models");

module.exports = function(app) {

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.Users.create(req.body).then(function(dbUser){
      res.json(dbUser);
    });
  });

  // User Login
  app.post('/api/auth', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.userPassword;
    if (email && password) {
    db.Users.findOne({where : {email: email, userPassword: password}}).then(function(res, error) {
        if (error) {

          req.session.loggedin = true;
          req.session.username = email;
          res.redirect('/login', next);
        } else {
          res.send('Incorrect Username and/or Password!');
        }
        res.end();
      });
    } else {
      res.send('Please enter Username and Password!');
      res.end();
    }
  });

  app.get("/api/login", function(req, res) {
    db.Users.findAll({}).then(function(user) {
      res.json(user);
    });
  });



  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
}