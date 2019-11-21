// Requiring necessary npm packages
var express     = require( 'express'),
    hbs         = require( 'express-handlebars' ),
    app         = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");
var PORT = process.env.PORT || 8080;
var db = require("./models");
var app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine( 'handlebars', hbs( { 
  extname: 'handlebars', 
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) );
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log("Listening on " + PORT);
  });
});

module.exports = app;
