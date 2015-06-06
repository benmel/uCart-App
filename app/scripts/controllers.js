'use strict';

angular.module('starter.controllers', [])

.controller('ShoppingCtrl', function($scope, CartItems, IdVerification, Bluetooth) {
	$scope.state = 'scanning';

	$scope.firstName = "";
	$scope.lastName = "";
	$scope.cardNumber ="";


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
		$scope.state = 'card';
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
    	if($scope.state = 'card')
    	{
		    InputLength = barcode.length;
		alert(barcode);
		    var lastNameStartIndex = barcode.indexOf("^");
			lastNameStartIndex= lastNameStartIndex+1;

		    var modifiedEnding= InputLength-lastNameStartIndex;
			var headTrimmed = barcode.substring(lastNameStartIndex,InputLength-lastNameStartIndex);

			var firstNameStartIndex = headTrimmed.indexOf("/");
			var firstNameStartIndexPlus1 = firstNameStartIndex+1; 
			var firstNameEndIndex = headTrimmed.indexOf("^");
			var cardNumberStartIndex = headTrimmed.indexOf(";");
			cardNumberStartIndex= cardNumberStartIndex+1;
			var cardNumberEndingIndex = cardNumberStartIndex+16;
			var lastName = headTrimmed.substring(0, firstNameStartIndex);
		alert(lastName);
			var firstName = headTrimmed.substring(firstNameStartIndexPlus1,firstNameEndIndex);
		alert(firstName);  	
			var cardNumber = headTrimmed.substring(cardNumberStartIndex,cardNumberEndingIndex)
		alert(cardNumber);
		    var cardNumberLF= "XXXX-XXXX-XXXX-XXXX-"+cardNumber.substring(12,16);
		    cardNumber = 0;
		alert(cardNumberLF);

		$scope.firstName = firstName;
		$scope.lastName = lastName;
		$scope.cardNumber = cardNumberLF;
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
