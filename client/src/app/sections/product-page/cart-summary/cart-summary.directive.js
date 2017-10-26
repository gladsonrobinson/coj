'use strict';

(function () {
  angular.module('coj-cart-summary-directive', [])
    .directive('cartSummary', function () {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'src/app/sections/product-page/cart-summary/cart-summary.tpl.html',
        controller: 'CartSummaryController',
        scope: {},
        controllerAs: 'cartSummarytCtrl',
        bindToController: true
      }
    });
})();