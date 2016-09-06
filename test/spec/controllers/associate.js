'use strict';

describe('Controller: AssociateCtrl', function () {

  // load the controller's module
  beforeEach(module('odaChallengeApp'));

  var AssociateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssociateCtrl = $controller('AssociateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AssociateCtrl.awesomeThings.length).toBe(3);
  });
});
