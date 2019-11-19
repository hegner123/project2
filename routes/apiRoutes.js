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
    var loginEmail = req.body.email;
    var loginPassword = req.body.userPassword;
    if (loginEmail && loginPassword) {
    db.Users.findOne({where : {email: loginEmail, userPassword: loginPassword}}).then(function(response, error) {
      if (response.dataValues.email === loginEmail && response.dataValues.userPassword === loginPassword){

          req.session.loggedin = true;
          req.session.username = loginEmail;
        console.log(req.session.loggedin);
        res.redirect('../login');
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
    res.send("Logged In")
  });



  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });


}