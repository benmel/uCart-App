'use strict';

angular.module('starter.controllers', [])

.controller('ShoppingCtrl', function($scope, CartItems, IdVerification, Bluetooth) {
	$scope.state = 'scanning';

	$scope.firstName = '';
	$scope.lastName = '';
	$scope.cardNumber = '';


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

	$scope.creditCardPayment =  function() {
		$scope.state = 'card';
	};

	$scope.cashPayment =  function() {
		$scope.state = 'cash';
	};

	$scope.verifyId = function() {
		if (!IdVerification.verifyId($scope.code.input)) {
			$scope.code.input = null;
			window.alert('Incorrect code');
		}
	};
	
	$scope.$on('$ionicView.loaded', function() {
    var readBarcode = function(barcode) {

    var inputLength = barcode.length;

    if (inputLength<60)
    {
    	CartItems.add(barcode);
    }
    else
    {
    	if($scope.state === 'card')
    	{
    		var power = barcode.indexOf('^');
    		var secondPower = barcode.indexOf('^', power+1);
    		var slash = barcode.indexOf('/');
    		var semicolon = barcode.indexOf(';');
    		var equals = barcode.indexOf('=');

    		var lastName = barcode.substring(power+1, slash);
    		var firstName = barcode.substring(slash+1, secondPower);
    		var cardNumber = barcode.substring(semicolon+1, equals);
    		var cardNumberDisplay = 'XXXX-XXXX-XXXX-' + cardNumber.substring(12, 16);


    		window.alert('Barcode: '+barcode);
    		window.alert('Last name: '+lastName);
    		window.alert('First name: '+firstName);
    		window.alert('Card number: '+cardNumber);

				// $scope.cardSwiped = true;
				// $scope.firstName = firstName;
				// $scope.lastName = lastName;
				// $scope.cardNumber = cardNumberLF;
			}
    	
    }

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
    Bluetooth.disconnect();
	});
})

.controller('ListCtrl', function($scope, $http, CartItems, GroceryItems) {
  $scope.items = GroceryItems.all();
  
  $http.get('https://ucart-server.herokuapp.com/api/v1/products')
  .success(function(data) {
    $scope.list = data;
  });

  $scope.cartItems = CartItems.all();
  
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
