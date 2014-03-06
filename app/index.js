var express = require('express'),
	auth = require('./lib/auth'),
	routes = require('./routes'),
	http = require('http'),
 	path = require('path');

var app = express();

// all environments
app.set('port', process.env.VCAP_APP_PORT || 3000); //App Fog port configuration
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('layout', 'layouts/default');
app.locals({
    site: {
    	title: 'SpeadLeads',
    	keywords: 'node.js, leads system',
    	description: 'description',
    	contact: '515-515-5111',
        logo: 'images/logo.png',
        host: process.env.APP_HOST || 'localhost:3000',
        language: process.env.APP_LANGUAGE || 'EN_US'
    },author: {
    	name: 'Doron Segal',
    	contact: 'doron@segaldoron.com',
    	site: 'http://segaldoron.com'
    }
});
app.set('partials', {
    app_configuration: "partials/app_configuration.html",
	header: "partials/header",
	topnav:"partials/topnav",
	header_backoffice: "partials/header_backoffice",
	footer_backoffice: "partials/footer_backoffice",
	static_carousel: "static-page/carousel",
	static_about: "static-page/about",
	static_contact_form: "static-page/contact_form",
	static_signin: "static-page/signin.html",
    static_try: "static-page/try.html",
    nav_head_backoffice: "partials/nav_head_backoffice"

});
app.use(express.favicon("public/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());

app.all('/*', function (req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('X-Powered-By', 'SegalDoron');
  res.header("Access-Control-Allow-Headers", "*");
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
  res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
  next();
});

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
app.post('/logout', auth.checkAuth, routes.users.logoutUser);

//Backend
app.get('/backoffice', auth.checkAuth, routes.backend.dashboard);
    //Campigns
    app.get('/campigns/all', auth.checkAuth, routes.backend.getAllCampigns);
    app.get('/campings/get/:id', auth.checkAuth, routes.backend.getCampign);
    app.get('/campigns/all/deactive', auth.checkAuth, routes.backend.getAllDeactiveCampings);
    app.get('/campigns/edit/:id', auth.checkAuth, routes.backend.getEditCampign);
    app.post('/campings/save', auth.checkAuth, routes.backend.saveCampign);
    app.post('/campigns/create', auth.checkAuth, routes.backend.createCampign);
    //Users
    app.get('/users/all', auth.checkAuth, routes.backend.getAllUsers);

    //Clients
    app.get('/clients/all', auth.checkAuth, routes.backend.getAllClients);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
