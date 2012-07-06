var winston = require("winston");

var Scheduler = function() {
};

Scheduler.prototype = {
  start: function() {
    var self = this;
    self.subscribe("/add", function(response, data) {
      // add the schedule
      winston.info("Adding a schedule - " + data);

      self.interval = setInterval(function() {
        winston.info("tick");
      }, 30000);

      self.publish("response", response, {status: 200, message: "Schedule has been added"});
    });

    self.subscribe("/remove", function(response, data) {
      clearInterval(self.interval);

      self.publish("response", response, {
        // TODO Is returning an HTTP error code the right thing to do?
        status: 200,
        message: "Schedule has been removed"
      })
    });

    self.subscribe("/", "/status", function(response, data) {
      // get the data
      self.publish("response", response, "this is the status");
    });
  }
};

exports.newInstance = function(channel) {
  Scheduler.prototype.publish = channel.publish;
  Scheduler.prototype.subscribe = channel.subscribe;
  return new Scheduler();
};
