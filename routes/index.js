/*
 * GET home page.
 */
 var data = require("../data.json");

exports.view = function(req, res) {
	console.log("data"+data);
  	res.render('index', data);
};

