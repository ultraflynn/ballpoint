var util = require("util");
var http = require("http");
var url = require("url");
var events = require("events");
var winston = require("winston");

var Server = function() {
};

Server.prototype = {
  start: function() {
    var self = this;
    http.createServer(function(request, response) {
      var postData = "";
      var pathname = url.parse(request.url).pathname;

      request.setEncoding("utf8");
      request.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
      });
      request.addListener("end", function() {
        winston.info("[" + pathname + "] " + postData);
        self.publish(pathname, response, postData);
      });
    }).listen(8888);
    winston.info("Server has started on port 8888");
  }
};

exports.newInstance = function(channel) {
  require("./responder").newInstance(channel);
  Server.prototype.publish = channel.publish;
  Server.prototype.subscribe = channel.subscribe;
  return new Server();
};
