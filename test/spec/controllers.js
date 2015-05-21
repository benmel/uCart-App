'use strict'

describe('Controller: ShoppingCtrl', function() {

	var ShoppingCtrl;
  var scope;
  var CartItemsMock;
  var IdVerificationMock;
  var BluetoothMock;
  
  // load the controller's module
  beforeEach(module('starter.controllers'));

  beforeEach(function() {
  	CartItemsMock = {
  		all: function() {},
  		add: function(item) {},
      addInput: function(item) {},
  		remove: function(item) {},
  		getSubtotal: function() {},
  		getTax: function() {},
  		getTotal: function() {}
  	};
    IdVerificationMock = {
      verifyId: function(input) {},
      showPaymentOptions: function() {},
      showVerificationNeeded: function() {}
    };
    BluetoothMock = {
      startConnectPoll: function() {},
      stopConnectPoll: function() {},
      setReadCallback: function(callback) {},
      startRead: function() {},
      stopRead: function() {}
    };
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShoppingCtrl = $controller('ShoppingCtrl', {
      $scope: scope, CartItems: CartItemsMock, IdVerification: IdVerificationMock, Bluetooth: BluetoothMock
    });
  }));

  it('has correct initial values', function() {
    scope.state.should.equal('scanning');
    var item = { id: null, name: null, quantity: null, price: null };
    scope.item.should.eql.item;
    var code = { input: null };
    scope.code.should.eql.code;
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

  describe('$scope.startScanning', function() {
    it('should set state to scanning', function() {
      scope.startScanning();
      scope.state.should.equal('scanning');
    });
  });

  describe('$scope.startPaying', function() {
    it('should set state to paying', function() {
      scope.startPaying();
      scope.state.should.equal('paying');
    });
  });

  describe('$scope.verifyId', function() {
    it('should reset code input if it was incorrect', function() {
      IdVerificationMock.verifyId = function(input) {
        return false;
      }
      scope.verifyId();
      expect(scope.code.input).to.be.null;
    });
    it('should not reset code input if it was correct', function() {
      scope.code.input = 'correct_code';
      IdVerificationMock.verifyId = function(input) {
        return true;
      }
      scope.verifyId();
      expect(scope.code.input).to.equal('correct_code');
    });
  });
});