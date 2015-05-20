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

.controller('ListCtrl', function($scope, GroceryItems) {


  $scope.defaultEntry = "Please type to search"  

  var oriBox = angular.copy($scope.defaultEntry);

   $scope.resetForm = function ()
    {
      $scope.defaultEntry = angular.copy(oriBox);
      $scope.defaultEntryForm.$setPristine();
    };

     $scope.isBoxChanged = function ()
    {
      return !angular.equals($scope.defaultEntry, oriBox);
    };


  $scope.items = GroceryItems.all();
  $scope.item = { id: null, name: null, quantity: null, price: null };
  

  
  $scope.add = function(itemNameInput) {
    var itemName = itemNameInput;
    var itemArray = { id:null, name:itemName, quantity:null, price:null};
     if (itemArray.name) {
      GroceryItems.add(itemArray);
      $scope.item = { id: null, name: null, quantity: null, price: null };
    } else {
      window.alert('Item not valid');
    }
  };

  $scope.remove = function(item) {
    GroceryItems.remove(item);
  };

   $scope.list = [
    {'name': 'Banana',
     'snippet': 'full of potassium'},
    {'name': 'Milk',
     'snippet': 'get your calcium'},
    {'name': 'Chicken breast',
     'snippet': 'ultimate protean source'},
    {'name': 'Apple',
     'snippet': 'an apple a day keep doctors away'},
    {'name': 'Grape',
    'snippet': 'antioxidant rich'},
    {'name': 'Lamb chop',
     'snippet': 'mehhhh'},
    {'name': 'Shrimp',
     'snippet': 'grill it, fry it, bake it, boil it, steam it'},
    {'name': 'Chocolate',
     'snippet': 'get it fir your girl is angry'},
    {'name': 'Granola',
     'snippet': 'healthy snack choice'},
    {'name': 'Beer',
     'snippet': 'just one can before bed'},
    {'name': 'Wine',
     'snippet': 'best icebreaker'},
    {'name': 'Flour',
     'snippet': 'baking tonight'},
    {'name': 'Oranges',
     'snippet': 'from Valencia. period.'}
  ];

  $scope.orderProp = 'age';


})


.controller('CouponsCtrl', function($scope) {
	$scope = null;
})

.controller('FindCtrl', function($scope) {
	$scope = null;
});
