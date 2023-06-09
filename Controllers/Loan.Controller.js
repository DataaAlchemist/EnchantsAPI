createError = require('http-errors');
mongoose = require('mongoose');

const Loan = require('../Models/Loan.model');
const User = require('../Models/User.model');
const Book = require('../Models/Book.model');

module.exports = {
    getLoans: async (req, res, next) => {
        try {
            const loans = await Loan.find({}, {__v: 0}).populate('userid').populate('isbn');
            res.send(loans);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },

    postLoans: async (req, res, next) => {
        try{
            const loan = new Loan(req.body);
            const result = await loan.save();
            res.send(result);
        } catch (error) {
            console.log(error.message)
            if (error.name === 'ValidationError'){
                next(createError(422, error.message));
            }
            next(error);
        }
    },

    updateLoan: async (req, res, next) => {
        try{
            const id = req.params.id;
            const updates = req.body;
            const options = {new:true};

            const result = await Loan.findByIdAndUpdate(id, updates, options);
            if (!result){
                throw createError(404, 'loan does not exist')
            };
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Loan Id"))
                return;
            }
            next(error);
        }
    },

    deleteLoan: async (req, res, next) => {
        const id = req.params.id;
        try{
            const result = await Loan.findByIdAndDelete(id);
            if (!result){
                throw createError(404, 'loan does not exist')
            };
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Loan Id"))
                return;
            }
            next(error);
        }
    }
};