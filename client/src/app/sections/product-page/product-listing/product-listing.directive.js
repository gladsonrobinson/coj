'use strict';

(function () {
  angular.module('coj-product-listing-directive', [])
    .directive('productListing', function () {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'src/app/sections/product-page/product-listing/product-listing.tpl.html',
        controller: 'ProductListingController',
        scope: {},
        controllerAs: 'productListCtrl',
        bindToController: true
      }
    });
})();