(function () {
  'use strict';

  angular.module('app.report').controller('ReportController', ReportController);

  function ReportController($scope, reportService) {
    var vm = this;
    vm.weeks = reportService.joggingWeeks();
  }

})();
