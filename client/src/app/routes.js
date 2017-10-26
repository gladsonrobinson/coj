'use strict';

/*
 * Routes for the coj application.
 *
 * This file maps URL paths to various views in the CO application.
 */
angular.module('coj.router', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider',
    function (
      $stateProvider,
      $urlRouterProvider,
      $urlMatcherFactoryProvider) {

      $urlMatcherFactoryProvider.strictMode(false);
      $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state = $injector.get("$state");
        $state.transitionTo('productPage');
      });

      //$locationProvider.html5Mode(true).hashPrefix('!');

      $stateProvider
        .state('co', {
          url: '/',
          redirectTo: 'productPage'
        })
        .state('productPage', {
          url: '/product-page',
          templateUrl: 'src/app/sections/product-page/product.view.html',
          controller: 'ProductController as productCtrl'
        });
    }
  ]);