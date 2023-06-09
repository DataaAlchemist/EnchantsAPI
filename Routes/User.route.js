const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/User.Controller')

//post a product
router.post('/', UserController.postUsers);

//get a product
router.get('/', UserController.getUsers);

router.get('/:userid', UserController.findUserId);

//update a product
router.patch('/:userid', UserController.updateUsers);

//delete a product
router.delete('/:userid', UserController.deleteUsers);

module.exports = router;