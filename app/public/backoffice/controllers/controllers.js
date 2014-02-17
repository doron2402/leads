backOfficeApp.controller('mainController', function($scope, $http){
	$scope.msg = 'asdf';
});

backOfficeApp.controller('usersController', function($scope,$http){
   $scope.msg = 'users';
});

backOfficeApp.controller('clientsController', function($scope, $http){
	$scope.msg = 'clients';
});

backOfficeApp.controller('campignsController', function($scope, $http) {
	$scope.msg = 'campigns';
});
