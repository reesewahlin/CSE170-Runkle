
// /***
// 	Main node entry page
// 	Description: 	Creates server
// 					maps requests to static directory

// ***/

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var $;
// Load jsdom, and create a window.
var jsdom = require("jsdom").jsdom;
var doc = jsdom();
var window = doc.defaultView;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb://test:test@ds149207.mlab.com:49207/runkle');
//mongoose.connect('mongodb://localhost/runkle');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Successfully connected to mongoose database.");
});
var form = require('express-form');
var field = form.field;
var jwt = require('express-jwt');
var auth = jwt({
	secret: 'MY_SECRET',
	userProperty: 'payload'
});

// Load jQuery with the simulated jsdom window.
$ = require('jquery')(window);


// variables for Controller files
var index = require('./routes/index');
var register = require('./routes/register');
var airport = require('./routes/airport');
var school = require('./routes/school');
var home = require('./routes/home');
var about = require('./routes/about');
var login = require('./routes/login');
var homepage = require('./routes/homepage');
var newairport = require('./routes/newairport');
var User = require('./models/user.js');
var newschool = require('./routes/newschool');
var ctrlAuth = require('./user_accounts/controllers/authentication');

//login tutorialspoint browser jwt node.js angular MEAN stack
require('./models/db');
require('./user_accounts/config/passport');


// Example route
// var user = require('./routes/user');
var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Rothenberg resides w/in the closet'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
app.use(passport.initialize());
//app.use('/api', routesApi);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Add routes here
app.get('/', register.view);
app.get('/homepage',homepage.view);
app.get('/airport', airport.view);
app.get('/school', school.view);
app.get('/home', home.view);
app.get('/about', about.view);
app.get('/newairport', newairport.view);
app.get('/newschool', newschool.view);
app.get('/register', register.view);
app.get('/currentuser', homepage.getUser);
app.get('/oldairport', newairport.view1);

app.post('/register', register.register);
app.post('/login', ctrlAuth.login);





// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




/**

CURRENTLY WORKING ON: 
	getting user data from mongodb to display on homepage.handlebars from homepage.view route in homepage.js

	**/

















