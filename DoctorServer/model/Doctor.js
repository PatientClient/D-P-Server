const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  nationalId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  clients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;