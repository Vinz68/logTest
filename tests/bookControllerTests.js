/* --------------------------------------------------------------------------------------------------
   bookControllerTests.js - All unit tests for the bookController based on Mocha framework
   2017-05-26 Vincent van Beek
----------------------------------------------------------------------------------------------------- */
"use strict";

var should = require('should'),
    sinon = require('sinon');

describe('Book Controller Tests:', function(){
    describe('Posts', function(){
        it('should not allow an empty title on post', function(){
            var Book = function(book){this.save = function(){}};

            // Post a book, without a title.
            var req = {
                body: {
                    author: 'AuthorName'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var bookController = require('../controllers/bookContoller')(Book);
            bookController.post(req,res);

            res.status.calledWith(400).should.equal(true, 'Bad Status '+ res.status.args[0][0]);
            res.send.calledWith('Title is requireed').should.equal(true);
        })
        
    })
})