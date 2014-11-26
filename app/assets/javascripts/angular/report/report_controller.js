(function () {
  'use strict';

  angular.module('app.report').controller('ReportController', ReportController);

  function ReportController($scope, jogService) {
    var vm = this;

    var jogResource = jogService.resourceForUser($scope.currentUserService.getCurrentUser());

    // We can retrieve a collection from the server
    jogResource.query(function (jogs) {

      // TODO: move this out of the controller
      jogs = _.map(jogs, function (jog) {
        jog.start_week_millisecond = moment(jog.start_time).startOf('week').format('X');
        return jog;
      });

      var joggingWeeks = _.groupBy(jogs, function (jog) {
        return jog.start_week_millisecond;
      });

      joggingWeeks = _.map(joggingWeeks, function (jogsArray, key) {

        var week = {};

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

      vm.weeks = joggingWeeks;
    });
  }

})();
