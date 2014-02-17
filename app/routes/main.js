exports.saveContactInfo = function (req, res) {
	console.log(req.body);
	res.json({data: 'Saved'});
}