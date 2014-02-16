exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.users = require('./user');

exports.main = require('./main');