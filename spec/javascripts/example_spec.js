describe('directive: jog-form', function() {
  var element, scope;

  beforeEach(module('app'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    // TODO: write specs

    element = '<jog-form jog="{{jog}}"></jog-firm>';

    scope.jog = Jog.;

    element = $compile(element)(scope);
    scope.$digest();
  }));
});
