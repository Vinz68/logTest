/* --------------------------------------------------------------------------------------------------
   bookControllerTests.js - All unit tests for the bookController based on Mocha framework
   2017-05-26 Vincent van Beek
----------------------------------------------------------------------------------------------------- */
"use strict";

var should = require('should'),
    request = require('supertest'),
    mongoose = require("mongoose"),
    Book = require('../models/bookModel');   // our 'book' record structure

// Here we get hold of the express application 
// by using the exported 'getApp'-property
var app = require("../logTest").getApp;


const agent = request.agent(app);


describe('Book Crud Tests', function(){
    it('Should allow a book to be posted and return a read and _id', function(done){
        var bookPost = { title: 'new Book', author: 'Vincent', genre: 'Fiction' };

        agent
            .post('/api/books')
            .send(bookPost)
            .set('Accept', 'application/json')
            .expect(201)
            .end(function(err, res){

                if (err) 
                    throw err;
                else
                {
                    res.body.read.should.equal(false);
                    res.body.should.have.property('_id');
                    done()
                }
            })
    })

    afterEach(function(done){
        Book.remove().exec();
        done();
    })
})



