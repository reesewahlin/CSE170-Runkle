var passport = require('passport');
var mongoose = require('mongoose');
var User = require('./../models/user.js');
var file_path = "From /routes/register.js: ";


exports.view = function (req, res) {
	User.remove({}, function (err) {
		if(err) {console.log(file_path + "ERROR!! "+ err);}
		console.log(file_path+"Successfully removed previous database documents");
	});
	User.find(function (err, users) {
		if(err) {console.log(file_path + "ERROR!! "+ err);}
		console.log(file_path+"USERS: "+users);
	});
	res.render('register');
}


exports.register = function(req, res) {
	var user = new User();
	console.log("Entered into post request of routes/register.js");
	//user
	user.first_name = req.body.first_name;
	user.last_name = req.body.last_name;
	user.email = req.body.email;
	user.password = req.body.password;
	//closest
	user.closest.name = req.body.closest.name;
	user.closest.place_id = req.body.closest.place_id;
	user.closest.location.lat = req.body.closest.location.lat;
	user.closest.location.lng = req.body.closest.location.lng;
	user.closest.distance = req.body.closest.distance;
	//close
	user.close.name = req.body.close.name;
	user.close.place_id = req.body.close.place_id;
	user.close.location.lat = req.body.close.location.lat;
	user.close.location.lng = req.body.close.location.lng;
	user.close.distance = req.body.close.distance;

	console.log(user);
	
	user.save(function(err) {
		if (err) {
			console.log("register route: Register post error: \n\t"+err);
		}
		else {
			// var token;
			// token = user.generateJwt();
			res.status(200);
			console.log("finishing adding user");
		}
	});

};