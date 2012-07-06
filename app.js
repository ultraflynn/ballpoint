var channel = require("./channel").initialise();
var server = require("./server").newInstance(channel);
var scheduler = require("./scheduler").newInstance(channel);

server.start();
scheduler.start();
