var express = require('express'),
	auth = require('./lib/auth'),
	routes = require('./routes'),
	http = require('http'),
 	path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('layout', 'layouts/default');
app.locals({
    site: { title: 'SpeadLeads',keywords: 'node.js, leads system' description: 'description', contact: '515-515-5111' },
    author: { name: 'Doron Segal', contact: 'doron2402@gmail.com', site: 'http://segaldoron.com' }
});
app.set('partials', { 
	header: "partials/header", 
	topnav:"partials/topnav", 
	header_backoffice: "partials/header_backoffice"
	static_carousel: "static-page/carousel",
	static_about: "static-page/about",
	static_contact_form: "static-page/contact_form",
	static_signin: "static-page/signin.html"

});
app.use(express.favicon("public/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.post('/contact', routes.main.saveContactInfo);

//Login
app.post('/login', routes.users.loginUser);

//Backend
app.get('/backoffice', auth.checkAuth, routes.backend.dashboard);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
