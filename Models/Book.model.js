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
        require: true
    },
    genre: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
});

Book = mongoose.model('book', BookSchema);
module.exports = Book;