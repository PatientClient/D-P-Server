const Task = require("../model/Task");
const User = require("../model/User");

// Create a new task
const createTask = async (req, res, next) => {
  try {
    const task = new Task({
      assignedTo: req.body.assignedTo,
      assignedBy: req.body.assignedBy,
      taskTime: req.body.taskTime,
      title: req.body.title,
      notes: req.body.notes
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    next(error); // pass error to next middleware/handler
  }
};

// Retrieve all tasks
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate('assignedTo');
    res.json(tasks);
  } catch (error) {
    next(error); // pass error to next middleware/handler
  }
};

// get All by user Id
const getUserTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.params.id
    }).populate('assignedTo');
    res.json(tasks);
  } catch (error) {
    next(error); // pass error to next middleware/handler
  }
};

// Retrieve a single task by ID
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo');;
    if (!task) throw new Error('Task not found');
    res.json(task);
  } catch (error) {
    next(error); // pass error to next middleware/handler
  }
};

// Update a task by ID
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }
    Object.keys(req.body).forEach((key) => {
      if (key in task) {
        task[key] = req.body[key];
      }
    });
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error); // pass error to next middleware/handler
  }
};


// Delete a task by ID
const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) throw new Error('Task not found');
    res.json(deletedTask);
  } catch (error) {
    next(error); // pass error to next middleware/handler
  }
};

// CREATE a new note for a task
const createNote = async (req, res, next) => {
  const taskId = req.params.id;
  const {
    note
  } = req.body;
  console.log(note);
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    task.notes.push({
      note
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(error); // pass error to next middleware/handler
  }
};

// UPDATE a note for a task
const updateNote = async (req, res, next) => {
  const taskId = req.params.id;
  const noteId = req.params.noteId;
  const {
    note
  } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    const noteIndex = task.notes.findIndex(n => n._id.toString() === noteId);
    if (noteIndex === -1) {
      res.status(404)
      throw new Error('note not found');
    }

    task.notes[noteIndex].note = note;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    next(error); // pass error to next middleware/handler
  }
};

// DELETE a note for a task
const deleteNote = async (req, res, next) => {
  const taskId = req.params.id;
  const noteId = req.params.noteId;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    const noteIndex = task.notes.findIndex(n => n._id.toString() === noteId);
    if (noteIndex === -1) {
      return res.status(404).json({
        message: 'Note not found'
      });
    }
    task.notes.splice(noteIndex, 1);
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    next(error); // pass error to next middleware/handler
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createNote,
  updateNote,
  deleteNote,
  getUserTasks
};