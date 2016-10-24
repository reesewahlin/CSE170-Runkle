
// /***
// 	Main node entry page
// 	Description: 	Creates server
// 					maps requests to static directory

// ***/

// var express = require('express');
// var app = express();
// var hello = require('./routes/homepage');



//  	return all pages in the static directory when
// 	requested at '/' directory.
// 	e.g., http://localhost:3000/index.html
// 	maps to /static/index.html on this machine

// app.use(express.static(__dirname + '/static'));

// app.listen(3000, function () {
//   console.log('App listening on port 3000');
// });



/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
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
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
