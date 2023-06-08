const express = require('express');
const router = express.Router();

const AuthorController = require('../Controllers/Author.Controller')

//post a product
router.post('/', AuthorController.postAuthors);

//get a product
router.get('/', AuthorController.getAuthors);

// GET /api/author/books?Author=John%20Doe
router.get('/books', AuthorController.getAuthor_Books);

//update a product
router.patch('/:id', AuthorController.updateAuthor);

//delete a product
router.delete('/:id', AuthorController.deleteAuthor);

module.exports = router;