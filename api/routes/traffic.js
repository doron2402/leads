exports.setTraffic = function(request, reply){
	var TrafficModel = require('../models/trafficModel').TrafficModel,
		d = new Date(),
		numOfDayOfWeek = d.getDay();
	
	console.log(request.payload);

	if (request.payload && (request.payload.campignId || request.payload.campign_id)){
		
		var self = request.payload;
		if (request.payload.campign_id){
			self.campignId = request.payload.campign_id;
		}
		//Adding day of week
		self['dayOfWeek'] = numOfDayOfWeek;
		var test = new TrafficModel(self);

		test.save(function (err, result) {
		  if (err)
		  	return reply({'data': 'something went wrong with traffic', 'traffic_id': self.campignId + Math.floor(Math.random()*100000) });

		  return reply({'data': 'traffic saved', 'traffic_id': result._id});
		});	
	}
	else
		return reply({'data': 'Missing Argument'});


	

	
	
};

