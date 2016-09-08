'use strict';

describe('Controller: TarifsCtrl', function () {

  // load the controller's module
  beforeEach(module('odaChallengeApp'));

  var TarifsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TarifsCtrl = $controller('TarifsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TarifsCtrl.awesomeThings.length).toBe(3);
  });
});
