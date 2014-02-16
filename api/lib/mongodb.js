var mongoose = require('mongoose');

exports.mongo = mongoose.connect('mongodb://localhost/leads-api');