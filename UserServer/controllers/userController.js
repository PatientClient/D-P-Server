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
    user.lastUpdate = new Date(Date.now() - 24 * 60 * 60 * 1000) // set lastUpdate to 24 hours ago
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
// Update a user by ID
exports.getUserNameById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404)
      throw new Error('User not found')
    };
    res.status(200).json(user.fullName);
  } catch (error) {
    next(error);
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



//update activity every 24 hours 
//the function will run every  1 hour and checks if last activity
// not completed and the fresh between it and the current time is 24 it will
//replace it with not active
exports.checkNotActive = async () => {
  debugger
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      console.log("No users found");
      return;
    }
    for (const user of users) {
      if (user.status === "NotActive") {
        continue;
      }
      const currentTime = Date.now();
      const lastUpdate = new Date(user.lastUpdate);

      //get hours fresh
      const diffMilliseconds = currentTime - lastUpdate.getTime(); // difference in milliseconds
      const diffHours = diffMilliseconds / (1000 * 60 * 60); // difference in hours
      const hoursFresh = Math.floor(diffHours); // rounded down to nearest integer
      console.log(hoursFresh);
      if (hoursFresh >= 24) {
        updateWithId(user._id, {
          status: "NotActive"
        })
      }

    }
    console.log("Users checked successfully");
  } catch (error) {
    console.error(error);
  }
}

// Update a user by ID
const updateWithId = async (id, body) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    Object.keys(body).forEach((key) => {
      if (key in user) {
        user[key] = body[key];
      }
    });
    user.lastUpdate = new Date(Date.now() - 24 * 60 * 60 * 1000) // set lastUpdate to 24 hours ago
    const updatedUser = await user.save();
    if (body.status) {
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
  } catch (error) {
    console.error(error);
  }
};