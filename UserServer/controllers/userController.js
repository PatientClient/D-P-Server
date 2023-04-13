const {
  response
} = require('express');
const Activity = require('../model/Activity');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {
  sendLogfunction
} = require('./producerCotroller');

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    Object.keys(req.body).forEach((key) => {
      if (key in user) {
        user[key] = req.body[key];
      }
    });
    const updatedUser = await user.save();
    if (req.body.status) {
      await sendLogfunction('UP', {
        userId: updatedUser._id,
        status: updatedUser.status
      })
      await sendLogfunction('UL', {
        userId: updatedUser._id,
        status: 'status is ',
        userStatus: updatedUser.status,
        BadgeColor: "info"
      })
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    throw new Error(error.message);
  }
};

//add activity to the user
exports.addActivityToUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      throw new Error(`User with id ${req.body.userId} not found`);
    }

    const activity = await Activity.findById(req.body.activityId);
    if (!activity) {
      throw new Error(`Activity with id ${req.body.activityId} not found`);
    }

    const newActivity = {
      activity: activity._id,
    };
    user.status = 'InProgress'
    user.activities.push(newActivity);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);

    res
  } catch (e) {
    throw new Error(e.message)
  }
}
//get logged in User 
exports.signedInUser = async (req, res, next) => {
  const cookie = req.cookies;
  const token = cookie.jwtUser;
  if (!token) {
    return res.status(401).send({
      message: 'Unauthorized'
    });
  }
  try {
    const decryptToken = jwt.verify(token, process.env.JWTSECRET);
    if (!decryptToken) {
      res.status(403)
      throw new Error("Token is not valid, Unauthorized")
    }
    const user = await User.findById(decryptToken.userId)
    if (!user) {
      res.status(404)
      throw new Error("user not found")
    }
    res.json(user)
  } catch (e) {
    next(e)
  }
}

exports.updateSpecificActivityStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      throw new Error(`User with id ${req.body.userId} not found`);
    }

    const activityIndex = user.activities.findIndex(activity => activity._id.toString() === req.body.activityId.toString());
    if (activityIndex === -1) {
      throw new Error(`Activity with id ${req.body.activityId} not found for user ${req.body.userId}`);
    }

    user.activities[activityIndex].activityStatus = req.body.activityStatus;
    await user.save();

    res.json({
      ActivityUpdated: user.activities[activityIndex]
    })
  } catch (error) {
    next(error);
  }
}