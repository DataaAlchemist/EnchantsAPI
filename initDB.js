const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect(process.env.MONGODB_URL, 
    {
        dbName: process.env.DB_NAME,
        user: process.env.BD_USER,
        pass: process.env.DB_PASS,
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
}