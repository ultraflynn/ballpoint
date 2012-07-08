var http = require("http"); var winston = require("winston");
var optimist = require('optimist')
	.usage('Usage: $0 --command [command]')
	.default('command', 'status');
var argv = optimist.argv;

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

var command = available[argv.command];

if (command === undefined) {
	winston.info(optimist.help());
} else {
	winston.info(argv.command);
	var request = http.request(command.options, function(res) {
		winston.info(res.statusCode);
		res.setEncoding("UTF-8");
		res.on("data", function(data) {
			winston.info(data);
		});
	});

	request.write(JSON.stringify(command.data));
	request.end();
}
