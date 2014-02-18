exports.saveContactInfo = function (req, res) {
	
	if (req.body && req.body.name && (req.body.email || req.body.phone) ){
		
		var Model = require('../models/contactModel'),
			Valid = require('../lib/validate'),
			contactData = req.body;
		
		if (Valid.isValidEmail(contactData.email)){
			
			new Model.ContactModel(contactData).save().then(function(model) {
	    	console.log(model);
	    	return res.json({
	    				dataReturn: 'success',
	    				contact_name: model.get('name'),
	    				msg: '<p>Thank you, we will contact you shortly.</p>'
	    			});
	  		});
		}else
			return res.json({error: 'Please fill your information valid'});
		
	}
	else
		return res.json({error: 'Please fill your name and email or phone number to contact you'});
}