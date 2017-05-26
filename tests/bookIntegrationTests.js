/* --------------------------------------------------------------------------------------------------
   bookControllerTests.js - All unit tests for the bookController based on Mocha framework
   2017-05-26 Vincent van Beek
----------------------------------------------------------------------------------------------------- */
"use strict";

var should = require('should'),
    //express = require('express'),
    request = require('supertest'),
    app = ('../logTest.js'),
    mongoose = require("mongoose"),
    //Book = mongoose.model('Book'),

describe('Book Crud Tests', function(){
    it('Should allow a book to be posted and return a read and _id', function(done){
        var bookPost = {title:'new Book', authors:'Vincent', genre:'Fiction'};

        request(app)
            .post('/api/books')
            .send(bookPost)
            .expect(201)
            .end(function(err, results){
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done()
            })
    })

    afterEach(function(done){
        Book.remove().exec();
        done();
    })
})
