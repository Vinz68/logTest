/* --------------------------------------------------------------------------------------------------
   bookRoutes.js - Read and Create 'Book' objects from/into a MongoDB Database, using GET and POST
   2017-03-07 Vincent van Beek
----------------------------------------------------------------------------------------------------- */
"use strict";

var express = require('express');

var routes = function(Book){

    var bookRouter = express.Router();          // Setup a router for the /api/book REST API

    bookRouter.route('/')
        .post(function(req,res){
            req.log.info({req: req}, "received post request");

            var book = new Book(req.body);
            book.save();

            req.log.info({res: res}, "responded on post request");

            res.status(201).send(book);  // 201 = status created, since new book has been created in the MongoDB
        })
        .get(function(req,res){
            req.log.info({req: req}, "received get request");

            var query = req.query;
            
            Book.find(query, function(err,books){
                if(err) {
                    req.log.error("/api/Books/ : Something went wrong. Error:", err);
                    res.status(500).send(err);                
                }
                else
                {
                    req.log.info({res: res}, "responded on get request");
                    res.json(books);
                }
            });
        });


    bookRouter.route('/:bookId')
        .get(function(req,res){
            req.log.info({req: req}, "received request");
            
            Book.findById(req.params.bookId, function(err,book){
                if(err) {
                    req.log.error("/api/Books/ : Something went wrong. Error:", err);
                    res.status(500).send(err);                
                }
                else
                {
                    req.log.info({res: res}, "responded");
                    res.json(book);
                }
            });
        });


    return bookRouter;    
};

module.exports = routes;