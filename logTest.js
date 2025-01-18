/* --------------------------------------------------------------------------------------------------
   logTest - logging example.
   - using bunyan as logging framework 
   - using MongoDB as database
   - using express to build a REST Webservice API
   2017-05-03 Vincent van Beek
   2019-02-26 Vincent van Beek - packages updated & DeprecationWarning on mongoose.open resolved
----------------------------------------------------------------------------------------------------- */
"use strict";
const path = require('path');               // The path module provides utilities for working with file and directory paths.
var express = require("express");           // Express web application framework. http://expressjs.com/
var mongoose = require("mongoose");         // Framework to access MongoDB (Database) using JSON syntax.
var bodyParser = require("body-parser");    // Parse incoming request bodies in a middleware before your handlers,
                                            // available under the req.body property. See https://github.com/expressjs/body-parser

var APPNAME = "logTest";                    // Name of this app used here and there
var PORT = process.env.PORT || 8088;        // Node will listen on port from environment setting, or when not set to port number...

var app = express();                        // W're using Express

var uuid = require("uuid-v4");              // Module for generating and validation V4 UUIDs. https://www.npmjs.com/package/uuid-v4

var bunyan = require("bunyan");             // Bunyan is a simple and fast JSON logging library. https://github.com/trentm/node-bunyan
var log = bunyan.createLogger({
    name: APPNAME,                          // use the application name
    src: true,                              // show source filename, function and line number
                                            // Note: set to false in the production environment since it is time consuming
    streams: [{
        type: "rotating-file",              // Log files will "roll" over (automatic deletion after configured period)
        path: "./logs/logTest.log",         // Path and filename of the log file
        period: "1d",                       // daily rotation
        count: 31                           // keep 31 copies / files (~1 month)
    }],
    serializers: {                          // usage of default serializers:
        req: bunyan.stdSerializers.req,     // Bunyan's HTTP server request serializer with a suggested set of keys.
        res: bunyan.stdSerializers.res      // Bunyan's HTTP server response serializer with a suggested set of keys.
    }
});


// Connect with local MongoDB on database 'bookAPI' 
// (but for testing, [depending on environment variable setting] we will use remote MongoDB on server and database bookAPI_test)
var db;

if (process.env.ENV == 'Test'){
    console.log('ENV=Test');
    // db = mongoose.connect('mongodb://192.168.1.108/bookAPI_test');
    db = mongoose.connect('mongodb://192.168.1.108/bookAPI_test', {
        //useMongoClient: true,
	 useNewUrlParser: true,
         useUnifiedTopology: true,
      });
}
else{
    console.log('ENV!=Test');
    // db = mongoose.connect('mongodb://localhost/bookAPI');
    db = mongoose.connect('mongodb://localhost/bookAPI', {
        //useMongoClient: true,
	 useNewUrlParser: true,
	 useUnifiedTopology: true,
      });
}

var Book = require('./models/bookModel');   // our 'book' record structure

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());                 // find json object (in url) and make available in req.body


// CORS: Allow cross-domain requests (blocked by default)
app.use(function (req, res, next) {
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


// static link to the 'html' sub directory 
var wwwroot = path.join(__dirname, 'html');
app.use('/',express.static(wwwroot));
log.info('www-root linked to: ' + wwwroot + '.');


// REST WebService API for a 'Book'. 
// Using this API a book can be created, read, updated and deleted (CRUD) from the database.
// 'domain-name/api/books' ia the end point for "books"
var bookRouter = require('./routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);  // TODO add authors as well ; and make a relation.


// Start web-server and Log that we have started and accept incomming connections on the configured port.
app.listen(PORT, function () {
    log.info(APPNAME + " is ready and listening on port: " + PORT);
    console.log(APPNAME + " is ready and listening on port: " + PORT);
    console.log();
    console.log("Use this endpoint to query for books: http://localhost:8088/api/books");
});


// In order to reach the app from other modules
// we need to export the express application
module.exports.getApp = app;

