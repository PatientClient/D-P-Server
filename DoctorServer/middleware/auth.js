const jwt = require('jsonwebtoken');
const Doctor = require('../model/Doctor');
const loginDoctor = async (req, res, next) => {
  const {
    nationalId,
    password
  } = req.body;
  try {
    // Find user by email
    const doctor = await Doctor.findOne({
      nationalId: nationalId
    })
    if (!doctor) {
      res.statusCode = 404;
      throw new Error('User not found');
    }
    if (password !== doctor.password) {
      res.statusCode = 404;
      throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign({
        doctorId: doctor.id,
        name: doctor.name,
      },
      process.env.JWTSECRET, {
        expiresIn: '1h'
      }
    );

    // Set JWT token as a cookie in the response
    res.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000) // expires in 1 hour
    });

    res.json({
      success: true,
      token: token
    });
  } catch (error) {
    next(error);
  }
};

const authorize = async (req, res, next) => {
  const cookie = req.cookies;
  const token = cookie.jwt;
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
  loginDoctor,
  authorize,
}