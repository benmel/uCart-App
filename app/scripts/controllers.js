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
	$scope.coupons = [{ name: 'Banana', newPrice: 3.29, oldPrice: 4.49, aisle: 'A', img: 'http://placehold.it/280x150', category: 'Fruits' },
					  { name: 'Chocolate', newPrice: 3.19, oldPrice: 5.39, aisle: 'B', img: 'http://placehold.it/280x150' , category: 'Dairy'},
					  {name: 'Milk', newPrice: 3.19, oldPrice: 5.39, aisle: 'C', img: 'http://placehold.it/280x150' , category: 'Dairy'},
					  { name: 'Orange', newPrice: 2.29, oldPrice: 4.40, aisle: 'D', img: 'http://placehold.it/280x150' , category: 'Fruits'},
					  { name: 'Spinach', newPrice: 2.29, oldPrice: 4.40, aisle: 'E', img: 'http://placehold.it/280x150' , category: 'Vegetables'},
					  { name: 'Mango', newPrice: 2.29, oldPrice: 4.40, aisle: 'D', img: 'http://placehold.it/280x150' , category: 'Fruits'},
					  { name: 'Butter', newPrice: 2.29, oldPrice: 4.40, aisle: 'D', img: 'http://placehold.it/280x150' , category: 'Dairy'},
					  { name: 'Pineapple', newPrice: 2.29, oldPrice: 4.40, aisle: 'D', img: 'http://placehold.it/280x150' , category: 'Fruits'},
					  { name: 'Cheese', newPrice: 2.29, oldPrice: 4.40, aisle: 'D', img: 'http://placehold.it/280x150' , category: 'Dairy'},
					  { name: 'Green Peas', newPrice: 2.29, oldPrice: 4.40, aisle: 'D', img: 'http://placehold.it/280x150' , category: 'Vegetables'},
					  { name: 'Strawberry', newPrice: 2.29, oldPrice: 4.40, aisle: 'D', img: 'http://placehold.it/280x150' , category: 'Fruits'},
					  { name: 'Papaya', newPrice: 2.29, oldPrice: 4.40, aisle: 'D', img: 'http://placehold.it/280x150' , category: 'Fruits'},
					  
					  { name: 'Carrots', newPrice: 2.29, oldPrice: 4.40, aisle: 'D', img: 'http://placehold.it/280x150' , category: 'Vegetables'},
					  { name: 'Cabbage', newPrice: 2.29, oldPrice: 4.40, aisle: 'D', img: 'http://placehold.it/280x150' , category: 'Vegetables'},
					  { name: 'Yogurt', newPrice: 2.29, oldPrice: 4.40, aisle: 'D', img: 'http://placehold.it/280x150' , category: 'Dairy'},
					  { name: 'Ghee', newPrice: 2.29, oldPrice: 4.40, aisle: 'D', img: 'http://placehold.it/280x150' , category: 'Dairy'},

					  { name: 'Mushrooms', newPrice: 2.29, oldPrice: 4.40, aisle: 'D', img: 'http://placehold.it/280x150' , category: 'Vegetables'}
					  ];

	$scope.categories=['Vegetables','Fruits','Breakfast','Dairy'];







	

})



.controller('FindCtrl', function($scope) {
	$scope = null;
});
