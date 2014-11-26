(function () {
  'use strict';

  angular.module('app.report').factory('reportService', reportService);

  function reportService(currentUserService, jogService) {

    function joggingWeeks() {

      var service;
      var jogResource = jogService.resourceForUser(currentUserService.getCurrentUser());

      jogResource.query(function (jogs) {

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

        service.joggingWeeks = joggingWeeks;
      });
      return service.joggingWeeks;
    }

    return {
      joggingWeeks: joggingWeeks
    };
  }

})();
