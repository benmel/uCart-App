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
    $scope.state = 'scanning';
    
    $scope.items = [];
    $scope.item = { itemName: '', quantity: 0, price: 0 };

    $scope.subtotal = 0;
    $scope.tax = 0;
    $scope.total = 0;

    $scope.verification = { code: 'abcxyz123', input: '' };
    $scope.idVerificationNeeded = false;
    $scope.idVerified = false;

    $scope.addItem = function(){
	    var item = angular.copy($scope.item);
	    if (item.itemName && item.quantity > 0 && item.price > 0) {
	    	$scope.subtotal += (item.quantity * item.price);
	    	$scope.tax = calculateTax($scope.subtotal);
	    	$scope.total = $scope.subtotal + $scope.tax;
				$scope.items.push(item);

	    	$scope.item.itemName = '';
    		$scope.item.quantity = 0;
    		$scope.item.price = 0;
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

		$scope.startScanning = function() {
			$scope.state = 'scanning';
		};

		$scope.startPayment = function() {
			$scope.state = 'paying';
		};

		$scope.verify = function() {
			if (angular.equals($scope.verification.code, $scope.verification.input)) {
				$scope.idVerified = true;
			} else {
				window.alert('Incorrect code');
			}
		};	

  });