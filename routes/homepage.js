var data = require("../data.json");
var User = require("./../models/user.js");
var file_path = "From routes/homepage.js: "

exports.view = function(req, res) {
	User.find(function (err, user) {
		if (err) {console.log(file_path+"ERROR!! Issue finding users in DB");}
		console.log(file_path+"Current User: "+user);
		res.render('homepage', user);

	});
};

exports.getUser = function (req, res) {
	User.findOne(function (err, user) {
		if (err) {console.log(file_path+"Error: "+err);}
		console.log(file_path+"User: "+user);
		res.json(user);
	})
}
