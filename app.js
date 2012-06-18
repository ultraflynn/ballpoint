var request = require('request'),
    username = "john",
    password = "1234",
    url = "http://" + username + ":" + password + "@www.example.com",
    scheduler = "./scheduler",
    restController = "./rest",
    argv = require('optimist').argv;

scheduler.begin();
restController.start(scheduler);

/*
 * The function of this application is to take a configuration and then
 * using that connect to various websites (perhaps using different authentication)
 * and look for particular text. If found it then notifies (using one or more
 * different transports) of that content.
 *
 * - dynamic configuration using REST and JSON
 * - authentication
 * - web site connectivity
 * - timers and scheduling
 * - general website handling
 * - specific website handling
 * - html parsing (xpath searching)
 * - notification transports
 * - content searching
 * - content processing
 * - message templates
 * - logging
 * - statistics generation (hits, notifications, etc)
 *
 * Need also to decide how we're going to unit test this.
 *
 * The other thing to do is to deploy this on nodejitsu.
 */

request(
    {
      url: url
    },
    function(error, response, body) {
      // Do more stuff with 'body' here
    }
);
