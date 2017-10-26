'use strict';

/**
 * Description : This is a global place for creating, registering and retrieving Angular module for coj Application. All
 * modules (angular core or 3rd party) that should be available to an application must be registered using this
 * mechanism.
 */
angular.module('cojApp', ['coj.router', 'coj-constant', 'coj.product-page'])
  /**
   * Description : gets executed after the injector is created and are used to kickstart the application. Only instances
   * and constants can be injected into run blocks. This is to prevent further system configuration during application run
   * time. Used here to restrict navigation.
   */
  .run([function () {}]);