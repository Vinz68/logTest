var bookController = function(Book){

    var post = function(req,res){
        req.log.info({req: req}, "received post request");

        var book = new Book(req.body);
        book.save();

        res.status(201).send(book);  // 201 = status created since new book has been created in the MongoDB
                                     // and in the body we return the newly created book

        req.log.info({res: res}, "responded on post request");
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
                res.json(books);
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




