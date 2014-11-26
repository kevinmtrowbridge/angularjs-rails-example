//https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec

app

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'angular/login/_form.html',
      controller: 'LoginController'
    })
  })

  .controller('LoginController', function ($scope, LoginService, $state) {

    $scope.credentials = {}

    $scope.login = function () {
      var promise = LoginService.login($scope.credentials.email, $scope.credentials.password);

      promise.then(
        function (result) {

          $scope.CurrentUserService.setCurrentUser(result.data);

          $scope.showAlert('Logged in successfully.');
          $state.go('jogs');

        }, function (err) {
          $scope.showAlert('Incorrect email or password.', 'danger');
        });
    };

    $scope.logout = function () {
      var promise = LoginService.logout();
      promise.finally(
        function (result) {
          $scope.CurrentUserService.setCurrentUser(null);
          $scope.showAlert('Logged out successfully, bye!');
          $state.go('login');
        });
    };

  })

  .factory('LoginService', ['$http', '$q', '$state', function ($http, $q, $state) {

    function login(email, password) {

      var deferred = $q.defer();

      $http.post("/api/api_tokens.json", {
        login: {
          email: email,
          password: password
        }
      }).then(function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();

      $http({
        method: "DELETE",
        url: "/api/api_tokens.json"
      }).then(function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    return {
      login: login,
      logout: logout
    };
  }])

  .factory("CurrentUserService", function ($window) {
    var currentUser = null;

    function getCurrentUser() {
      return currentUser;
    }

    function setCurrentUser(user) {
      currentUser = user;
      if (user) {
        $window.sessionStorage["currentUser"] = JSON.stringify(currentUser);
      } else {
        $window.sessionStorage["currentUser"] = null;
      }
    }

    function init() {
      if ($window.sessionStorage["currentUser"]) {
        currentUser = JSON.parse($window.sessionStorage["currentUser"]);
      }
    }

    init();

    return {
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser
    };
  })

  .factory('authenticationHttpInterceptor', ['CurrentUserService', function (CurrentUserService) {
    return {
      request: function (config) {
        var currentUser = CurrentUserService.getCurrentUser();
        if (currentUser) {
          config.headers.Authorization = 'Token token="' + currentUser.api_token + '"';
        }
        return config;
      }
    };
  }])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authenticationHttpInterceptor');
  })