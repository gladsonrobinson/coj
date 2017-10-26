'use strict';

describe('ProductListingController', function () {

  var ProductListingController;
  var productServiceMock;
  var productFormDataMock;

  beforeEach(module('coj-product-listing-controller'));
  beforeEach(module(initMocks));
  beforeEach(inject(initController));

  it('is constructed properly', function () {
    expect(ProductListingController).to.be.an('Object');
    expect(productServiceMock.getProductFormData.calledOnce).to.eql(true);
  });

  it('is should call add to cart function of productservice', function () {
    ProductListingController.onAddToCart();
    expect(productServiceMock.addProductToCart.calledOnce).to.eql(true);
  });

  function initMocks($provide) {
    productServiceMock = {
      addProductToCart: sinon.spy(function (item) {
        return Q.when({});
      }),
      getProductFormData: sinon.spy(function () {
        return Q.when(productFormDataMock);
      })
    };

    $provide.service('productService', function () {
      return productServiceMock;
    });
  }

  function initController($controller) {
    ProductListingController = $controller('ProductListingController');
  }
});