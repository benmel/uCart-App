'use strict';

describe('Controller: MainController', function () {

  // load the controller's module
  beforeEach(module('uCartApp'));

  var MainController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainController = $controller('MainController', {
      $scope: scope
    });
  }));

  it('Has correct initial values', function() {
    expect(scope.state).toEqual('scanning');
    expect(scope.items).toEqual([]);
    expect(scope.item).toEqual({ itemName: '', quantity: 0, price: 0 });
    expect(scope.subtotal).toEqual(0);
    expect(scope.tax).toEqual(0);
    expect(scope.total).toEqual(0);
    expect(scope.verification).toEqual({ code: 'abcxyz123', input: '' });
    expect(scope.idVerificationNeeded).toEqual(false);
    expect(scope.idVerified).toEqual(false);
  });

  describe('$scope.addItem', function() {
    
    beforeEach(function() {
      scope.item = { itemName: 'Banana', quantity: 5, price: 1 };
    });

    describe('Invalid item', function() {
      
      beforeEach(function() {
        spyOn(window, 'alert');
      });

      it('Alerts if itemName is empty', function() {
        scope.item.itemName = '';
        scope.addItem();
        expect(window.alert).toHaveBeenCalledWith('Item not valid');
      });

      it('Alerts if quantity is less than or equal to zero', function() {
        scope.item.quantity = 0;
        scope.addItem();
        expect(window.alert).toHaveBeenCalledWith('Item not valid');
      });

      it('Alerts if price is less than or equal to zero', function() {
        scope.item.price = 0;
        scope.addItem();
        expect(window.alert).toHaveBeenCalledWith('Item not valid');
      });
    });

    describe('Valid item', function() {
      
      beforeEach(function() {
        scope.addItem();
      });

      it('Increments the subtotal using quantity and price', function() {
        expect(scope.subtotal).toEqual(5*1);
      });

      it('Sets the tax value', function() {
        expect(scope.tax).toEqual(scope.calculateTax(scope.subtotal));
      });

      it('Sets the total as the sum of the subtotal and tax', function() {
        expect(scope.total).toEqual(scope.subtotal + scope.tax);
      });

      it('Resets item values', function() {
        expect(scope.item).toEqual({ itemName: '', quantity: 0, price: 0 });
      });

      it('Adds an item to the items array', function() {
        expect(scope.items.length).toEqual(1);
      });

    });
  });
  
  describe('$scope.removeItem', function() {
    
    beforeEach(function() {
      scope.item = { itemName: 'Banana', quantity: 5, price: 1 };
      scope.addItem(); 
      scope.item = { itemName: 'Apple', quantity: 3, price: 0.5 };
      scope.addItem();
    });

    it('Decrements the subtotal using quantity and price', function() {
      var subtotal = scope.subtotal;
      var item = scope.items[1];
      scope.removeItem(1);
      expect(scope.subtotal).toEqual(subtotal - item.quantity*item.price);
    });

    it('Sets the tax value', function() {
      scope.removeItem(1);
      expect(scope.tax).toEqual(scope.calculateTax(scope.subtotal));
    });

    it('Sets the total as the sum of the subtotal and tax', function() {
      scope.removeItem(1);
      expect(scope.total).toEqual(scope.subtotal + scope.tax);
    });

    it('Removes an item from the items array', function() {
      var length = scope.items.length;
      scope.removeItem(1);
      expect(scope.items.length).toEqual(length - 1);
    });
  
  });

  describe('$scope.calculateTax', function() {
    it('Calculates tax using 9.25% and rounds to two decimal points', function() {
      expect(scope.calculateTax(10)).toEqual(0.93);
    });
  });

  describe('$scope.startScanning', function() {
    it('Sets state to scanning', function() {
      scope.startScanning();
      expect(scope.state).toEqual('scanning');
    });
  });

  describe('$scope.startPaying', function() {
    it('Sets state to paying', function() {
      scope.startPaying();
      expect(scope.state).toEqual('paying');
    });
  }); 

  describe('$scope.verify', function() {
    it('Sets idVerified to true if verification code and input are the same', function() {
      scope.verification.input = scope.verification.code;
      scope.verify();
      expect(scope.idVerified).toEqual(true);
    });

    it('Alerts if verification code and input are not the same', function() {
      spyOn(window, 'alert');
      scope.verification.input = 'abc';
      scope.verify();
      expect(window.alert).toHaveBeenCalledWith('Incorrect code');
    });
  });  
});
