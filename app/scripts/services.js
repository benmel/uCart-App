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
        readCallback(data);
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

    stopRead: function() {
      stopRead();
    }
  };
});