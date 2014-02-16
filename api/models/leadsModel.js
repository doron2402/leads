var mongoose = require('../lib/mongodb');
console.log(mongoose);
var Schema = mongoose.mongo.Schema,
  	ObjectId = Schema.ObjectId;


var kittySchema = mongoose.mongo.Schema({
    name: String
});

var Kitten = mongoose.mongo.model('Kitten', kittySchema)

var silence = new Kitten({ name: 'Silence' })
console.log(silence.name) // 'Silence'


silence.save(function (err, result) {
  if (err) // TODO handle the error
  	{
  		console.log('err::')
  		console.log(err);
  	}

  console.log('result::::');
  console.log(result);

});

/*
var LeadSchema = Schema({
    id    	: 	ObjectId,
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
  	date    :   { type: Date, default: Date.now },
  	dayOfWeek:  { type: Date, default: new Date().getDay() }
});
var Lead = mongoose.mongo.model()
Lead.save(function(err, res){
	if(err)
		console.log(err);

	console.log('res:::');
	console.log(res);
});




*/