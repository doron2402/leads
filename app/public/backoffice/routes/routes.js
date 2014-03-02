backOfficeApp.config(function($routeProvider) {
	$routeProvider
	.when('/logout', {
		templateUrl : 'backoffice/templates/home.html',
		controller : 'logoutController'
	})

	/*
		Home Page
	*/
	// route for the home page
	.when('/', {
		templateUrl : 'backoffice/templates/home.html',
		controller  : 'mainController'
	})

	/*
		Dashboard
	*/
	.when('/dashboard', {
		templateUrl : 'backoffice/templates/dashboard.html',
		controller : 'dashboardController'
	})

	/*
		Campigns
	*/
	//Create a new campign
	.when('/campigns/new', {
		templateUrl : 'backoffice/templates/campigns/new.html',
		controller : 'campignsController'
	})

	.when('/campigns/view/all', {
		templateUrl : 'backoffice/templates/campigns/index.html',
		controller : 'campignsController'
	})

	.when('/campigns/view', {
		templateUrl : 'backoffice/templates/campigns/index.html',
		controller : 'campignsController'
	})

	.when('/campigns/view/:id', {
		templateUrl : 'backoffice/templates/campigns/single.html',
		controller  : 'campignsController'
	})

	.when('/campigns/view/:active', {
		templateUrl : 'backoffice/templates/campigns/index.html',
		controller : 'campignsController'
	})

	//Campign Edit with specific id
	.when('/campigns/edit/:id', {
		templateUrl : 'backoffice/templates/campigns/edit.html',
		controller : 'campignsController'
	})

	//Campign Edit with no specific id
	.when('/campigns/edit', {
		templateUrl : 'backoffice/templates/campigns/edit.html',
		controller : 'campignsController'
	})

	//All available campign for the logged user
	.when('/campigns',{
		templateUrl : 'backoffice/templates/campigns.html',
		controller : 'campignsController'
	})

	/*
		User profile
	*/
	.when('/me', {
		templateUrl : 'backoffice/templates/profile/index.html',
		controller : 'meController'
	})

	//User profile - edit
	.when('/me/edit', {
		templateUrl : 'backoffice/templates/profile/edit.html',
		controller : 'meController'
	})
	//User profile - history
	.when('/me/history', {
		templateUrl : 'backoffice/templates/profile/history.html',
		controller : 'meController'
	})

	/*
		Clients
	*/
	.when('/clients',{
		templateUrl : 'backoffice/templates/clients/index.html',
		controller : 'clientsController'
	})

	.when('/clients/new', {
		templateUrl : 'backoffice/templates/clients/new.html',
		controller : 'clientsController'
	})

	.when('/clients/edit', {
		templateUrl : 'backoffice/templates/clients/edit.html',
		controller : 'clientsController'
	})

	.when('/clients/delete', {
		templateUrl : 'backoffice/templates/clients/edit.html',
		controller : 'clientsController'
	})

	/*
		Users
	*/
	.when('/users', {
		templateUrl : 'backoffice/templates/users/index.html',
		controller : 'usersController'
	})

	.when('/users/new', {
		templateUrl : 'backoffice/templates/users/new.html',
		controller : 'usersController'
	})

	.when('/users/delete', {
		templateUrl : 'backoffice/templates/users/delete.html',
		controller : 'usersController'
	})

	.when('/users/edit/:id', {
		templateUrl : 'backoffice/templates/users/edit.html',
		controller : 'usersController'
	});




});
