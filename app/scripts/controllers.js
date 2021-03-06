'use strict';

angular.module('starter.controllers', [])

.controller('ShoppingCtrl', function($scope, $ionicScrollDelegate, CartItems, CardInfo, IdVerification, GroceryItems, Bluetooth) {
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
	
	$scope.scrollTop = function() {
		$ionicScrollDelegate.scrollTop(true);
	};

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
		$scope.code.input = null;
		$scope.scrollTop();
	};
	
	$scope.startScanning = function() {
		$scope.state = 'scanning';
		$scope.scrollTop();
	};

	$scope.startPaying = function() {
		IdVerification.setIdVerificationNeeded(false);
		angular.forEach($scope.items, function(item) {
      if (item.category === 'Alcohol') {
      	IdVerification.setIdVerificationNeeded(true);
      }
    });
		
		$scope.state = 'paying';
		$scope.scrollTop();
	};

	$scope.creditCardPayment =  function() {
		$scope.state = 'card';
		$scope.scrollTop();
	};

	$scope.cashPayment =  function() {
		$scope.state = 'cash';
		$scope.scrollTop();
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

.controller('ListCtrl', function($scope, $http, $ionicScrollDelegate, CartItems, GroceryItems) {
  $scope.items = GroceryItems.all();
  
  $http.get('https://ucart-server.herokuapp.com/api/v1/products')
  .success(function(data) {
    $scope.list = data;
  });

  $scope.cartItems = CartItems.all();

  $scope.scrollTop = function() {
		$ionicScrollDelegate.scrollTop();
	};
  
  $scope.add = function(name) {
    GroceryItems.add(name);
  };

  $scope.remove = function(item) {
    GroceryItems.remove(item);
  };

  $scope.clearQuery = function() {
    $scope.input.query = '';
  };

  $scope.$watch('input.query', function() {
  	$scope.scrollTop();
  });
})

.controller('CouponsCtrl', function($scope, $http, GroceryItems) {
	$http.get('https://ucart-server.herokuapp.com/api/v1/coupons').success(function(data){
		$scope.chunkedData = chunk(data, 3);
	});

	function chunk(arr, size) {
	  arr.sort(function(a, b){
	  	var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
	  	if (nameA < nameB) {
	  		return -1;
	  	} 
	 		if (nameA > nameB) {
	  		return 1;
	  	}
	 		return 0;
	  });

	  var newArr = [];
	  for (var i=0; i<arr.length; i+=size) {
	    newArr.push(arr.slice(i, i+size));
	  }
	  return newArr;
	}

	$scope.addToGrocery=function(item){
		GroceryItems.add(item.name);
	};
})

.controller('FindCtrl', function($scope, $http) {
  $scope.input = { query: '' };
  $scope.image = null;
  $scope.imageName = null;
  $scope.noAisle = false;
  
  $http.get('https://ucart-server.herokuapp.com/api/v1/products').success(function(data) {
  	$scope.list = data;
  });

  $scope.locate = function(name, aisle) {
  	var aisles = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  	if (aisles.indexOf(aisle) >= 0) {
  		$scope.imageName = name;
  		$scope.noAisle = false;
  	} else {
  		if (aisle === 'Other') {
  			$scope.imageName = name;
  		} else {
	  		$scope.imageName = null;
  		}
  		$scope.noAisle = true;
  	}

  	if (aisle === 'Other') {
  		$scope.imageName = name;
  	}

  	switch(aisle) {
  		case 'A':
  			$scope.image = 'images/A.png';
  			break;
  		case 'B':
  			$scope.image = 'images/B.png';
  			break;
  		case 'C':
  			$scope.image = 'images/C.png';
  			break;
  		case 'D':
  			$scope.image = 'images/D.png';
  			break;
  		case 'E':
  			$scope.image = 'images/E.png';
  			break;
  		case 'F':
  			$scope.image = 'images/F.png';
  			break;
  		case 'G':
  			$scope.image = 'images/G.png';
  			break;
  		case 'Other':
  			$scope.image = null;
  			break;
  		default:
  			$scope.image = null;
  	}
  };

  $scope.clearQuery = function() {
    $scope.input.query = '';
    $scope.image = null;
    $scope.imageName = null;
    $scope.noAisle = false;
  };	
});
