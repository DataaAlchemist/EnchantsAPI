const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://enchant.brnukzz.mongodb.net/?retryWrites=true&w=majority', 
{
    dbName: 'enchant',
    user: 'AdrianBadjideh',
    pass: 'vQPm8EgUsKlIeeT2',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("now i'm connecting to database...");
})
.catch(err => console.log(err.message));

mongoose.connection.on('connected', () => {
    console.log("Connecting to mongodb...");
});

mongoose.connection.on('error', (err) => {
    console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log("Disconnecting...");
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log("Disconnect from mongodb...");
        process.exit(0)
    })
});

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

app.listen(8000, () => {
    console.log("server start on port 8000...")
});