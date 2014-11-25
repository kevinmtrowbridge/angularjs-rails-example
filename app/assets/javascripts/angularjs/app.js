var app = angular.module('JogLogger',
  ['ngResource', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'ui.router', 'templates']);

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

  .directive('ngConfirmClick', [
    function () {
      return {
        priority: -1,
        restrict: 'A',
        link: function (scope, element, attrs) {
          element.bind('click', function (e) {
            var message = attrs.ngConfirmClick;
            if (message && !confirm(message)) {
              e.stopImmediatePropagation();
              e.preventDefault();
            }
          });
        }
      }
    }
  ]);