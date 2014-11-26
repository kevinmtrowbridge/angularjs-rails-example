(function () {
  'use strict';

  angular.module('app').config(config);

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider.state('createUser', {
      url: '/create-user',
      templateUrl: 'angular/users/_form.html',
      controller: 'CreateUsersController'
    })
  }

})();
