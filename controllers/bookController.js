/* --------------------------------------------------------------------------------------------------
   bookController.js - Create and Read 'Book' objects from/into a MongoDB Database, 
   using POST and GET operations.
   2017-05-26 Vincent van Beek
----------------------------------------------------------------------------------------------------- */
"use strict";

var bookController = function(Book){

    var post = function(req,res){
        //req.log.info({req: req}, "received post request");

        var book = new Book(req.body);

        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }
        else
        {
            book.save();
            res.status(201);  // 201 = status created since new book has been created in the MongoDB
            res.send(book);   // and in the body we return the newly created book
        }
    
        //req.log.info({res: res}, "responded on post request");
    }

    var get = function(req,res){
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
                var returnBooks = [];
                books.forEach(function(element, index, array){
                    var newBook = element.toJSON();
                    newBook.links= {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id
                    returnBooks.push(newBook);
                });
                res.json(returnBooks);

                req.log.info({res: res}, "responded on get request");
            }
        });
    }

    return {
        post: post,
        get: get
    }

}

module.exports = bookController;




