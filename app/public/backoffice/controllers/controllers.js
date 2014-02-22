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


backOfficeApp.controller('mainController', function($scope, $http, $location){
	$scope.currentPage = 'main';
  $scope.msg = 'main controller';
  
  $scope.getClass = function(path) {
    if ($location.path() == '/' && path == '/home'){
      return "active";
    }  

    if ($location.path().substr(0, path.length) == path) {
      return "active"
    } else {
      return ""
    }
  }

});

backOfficeApp.controller('dashboardController', function ($scope, $http) {
  $scope.currentPage = 'dashboard';
  $scope.msg = 'Dashboard page';
});

backOfficeApp.controller('usersController', function($scope,$http, $location){
  var args = globalFunc.getRoute($location.$$path.split('/'));
  


  $scope.getUserInfo = function (args) {
    console.log('id: ' + args);
    if (localDB.users.length > 0){
        //get user id according args
        for (var i = 0; i < localDB.length; i++) {
          if (localDB.users[i].id == args){
            $scope.user = localDB.users[i];   
            console.log($scope.user);
            return;
          }
        };
        
     }
     else
     {
       $scope.user = { error: null};

      } 
  };

  $scope.getAllUsers = function(){
    
    if (localDB.users.length > 0){
        $scope.users = localDB.users;
     }
     else
     {
        $http({method: 'GET',
          url: 'http://localhost:3000/users/all'}).
          success(function(data, status, headers, config) {
            console.log(data);
            localDB.users = data;
            $scope.users = data;
          }).
          error(function(data, status, headers, config) {
          
          });
      } 
  };
   

  switch(args.action){
    case 'edit':
      $scope.getUserInfo(args.arg);
      break;
    default:
      $scope.getAllUsers();
      break;
  }
   
});

backOfficeApp.controller('clientsController', function($scope, $http){
	$scope.currentPage = 'clients';
  $scope.msg = 'clients';
});

backOfficeApp.controller('campignsController', function($scope, $http, $location, $routeParams, $modal) {
  
  $scope.currentPage = 'campigns';

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

  };



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