var db = require("../models");

module.exports = function(app) {
  // Get all examples
  // app.get("/api/users", function(req, res) {
  //   db.User.findAll({}).then(function(db) {
  //     res.json(dbProject2);
  //   });
  // });

  // Create a new example
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbProject2) {
      res.json(dbProject2);
    });
  });
};
