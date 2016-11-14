/*
 * GET login page.
 */
// var User = require('./../models/user.js');

// // create a new user
// var newUser = User({
//   name: 'Peter Quill',
//   username: 'starlord55',
//   password: 'password',
//   admin: true
// });


exports.view = function(req, res) {
	res.render("login");
};





  
