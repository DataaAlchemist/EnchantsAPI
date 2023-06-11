const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../Models/User.model');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({}, { __v: 0});
            res.send(users);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await User.find({
                email: email,
                password: password
            });

            if (user.length === 0) {
                res.status(401).send('These credentials do not match our records.')
                return
            }

            res.send(user[0]);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },

    postUsers: async (req, res, next) => {
        const { email } = req.body;
        try {
          const existingUser = await User.findOne({ email: email });
          if (existingUser) {
            const error = createError(422, 'Email already exists');
            return next(error);
          }
      
          const user = new User(req.body);
          const result = await user.save();
          res.status(201).send(result);
        } catch (error) {
          console.log(error.message);
          if (error.name === 'ValidationError') {
            next(createError(422, error.message));
          } else {
            next(error);
          }
        }
      },      

    findUserId: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await User.findOne({id:id}, {___v:0})
            if (!result){
                throw createError(404, 'user does not exist');
            };
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid User Id"))
                return;
            }
            next(error);
        }
    },
 
    updateUsers: async (req, res, next) => {
        try{
            const id = req.params.id;
            const updates = req.body;
            const options = {new:true};

            const result = await User.findOneAndUpdate({id:id}, updates, options);
            if (!result){
                throw createError(404, 'user does not exist')
            };
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid User Id"))
                return;
            }
            next(error);
        }
    },

    deleteUsers: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await User.findOneAndDelete({id:id});
            if (!result){
                throw createError(404, 'user does not exist')
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid User Id"))
                return;
            }
            next(error);
        }
    }
};
