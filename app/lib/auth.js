exports.checkAuth = function(req, res, next){
	console.log('Checking Auth...');
	if (!req.session.user_id || !req.session.userId)
    	return res.render('errors/not_auth', {layout: 'layouts/error'});
  	else 
    	next();
  
};