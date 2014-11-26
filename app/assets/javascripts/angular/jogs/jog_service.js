(function () {
  'use strict';

  angular.module('app.jogs').factory('jogService', jogService);

  function jogService($resource) {

    var resourceForUser = function (user) {
      return $resource('/api/users/:user_id/jogs/:id.json', { id: '@id', user_id: user.user_id }, {
        update: {
          method: 'PATCH'
        }});
    };

    return {
      resourceForUser: resourceForUser
    }
  }

})();
