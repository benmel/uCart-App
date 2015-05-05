'use strict';

angular.module('starter.controllers', [])

.controller('ShoppingCtrl', function($scope) {
	$scope.items = [{ name: 'Banana', quantity: 1, price: 1 }];
})

.controller('ListCtrl', function($scope) {})

.controller('CouponsCtrl', function($scope) {})

.controller('FindCtrl', function($scope) {});
