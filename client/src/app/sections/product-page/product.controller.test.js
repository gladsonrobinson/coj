'use strict';

describe('ProductController', function () {

  var ProductController;
  var $stateMock;
  var $stateParamsMock;
  var SecurityServiceMock;
  var AuthorizationServiceMock;
  var BreadCrumbServiceMock;
  var $scopeMock;

  beforeEach(module('cojApp'));
  beforeEach(module(initMocks));
  beforeEach(inject(initController));

  it('is constructed properly', function () {
    expect(ProductController).to.be.an('Object');
  });

  function initMocks($provide) {

  }

  function initController($controller) {
    ProductController = $controller('ProductController');
  }
});