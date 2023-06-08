const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config()

const app = express();

require('./initDB')();

app.use(express.json());

//Book model handling
const Book = require('./Routes/Book.route');
app.use('/api/book', Book);

//Genre model handling
const Genre = require('./Routes/Genre.route');
app.use('/api/genre', Genre);

//If not found 404
app.use((req, res, next) => {
    next(createError(404, "Not found"));
});

//error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    });
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`server start on port ${PORT}...`)
});