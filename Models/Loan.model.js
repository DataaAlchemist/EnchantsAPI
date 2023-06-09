mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoanSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    bookid: {
        type: Schema.Types.ObjectId,
        ref: 'book',
        required: true
    },
}, 
{ timestamps: true });

Loan = mongoose.model('loan', LoanSchema);
module.exports = Loan;