// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');


// create a schema
var userSchema = new Schema({
	first_name: String,
	last_name: String,
	email: { type: String,  required: true },
	password: { type: String, required: true },
	closest: {
		name: String,
		place_id: String,
		location: {
			lat: Number,
			lng: Number
		},
		distance: Number
	},
	close: {
		name: String,
		place_id: String,
		location: {
			lat: Number,
			lng: Number
		},
		distance: Number
	}
});

userSchema.methods.validPassword = function(password) {
	return this.password == password;
}

userSchema.methods.addAreas = function (closest, close) {
	//closest
	this.closest.name = closest.name;
	this.closest.place_id = closest.place_id;
	this.closest.location.lat = closest.location.lat;
	this.closest.location.lng = closest.location.lng;
	this.closest.distance = closest.distance;

	//close
	this.close.name = close.name;
	this.close.place_id = close.place_id;
	this.close.location.lat = close.location.lat;
	this.close.location.lng = close.location.lng;
	this.close.distance = close.distance;

	//closish
	this.closish.name = "Home";
	this.closish.place_id = "hardcoded unneeded"
	this.closish.location.lat = -1
	this.closish.location.lng = -1
	this.closish.distance = -1;

}

// //create browser info to extract user details
// userSchema.methods.generateJwt = function () {
// 	var expiry = new Date();
// 	expiry.setDate(expiry.getDate() + 7);

// 	return jwt.sign( {
// 		_id: this._id,
// 		first_name: this.first_name,
// 		last_name: this.last_name,
// 		email: this.email,
// 		exp: parseInt(expiry.getTime() / 1000),
// 	}, "MY_SECRET");
// };



// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;