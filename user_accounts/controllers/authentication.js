var passport = require('passport');
var mongoose = require('mongoose');
var User = require('./../../models/user.js');

/** ALSO NEEDS:
		validation user not yet registered
		possibly more register validation
**/




exports.login = function(req, res) {
	passport.authenticate('local', function(err, user, info) {
		var token;
		//error
		if(err) {
			res.status(404).json(err);
			return;
		}
		//if a user is found
		if(user) {
			//token = user.generateJwt();
			res.status(200);

		} else {
			res.status(401).json(info);
		}
	})(req, res);
};