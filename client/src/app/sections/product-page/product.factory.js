'use strict';
angular.module('coj.product-service', []).factory('productService', ["$http", "$q", "discountService", "APPCONSTANT",
  function ($http, $q, discountService, APPCONSTANT) {

    var cartItems = {
      grandTotal: 0,
      items: []
    };
    var duplicateIndex = -1;

    return {
      getProductFormData: getProductFormData,
      addProductToCart: addProductToCart,
      getCartItems: getCartItems,
      removeCartItem: removeCartItem
    };

    function getProductFormData() {
      //'src/mock-data/product-form-data.json' use local mock data
      return $http.get(APPCONSTANT.BASE_HTTP_URL + 'products').then(function (data) {
        return data.data;
      });
    }

    function getCartItems() {
      if (cartItems) {
        return $q.when(cartItems)
      }
    }

    function removeCartItem(index) {
      cartItems.items.splice(index, 1);
      _calculateGrandTotal();
    }

    function addProductToCart(item) {
      //Merging duplicate items from cart if any
      duplicateIndex = -1;
      item = cartItems.items.length ? _findDulpicateItemAndMerge(item) : item;

      //Applying offers 
      item = discountService.applyDiscountIfAny(item);
      if (duplicateIndex !== -1) {
        cartItems.items[duplicateIndex] = item;
      } else {
        cartItems.items.push(item);
      }

      _calculateGrandTotal();
    }

    // Finds duplicate items in the cart while adding new product and merge the quantity
    function _findDulpicateItemAndMerge(item) {
      var findDuplicate = function (cartItem, index) {
        return cartItem.customer.cst_id === item.customer.cst_id && cartItem.ad_type.ad_id === item.ad_type.ad_id;
      }
      duplicateIndex = R.findIndex(findDuplicate)(cartItems.items);

      if (duplicateIndex !== -1) {
        item.quantity = item.quantity + cartItems.items[duplicateIndex].quantity;
      }
      return item;
    }

    function _calculateGrandTotal() {
      cartItems.grandTotal = cartItems.items.reduce(function (sum, item) {
        return sum + item.price_after_discount;
      }, 0);
    }
  }
]);