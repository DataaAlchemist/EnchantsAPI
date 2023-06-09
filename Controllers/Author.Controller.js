createError = require('http-errors');
mongoose = require('mongoose');

module.exports = {
    getAuthors: async (req, res, next) => {
        try {
            const authors = await Author.find({}, {__v: 0});
            res.send(authors);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },

    getAuthor_Books: async (req, res, next) => {
        try{
            const authorName = req.query.Author; 
            const author = await Author.findOne({ name: authorName }); 
        
            if (!author) {
              return res.status(404).json({ message: 'Author not found' });
            }
        
            const books = await Book.find({ author: author._id }).populate('genre').populate('author'); 
        
            res.json(books);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },

    postAuthors: async (req, res, next) => {
        try {
            const { name } = req.body;
            const newAuthor = new Author({ name });
            const savedAuthor = await newAuthor.save();
            res.send(savedAuthor);
        } catch (error) {
            console.log(error.message)
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
            }
            next(error);
        }
    },

    updateAuthor: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };

            const result = await Author.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, 'author does not exist');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Author Id"));
                return;
            }
            next(error);
        }
    },

    deleteAuthor: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await Author.findByIdAndDelete(id);
            if (!result) {
                throw createError(404, 'author does not exist');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Author Id"));
                return;
            }
            next(error);
        }
    }
};