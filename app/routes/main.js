exports.saveContactInfo = function (req, res) {
	if (req.body){
		console.log(req.body);
		var Model = require('../models/contactModel'),
			contactData = req.body;

		new Model.ContactModel(contactData).save().then(function(model) {
	    	console.log(model);
	    	return res.json({
	    				dataReturn: 'success',
	    				contact_name: model.get('name')
	    			});
	  	});
	}
}