var winston = require("winston");

var Responder = function() {
  this.subscribe("response", writeResponse);
};

function writeResponse(response, data) {
  var msg = JSON.stringify(data);
  winston.info("Response '" + msg + "'");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(msg);
  response.end();
}

exports.newInstance = function(channel) {
  Responder.prototype.publish = channel.publish;
  Responder.prototype.subscribe = channel.subscribe;
  return new Responder();
};
