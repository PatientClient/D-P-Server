const User = require('../model/User');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500)
    throw new Error(error.message);
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('doctor');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500)
    throw new Error(error.message);
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500)
    throw new Error(error.message);
  }
};

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
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500)
    throw new Error(error.message);
  }
};


// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.status(200).json({
      message: "deleted User"
    });
  } catch (error) {
    console.error(error);
    res.status(500)
    throw new Error(error.message);
  }
};