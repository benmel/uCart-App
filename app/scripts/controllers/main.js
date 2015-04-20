'use strict';

/**
 * @ngdoc function
 * @name uCartAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uCartAppApp
 */
angular.module('uCartAppApp')
  .controller('MainCtrl', function ($scope) {
    $scope.item = '';
    $scope.quantity = 0;
    $scope.price = 0;

    $scope.scanItem = function() {
    	window.alert($scope.item + ' ' + $scope.quantity + ' ' + $scope.price);
    };
  }); 