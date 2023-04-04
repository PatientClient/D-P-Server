const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  description: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const photoSchema = new Schema({
  url: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const videoSchema = new Schema({
  url: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const activitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true},
  createdAt: { type: Date, default: Date.now },
  feedback: [feedbackSchema],
  photos: [photoSchema],
  videos: [videoSchema],
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
