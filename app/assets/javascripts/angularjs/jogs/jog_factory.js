app.factory('Jog', ['$resource', 'currentUserService', function ($resource, currentUserService) {
  var currentUser = currentUserService.getCurrentUser();
  return $resource('/api/users/:user_id/jogs/:id.json', { id: '@id', user_id: currentUser.userId }, {
    update: {
      method: 'PATCH'
    }});
}]);