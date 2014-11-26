(function () {
  'use strict';

  angular.module('app').config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('jogs');

    $stateProvider.state('jogs', {
      url: '/jogs',
      templateUrl: 'angular/jogs/_jogs.html',
      resolve: {
        auth: ["$q", "currentUserFactory", function ($q, currentUserFactory) {

          var currentUser = currentUserFactory.getCurrentUser();

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
