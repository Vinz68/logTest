/* --------------------------------------------------------------------------------------------------
   bookRoutes.js - Create, Read, Update and Delete 'Book' objects from/into a MongoDB Database, 
   using POST,PUT, GET, PATCH and DELETE operations.
   2017-05-26 Vincent van Beek
----------------------------------------------------------------------------------------------------- */
"use strict";

var express = require('express');

var routes = function(Book){

    var bookRouter = express.Router();   // Setup a router for the /api/book REST API

    var bookController = require('../controllers/bookController')(Book);

    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

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

            // create an Json object from the book
            var returnBook = req.book.toJSON();

            // Add field: 'FilterByThisGenre' , which is a link to books of same genre
            returnBook.links = {};
            var newLink = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
            returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20');

            // return the Json object (book with the 'FilterByThisGenre')
            res.json(returnBook);

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

