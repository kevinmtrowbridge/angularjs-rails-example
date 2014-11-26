(function () {
  'use strict';

  angular.module('app.jogs').controller('JogsController', JogsController);

  function JogsController($scope, jogService) {
    var vm = this;

    var jogResource = jogService.resourceForUser($scope.currentUserService.getCurrentUser());

    vm.createJog = createJog;
    vm.destroyJog = destroyJog;
    vm.editCancel = editCancel;
    vm.editJog = editJog;
    vm.jogs = jogResource.query();
    vm.newCancel = newCancel;
    vm.newJog = newJog;
    vm.rangeDescriptor = 'all';
    vm.updateJog = updateJog;

    function newJog() {
      var now = new Date();
      vm.newJog = {
        'start_time': now
      }
    };

    function newCancel() {
      vm.newJog = null;
    };

    function createJog() {
      var jog = jogResource.save(vm.newJog);
      vm.jogs.push(jog);
      vm.newJog = null;
    };

    function editJog(jog) {
      vm.editedJogMarker = jog;
      vm.clonedJog = angular.extend({}, jog);
    };

    function editCancel() {
      vm.editedJogMarker = null;
      vm.clonedJog = null;
    };

    function updateJog() {
      jogResource.update(vm.clonedJog);
      vm.jogs.splice(vm.jogs.indexOf(vm.editedJogMarker), 1, vm.clonedJog);
      vm.editedJogMarker = null;
      vm.clonedJog = null;
    };

    function destroyJog(jog) {
      jogResource.delete(jog);
      vm.jogs.splice(vm.jogs.indexOf(jog), 1);
    }
  }

})();
