const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    genre: {
        type: String,
        required: true
    }
});

Genre = mongoose.model('genre', GenreSchema);
module.exports = Genre;