exports.index = function(req, res){
  res.render('index', { title: 'Leads', ProjectName: 'Leads' });
};

exports.users = require('./user');

exports.main = require('./main');