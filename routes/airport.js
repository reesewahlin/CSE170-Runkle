var data = require('../data.json');
var User = require("./../models/user.js");

exports.view = function(req, res){
	User.find({}, function(err, users) {
		if(err) throw err;
		console.log(users);
		res.render('airport', users);
	}); 
};