const express = require('express');
const router = express.Router();

const BookController = require('../Controllers/Book.Controller')

//post a product
router.post('/', BookController.postBooks);

//get a product
router.get('/', BookController.getBooks);

router.get('/:isbn', BookController.findBookIsbn);

//update a product
router.patch('/:isbn', BookController.updateBook);

//delete a product
router.delete('/:isbn', BookController.deleteBook);

module.exports = router;