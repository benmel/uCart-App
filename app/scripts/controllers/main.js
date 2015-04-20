'use strict';

/**
 * @ngdoc function
 * @name uCartAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uCartAppApp
 */
angular.module('uCartAppApp')
  .controller('MainCtrl', function ($scope) {
    $scope.items = [];

    $scope.itemName = '';
    $scope.quantity = 0;
    $scope.price = 0;

    $scope.addItem = function(){
	    var item = {
	        itemName: $scope.itemName,
	        quantity: $scope.quantity,
	        price: $scope.price
	    };
	    $scope.items.push(item);
		};

		$scope.removeItem = function(index){
			$scope.items.splice(index, 1);
		};
  }); 