app

  .factory("currentUserService", function ($window) {
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

  .factory('authenticationService', ['currentUserService', '$http', '$q', function (currentUserService, $http, $q) {

    function login(email, password) {

      var deferred = $q.defer();

      $http.post("/api/api_tokens.json", {
        login: {
          email: email,
          password: password
        }
      }).then(function (result) {
        currentUserService.setCurrentUser({
          apiToken: result.data.api_token,
          userId: result.data.user_id
        });
//      deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();

      var currentUser = currentUserService.getCurrentUser();

      $http({
        method: "DELETE",
        url: "/api/api_tokens.json",
        headers: {
          'Authorization': 'Token token="' + currentUser.apiToken + '"'
        }
      }).then(function (result) {
        currentUserService.setCurrentUser(null);
        deferred.resolve(result);
      }, function (error) {
        currentUserService.setCurrentUser(null);
        deferred.reject(error);
      });

      return deferred.promise;
    }

    return {
      login: login,
      logout: logout
    };
  }])

  .factory('authenticationHttpInterceptor', ['currentUserService', function (currentUserService) {
    return {
      request: function (config) {
        var currentUser = currentUserService.getCurrentUser();
        if (currentUser) {
          config.headers.Authorization = 'Token token="' + currentUser.apiToken + '"';
        }
        return config;
      }
    };
  }])

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authenticationHttpInterceptor');
  });