/* --------------------------------------------------------------------------------------------------
   bookRoutes.js - Read and Create 'Book' objects from/into a MongoDB Database, using GET and POST
   2017-05-01 Vincent van Beek
----------------------------------------------------------------------------------------------------- */
"use strict";

var express = require('express');

var routes = function(Book){

    var bookRouter = express.Router();   // Setup a router for the /api/book REST API

    bookRouter.route('/')
        .post(function(req,res){
            req.log.info({req: req}, "received post request");

            var book = new Book(req.body);
            book.save();

            res.status(201).send(book);  // 201 = status created since new book has been created in the MongoDB
                                         // and in the body we return the newly created book

            req.log.info({res: res}, "responded on post request");
        })
        .get(function(req,res){
            req.log.info({req: req}, "received get request");

            var query = req.query;

            Book.find(query, function(err,books){
                if(err) {
                    req.log.error("/api/books/ : Something went wrong. Error:", err);
                    res.status(500).send(err);
                    req.log.info({res: res}, "responded on get request with an error");
                }
                else
                {
                    res.json(books);
                    req.log.info({res: res}, "responded on get request");
                }
            });
        });

    bookRouter.use('/:bookId', function(req,res,next){

        req.log.info({req: req}, "received a request with a bookId");        

        Book.findById(req.params.bookId, function(err,book){
            if(err) {
                req.log.error("/api/books/:bookId : Something went wrong. Error:", err);
                res.status(500).send(err);
                req.log.info({res: res}, "responded on request with an error");
            }
            else if(book)
            {
                req.book = book;  // Add the book we found in the database to the request
                next();
            }
            else
            {
                res.status(404).send('no book found');
                req.log.info({res: res}, "responded on request that book was not found");
            }
        });
    });

    bookRouter.route('/:bookId')
        .get(function(req,res){
            req.log.info({req: req}, "received get request and book has been found");
            res.json(req.book);
            req.log.info({res: res}, "responded on get request (book returned)");
        })
        .put(function(req,res){
            req.log.info({req: req}, "received put request and book has been found");

            // update the book with its new give values
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function(err){
                if(err) {
                    req.log.error("/api/books/:bookId : Save in DB went wrong. Error:", err);
                    res.status(500).send(err);
                    req.log.info({res: res}, "responded on request with an error");
                }
                else{
                    res.json(req.book);  // return the updated book
                    req.log.info({res: res}, "responded on put request (returned the updated book)");
                }
            });
        })
        .patch(function(req,res){
            req.log.info({req: req}, "received patch request and book has been found");

            if(req.body._id)
                delete req.body._id;

            // update the book with one or more new value(s)
            for(var p in req.body)
            {
                req.book[p] = req.body[p];
            }
            req.book.save(function(err){
                if(err) {
                    req.log.error("/api/books/:bookId : Save in DB went wrong. Error:", err);
                    res.status(500).send(err);
                    req.log.info({res: res}, "responded on request with an error");
                }
                else{
                    res.json(req.book);  // return the updated book
                    req.log.info({res: res}, "responded on patch request (returned the updated book)");
                }
            });
        })
        .delete(function(req,res){
            req.log.info({req: req}, "received delete request and book has been found");
            req.book.remove(function(err){
                if(err){
                    req.log.error("/api/books/:bookId : Remove from DB went wrong. Error:", err);
                    res.status(500).send(err);
                    req.log.info({res: res}, "responded on request with an error");
                }
                else{
                    res.status(204).send('successfully removed');
                    req.log.info({res: res}, "responded on delete request (successfully removed)");
                }
            });
         });


    return bookRouter;
};

module.exports = routes;

