app.controller('ApplicationController', function ($scope, $filter, authenticationService, currentUserService) {

  $scope.login = function(credentials) {
    authenticationService.login(credentials.email, credentials.password);
  };

  $scope.logout = function() {
    authenticationService.logout();
  };

  $scope.getCurrentUser = function() {
    return currentUserService.getCurrentUser();
  };

});
