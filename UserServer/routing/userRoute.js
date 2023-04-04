const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth')


router.post('/userAuth',auth.loginUser )

// Update a user by ID
router.put('/:id', userController.updateUser);

module.exports = router;