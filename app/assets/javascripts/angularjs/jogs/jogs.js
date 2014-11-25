app

  .factory('JogFactory', function ($resource) {

    var resourceForUser = function(user) {
      return $resource('/api/users/:user_id/jogs/:id.json', { id: '@id', user_id: user.user_id }, {
        update: {
          method: 'PATCH'
        }});
    }

    return {
      resourceForUser: resourceForUser
    }
  })

  .controller('JogsController', function ($scope, $filter, JogFactory) {
    var jogResource = JogFactory.resourceForUser($scope.CurrentUserService.getCurrentUser());

    $scope.jogs = jogResource.query();

    $scope.rangeDescriptor = 'all';

    $scope.datetimepickerDropdownOpen = false;
    $scope.closeDatetimepickerDropdown = function (newDate, oldDate) {
//    $scope.newJog.start_time = $filter('date')(newDate, 'short');
      $scope.datetimepickerDropdownOpen = false;
    };

    $scope.new = function () {
      var now = new Date();
      $scope.newJog = {
        'start_time': now
      }
    };

    $scope.newCancel = function (event) {
      event.preventDefault();
      $scope.newJog = null;
    };

    $scope.create = function () {
      var jog = jogResource.save($scope.newJog);
      $scope.jogs.push(jog);
      $scope.newJog = null;
    };

    $scope.edit = function (jog) {
      $scope.editedJog = jog;

      // Clone the original jog to restore it on demand.
      $scope.originalJog = angular.extend({}, jog);
    };

    $scope.update = function (jog) {
      jogResource.update(jog);
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
      jogResource.delete(jog);
      var originalJogs = $scope.jogs.slice(0);
      $scope.jogs.splice($scope.jogs.indexOf(jog), 1);
    }
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

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('jogs');

    $stateProvider
      .state('jogs', {
        url: '/jogs',
        templateUrl: 'ng-templates/jogs.html',
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

