'use strict';

angular.module('starter.services', [])

.factory('CartItems', function() {
  var items = [];
  var id = 0;

  var subtotal = 0;
  var tax = 0;
  var total = 0;

  function addToTotal(item) {
    subtotal += item.price * item.quantity;
    updateTotal();
  }

  function removeFromTotal(item) {
    subtotal -= item.price * item.quantity;
    updateTotal();
  }

  function updateTotal() {
    tax = subtotal * 0.0925;
    total = subtotal + tax;
  }

  return {
    all: function() {
      return items;
    },
    add: function (item) {
      if (item.id === null) {
        item.id = id++;
        items.push(item);
        addToTotal(item);
      } else {
        for (var i in items) {
          if (items[i].id === item.id) {
            removeFromTotal(items[i]);
            items[i] = item;
            addToTotal(item);
          }
        }
      }
    },
    remove: function(item) {
      removeFromTotal(item);
      items.splice(items.indexOf(item), 1);
    },
    getSubtotal: function() {
      return subtotal;
    },
    getTax: function() {
      return tax;
    },
    getTotal: function() {
      return total;
    }
  };
})

.factory('IdVerification', function() {
  var code = 'abcxyz123';
  var idVerified = false;
  var idVerificationNeeded = false;

  return {
    getIdVerificationNeeded: function() {
      return idVerificationNeeded;
    },
    setIdVerificationNeeded: function(input) {
      if (typeof(input) == 'boolean') {
        idVerificationNeeded = input;
      }
    },
    verifyId: function(input) {
      if (angular.equals(code, input)) {
        idVerified = true;
        return true;
      } else {
        return false;
      }
    },
    showPaymentOptions: function() {
      if (!idVerificationNeeded || idVerified) {
        return true;
      } else {
        return false;
      }
    },
    showVerificationNeeded: function() {
      if (idVerificationNeeded && !idVerified) {
        return true;
      } else {
        return false;
      }
    }
  };
})


.factory('GroceryItems', function() {
  var items = [];

  return {
    all: function() {
      return items;
    },
    add: function (item) {
        items.push(item);
      } ,
    remove: function(item) {
      items.splice(items.indexOf(item), 1);
    }
  };
});



