'use strict';
angular.module('coj-cart-summary-controller', [])
  .controller("CartSummaryController", ['productService', function (productService) {
    (function (vm) {
      angular.extend(vm, {
        removeCartItem: removeCartItem
      });

      init();

      function init() {
        productService.getCartItems().then(function (data) {
          vm.cartItems = data;
        });
      }

      function removeCartItem(index) {
        productService.removeCartItem(index);
      }

    })(this);
  }]);