'use strict';

/**
 * @ngdoc overview
 * @name uCartApp
 * @description
 * # uCartApp
 *
 * Main module of the application.
 */
angular
  .module('uCartApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/coupons', {
        templateUrl: 'views/coupons.html',
        controller: 'CouponsController'
      })
      .when('/find_product', {
        templateUrl: 'views/find_product.html',
        controller: 'FindProductController'
      })
      .when('/help', {
        templateUrl: 'views/help.html',
        controller: 'HelpController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('HeaderController', function ($scope, $location) {
    $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
    };
  });
