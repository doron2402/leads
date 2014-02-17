exports.login = function (req, res) {
	console.log(req.body);
	res.json(req.body);
};