exports.contactPage = function(req, res){
  res.send("respond with a resource");
};

exports.saveContactInfo = function (req, res) {
	console.log(req);
	res.json({data: 'Saved'});
}