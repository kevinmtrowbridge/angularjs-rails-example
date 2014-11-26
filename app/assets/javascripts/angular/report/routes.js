(function () {
  'use strict';

  angular.module('app.report').config(config);

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('report', {
        url: '/report',
        templateUrl: 'angular/report/_report.html',
        resolve: {
          // TODO: this is an exact copy of what's in jogs/routes.js
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
