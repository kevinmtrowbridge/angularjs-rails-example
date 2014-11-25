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

  .controller('ReportController', function ($scope, $filter, JogFactory) {
    var jogResource = JogFactory.resourceForUser($scope.CurrentUserService.getCurrentUser());

    // We can retrieve a collection from the server
    jogResource.query(function (jogs) {

      var st = Date.now();

      jogs = _.map(jogs, function (jog) {
        jog.start_week_millisecond = moment(jog.start_time).startOf('week').format('X');
        return jog;
      });

      var joggingWeeks = _.groupBy(jogs, function (jog) {
        return jog.start_week_millisecond;
      });

      joggingWeeks = _.map(joggingWeeks, function (jogsArray, key) {

        week = {}

        week.start_week_millisecond = key;
        week.start_week_human = moment.unix(key).format('YYYY-M-D');

        week.time_spent_running = _.reduce(jogsArray, function (memo, num) {
          return memo + parseFloat(num.time_in_hours);
        }, 0);

        week.distance_ran = _.reduce(jogsArray, function (memo, num) {
          return memo + parseFloat(num.distance_in_miles);
        }, 0);

        week.average_speed = week.distance_ran / week.time_spent_running;

        return week;
      });

      var et = Date.now();

      $scope.weeks = joggingWeeks;
    });
  });