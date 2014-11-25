app

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('report', {
        url: '/report',
        templateUrl: 'angularjs/report/_report.html',
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

  .controller('ReportController', function ($scope) {
  });