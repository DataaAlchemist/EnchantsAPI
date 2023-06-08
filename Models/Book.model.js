const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    isbn: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'genre'
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});


const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
