(function () {
  'use strict';

  angular.module('app').factory('currentUserService', currentUserService);

  function currentUserService($window) {
    var currentUser = null;

    function getCurrentUser() {
      return currentUser;
    }

    function setCurrentUser(user) {
      currentUser = user;
      if (user) {
        $window.sessionStorage["currentUser"] = JSON.stringify(currentUser);
      } else {
        $window.sessionStorage["currentUser"] = null;
      }
    }

    function init() {
      if ($window.sessionStorage["currentUser"]) {
        currentUser = JSON.parse($window.sessionStorage["currentUser"]);
      }
    }

    init();

    return {
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser
    };
  }

})();