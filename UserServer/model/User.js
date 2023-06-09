const mongoose = require('mongoose');

const statuses = [
  "NotActive", "InProgress", "Active"
];
const userActivities = new mongoose.Schema({
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  activityStatus: {
    type: String,
    enum: statuses,
    default: statuses[1]
  }
})
const userSchema = new mongoose.Schema({
  nationalId: {
    type: String,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  birthdate: {
    type: Date,
    required: true,
  },
  lastUpdate: {
    type: Date,
    required: true,
    default: Date.now
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  status: {
    type: String,
    enum: statuses,
    default: 'NotActive'
  },
  activities: [userActivities],
});
const User = mongoose.model('User', userSchema);
module.exports = User