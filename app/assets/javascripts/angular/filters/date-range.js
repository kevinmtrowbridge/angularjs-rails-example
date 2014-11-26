(function () {
  'use strict';

  angular.module('app').filter('dateRange', dateRange);

  function dateRange() {
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
  }

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

})();
