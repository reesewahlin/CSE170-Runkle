
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
//var php = require('./routes/php');




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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', login.view);
app.get('/homepage',homepage.view);
app.get('/airport', airport.view);
app.get('/school', school.view);
app.get('/home', home.view);
app.get('/about', about.view);
app.get('/newairport', newairport.view);
//app.get('/json_save.php', php.execute);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});






















