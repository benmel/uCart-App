'use strict';

angular.module('starter.controllers', [])

.controller('ShoppingCtrl', function($scope, CartItems, IdVerification) {
	$scope.state = 'scanning';

	$scope.items = CartItems.all();
	$scope.item = { id: null, name: null, quantity: null, price: null };
	
	$scope.subtotal = CartItems.getSubtotal;
	$scope.tax = CartItems.getTax;
	$scope.total = CartItems.getTotal;

	$scope.showVerificationNeeded = IdVerification.showVerificationNeeded;
	$scope.showPaymentOptions = IdVerification.showPaymentOptions;
	$scope.code = { input: null } ;
	
	$scope.add = function() {
		var item = angular.copy($scope.item);
	  if (item.name && item.quantity > 0 && item.price > 0) {
			CartItems.add(item);
			$scope.item = { id: null, name: null, quantity: null, price: null };
		} else {
			window.alert('Item not valid');
		}
	};

	$scope.remove = function(item) {
		CartItems.remove(item);
	};

	$scope.startScanning = function() {
		$scope.state = 'scanning';
	};

	$scope.startPaying = function() {
		$scope.state = 'paying';
	};

	$scope.verifyId = function() {
		if (!IdVerification.verifyId($scope.code.input)) {
			$scope.code.input = null;
			window.alert('Incorrect code');
		}
	};
})

.controller('ListCtrl', function($scope) {
	$scope = null;
})

.controller('CouponsCtrl', function($scope) {
	$scope = null;
})

.controller('FindCtrl', function($scope) {
	$scope = null;
});
