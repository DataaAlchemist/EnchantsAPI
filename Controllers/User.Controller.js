const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../Models/User.model');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({}, {_id:0, __v: 0});
            res.send(users);
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
        const userid = req.params.userid;
        try {
            const result = await User.findOne({userid:userid}, {_id:0, __v:0})
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
            const userid = req.params.userid;
            const updates = req.body;
            const options = {new:true};

            const result = await User.findOneAndUpdate({userid:userid}, updates, options);
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
        const userid = req.params.userid;
        try {
            const result = await User.findOneAndDelete({userid:userid});
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
