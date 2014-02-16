var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('layout', 'layouts/default');
app.set('partials', { header: "partials/header", topnav:"partials/topnav"});
app.use(express.favicon("public/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/home', routes.index);
app.get('/about', routes.index);
//Contact Page
app.get('/contact', routes.main.contactPage);
app.post('/contact', routes.main.saveContactInfo);

app.get('/faq', routes.index);
app.get('/users', routes.users.list);

app.get('/login', routes.users.login);
app.post('/login', routes.users.auth);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
