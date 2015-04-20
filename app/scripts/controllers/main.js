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
	    if (item.itemName && item.quantity>0 && item.price >0)
	    {
	    $scope.items.push(item);
		}
		else
		{
			window.alert('not valid');

		}

		};

		$scope.removeItem = function(index){
			$scope.items.splice(index, 1);
		};
  }); 