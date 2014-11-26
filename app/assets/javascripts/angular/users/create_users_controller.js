(function () {
  'use strict';

  angular.module('app.users').controller('CreateUsersController', CreateUsersController);

  function CreateUsersController($scope, userFactory, $state) {

    $scope.newUser = {};

    $scope.create = function () {

      var promise = userFactory.create($scope.newUser.email, $scope.newUser.password, $scope.newUser.password_confirmation);

      promise.then(
        function (result) {
          $scope.showAlert('User created, now login.');
          $state.go('login');

        }, function (error) {
          try {
            _.each(error.data, function (errors, key) {
              _.each(errors, function (e) {
                $scope.form[key].$dirty = true;
                $scope.form[key].$setValidity(e.replace(/ /g, "_"), false);
              });
            });
          } catch (e) {
            // If something's wrong with the server.
            $scope.showAlert('Error, please try again.', 'danger');
          }
        });
    };

    $scope.error = function (name) {
      var f = $scope.form[name];
      return f.$invalid && f.$dirty ? "has-error" : "";
    };
  }

})();
