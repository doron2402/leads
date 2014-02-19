var mongoose = require('../lib/mongodb'),
	TrafficSchema = mongoose.mongo.Schema({
    campignId 	: 	{ type: Number, default: 0 },
    media 	: 	{ type: String, default: 'NULL' },
  	erate 	: 	{ type: String, default: 'NULL' },
  	prod  	:  	{ type: String, default: 'NULL' },
  	size  	:  	{ type: String, default: 'NULL' },
  	channel :  	{ type: String, default: 'NULL' },
  	reffer  :  	{ type: String, default: 'NULL' },
  	date    :   { type: Date, default: Date.now },
  	dayOfWeek:  { type: Number, default: -1 }
});

exports.TrafficModel = mongoose.mongo.model('TrafficModel', TrafficSchema);