const Activity = require('../model/Activity');
const User = require('../model/User');


// READ all activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find()

    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500)
    throw new Error(error.message);
  }
};

// READ a specific activity by ID
exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({
        message: 'Activity not found'
      });
    }
    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500)
    throw new Error(error.message);
  }
};

// ADD a new feedback to an activity
exports.addActivityFeedback = async (req, res) => {
  const activityId = req.params.id;
  const feedback = req.body;

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({
        message: 'Activity not found'
      });
    }

    feedback.createdBy = await User.findById(feedback.createdBy).exec();
    activity.feedback.push(feedback);
    await activity.save();

    return res.status(201).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500)
    throw new Error(error.message);
  }
};

// ADD a new photo to an activity by ID
exports.addPhoto = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({
        message: 'Activity not found'
      });
    }

    // Populate the createdBy field with the full User object
    const user = await User.findById(req.body.createdBy);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const newPhoto = {
      url: req.body.url,
      createdBy: user,
      createdAt: new Date()
    };

    activity.photos.push(newPhoto);
    await activity.save();
    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500)
    throw new Error(error.message);
  }
};

// ADD a new video to an activity by ID
exports.addVideo = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({
        message: 'Activity not found'
      });
    }
    // Populate the createdBy field with the full User object
    const user = await User.findById(req.body.createdBy);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const newVideo = {
      url: req.body.url,
      createdBy: user,
      createdAt: new Date()
    };
    activity.videos.push(newVideo);
    await activity.save();
    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500)
    throw new Error(error.message);
  }
};

