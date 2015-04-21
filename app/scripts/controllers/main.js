'use strict';

/**
 * @ngdoc function
 * @name uCartApp.controller:MainController
 * @description
 * # MainController
 * Controller of the uCartApp
 */
angular.module('uCartApp')
  .controller('MainController', function ($scope) {
    $scope.items = [];

    $scope.itemName = '';
    $scope.quantity = 0;
    $scope.price = 0;

    $scope.subtotal = 0;
    $scope.tax = 0;
    $scope.total = 0;

    $scope.addItem = function(){
	    var item = {
	        itemName: $scope.itemName,
	        quantity: $scope.quantity,
	        price: $scope.price
	    };
	    if (item.itemName && item.quantity > 0 && item.price > 0) {
	    	$scope.subtotal += (item.quantity * item.price);
	    	$scope.tax = calculateTax($scope.subtotal);
	    	$scope.total = $scope.subtotal + $scope.tax;
				$scope.items.push(item);

	    	$scope.itemName = '';
    		$scope.quantity = 0;
    		$scope.price = 0;
			} else {
				window.alert('not valid');
			}

		};

		$scope.removeItem = function(index) {
			var item = $scope.items[index];
			$scope.subtotal -= (item.quantity * item.price);
	    $scope.tax = calculateTax($scope.subtotal);
	    $scope.total = $scope.subtotal + $scope.tax;
			$scope.items.splice(index, 1);
		};
  
		var calculateTax = function(subtotal) {
			return Math.round(subtotal * 0.0925 * 100) / 100;
		};	

  });

