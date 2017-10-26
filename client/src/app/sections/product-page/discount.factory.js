'use strict';
angular.module('coj-discount-service', []).factory('discountService', ["$http", "$q", "APPCONSTANT", function ($http,
  $q, APPCONSTANT) {
  var pricingRules = null;


  function _getPricingDetails() {
    if (!pricingRules) {
      return $http.get(APPCONSTANT.BASE_HTTP_URL + 'pricingrule').then(function (data) {
        pricingRules = data.data;
        return pricingRules;
      });
    } else {
      return $q.when(pricingRules)
    }
  }
  _getPricingDetails();

  return {
    applyDiscountIfAny: applyDiscountIfAny
  };

  function applyDiscountIfAny(item) {
    var originalTotal = item.quantity * item.ad_type.price;
    var itemOffer = _getOfferRule(item)[0];

    //If the product has offer
    if (itemOffer) {
      if (itemOffer.offer_type === 'deal') {
        if (item.quantity >= itemOffer.get_min_qt) {
          //Item is eligible for offer
          var discount = (itemOffer.get_min_qt * item.ad_type.price) - (itemOffer.pay_price * item.ad_type.price);
          var totalDiscount = Math.floor(item.quantity / itemOffer.get_min_qt) * discount;
          return _updateCartItemWithDiscount(item, originalTotal, totalDiscount);
        } else {
          return _updateCartItemWithDiscount(item, originalTotal, 0);
        }
      } else if (itemOffer.offer_type === 'price_drop') {
        if (item.quantity >= itemOffer.min_buy) {
          var totalDiscount = originalTotal - (itemOffer.buy_price * item.quantity);
          return _updateCartItemWithDiscount(item, originalTotal, totalDiscount);
        } else {
          return _updateCartItemWithDiscount(item, originalTotal, 0);
        }
      }
    } else {
      return _updateCartItemWithDiscount(item, originalTotal, 0);
    }
  }

  function _getOfferRule(item) {
    var possilbeOffers = [];
    item.customer.avaialbel_offers.forEach(function (availOffer) {
      var findOffers = function (rule) {
        return rule.offer_id === availOffer.offer_id && rule.ad_id === item.ad_type.ad_id;
      }
      var offer = R.filter(findOffers, pricingRules)[0];
      offer ? possilbeOffers.push(offer) : false;
    });

    return possilbeOffers;
  }

  function _updateCartItemWithDiscount(item, originalTotal, totalDiscount) {
    item.total_price = originalTotal;
    item.discount = totalDiscount;
    item.price_after_discount = originalTotal - totalDiscount;
    return item;
  }


}]);