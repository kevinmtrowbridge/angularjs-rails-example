(function () {
  'use strict';

  angular.module('app').factory('jogFactory', jogFactory);

  function jogFactory($resource) {

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
