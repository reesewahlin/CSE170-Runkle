var User = require('./../../models/user.js');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

passport.use(new LocalStrategy({
		usernameField: 'email'
	},
	function(username, password, done) {
		User.findOne({ email: username }, function(err, user) {
			if(err) {
				return done(err);
			}
			//return if user not found in database
			if (!user) {
				return done(null, false, {
					message: 'User not found'
				});
			}
			//return if password wrong
			if(!user.validPassword(password)) {
				return done(null, false, {
					message: 'Password is wrong'
				});
			}
			//if credentials are correct, return a user object
			console.log("Successfully authenticated password useraccounts/config/passport.js");
			return done(null, user);
		});
	}
));