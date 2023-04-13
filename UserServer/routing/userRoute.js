const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/userAuth', auth.loginUser);


router.patch('/:id', userController.updateUser);

// Update a user by ID
router.patch('/:id', userController.updateUser);

//add activity to user 
router.post('/assignActivityToUser', userController.addActivityToUser);

//get signed In user
router.get('/signedInUser', userController.signedInUser);


//update specific activity in user
router.put('/updateUserActivity', userController.updateSpecificActivityStatus);

module.exports = router;