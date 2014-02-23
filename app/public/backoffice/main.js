var backOfficeApp = angular.module('backOfficeApp', ['ngRoute','ngCookies','ui.bootstrap']);

var localDB = {
	userInfo: {
		permission: null,
		name: null,
		email: null,
		phone: null
	},
	campigns: [],
	users: [],
	clients: []
};
