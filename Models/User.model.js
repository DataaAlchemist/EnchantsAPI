mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true
    }
});

User = mongoose.model('user', UserSchema);
module.exports = User;