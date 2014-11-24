app

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('createUser', {
      url: '/create-user',
      templateUrl: 'ng-templates/create_user_form.html',
      controller: 'CreateUsersController'
    })
  })

  .controller('CreateUsersController', ['$scope', 'UsersService', '$state', function ($scope, UsersService, $state) {

    $scope.newUser = {};

    $scope.error = function(name) {
      var s = $scope.form[name];
      return s.$invalid && s.$dirty ? "error" : "";
    };

    $scope.create = function () {

      var promise = UsersService.create($scope.newUser.email, $scope.newUser.password, $scope.newUser.password_confirmation);

      promise.then(
        function (result) {
          $scope.showAlert('User created, now login.');
          $state.go('login');

        }, function (err) {

          $scope.showAlert('Error, please try again: ' + err.statusText, 'danger');

          _.each(err.data, function (errors, key) {
            _.each(errors, function (e) {
              $scope.form[key].$dirty = true;
              $scope.form[key].$setValidity(e, false);
            });
          });
        });
    }
  }])

  .factory('UsersService', ['$http', '$q', '$state', function ($http, $q, $state) {

    function create(email, password, password_confirmation) {

      var deferred = $q.defer();

      $http.post("/api/users.json", {
        user: {
          email: email,
          password: password,
          password_confirmation: password_confirmation
        }
      }).then(function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    return {
      create: create
    };
  }]);