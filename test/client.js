var http = require("http");
var winston = require("winston");

var available = {
	"add": {
		options: {host: "localhost", port: 8888, path: "/add", method: "POST"},
		data: {
			name: "A new schedule"
		}
	},
	"remove": {
		options: {host: "localhost", port: 8888, path: "/remove", method: "POST"},
		data: {
		}
	},
	"status": {
		options: {host: "localhost", port: 8888, path: "/status", method: "POST"},
		data: {
		}
	}
};

// TODO read the type of the required request from the command line
var command = available["add"];

var request = http.request(command.options, function(res) {
	winston.info(res.statusCode);
	res.setEncoding("UTF-8");
	res.on("data", function(data) {
		winston.info(data);
	});
});

request.write(JSON.stringify(command.data));
request.end();