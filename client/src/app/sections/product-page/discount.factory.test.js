'use strict';

describe('discountService', function () {
  var service;

  var $httpMock;
  var BASE_HTTP_URL_MOCK = '/api/';
  var MockItemAfterDiscountApplied = {};

  beforeEach(module('coj-discount-service'));
  beforeEach(module(initMocks));
  beforeEach(inject(initService));

  it('is constructed properly', function () {
    expect(service).to.be.an('Object');
  });

  it('should call the pricing api and get the possible ofer details', function () {
    var expectedPricingUrl = BASE_HTTP_URL_MOCK + 'pricingrule';
    var pricingResponce = [{
      "offer_id": "001",
      "offer_type": "deal",
      "ad_id": "classic",
      "offer_text": "Gets a 3 for 2 deals on Classic Ads",
      "get_min_qt": 3,
      "pay_price": 2
    }, {
      "offer_id": "003",
      "offer_type": "price_drop",
      "ad_id": "standout",
      "offer_text": "Gets a discount on Standout Ads where the price drops to $299.99 per ad",
      "min_buy": 0,
      "buy_price": 299.99
    }];
    $httpMock.getMocks[expectedPricingUrl] = pricingResponce;
    expect($httpMock.get.calledOnce).to.eql(true);
  });

  function initMocks($provide) {

    $httpMock = {
      get: sinon.spy(function (url) {
        return Q.when(this.getMocks[url]);
      }),
      getMocks: {},
    };

    var expectedPricingUrl = BASE_HTTP_URL_MOCK + 'pricingrule';
    var pricingResponce = [{
      "offer_id": "001",
      "offer_type": "deal",
      "ad_id": "classic",
      "offer_text": "Gets a 3 for 2 deals on Classic Ads",
      "get_min_qt": 3,
      "pay_price": 2
    }, {
      "offer_id": "003",
      "offer_type": "price_drop",
      "ad_id": "standout",
      "offer_text": "Gets a discount on Standout Ads where the price drops to $299.99 per ad",
      "min_buy": 0,
      "buy_price": 299.99
    }];
    $httpMock.getMocks[expectedPricingUrl] = pricingResponce;

    $provide.factory('$http', function () {
      return $httpMock;
    });

    $provide.factory('$q', function () {
      return Q;
    });

    $provide.constant('APPCONSTANT', {
      BASE_HTTP_URL: BASE_HTTP_URL_MOCK
    });

    $provide.constant('R', R);
  }

  function initService(discountService) {
    service = discountService;
  }
});