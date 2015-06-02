'use strict';

angular.module('starter.controllers', [])

.controller('ShoppingCtrl', function($scope, CartItems, IdVerification, Bluetooth) {
	$scope.state = 'scanning';

	$scope.items = CartItems.all();
	$scope.subtotal = CartItems.getSubtotal;
	$scope.tax = CartItems.getTax;
	$scope.total = CartItems.getTotal;

	$scope.showVerificationNeeded = IdVerification.showVerificationNeeded;
	$scope.showPaymentOptions = IdVerification.showPaymentOptions;
	$scope.code = { input: null };

	$scope.barcode = { input: null };
	
	$scope.add = function() {
		if ($scope.barcode.input) {
			CartItems.add($scope.barcode.input);
			$scope.barcode.input = null;
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

	$scope.$on('$ionicView.loaded', function() {
    var readBarcode = function(barcode) {
    	CartItems.add(barcode);
    };
    Bluetooth.setReadCallback(readBarcode);
	});

	$scope.$on('$ionicView.enter', function() {
    Bluetooth.startConnectPoll();
	});

	$scope.$on('$ionicView.leave', function() {
    Bluetooth.stopConnectPoll();
	});

	$scope.$on('$ionicView.unloaded', function() {
    Bluetooth.stopRead();
    Bluetooth.stopConnectPoll();
	});
})

.controller('ListCtrl', function($scope, $http, GroceryItems) {
  $scope.input = { query: '' };
  $scope.items = GroceryItems.all();
  
  $http.get('https://ucart-server.herokuapp.com/api/v1/products').success(function(data) {
    $scope.list = data;
  });

  $scope.add = function(name) {
    GroceryItems.add(name);
  };

  $scope.remove = function(item) {
    GroceryItems.remove(item);
  };

  $scope.clearQuery = function() {
    $scope.input.query = '';
  };
})

.controller('CouponsCtrl', function($scope, $http, GroceryItems) {
	$http.get('https://ucart-server.herokuapp.com/api/v1/coupons').success(function(data){
		$scope.coupons=data;
	});

	$scope.addToGrocery=function(item){
		GroceryItems.add(item.name);
	};
})

.controller('FindCtrl', function($scope) {
	$scope = null;
});
