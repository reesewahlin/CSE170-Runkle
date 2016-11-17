var data = require('../data.json');

exports.view = function(req, res) {
	res.render('newairport',data);
};

exports.view1 = function(req,res) {
	res.render('oldairport',data);
}