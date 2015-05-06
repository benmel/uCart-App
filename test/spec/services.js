'use strict'

describe('Services: CartItems', function() {

	var CartItems;
  
  // load the service's module and initialize service
  beforeEach(function() {
  	module('starter.services');
  	inject(function (_CartItems_) {
    	CartItems = _CartItems_;
    });
	});

	describe('getSubtotal', function() {
		it('should return the subtotal', function() {
			CartItems.getSubtotal().should.equal(0);
		});
	});

	describe('getTax', function() {
		it('should return the tax', function() {
			CartItems.getTax().should.equal(0);
		});
	});

	describe('getTotal', function() {
		it('should return the total', function() {
			CartItems.getTotal().should.equal(0);
		});
	});

  describe('all', function() {
		it('should return an empty array', function() {
	  	CartItems.all().should.be.empty;
		});
  });

  describe('add', function() {
  	beforeEach(function() {
  		var item = { id: null, name: 'Banana', quantity: 5, price: 1 };
  		CartItems.add(item);
  	});
  	it('should add to items array if id is null', function() {
  		CartItems.all().should.have.length(1);
  	});
  	it('should give an id to item if id is null', function() {
  		var newItem = CartItems.all()[0];
  		newItem.id.should.not.be.null;
  	})
  	it('should update subtotal, tax and total if id is null', function() {
  		CartItems.getSubtotal().should.equal(5);
  		CartItems.getTax().should.equal(5*0.0925);
  		CartItems.getTotal().should.equal(5+5*0.0925);
  	});

  	describe('id is not null', function() {
	  	beforeEach(function() {
	  		var newItem = angular.copy(CartItems.all()[0]);
	  		newItem.quantity = 3;
	  		CartItems.add(newItem);
	  	});
	  	it('should update item', function() {
	  		// get item and update it
	  		var newItem = CartItems.all()[0];
	  		var newItemId = newItem.id;
	  		// get updated item
	  		var updatedItem = CartItems.all()[0];
	  		var updatedItemId = updatedItem.id;
	  		// same ids and updated quantity
	  		newItemId.should.equal.updatedItemId;
	  		updatedItem.quantity.should.equal(3);
	  	});
	  	it('should update subtotal, tax and total', function() {
	  		// get updated item
	  		var updatedItem = CartItems.all()[0];
	  		// test subtotal, tax and total
	  		CartItems.getSubtotal().should.equal(3);
	  		CartItems.getTax().should.equal(3*0.0925);
	  		CartItems.getTotal().should.equal(3+3*0.0925);
	  	});
  		
  	});
  });

	describe('remove', function() {
		beforeEach(function() {
  		var banana = { id: null, name: 'Banana', quantity: 5, price: 1 };
  		var apple = { id: null, name: 'Apple', quantity: 3, price: 2 };
  		var orange = { id: null, name: 'Orange', quantity: 2, price: 1.5 };
  		CartItems.add(banana);
  		CartItems.add(apple);
  		CartItems.add(orange);
  		var item = CartItems.all()[2];
  		CartItems.remove(item);
  	});
		it('should update subtotal, tax and total', function() {
  		CartItems.getSubtotal().should.equal(11);
  		CartItems.getTax().should.equal(11*0.0925);
  		CartItems.getTotal().should.equal(11+11*0.0925);
		});
		it('should remove item from items array', function() {
  		CartItems.all().should.have.length(2);
		});
	});
});