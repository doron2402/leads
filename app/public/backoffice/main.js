var Config = {
	mode: 'dev',
	host: 'localhost',
	port: 80
};

var backOfficeApp = angular.module('backOfficeApp', ['ui.bootstrap','ngRoute','ngCookies']);

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

var i18n = {};

