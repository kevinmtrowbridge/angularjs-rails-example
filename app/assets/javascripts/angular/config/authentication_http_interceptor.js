(function () {
  'use strict';

  angular.module('app')
    .factory('authenticationHttpInterceptor', interceptor)
    .config(config);

  function interceptor(currentUserFactory) {
    return {
      request: function (config) {
        var currentUser = currentUserFactory.getCurrentUser();
        if (currentUser) {
          config.headers.Authorization = 'Token token="' + currentUser.api_token + '"';
        }
        return config;
      }
    };
  }

  function config($httpProvider) {
    $httpProvider.interceptors.push('authenticationHttpInterceptor');
  }

})();
