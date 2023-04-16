const Task = require("../model/Task");
const User = require("../model/User");
const {
  sendLogfunction
} = require("./producerCotroller");


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
    console.log(req.params.id)
    const tasks = await Task.find({
      assignedTo: req.params.id
    }).populate('assignedTo');
    if (!tasks || !tasks.length > 0) {
      res.status(404)
      throw new Error('no tasks')
    }
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


    sendLogfunction('UL', {
      userId: task.assignedTo,
      status: `task ${task.title}`||'',
      userStatus: task.status || 'Complete',
      BadgeColor: "success",
    })
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error); // pass error to next middleware/handler
  }
};


const restStatus24 = async () => {

  try {
    const tasks = await Task.find();
    if (!tasks) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    tasks.forEach(async (task) => {
      task.status = "Pending";
      await task.save();
    });
    console.log('tasks reset');
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
  getAllTasks,
  getTaskById,
  updateTask,
  getUserTasks,
  restStatus24
};