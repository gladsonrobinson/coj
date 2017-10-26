'use strict';

describe('productService', function () {
  var service;

  var $httpMock;
  var discountServiceMock;
  var BASE_HTTP_URL_MOCK = '/api/';
  var MockItemAfterDiscountApplied = {};


  beforeEach(module('coj.product-service'));
  beforeEach(module(initMocks));
  beforeEach(inject(initService));

  it('is constructed properly', function () {
    expect(service).to.be.an('Object');
  });

  it('should retrive all the product information for the form', function () {
    var expectedProductUrl = BASE_HTTP_URL_MOCK + 'products';
    var productResponce = {
      "data": {
        "customer_list": [{
          "cst_name": "APPLE",
          "cst_id": "apple",
          "avaialbel_offers": [{
            "offer_id": "003",
            "offer_text": "Gets a discount on Standout Ads where the price drops to $299.99 per ad"
          }]
        }]
      }
    }

    $httpMock.getMocks[expectedProductUrl] = productResponce;
    return service.getProductFormData().then(function (data) {
      expect($httpMock.get.calledOnce).to.eql(true);
      expect(data).not.to.eql([]);
      expect(data).to.eql(productResponce.data);
    });
  });

  it('cart should be empty on page load', function () {
    return service.getCartItems().then(function (cartitem) {
      expect(cartitem.items).to.eql([]);
    });
  });

  it('should add item to cart on calling addProductToCart', function () {
    var item = {
      ad_type: {
        ad_id: "standout",
        ad_name: "Standout Ad",
        price: 322.99
      },
      customer: {
        cst_id: "axe",
        cst_name: "AXE",
        avaialbel_offers: []
      },
      quantity: 4
    };

    MockItemAfterDiscountApplied = {
      ad_type: {
        ad_id: "standout",
        ad_name: "Standout Ad",
        price: 322.99
      },
      customer: {
        cst_id: "axe",
        cst_name: "AXE",
        avaialbel_offers: []
      },
      total_price: 1291.96,
      discount: 0,
      price_after_discount: 1291.96,
      quantity: 4
    };

    service.addProductToCart(item);
    return service.getCartItems().then(function (cartitem) {
      expect(discountServiceMock.applyDiscountIfAny.calledOnce).to.eql(true);
      expect(cartitem.items).not.to.eql([]);
      expect(cartitem.items.length).to.eql(1);
      expect(cartitem.grandTotal).to.eql(1291.96);
    });
  });


  it('should merge cart quantity if same product combination is added to cart', function () {
    var item1 = {
      ad_type: {
        ad_id: "standout",
        ad_name: "Standout Ad",
        price: 322.99
      },
      customer: {
        cst_id: "axe",
        cst_name: "AXE",
        avaialbel_offers: []
      },
      quantity: 4
    };

    var item2 = {
      ad_type: {
        ad_id: "standout",
        ad_name: "Standout Ad",
        price: 322.99
      },
      customer: {
        cst_id: "axe",
        cst_name: "AXE",
        avaialbel_offers: []
      },
      quantity: 4
    };

    var itemAfterQuantityMerge = {
      ad_type: {
        ad_id: "standout",
        ad_name: "Standout Ad",
        price: 322.99
      },
      customer: {
        cst_id: "axe",
        cst_name: "AXE",
        avaialbel_offers: []
      },
      quantity: 8
    };

    service.addProductToCart(item1);
    service.addProductToCart(item2);

    expect(discountServiceMock.applyDiscountIfAny.calledWith(itemAfterQuantityMerge)).to.eql(true);

  });

  it('should calculate grand total on adding items to the cart', function () {
    var item = {
      ad_type: {
        ad_id: "standout",
        ad_name: "Standout Ad",
        price: 500
      },
      customer: {
        cst_id: "axe",
        cst_name: "AXE",
        avaialbel_offers: []
      },
      quantity: 4
    };

    MockItemAfterDiscountApplied = {
      ad_type: {
        ad_id: "standout",
        ad_name: "Standout Ad",
        price: 500
      },
      customer: {
        cst_id: "axe",
        cst_name: "AXE",
        avaialbel_offers: []
      },
      total_price: 2000,
      discount: 0,
      price_after_discount: 2000,
      quantity: 4
    };

    service.addProductToCart(item);
    return service.getCartItems().then(function (cartitem) {
      expect(discountServiceMock.applyDiscountIfAny.calledOnce).to.eql(true);
      expect(cartitem.items).not.to.eql([]);
      expect(cartitem.items.length).to.eql(1);
      expect(cartitem.grandTotal).to.eql(2000);
    });
  });

  it('should remove cart item from the cart on calling removeCartItem', function() {
    var item = {
      ad_type: {
        ad_id: "standout",
        ad_name: "Standout Ad",
        price: 500
      },
      customer: {
        cst_id: "axe",
        cst_name: "AXE",
        avaialbel_offers: []
      },
      quantity: 4
    };

    MockItemAfterDiscountApplied = {
      ad_type: {
        ad_id: "standout",
        ad_name: "Standout Ad",
        price: 500
      },
      customer: {
        cst_id: "axe",
        cst_name: "AXE",
        avaialbel_offers: []
      },
      total_price: 2000,
      discount: 0,
      price_after_discount: 2000,
      quantity: 4
    };

    service.addProductToCart(item);
    return service.getCartItems().then(function (cartitem) {
      expect(discountServiceMock.applyDiscountIfAny.calledOnce).to.eql(true);
      expect(cartitem.items).not.to.eql([]);
      expect(cartitem.items.length).to.eql(1);
      expect(cartitem.grandTotal).to.eql(2000);

      service.removeCartItem(0);
      expect(cartitem.items).to.eql([]);
      expect(cartitem.items.length).to.eql(0);
    });
  });

  function initMocks($provide) {

    $httpMock = {
      get: sinon.spy(function (url) {
        return Q.when(this.getMocks[url]);
      }),
      getMocks: {},
    };

    $provide.factory('$http', function () {
      return $httpMock;
    });

    discountServiceMock = {
      applyDiscountIfAny: sinon.spy(function (item) {
        return MockItemAfterDiscountApplied;
      })
    };

    $provide.service('discountService', function () {
      return discountServiceMock;
    });

    $provide.factory('$q', function () {
      return Q;
    });

    $provide.constant('APPCONSTANT', {
      BASE_HTTP_URL: BASE_HTTP_URL_MOCK
    });

    $provide.constant('R', R);
  }

  function initService(productService) {
    service = productService;
  }
});