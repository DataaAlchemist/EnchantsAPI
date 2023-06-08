const express = require('express');
const router = express.Router();

const GenreController = require('../Controllers/Genre.Controller')

//post a product
router.post('/', GenreController.postGenres);

//get a product
router.get('/', GenreController.getGenres);

//update a product
router.patch('/:id', GenreController.updateGenre);

//delete a product
router.delete('/:id', GenreController.deleteGenre);

module.exports = router;
