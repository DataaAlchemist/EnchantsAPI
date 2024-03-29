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
        type: Schema.Types.ObjectId,
        ref: 'author'
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
    },
    rating: {
        type: Number,
        default: 0
    }
});


const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
