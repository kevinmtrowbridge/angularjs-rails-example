(function () {
  'use strict';

  angular.module('app').filter('dateRange', dateRange);

  function dateRange() {
    return function (items, field, rangeDescriptor) {
      return items.filter(function (item) {
        var date = new Date(item[field]);
        if (rangeDescriptor === 'today') {
          return (date.setHours(0, 0, 0, 0) == moment().startOf('day'));
        } else if (rangeDescriptor === 'pastWeek') {
          return (date < Date.now() && date > moment().startOf('week'));
        } else if (rangeDescriptor === 'pastMonth') {
          return (date < Date.now() && date > moment().startOf('month'));
        } else if (rangeDescriptor === 'all') {
          return true;
        }
      });
    };
  }

})();
