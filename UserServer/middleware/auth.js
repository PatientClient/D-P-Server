const jwt = require('jsonwebtoken');
const User = require('../model/User');
const loginUser = async (req, res, next) => {
  const {
    nationalId,
    password
  } = req.body;
  try {
    // Find user by Id
    const user = await User.findOne({
      nationalId: nationalId
    })
    if (!user) {
      res.statusCode = 404;
      throw new Error('User not found');
    }
    (user);
    if (password !== user.password) {
      res.statusCode = 404;
      throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign({
        userId: user.id,
        name: user.name,
      },
      process.env.JWTSECRET, {
        expiresIn: '1h'
      }
    );

    // Set JWT token as a cookie in the response
    res.cookie('jwtUser', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000) // expires in 1 hour
    });

    res.json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};

const authorize = async (req, res, next) => {
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
      throw new Error("Token is not valid, Unauthorized")
    }
    next();
  } catch (e) {
    return res.status(401).send({
      message: e.message
    });
  }
}

module.exports = {
  loginUser,
  authorize,
}