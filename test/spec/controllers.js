'use strict'

describe('Controller: ShoppingCtrl', function() {

	var ShoppingCtrl;
  var scope;
  var CartItemsMock;
  
  // load the controller's module
  beforeEach(module('starter.controllers'));

  beforeEach(function() {
  	CartItemsMock = {
  		all: function() {},
  		add: function(item) {},
  		remove: function(item) {},
  		getSubtotal: function() {},
  		getTax: function() {},
  		getTotal: function() {}
  	};
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShoppingCtrl = $controller('ShoppingCtrl', {
      $scope: scope, CartItems: CartItemsMock
    });
  }));

  it('has correct initial values', function() {
  	var item = { id: null, name: null, quantity: null, price: null };
    scope.item.should.eql(item);
  });

  describe('$scope.add', function() {
  	beforeEach(function() {
      scope.item = { id: null, name: 'Banana', quantity: 5, price: 1 };
    });

    describe('invalid item', function() {
      it('does not change item if name is empty', function() {
        scope.item.name = '';
        scope.add();
        var item = { id: null, name: '', quantity: 5, price: 1 };
        scope.item.should.eql(item);
      });
      it('does not change item if quantity is less than or equal to zero', function() {
        scope.item.quantity = 0;
        scope.add();
        var item = { id: null, name: 'Banana', quantity: 0, price: 1 };
        scope.item.should.eql(item);
      });
      it('does not change item if price is less than or equal to zero', function() {
        scope.item.price = 0;
        scope.add();
        var item = { id: null, name: 'Banana', quantity: 5, price: 0 };
        scope.item.should.eql(item);
      });
    });

    describe('valid item', function() {
    	it('resets item', function() {
    		scope.add();
    		var item = { id: null, name: null, quantity: null, price: null };
    		scope.item.should.eql(item);
    	});
    });

  });
});