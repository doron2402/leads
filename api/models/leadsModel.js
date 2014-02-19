var mongoose = require('../lib/mongodb'),
	LeadSchema = mongoose.mongo.Schema({
	campignId 	: 	{ type: Number, default: 0 },
	trafficId	: 	{ type: Number, default: 0 },
	fname 	: 	{ type: String, default: 'NULL' },
    lname 	: 	{ type: String, default: 'NULL' },
    name  	:  	{ type: String, default: 'NULL' },
    email 	: 	{ type: String, default: 'NULL' },
    phone 	: 	{ type: Number, default: 0 },
    fields 	: 	{ type: String, default: 'NULL' },
    media 	: 	{ type: String, default: 'NULL' },
  	erate 	: 	{ type: String, default: 'NULL' },
  	prod  	:  	{ type: String, default: 'NULL' },
  	size  	:  	{ type: String, default: 'NULL' },
  	channel :  	{ type: String, default: 'NULL' },
  	reffer  :  	{ type: String, default: 'NULL' },
  	date    :   { type: Date, default: Date.now },
    transformed : { type: String, default: 0},   
  	dayOfWeek:  { type: Number, default: -1 }
});

exports.LeadModel = mongoose.mongo.model('LeadModel', LeadSchema);