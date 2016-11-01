/* --------------------------------------------------------------------------------------------------
   logTest - logging example.
   - using bunyan as logging framework
   2016-11-01 Vincent van Beek
----------------------------------------------------------------------------------------------------- */
"use strict";
var express = require("express");           // Express web application framework. http://expressjs.com/
var app = express();                        // W're using Express

var APPNAME = "logTest";                    // Name of this app used here and there
var PORT = 8088;                            // Node will listen on port number...

var uuid = require("uuid-v4");              // Module for generating and validation V4 UUIDs. https://www.npmjs.com/package/uuid-v4
var bunyan = require("bunyan");             // Bunyan is a simple and fast JSON logging library. https://github.com/trentm/node-bunyan
var log = bunyan.createLogger({
    name: APPNAME,                          // use the application name
    src: true,                              // show source filename, function and line number
                                            // Note: set to false in the production environment since it is time consuming
    streams: [{
        type: "rotating-file",              // Keep up to 7 log files (each day one log file)
        path: "./logs/logTest.log",
        period: "1d",                       // daily rotation
        count: 7                            // keep 7 back copies
    }],
    serializers: {
        req: bunyan.stdSerializers.req,      // Bunyan's HTTP server request serializer with a suggested set of keys.
        res: bunyan.stdSerializers.res       // Bunyan's HTTP server response serializer with a suggested set of keys.
    }
});


// static link the www-root folder to a 'html' directory (located in the users home directory)
app.use('/', express.static('~./html'));
log.info('www-root linked to folder /home/vincent.html');

app.use(function (req, res, next) {
    // CORS: Allow cross-domain requests (blocked by default)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Carry uuid (unique generated ID) and IP (the remote IP address of the request)
    // through out all log lines for a given request so that you can tie them all together.
    req.log = log.child({
        reqId: uuid(),
        reqIp: req.ip
    });
    next();
});

/*
app.get("/", function (req, res) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;   
    
    req.log.info({req: req}, "received request");
    req.log.info("full-url= ", fullUrl);

    res.status(404, "The server has not found anything matching the Request-URI").end();

    req.log.info({res: res}, "responded");
});
*/

app.get("/news", function (req, res) {
    try {
        req.log.info("NEWS");
        req.log.info({req: req}, "received request");
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("<p>No news Today</p><br>");
        res.end();
    } catch (err) {
        req.log.error("/news/ : Something went wrong....", err);
        res.status(503, "Something went wrong: " + err).end();
    }
    req.log.info({res: res}, "responded");
});


app.listen(PORT, function () {
    // Log that we have started and accept incomming connections on the configured port/
    log.info(APPNAME + " is ready and listening on port: " + PORT);
});
