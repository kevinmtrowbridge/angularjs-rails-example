(function () {
  'use strict';

  angular.module('app.jogs').controller('JogsController', JogsController);

  function JogsController($scope, jogService) {
    var vm = this;

    var jogResource = jogService.resourceForUser($scope.currentUserService.getCurrentUser());

    vm.jogs = jogResource.query();

    vm.rangeDescriptor = 'all';

    vm.new = function () {
      var now = new Date();
      vm.newJog = {
        'start_time': now
      }
    };

    vm.newCancel = function () {
      vm.newJog = null;
    };

    vm.create = function () {
      var jog = jogResource.save(vm.newJog);
      vm.jogs.push(jog);
      vm.newJog = null;
    };

    vm.edit = function (jog) {
      vm.editedJogMarker = jog;
      vm.clonedJog = angular.extend({}, jog);
    };

    vm.editCancel = function () {
      vm.editedJogMarker = null;
      vm.clonedJog = null;
    };

    vm.update = function () {
      jogResource.update(vm.clonedJog);
      vm.jogs.splice(vm.jogs.indexOf(vm.editedJogMarker), 1, vm.clonedJog);
      vm.editedJogMarker = null;
      vm.clonedJog = null;
    };

    vm.destroy = function (jog) {
      jogResource.delete(jog);
      vm.jogs.splice(vm.jogs.indexOf(jog), 1);
    }
  }

})();
