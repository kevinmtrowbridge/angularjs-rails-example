app

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('jogs');

    $stateProvider
      .state('jogs', {
        url: '/jogs',
        templateUrl: 'angular/jogs/_jogs.html',
        resolve: {
          auth: ["$q", "CurrentUserService", function ($q, CurrentUserService) {

            var currentUser = CurrentUserService.getCurrentUser();

            if (currentUser) {
              return $q.when(currentUser);
            } else {
              return $q.reject({ authenticated: false });
            }
          }]
        }
      })
  })

  .controller('JogsController', function ($scope, JogFactory) {
    var jogResource = JogFactory.resourceForUser($scope.CurrentUserService.getCurrentUser());

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
  })

  .factory('JogFactory', function ($resource) {

    var resourceForUser = function (user) {
      return $resource('/api/users/:user_id/jogs/:id.json', { id: '@id', user_id: user.user_id }, {
        update: {
          method: 'PATCH'
        }});
    }

    return {
      resourceForUser: resourceForUser
    }
  })

  .directive('datetimeConverter', function ($filter) {
    return {
      restrict: 'A',
      require: 'ngModel',
      priority: 1,
      link: function (scope, element, attr, ngModel) {

        function toModel(value) {
          return moment(value).toISOString();
        }

        function toView(value) {
          return $filter('date')(value, 'short'); // reformat date
        }

        ngModel.$formatters.push(toView);
        ngModel.$parsers.push(toModel);
      }
    };
  })

  .directive('numberConverter', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      priority: 1,
      link: function (scope, element, attr, ngModel) {

        function toModel(value) {
          return "" + value; // convert to string
        }

        function toView(value) {
          return parseFloat(value); // convert to number
        }

        ngModel.$formatters.push(toView);
        ngModel.$parsers.push(toModel);
      }
    };
  })

  .controller('JogFormController', function ($scope) {
    $scope.closeDropdown = function() {
      $scope.dropdownOpen = false;
    }
  })
  .directive("jogForm", function () {
    return {
      restrict: 'E',
      controller: 'JogFormController',
      scope: {
        jog: '=jog'
      },
      templateUrl: 'angular/jogs/_form.html'
    }
  })

  .filter('dateRange', function () {
    return function (items, field, rangeDescriptor) {
      return items.filter(function (item) {
        var date = new Date(item[field]);
        if (rangeDescriptor === 'today') {
          return (date.setHours(0, 0, 0, 0) == today());
        } else if (rangeDescriptor === 'pastWeek') {
          return (date < Date.now() && date > lastWeek());
        } else if (rangeDescriptor === 'pastMonth') {
          return (date < Date.now() && date > lastMonth());
        } else if (rangeDescriptor === 'all') {
          return true;
        }
      });
    };
  });

function today() {
  return (new Date()).setHours(0, 0, 0, 0);
}

function lastWeek() {
  var today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
}

function lastMonth() {
  var today = new Date();
  return new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
}

