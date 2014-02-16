
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req, res){
	res.render('pages/login', { title: 'Login' });
}

exports.auth = function (req, res) {
	res.json({'auth': true});
}