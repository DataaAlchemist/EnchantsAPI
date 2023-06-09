const express = require('express');
const router = express.Router();

const LoanController = require('../Controllers/Loan.Controller')

//post a product
router.post('/', LoanController.postLoans);

//get a product
router.get('/', LoanController.getLoans);

//update a product
router.patch('/:id', LoanController.updateLoan);

//delete a product
router.delete('/:id', LoanController.deleteLoan);

module.exports = router;