const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true
  }
});

const taskSchema = new mongoose.Schema({
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  assignedAt: {
    type: Date,
    default: Date.now
  },
  taskTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Complete'],
    default: 'Pending'
  },
  title: {
    type: String,
    required: true
  },
  notes: [noteSchema]
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;