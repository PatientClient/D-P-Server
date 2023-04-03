const Activity = require('../model/Activity');
const User = require('../model/User');

// CREATE a new activity
exports.createActivity = async (req, res) => {
  try {
    const {
      name,
      description,
      duration,
      createdBy
    } = req.body;

    const activity = new Activity({
      name,
      description,
      duration,
      createdBy
    });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

// READ all activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().populate('createdBy');
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};


// READ a specific activity by ID
exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('createdBy');
    if (!activity) {
      return res.status(404).json({
        message: 'Activity not found'
      });
    }
    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

// UPDATE an activity by ID
exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({
        message: 'Activity not found'
      });
    }
    Object.keys(req.body).forEach((key) => {
      if (key in activity) {
        activity[key] = req.body[key];
      }
    });

    await activity.save();
    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

// DELETE an activity by ID
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({
        message: 'Activity not found'
      });
    }
    await activity.deleteOne({
      _id: activity.id
    });
    res.status(200).json({
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};


// ADD a new feedback to an activity
exports.addActivityFeedback = async (req, res) => {
  const activityId = req.params.id;
  const feedback = req.body;

  try {
    const activity = await Activity.findById(activityId).populate('createdBy').exec();
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
    res.status(500).json({
      message: 'Server Error'
    });
  }
};


// REMOVE a specific feedback from an activity
exports.removeActivityFeedback = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({
        message: 'Activity not found'
      });
    }
    const feedbackIndex = activity.feedback.findIndex(
      (feedback) => feedback._id.toString() === req.params.feedbackId
    );
    if (feedbackIndex === -1) {
      return res.status(404).json({
        message: 'Feedback not found'
      });
    }
    activity.feedback.splice(feedbackIndex, 1);
    await activity.save();
    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error'
    });
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
    res.status(500).json({
      message: 'Server Error'
    });
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
    res.status(500).json({
      message: 'Server Error'
    });
  }
};


// DELETE a specific photo from an activity by ID and photo ID
exports.deleteActivityPhoto = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({
        message: 'Activity not found'
      });
    }
    const photoIndex = activity.photos.findIndex(photo => photo.id === req.params.photoId);
    if (photoIndex === -1) {
      return res.status(404).json({
        message: 'Photo not found'
      });
    }
    activity.photos.splice(photoIndex, 1);
    await activity.save();
    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};

// DELETE a specific video from an activity by activity ID and video ID
exports.deleteActivityVideo = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({
        message: 'Activity not found'
      });
    }
    const videoIndex = activity.videos.findIndex(video => video._id == req.params.videoId);
    if (videoIndex === -1) {
      return res.status(404).json({
        message: 'Video not found'
      });
    }
    activity.videos.splice(videoIndex, 1);
    await activity.save();
    res.status(200).json({
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error'
    });
  }
};