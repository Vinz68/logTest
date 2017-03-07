/* --------------------------------------------------------------------------------------------------
   bookModels.js - JSON object how a 'Book' looks like
   2017-03-06 Vincent van Beek
----------------------------------------------------------------------------------------------------- */
"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookModel = new Schema({
    title: {type: String},
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default:false}
});

module.exports= mongoose.model('Book', bookModel);