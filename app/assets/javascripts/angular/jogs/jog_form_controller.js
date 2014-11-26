(function () {
  'use strict';

  angular.module('app').controller('JogFormController', JogFormController);

  function JogFormController($scope) {
    $scope.closeDropdown = function () {
      $scope.dropdownOpen = false;
    }
  }

})();
