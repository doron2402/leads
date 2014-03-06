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

globalFunc.setCurrentCampign = function(campign){
  this.currentCampign = campign;
};

globalFunc.getCurrentCampign = function(){
  if (this.currentCampign)
    return this.currentCampign;
  else
    return {err: 'cant find campign'};
}

globalFunc.generateCampignId = function () {
  var rand_num = Math.round( Math.random() * 1000000000 );
  return rand_num;
}

backOfficeApp.controller('mainController', function($scope, $http, $location){
	$scope.currentPage = 'main';
  $scope.msg = 'main controller';

  $scope.getClass = function(path) {
    if ($location.path() == '/' && path == '/home'){
      return "active";
    }

    if ($location.path().split('/')[1] == path.split('/')[1]) {
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
          url: 'http://' + window.A.Configuration.host + '/users/all'}).
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


/*
    Clients Controller

    - getListOfClients -> return an object with array of list of all clients
*/
backOfficeApp.controller('clientsController', function($scope, $http){

  $scope.getListOfClients = function(){
    $http({method: 'GET',
      url: 'http://' + window.A.Configuration.host + '/clients/all'}).
      success(function(data, status, headers, config) {
          console.log(data);
          localDB.clients = data;
          $scope.clients = data;
        }).
        error(function(data, status, headers, config) {
          //ToDo something when there's a problem
      });
  };

});


/*
    Campigns Controller
    ** get the action and args, action: new, edit,..
    - Get a list of all campigns : $scope.getListOfCampigns
    - Edit campign: a. first getCampignEdit() : get the data for the specific campign
                    b. submitCampign() : save changes

*/
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
        url: 'http://' + window.A.Configuration.host + '/campigns/all/deactive'}).
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
      url: 'http://' + window.A.Configuration.host + '/campigns/all'}).
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
          url: 'http://' + window.A.Configuration.host + '/campigns/edit/' + parseInt(routesArgs.arg,10)}).
          success(function(data, status, headers, config) {
            $scope.campign = data;
          }).
          error(function(data, status, headers, config) {
            //ToDo something when there's a problem
          });
      }

  };

  $scope.submitCampign = function(){

    if (!isNaN(this.campign.id) && this.campign.name != null){
      $http({
        method: 'POST',
        data: this.campign,
        url: 'http://' + window.A.Configuration.host + '/campings/save'})
      .success(function(data, status, headers, config){
          console.log(data);
          if (data.error)
          {
            alert(data.error);
          }
          else if (data.code == 'OK'){
            //Redirect to view single campign
            console.log(data);
            globalFunc.setCurrentCampign(data.data);
            $scope.goTo('/campigns/view/' + data.data.id);
          }
          else{
            alert('unknown');
          }
        }).error(function(data, status){
          console.log('something went wrong');
          console.log(data);
        });
    }
  };

  $scope.submitNewCampign = function(){
    console.log(this);
    var campign_data = this.campign;
    campign_data.id = parseInt(this.tmpCampignId,10);
    console.log(campign_data);
    $http({
        method: 'POST',
        data: campign_data,
        url: 'http://' + window.A.Configuration.host + '/campigns/create'}).
        success(function(data, status, headers, config) {
          if (data.err){
            //display error.

          }else{

            globalFunc.setCurrentCampign(data);
            $scope.currentCampign = data;
            //Redirect to single campign page
          }


        }).
        error(function(data, status, headers, config) {
          //ToDo something when there's a problem
        });
  };

  $scope.viewSingleCampign = function(){
    //Check if campigns already in data
    $scope.currentCampign = globalFunc.getCurrentCampign();
    if ($scope.currentCampign.err && $routeParams.id)
    {
      //Get campign from server
      $http({method: 'GET',
          url: 'http://' + window.A.Configuration.host + '/campings/get/' + parseInt($routeParams.id,10)}).
          success(function(data, status, headers, config) {
            globalFunc.setCurrentCampign(data);
            $scope.currentCampign = data;
            console.log(data);
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
      if (routesArgs.arg == 'all' || !routesArgs.arg)
        $scope.getListOfCampigns();
      else
        $scope.viewSingleCampign();
      break;
    case 'edit':
      $scope.getCampignEdit();
      break;
    case 'delete':
      console.log('del');
      break;
    case 'new':
      $scope.tmpCampignId = globalFunc.generateCampignId();
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
	    url: 'http://' + window.A.Configuration.host + '/logout'}).
        success(function(data, status, headers, config) {
          	console.log(data);
          	window.location = 'http://' + window.A.Configuration.host + '/';
        }).
        error(function(data, status, headers, config) {
          	console.log(data);
          	console.log('error');
          	$location.path('/backoffice#/');
      	});
});