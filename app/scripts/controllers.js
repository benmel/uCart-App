'use strict';

angular.module('starter.controllers', [])

.controller('ShoppingCtrl', function($scope, CartItems, CardInfo, IdVerification,GroceryItems, Bluetooth) {
	$scope.state = 'scanning';
	$scope.cardData = { cardSwiped: false, firstName: CardInfo.getFirstName, lastName: CardInfo.getLastName, cardNumber: CardInfo.getCardNumber };

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

	$scope.reset = function(){	
		CartItems.reset();
		CardInfo.reset();
		IdVerification.reset();
		GroceryItems.reset();
		$scope.state = 'scanning';
		$scope.cardData.cardSwiped = false;
		$scope.barcode.input = null;

	};
	$scope.startScanning = function() {
		$scope.state = 'scanning';
		window.scrollTo(0, 0);
	};

	$scope.startPaying = function() {
		$scope.state = 'paying';
		window.scrollTo(0, 0);
	};

	$scope.creditCardPayment =  function() {
		$scope.state = 'card';
		window.scrollTo(0, 0);
	};

	$scope.cashPayment =  function() {
		$scope.state = 'cash';
		window.scrollTo(0, 0);
	};

	$scope.verifyId = function() {
		if (!IdVerification.verifyId($scope.code.input)) {
			$scope.code.input = null;
			window.alert('Incorrect code');
		}
	};
	
	$scope.$on('$ionicView.loaded', function() {
    var readBarcode = function(barcode) {
	    if (barcode.length<60) {
	    	CartItems.add(barcode);
	    }
	    else {
	    	if($scope.state === 'card') {
	    		CardInfo.processInfo(barcode);
					$scope.cardData.cardSwiped = CardInfo.getSwipeCheck();
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

.controller('FindCtrl', function($scope, $http) {
  $scope.input = { query: '' };
  $scope.image = null;
  $scope.imageName = null;
  
  $http.get('https://ucart-server.herokuapp.com/api/v1/products').success(function(data) {
  	$scope.list = data;
  });

  $scope.locate = function(name, aisle) {
  	var aisles = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Other'];
  	if (aisles.indexOf(aisle) >= 0) {
  		$scope.imageName = name;
  	} else {
  		$scope.imageName = null;
  	}

  	switch(aisle) {
  		case 'A':
  			$scope.image = 'http://i.imgur.com/0ARN5FT.png';
  			break;
  		case 'B':
  			$scope.image = 'http://i.imgur.com/w32wbIw.png';
  			break;
  		case 'C':
  			$scope.image = 'http://i.imgur.com/IqlLNhf.png';
  			break;
  		case 'D':
  			$scope.image = 'http://i.imgur.com/4k0qgd7.png';
  			break;
  		case 'E':
  			$scope.image = 'http://i.imgur.com/E4aaiZg.png';
  			break;
  		case 'F':
  			$scope.image = 'http://i.imgur.com/ZZ7u2mB.png';
  			break;
  		case 'G':
  			$scope.image = 'http://i.imgur.com/36itAQs.png';
  			break;
  		case 'Other':
  			$scope.image = 'http://i.imgur.com/ImnRDDc.png';
  			break;
  		default:
  			$scope.image = null;	
  	}
  };

  $scope.clearQuery = function() {
    $scope.input.query = '';
    $scope.image = null;
    $scope.imageName = null;
  };	
});
