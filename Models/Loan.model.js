mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoanSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        required: true
    },
    isbn: {
        type: Schema.Types.ObjectId,
        required: true
    },
}, 
{ timestamps: true });

Loan = mongoose.model('loan', LoanSchema);
module.exports = Loan;