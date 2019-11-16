require("dotenv").config();
var bodyParser = require('body-parser');
const express = require('express')
const path = require('path')

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));


// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Express Engine
var pageController = require('./routes/htmlRoutes');

var app = express();s
// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.use(express.static(path.join(__dirname, '/')));
  app.use(bodyParser.json());
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  pageController(app);

});

module.exports = app;












