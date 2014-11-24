var app = angular.module('JogLogger', ['ngResource', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ui.router', 'ngAnimate']);

app.run(["$rootScope", "$location", "$state", function ($rootScope, $location, $state) {
  $rootScope.$on("$routeChangeSuccess", function () {
    console.log();
  });

  $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
    if (error && !error.authenticated) {
      $state.go('login');
    }
  });
}]);

app.config(function($logProvider){
  $logProvider.debugEnabled(true);
});

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('jogs');

  $stateProvider
    .state('jogs', {
      url: '/jogs',
      templateUrl: 'ng-templates/jogs.html',
      resolve: {
        auth: ["$q", "currentUserService", function ($q, currentUserService) {

          var currentUser = currentUserService.getCurrentUser();

          if (currentUser) {
            return $q.when(currentUser);
          } else {
            return $q.reject({ authenticated: false });
          }
        }]
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'ng-templates/login_form.html'
    })
});

app.directive('numberConverter', function () {
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
});

// Configure angular-resource to work properly with Rails.
app.config(function ($httpProvider) {
  var defaults = $httpProvider.defaults;
  defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
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

app.filter('dateRange', function () {
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