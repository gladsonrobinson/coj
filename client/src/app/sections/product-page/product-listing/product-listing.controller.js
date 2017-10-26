'use strict';
angular.module('coj-product-listing-controller', [])
  .controller("ProductListingController", ['productService', function (productService) {
    (function (vm) {
      angular.extend(vm, {
        onAddToCart: onAddToCart,
        productFormData: {},
        model: {}
      });

      init();

      function init() {
        productService.getProductFormData().then(function (data) {
          vm.productFormData = data;
        });
      }

      function onAddToCart() {
        productService.addProductToCart(angular.copy(vm.model));
        vm.model = {};
      }

    })(this);
  }]);