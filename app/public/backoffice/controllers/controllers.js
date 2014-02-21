var globalFunc = {};
globalFunc.getRoute = function(arr){
  console.log(arr);
  var args = {
    contoller: arr[1],
    action: arr[2],
    arg: arr[3] || null
  };

  return args;

};


globalFunc.errorHandler = function(){
  alert('something went wrong');
};


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

backOfficeApp.controller('campignsController', function($scope, $http, $location, $routeParams, $modal) {
  
  $scope.goTo = function(path){
    console.log(path);
    $location.path( path );
  };


  var routesArgs = globalFunc.getRoute($location.$$path.split('/'));
	var actionPath = globalFunc.getRoute($location.$$path.split('/')).action.toString().toLowerCase();

  $scope.getListOfCampigns = function(){

    if ($routeParams.active == 'notactive')
    {
      $scope.not_active = true;
      $http({method: 'GET',
        url: 'http://localhost:3000/campigns/all/deactive'}).
        success(function(data, status, headers, config) {
          $scope.campigns = data;
        }).
        error(function(data, status, headers, config) {
          //ToDo something when there's a problem
        });
    }
    else
    {
      $scope.not_active = false;
      $http({method: 'GET',
      url: 'http://localhost:3000/campigns/all'}).
        success(function(data, status, headers, config) {
          console.log(data);
          $scope.campigns = data;
        }).
        error(function(data, status, headers, config) {
          //ToDo something when there's a problem
          globalFunc.errorHandler();
        });    
    }

  }

  $scope.getCampignEdit = function () {
    //TODO check if user have the permission to edit campign

    if (!isNaN(parseInt(routesArgs.arg,10))) {

      $http({method: 'GET',
          url: 'http://localhost:3000/campigns/edit/' + parseInt(routesArgs.arg,10)}).
          success(function(data, status, headers, config) {
            $scope.campign = data;
          }).
          error(function(data, status, headers, config) {
            //ToDo something when there's a problem
          }); 
      }

  }
  switch (actionPath){
    case 'create':
      console.log('create');
      break;
    case 'view':
      $scope.getListOfCampigns();
      break;
    case 'edit':
      $scope.getCampignEdit();
      break;
    case 'delete':
      console.log('del');
      break;
    default:
      $scope.getListOfCampigns();
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