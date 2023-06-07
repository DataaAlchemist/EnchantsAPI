const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const Book = require('../Models/Book.model');

//post a product
router.post('/', async (req, res, next) => {
    try{
        const book = new Book(req.body);
        const result = await book.save()
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
});

//get a product
router.get('/', async (req, res, next) => {
    try{
        const result = await Book.find({}, {_id:0, __v: 0})
        res.send(result);
    } catch (error) {
        console.log(error.message)
    }
});

router.get('/:isbn', async (req, res, next) => {
    const isbn = req.params.isbn;
    try{
        const book = await Book.findOne({isbn:isbn}, {_id:0, __v: 0});
        if (!book){
            throw createError(404, 'book does not exist');
        };
        res.send(book);
    } catch (error) {
        console.log(error.message);
    }
});

//update a product
router.patch('/:isbn', async (req, res, next) => {
    try {
        const isbn = req.params.isbn;
        const updates = req.body;
        const options = {new:true};

        const result = await Book.findOneAndUpdate({isbn:isbn}, updates, options);
        res.send(result);
    } catch (error) {
        console.log(error.message)
    }
});

//delete a product
router.delete('/:isbn', async (req, res, next) => {
    const isbn = req.params.isbn;
    try {
        const result = await Book.findOneAndDelete({isbn:isbn});
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;