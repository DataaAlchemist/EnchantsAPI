const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
});

Book = mongoose.model('book', BookSchema);
module.exports = Book;