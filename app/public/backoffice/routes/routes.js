	backOfficeApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'backoffie/templates/home.html',
				controller  : 'mainController'
			})
			
			//Users CRUD
			.when('/dashboard', {
				templateUrl : 'backoffie/templates/dashboard.html',
				controller : 'usersController'
			})

			//User profile (the one that logged in)
			.when('/me', {
			  templateUrl : 'backoffie/templates/me.html',
			  controller : 'meController'
			})
			
			//All available campign for the logged user
			.when('/campigns',{
				'templateUrl' : 'backoffie/templates/campigns.html',
				controller : 'campignsController'
			})

			.when('/campign/:id',{
				'templateUrl' : 'backoffie/templates/campign.html',
				controller : 'singleCampignController'
			})

			//Clients page -> Create / Update / Delete (hide) / View all clients
			.when('/clients',{
				'templateUrl' : 'backoffie/templates/clients.html',
				controller : 'clientsController'
			});
	});