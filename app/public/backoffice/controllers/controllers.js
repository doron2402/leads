backOfficeApp.controller('mainController', function($scope, $http){
	$scope.msg = 'asdf';
});

backOfficeApp.controller('usersController', function($scope,$http){
   $scope.msg = 'users';
   console.log('adfsasdf');
});

backOfficeApp.controller('clientsController', function($scope, $http){
	$scope.msg = 'clients';
});

backOfficeApp.controller('campignsController', function($scope, $http, $location) {
  console.log($location);
	var actionPath = $location.$$absUrl.split('/').pop().toString().toLowerCase();
  console.log(actionPath);
  switch (actionPath){
    case 'create':
      console.log('create');
      break;
    case 'read':
      console.log('read');
      break;
    case 'edit':
      console.log('edit');
      break;
    case 'delete':
      console.log('del');
      break;
    default:
      console.log('all');
      break;
  }
  $scope.msg = 'campigns';
});


backOfficeApp.controller('meController', function($scope, $http) {
	console.log('me.. controller');
	$scope.msg = 'me me me';
});

backOfficeApp.controller('logoutController', function ($scope, $http, $location) {
	console.log('logout user');
	$http({method: 'POST',
	    url: 'http://localhost:3000/logout'}).
        success(function(data, status, headers, config) {
          	console.log(data);
          	window.location = 'http://localhost:3000/';
        }).
        error(function(data, status, headers, config) {
          	console.log(data);
          	console.log('error');
          	$location.path('/backoffice#/');
      	}); 
});