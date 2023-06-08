const createError = require('http-errors');
const mongoose = require('mongoose');

const Genre = require('../Models/Genre.model');

module.exports = {
    getGenres: async (req, res, next) => {
        try {
            const genres = await Genre.find({}, {__v: 0});
            res.send(genres);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },

    postGenres: async (req, res, next) => {
        try {
            const { genre } = req.body;
            const newGenre = new Genre({ genre });
            const savedGenre = await newGenre.save();
            res.send(savedGenre);
        } catch (error) {
            console.log(error.message)
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
            }
            next(error);
        }
    },    

    updateGenre: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };
    
            const result = await Genre.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, 'genre does not exist');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Genre Id"));
                return;
            }
            next(error);
        }
    },
    
    deleteGenre: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await Genre.findByIdAndDelete(id);
            if (!result) {
                throw createError(404, 'genre does not exist');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Genre Id"));
                return;
            }
            next(error);
        }
    }
    
};