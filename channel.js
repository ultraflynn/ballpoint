var util = require("util");
var events = require("events");
var winston = require("winston");

var EventChannel = function() {
  events.EventEmitter.call(this);

  var types = {}, self = this;
  self.addListener("unknown", function(response) {
    self.publish("response", response, {status: 404, message: "Invalid request"});
  });

  this.publish = function(type) {
    var l = arguments.length;
    var args = new Array(l - 1);
    args[0] = types[type] || "unknown";
    for (var i = 1; i < l; i++) args[i] = arguments[i];
    self.emit.apply(self, args);
  };
  // Must have two of more arguments and the last must be a function
  // Subscription created for all arguments before the last
  this.subscribe = function() {
    if (arguments.length < 2) return; 
    if (!arguments[arguments.length - 1] instanceof Function) return;

    var l = arguments.length - 1;
    var callback = arguments[l];
    for (var i = 0; i < l; i++) {
      types[arguments[i]] = arguments[i];
      self.addListener(arguments[i], callback);
    }
  };
};
util.inherits(EventChannel, events.EventEmitter);

exports.initialise = function() {
  return new EventChannel();
}