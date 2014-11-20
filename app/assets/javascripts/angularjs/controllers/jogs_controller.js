app.controller('JogsController', function ($scope, Jog) {
  $scope.jogs = Jog.query();

  $scope.create = function () {
    var jog = Jog.save($scope.newJog);
    $scope.jogs.push(jog);
    $scope.newJog = {};
  };

  $scope.edit = function (jog) {
    $scope.editedJog = jog;

    // Clone the original jog to restore it on demand.
    $scope.originalJog = angular.extend({}, jog);
  };

  $scope.update = function (jog) {
    jog = Jog.update(jog);
    var originalJogs = $scope.jogs.slice(0);
    $scope.jogs.splice($scope.jogs.indexOf(jog), 1, jog);
    $scope.editedJog = null;
  };

  $scope.revertEdits = function (jog) {
    $scope.jogs[$scope.jogs.indexOf(jog)] = $scope.originalJog;
    $scope.editedJog = null;
    $scope.originalJog = null;
    $scope.reverted = true;
  };

  $scope.destroy = function (jog) {
    Jog.delete(jog);
    var originalJogs = $scope.jogs.slice(0);
    $scope.jogs.splice($scope.jogs.indexOf(jog), 1);
  }
});
