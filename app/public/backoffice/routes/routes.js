backOfficeApp.config(function($routeProvider) {
	$routeProvider
	
	.when('/logout', {
		templateUrl : 'backoffice/templates/home.html',
		controller : 'logoutController'
	})

	// route for the home page
	.when('/', {
		templateUrl : 'backoffice/templates/home.html',
		controller  : 'mainController'
	})
			
	//Users CRUD
	.when('/dashboard', {
		templateUrl : 'backoffice/templates/dashboard.html',
		controller : 'usersController'
	})

	//Create a new campign
	.when('/campigns/create', {
		templateUrl : 'backoffice/templates/campigns/new.html',
		controller : 'campignsController'
	})

	.when('/campigns/view/', {
		templateUrl : 'backoffice/templates/campigns/view.html',
		controller : 'campignsController'
	})

	.when('/campigns/view/:active', {
		templateUrl : 'backoffice/templates/campigns/view.html',
		controller : 'campignsController'
	})

	//User profile (the one that logged in)
	.when('/me', {
		templateUrl : 'backoffice/templates/me.html',
		controller : 'meController'
	})
			
	//All available campign for the logged user
	.when('/campigns',{
		templateUrl : 'backoffice/templates/campigns.html',
		controller : 'campignsController'
	})

	.when('/campign/:id',{
		templateUrl : 'backoffice/templates/campign.html',
		controller : 'singleCampignController'
	})

	//Clients page -> Create / Update / Delete (hide) / View all clients
	.when('/clients',{
		templateUrl : 'backoffice/templates/clients.html',
		controller : 'clientsController'
	});

});
