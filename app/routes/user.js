//login
exports.loginUser = function(req, res){

	console.log(req.body);

	if (req.body && req.body.username && req.body.password && req.body.password.length > 4){
		//Check with DB
		var Model = require('../models/userModel'),
			crypto = require('crypto'),
  			password = crypto.createHash('sha1');

			password.update(req.body.password);

			var tmp_pass = password.digest('hex');

		return new Model.UserModel({'username': req.body.username}).fetch().then(function(model){
			
			if (model.get('password') == tmp_pass)
			{

				var session_id = crypto.createHash('sha1');
				session_id.update('#' + model.get('id') + '-' + model.get('username'));

				req.session.user_id = session_id.digest('hex');
				req.session.userId = model.get('id');
				req.session.userType = model.get('type');

				return res.json({redirect: '/backoffice',dataReturn: 'success' });
			}	
			else
				return res.json({redirect: '#',dataReturn: 'fail' });

			
		});
		
	}else
		return res.json({Error: 'Bad username or password'});
};

exports.logoutUser = function(req, res, next){
	console.log('user logout...');
	delete req.session.user_id;
	delete req.session.userId;
	return res.redirect('/');
};