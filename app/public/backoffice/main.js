var backOfficeApp = angular.module('backOfficeApp', ['ngRoute','ngCookies','ui.bootstrap']);

var localDB = {
	user: {
		permission: null,
		name: null,
		email: null,
		phone: null
	},
	campigns: [],
	users: [],
	clients: []
};
