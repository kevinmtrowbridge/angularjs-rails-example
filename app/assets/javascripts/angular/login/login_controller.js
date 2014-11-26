(function () {
  'use strict';

  angular.module('app').controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', 'loginFactory', '$state'];

  function LoginController($scope, loginFactory, $state) {

    $scope.credentials = {};

    $scope.login = function () {
      var promise = loginFactory.login($scope.credentials.email, $scope.credentials.password);

      promise.then(
        function (result) {

          $scope.currentUserFactory.setCurrentUser(result.data);

          $scope.showAlert('Logged in successfully.');
          $state.go('jogs');

        }, function (err) {
        $scope.showAlert('Incorrect email or password.', 'danger');
      });
    };

    $scope.logout = function () {
      var promise = loginFactory.logout();
      promise.finally(
        function (result) {
          $scope.currentUserFactory.setCurrentUser(null);
          $scope.showAlert('Logged out successfully, bye!');
          $state.go('login');
        });
    };
  }

})();
