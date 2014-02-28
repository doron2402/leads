var Mysql = require('../lib/mysql').MysqlKnex;
	CampignModel = require('../models/campignModel').CampignModel;

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

exports.getEditCampign = function (req, res) {
	if (!isNaN(req.params.id)){
		return new CampignModel({'id': parseInt(req.params.id,10)}).fetch()
  			.then(function(model) {
  				return res.json(model.attributes);
  			});
	}
	else
		return res.json({'error': 'wrong args'});
}


/*
	Users ROUTES
*/
exports.getAllUsers = function(req, res){
	//First check the user type
	if (req.session.userType < 4){
		return Mysql('users').where('type','>=',parseInt(req.session.userType,10)).select().then(function(result, err){
			if (err)
				console.log(err);

			return res.json(result);
		});
	}else{
		return res.json({'error': 'This user dont have permission to see other users'});
	}
}

exports.saveCampign = function(req, res){
	console.log(req.body);
	if (req.session.userType < 4){
		if (!isNaN(req.body.id))
		{
			new CampignModel({id: parseInt(req.body.id,10)})
  			.save({
  				name: req.body.name,
  				url: req.body.url,
  				notes: req.body.notes,
  				emailReportLeads: req.body.emailReportLeads,
  				active: req.body.active
  			}, {patch: true})
  			.then(function(model) {
  				console.log(model);

   				return res.json({"data": model, "code": "OK"});
  			});
		}else{
			return res.json({'error': 'Missing or Wrong Params'});
		}
	}else{
		return res.json({'error': 'This user dont have permission to see other users'});
	}
}

