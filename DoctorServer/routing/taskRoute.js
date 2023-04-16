const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Routes for creating, getting, updating and deleting tasks
router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id/userTasks', taskController.getUserTasks);
router.get('/:id', taskController.getTaskById);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// Routes for creating, updating and deleting notes for a task
router.post('/:id/notes', taskController.createNote);
router.put('/:id/notes/:noteId', taskController.updateNote);
router.delete('/:id/notes/:noteId', taskController.deleteNote);

module.exports = router;