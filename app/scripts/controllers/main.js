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
    $scope.items = [
    {itemName: 'banana', quantity: '1', price:'5'},
    {itemName: 'tomato', quantity: '2', price:'2'}
    ];

    $scope.itemName = '';
    $scope.quantity = 0;
    $scope.price = 0;

    $scope.addItem = function(){
    var item = {
        itemName: $scope.itemName,
        quantity: $scope.quantity,
        price: $scope.price
    };
    $scope.items.push(item);
	
	};

  }); 