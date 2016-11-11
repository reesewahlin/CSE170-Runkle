
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
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/runkle');
var form = require('express-form');
var field = form.field;

// Load jQuery with the simulated jsdom window.
$ = require('jquery')(window);


// variables for Controller files
var index = require('./routes/index');
var airport = require('./routes/airport');
var school = require('./routes/school');
var home = require('./routes/home');
var about = require('./routes/about');
var login = require('./routes/login');
var homepage = require('./routes/homepage');
var newairport = require('./routes/newairport');
var User = require('./models/user.js');


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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Add routes here
app.get('/', login.view);
// app.get('/login', login.view);
app.get('/homepage',homepage.view);
app.get('/airport', airport.view);
app.get('/school', school.view);
app.get('/home', home.view);
app.get('/about', about.view);
app.get('/newairport', newairport.view);
app.post('/login',
	  // Form filter and validation middleware 
	  form(
	  	field("first_name").trim().required(),
	    field("last_name").trim().required(),
	    field("email").trim().isEmail(),
	    field("password").trim().required()
	   ),
	 
	   // Express request-handler now receives filtered and validated data 
	   function(req, res){
	     	if (!req.form.isValid) {
	       		// Handle errors 
	       		console.log(req.form.errors);
	     	} else {
		       	// Or, use filtered form data from the form object: 

		       	// create a new user
				var newUser = new User({
				  	first_name: 	req.form.first_name,
				  	last_name: 	req.form.last_name,
				  	email: 		req.form.email,
				  	password: 	req.form.password		
				});

				console.log("Adding user: ");
		        console.log("first_name:", req.form.first_name);
		        console.log("last_name:", req.form.last_name);
		        console.log("Email:", req.form.email);
		        console.log("Password:", req.form.password);

		        // save the user
				newUser.save(function(err) {
				  	//if (err) throw err;
				  	console.log('User created!');
				});
				res.render('location');
				// // get all the users
				// User.find({first_name: req.form.first_name}, function(err, users) {
				// 	if (err) throw err;
				// 	// object of all the users
				// 	console.log(users);
				// 	res.render('index', users);
				// });

		}
	
	}
);



// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});






















