(function () {
  'use strict';

  angular.module('app.jogs').config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('jogs');

    $stateProvider.state('jogs', {
      url: '/jogs',
      templateUrl: 'angular/jogs/_jogs.html',
      resolve: {
        auth: ["$q", "currentUserService", function ($q, currentUserService) {

          var currentUser = currentUserService.getCurrentUser();

          if (currentUser) {
            return $q.when(currentUser);
          } else {
            return $q.reject({ authenticated: false });
          }
        }]
      }
    })
  }

})();
