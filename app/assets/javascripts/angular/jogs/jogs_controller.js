(function () {
  'use strict';

  angular.module('app.jogs').controller('JogsController', JogsController);

  function JogsController($scope, jogFactory) {
    var jogResource = jogFactory.resourceForUser($scope.currentUserFactory.getCurrentUser());

    $scope.jogs = jogResource.query();

    $scope.rangeDescriptor = 'all';

    $scope.new = function () {
      var now = new Date();
      $scope.newJog = {
        'start_time': now
      }
    };

    $scope.newCancel = function () {
      $scope.newJog = null;
    };

    $scope.create = function () {
      var jog = jogResource.save($scope.newJog);
      $scope.jogs.push(jog);
      $scope.newJog = null;
    };

    $scope.edit = function (jog) {
      $scope.editedJogMarker = jog;
      $scope.clonedJog = angular.extend({}, jog);
    };

    $scope.editCancel = function () {
      $scope.editedJogMarker = null;
      $scope.clonedJog = null;
    };

    $scope.update = function () {
      jogResource.update($scope.clonedJog);
      $scope.jogs.splice($scope.jogs.indexOf($scope.editedJogMarker), 1, $scope.clonedJog);
      $scope.editedJogMarker = null;
      $scope.clonedJog = null;
    };

    $scope.destroy = function (jog) {
      jogResource.delete(jog);
      $scope.jogs.splice($scope.jogs.indexOf(jog), 1);
    }
  }

})();
