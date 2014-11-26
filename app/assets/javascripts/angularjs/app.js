var app = angular.module('JogLogger',
  ['ngResource', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ui.router', 'templates', 'ngMessages']);

app
  .run(["$rootScope", "$location", "$state", function ($rootScope, $location, $state) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
      if (error && !error.authenticated) {
        $state.go('login');
      }
    });
  }])

  .controller('ApplicationController', function ($rootScope, $timeout, CurrentUserService) {

    $rootScope.CurrentUserService = CurrentUserService;
    $rootScope.$watch(function () {
      return CurrentUserService.getCurrentUser()
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

  })

  .config(function ($httpProvider) {
    // Configure API calls to work properly with Rails.
    var defaults = $httpProvider.defaults;
    defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  })

  .directive("compareTo", function () {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function (scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function (modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function () {
          ngModel.$validate();
        });
      }
    };
  })
