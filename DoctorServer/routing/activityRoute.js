const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityConroller');

// CREATE a new activity
router.post('/', activityController.createActivity);

// READ all activities
router.get('/', activityController.getAllActivities);

// READ a specific activity by ID
router.get('/:id', activityController.getActivityById);

// UPDATE an activity by ID
router.patch('/:id', activityController.updateActivity);

// DELETE an activity by ID
router.delete('/:id', activityController.deleteActivity);

// ADD a new feedback to an activity
router.post('/:id/feedback', activityController.addActivityFeedback);

// REMOVE a specific feedback from an activity
router.delete('/:id/feedback/:feedbackId', activityController.removeActivityFeedback);

// ADD a new photo to an activity by ID
router.post('/:id/photos', activityController.addPhoto);

// remove a new photo from  an activity by ID/photoId
router.delete('/:id/photos/:photoId', activityController.deleteActivityPhoto);

// ADD a new video to an activity by ID
router.post('/:id/videos', activityController.addVideo);


// remove a new video from  an activity by ID/videoId
router.delete('/:id/videos/:videoId', activityController.deleteActivityVideo);


module.exports = router;