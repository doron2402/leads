	exports.setLeads = function(request, reply){
	var LeadModel = require('../models/leadsModel').LeadModel,
		d = new Date(),
		numOfDayOfWeek = d.getDay();
	
	console.log(request.payload);
	
	if (request.payload){
		var self = request.payload;
		//Adding day of week
		self['dayOfWeek'] = numOfDayOfWeek;
		var test = new LeadModel(self);	
	}


	test.save(function (err, result) {
	  if (err) // TODO handle the error
	  	{
	  		console.log('err::')
	  		console.log(err);
	  	}

	  console.log('result::::');
	  console.log(result);

	});


	reply({'data': 'traffic saved'});
};

