var Mysql = require('../lib/mysql').MysqlKnex;

exports.dashboard = function (req, res) {
	  res.render('backend/index', {layout: 'layouts/backoffice'});
};


/*
	return an array of activate campigns
*/
exports.getAllCampigns = function(req, res){
	
	if (req.session.userType < 4){
		//show all campign
		return Mysql('campigns').where('active',1).select().then(function(result, err){
			if (err)
				console.log(err);
			
			return res.json(result);
		});
	}
	else {
		//Show only campign user have permission to
		console.log('else...');
		return res.json({'error': 'error!!'});
	}	
};

/*
	return an array of deactivate campigns
*/
exports.getAllDeactiveCampings = function(req, res){
	if (req.session.userType < 4){
		//show all campign
		return Mysql('campigns').where('active',0).select().then(function(result, err){
			if (err)
				console.log(err);
			
			return res.json(result);
		});
	}
	else {
		//Show only campign user have permission to
		console.log('else...');
		return res.json({'error': 'error!!'});
	}
};