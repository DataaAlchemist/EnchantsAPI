const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

Author = mongoose.model('author', AuthorSchema);
module.exports = Author;