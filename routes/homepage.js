/*
 * GET homepage or login.
 */
 var data = require("../data.json");

exports.view = function(req, res) {
  	res.render('index', data);
};
