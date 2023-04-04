const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityConroller');


// READ all activities
router.get('/', activityController.getAllActivities);

// READ a specific activity by ID
router.get('/:id', activityController.getActivityById);

// ADD a new feedback to an activity
router.post('/:id/feedback', activityController.addActivityFeedback);

// ADD a new photo to an activity by ID
router.post('/:id/photos', activityController.addPhoto);

// ADD a new video to an activity by ID
router.post('/:id/videos', activityController.addVideo);

module.exports = router;