'use strict';

angular.module('starter.services', [])

.factory('CartItems', function($http, GroceryItems) {
  var items = [];
  var id = 0;

  var subtotal = 0;
  var tax = 0;
  var total = 0;

  function addToTotal(item) {
    if (item.coupon && item.coupon.price) {
      subtotal += item.coupon.price * item.quantity;
    }
    else {
      subtotal += item.price * item.quantity;
    }
    updateTotal();
  }

  function removeFromTotal(item) {
    if (item.coupon && item.coupon.price) {
      subtotal -= item.coupon.price * item.quantity;
    } else {
      subtotal -= item.price * item.quantity;
    }
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
    add: function (barcode) {
      var itemFound = false;

      // check if item exists in cart
      angular.forEach(items, function(item) {
        if (item.barcode === barcode) {
          removeFromTotal(item);
          item.quantity++;
          addToTotal(item);
          itemFound = true;
        }
      });

      // add an item if not in cart
      if (!itemFound) {
        $http.get('https://ucart-server.herokuapp.com/api/v1/products', 
          { params : { barcode: barcode } })
        .success(function(data) {
          var item = data;
          if (item.name && item.price && item.barcode) {
            item.id = id++;
            item.quantity = 1;
            items.push(item);
            addToTotal(item);
            GroceryItems.addCheckOff(item);
          }
        });
      }
    },
    remove: function(item) {
      GroceryItems.removeCheckOff(item);
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
    },
    reset:function() {
      items.length = 0;
      id = 0;
      subtotal = 0;
      tax = 0;
      total = 0;
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
      if (typeof(input) === 'boolean') {
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
    },
    reset:function() {
      idVerified = false;
      idVerificationNeeded = false;
    }
  };
})

.factory('CardInfo', function() {
  var firstNameOutput ='';
  var lastNameOutput = '';
  var cardNumberOutput = '';
  var swipeCheck = false;

return {
    processInfo: function (input) {
      var power = input.indexOf('^');
      var secondPower = input.indexOf('^', power+1);
      var slash = input.indexOf('/');
      var semicolon = input.indexOf(';');
      var equals = input.indexOf('=');

      var lastName = input.substring(power+1, slash);
      var firstName = input.substring(slash+1, secondPower);
      var cardNumber = input.substring(semicolon+1, equals);
      var cardNumberDisplay = 'XXXX-XXXX-XXXX-' + cardNumber.substring(12, 16);

      if ( firstName && lastName && cardNumber) {
        firstNameOutput = firstName;
        lastNameOutput = lastName;
        cardNumberOutput = cardNumberDisplay;
        swipeCheck = true;
      } 
    },
    getFirstName: function() {
      return firstNameOutput;
    },
    getLastName: function() {
      return lastNameOutput;
    },
    getCardNumber: function(){
      return cardNumberOutput;
    },
    getSwipeCheck: function(){
      return swipeCheck;
    },
    reset:function() {
      firstNameOutput ='';
      lastNameOutput = '';
      cardNumberOutput = '';
      swipeCheck = false;
    }
  };
})

.factory('GroceryItems', function() {
  var items = [];
  var id = 0;
  var checkDuplicate = false;

  return {
    all: function() {
      return items;
    },
    add: function (name) {
      checkDuplicate=false;
      var item = { id: id++, name: name, checked: false};
      for (var i in items) {
        if(items[i].name===item.name)
        {
          checkDuplicate= true;
        }
      }
      if (checkDuplicate===false)
      {
        items.push(item);
      }
    },
    remove: function(item) {
      items.splice(items.indexOf(item), 1);

    },
    addCheckOff: function(parsedItem){
      for (var i in items) { 
        if(items[i].name===parsedItem.name)
        {
          items[i].checked = true;
        }
      }
    },
    removeCheckOff: function(parsedItem){
      for (var i in items) {
        if(items[i].name===parsedItem.name)
        {
          items[i].checked = false;
        }
      }
    },
    reset:function() {
      items.length = 0;
      id = 0;
      checkDuplicate = false;
    }
  };
})



.factory('Bluetooth', function($q, $interval) {
  var poll;
  var readCallback;

  function getDevice() {
    return $q(function(resolve, reject) {
      bluetoothSerial.list(
        function(devices) {
          var deviceId = '';
          devices.forEach(function(device) {
            if (device.name.indexOf('ucartpi') >= 0) {
              deviceId = device.id;
            }
          });
          if (deviceId) {
            resolve(deviceId);
          } else {
            reject();
          }
        },
        function(error) {
          reject(error);
        }
      );
    });
  }

  function createConnection(deviceId) {
    return $q(function(resolve, reject) {
      bluetoothSerial.connect(deviceId, 
        function() {
          resolve();
        }, 
        function(error) {
          reject(error);
        }
      );
    });
  }

  function connect() {
    getDevice().then(createConnection).then(startRead);
  }

  function isConnected() {
    return $q(function(resolve, reject) {
      bluetoothSerial.isConnected(
        function() {
          resolve();
        },
        function() {
          reject();
        }
      );
    });
  }

  function startConnectPoll() {
    poll = $interval(function() {
      isConnected().catch(function() {
        connect();
      });
    }, 3000);
  }

  function stopConnectPoll() {
    if (angular.isDefined(poll)) {
      $interval.cancel(poll);
      poll = undefined;
    }
  }

  function startRead() {
    bluetoothSerial.subscribe('\n',
      function(data) {
        readCallback(data.trim());
      },
      function() {
      }
    );
  }

  function stopRead() {
    bluetoothSerial.unsubscribe();
  }

  return {
    startConnectPoll: function() {
      startConnectPoll();  
    },

    stopConnectPoll: function() {
      stopConnectPoll();
    },

    setReadCallback: function(callback) {
      readCallback = callback;
    },

    startRead: function() {
      startRead();
    },

    stopRead: function() {
      stopRead();
    },

    disconnect: function() {
      bluetoothSerial.disconnect();
    }
  };
});
