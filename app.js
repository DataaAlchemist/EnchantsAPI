const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config()

const app = express();

require('./initDB')();

app.use(express.json());

app.all('/test', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

const Book = require('./Routes/Book.route')
app.use('/api/book', Book)

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