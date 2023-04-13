const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Routes for creating, getting, updating and deleting tasks
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.get('/:id/userTasks', taskController.getUserTasks);
router.patch('/:id', taskController.updateTask);


module.exports = router;