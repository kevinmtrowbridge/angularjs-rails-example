(function () {
  'use strict';

  angular.module('app.login').controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', 'loginService', '$state'];

  function LoginController($scope, loginService, $state) {
    var vm = this;

    vm.credentials = {};

    vm.login = function () {
      var promise = loginService.login(vm.credentials.email, vm.credentials.password);

      promise.then(
        function (result) {

          $scope.currentUserService.setCurrentUser(result.data);

          $scope.showAlert('Logged in successfully.');
          $state.go('jogs');

        }, function (err) {
          $scope.showAlert('Incorrect email or password.', 'danger');
        });
    };

    vm.logout = function () {
      var promise = loginService.logout();
      promise.finally(
        function (result) {
          $scope.currentUserService.setCurrentUser(null);
          $scope.showAlert('Logged out successfully, bye!');
          $state.go('login');
        });
    };
  }

})();
