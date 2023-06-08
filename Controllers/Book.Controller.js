const Book = require('../Models/Book.model')

module.exports = {
    getBooks: async (req, res, next) => {
        try {
            const books = await Book.find({}, {_id:0, __v: 0});
            res.send(books);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },

    postBooks: async (req, res, next) => {
        try{
            const book = new Book(req.body);
            const result = await book.save();
            res.send(result);
        } catch (error) {
            console.log(error.message)
            if (error.name === 'ValidationError'){
                next(createError(422, error.message));
            }
            next(error);
        }
    },

    findBookIsbn: async (req, res, next) => {
        const isbn = req.params.isbn;
        try{
            const book = await Book.findOne({isbn:isbn}, {_id:0, __v: 0});
            if (!book){
                throw createError(404, 'book does not exist');
            };
            res.send(book);
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Book Id"))
                return;
            }
            next(error);
        }
    },

    updateBook: async (req, res, next) => {
        try {
            const isbn = req.params.isbn;
            const updates = req.body;
            const options = {new:true};
    
            const result = await Book.findOneAndUpdate({isbn:isbn}, updates, options);
            if (!result){
                throw createError(404, 'book does not exist');
            };
            res.send(result);
        } catch (error) {
            console.log(error.message)
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Book Id"))
                return;
            }
            next(error);
        }
    },

    deleteBook: async (req, res, next) => {
        const isbn = req.params.isbn;
        try {
            const result = await Book.findOneAndDelete({isbn:isbn});
            if (!result){
                throw createError(404, 'book does not exist');
            };
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Book Id"))
                return;
            }
            next(error);
        }
    }
};