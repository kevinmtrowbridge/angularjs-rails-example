(function () {
  'use strict';

  angular.module('app').controller('ApplicationController', ApplicationController);

  function ApplicationController($rootScope, $timeout, currentUserFactory) {

    $rootScope.currentUserFactory = currentUserFactory;
    $rootScope.$watch(function () {
      return currentUserFactory.getCurrentUser()
    }, function (newVal, oldVal) {
      $rootScope.currentUser = newVal;
    });

    $rootScope.alerts = [];
    $rootScope.showAlert = function (message, type) {
      type = typeof type !== 'undefined' ? type : 'success';
      $rootScope.alerts.push({message: message, type: type});

      // fade out quickly
      var index = $rootScope.alerts.length - 1;
      $timeout(function () {
        $rootScope.alerts.splice(index, 1);
      }, 2000);
    };

  }

})();
