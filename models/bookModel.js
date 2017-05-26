/* --------------------------------------------------------------------------------------------------
   bookModels.js - JSON object how a 'Book' looks like
   2017-03-06 Vincent van Beek
----------------------------------------------------------------------------------------------------- */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var bookModel = new Schema({
    title: {type: String},
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default:false}
});

//module.exports= mongoose.model('Book', bookModel);

// the schema is useless so far
// we need to create a model using it
var Book = mongoose.model('Book', bookModel);

// make this available in our Node applications
module.exports = Book;