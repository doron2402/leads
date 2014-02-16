var Hapi = require('hapi'),
	port = 8000,
	serverAddress = 'localhost',
	server = Hapi.createServer(serverAddress, port),
	routes = require('./routes');

// Add the route
server.route([
	{
	    method: 'GET',
	    path: '/hello',
	    handler: function (request, reply) {

	        reply('hello world');
	    }
	},{
		method: 'POST',
		path: '/traffic',
		handler: routes.traffic.setTraffic
	},{
		method: 'POST',
		path: '/leads',
		handler: routes.leads.setLeads
	},{
		method: 'GET',
		path: '/',
		handler: routes.traffic.setTraffic
	}]
);

// Start the server
server.start();
console.log('API start running, listening on port: %s', port);