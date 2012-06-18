var journey = require('journey'),
    winston = require('winston'),
    router = new (journey.Router);

var handlers = {};

router.map(function() {
  this.root.bind(function(req, res) {
    res.send("ballpoint affirm")
  });
  this.get(/^r\/*/).bind(function(req, res, id) {
    var handler = handlers['xxx'] | require('./rest/' + 'xxx' + '.js');
    handler.invoke(req, res, id);
    handlers['xxx'] = handler;
  });
});

function start(scheduler) {
  require('http').createServer(function(request, response) {
    var body = "";

    request.addListener('data', function(chunk) {
      body += chunk
    });
    request.addListener('end', function() {
      //
      // Dispatch the request to the router
      //
      router.handle(request, body, function(result) {
        response.writeHead(result.status, result.headers);
        response.end(result.body);
      });
    });
  }).listen(8080);
  winston.log("Rest interface enabled");
}

exports.start = start;