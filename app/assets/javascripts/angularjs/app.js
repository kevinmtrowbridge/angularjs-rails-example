var app = angular.module('JogLogger', ['ngResource', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ui.router', 'ngAnimate']);

app
  .run(["$rootScope", "$location", "$state", function ($rootScope, $location, $state) {
//    $rootScope.$on("$routeChangeSuccess", function () {
//      console.log("hey");
//    });

    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
      if (error && !error.authenticated) {
        $state.go('login');
      }
    });
  }])

  .controller('ApplicationController', function ($scope, $filter, CurrentUserService) {

    $scope.alerts = [];
    $scope.CurrentUserService = CurrentUserService;
    $scope.currentUser = CurrentUserService.getCurrentUser();

    $scope.showAlert = function (message, type) {
      type = typeof type !== 'undefined' ? type : 'success';
      $scope.alerts.push({message: message, type: type});

      // fade out quickly
      var index = $scope.alerts.length - 1;
      window.setTimeout(function () {
        $scope.alerts.splice(index, 1);
      }, 2000);
    };

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
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

  .config(function ($httpProvider) {
    // Configure angular-resource to work properly with Rails.
    var defaults = $httpProvider.defaults;
    defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
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
