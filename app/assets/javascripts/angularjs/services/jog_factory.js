app.factory('Jog', ['$resource', function ($resource) {
  return $resource('/api/jogs/:id.json', { id: '@id' }, {
    update: {
      method: 'PATCH'
    }});
}]);