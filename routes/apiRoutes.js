var db = require("../models");

module.exports = function(app) {
  // Get all examples

  // Create a new example
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbProject2) {
      res.json(dbProject2);
    });
  });

  // Create a new example
  app.post("/api/users", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
