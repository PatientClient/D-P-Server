const Doctor = require('../model/Doctor');
const jwt = require('jsonwebtoken');
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        message: 'Doctor not found'
      });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const createDoctor = async (req, res) => {
  const doctor = new Doctor({
    nationalId: req.body.nationalId,
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        message: 'Doctor not found'
      });
    }
    doctor.nationalId = req.body.nationalId || doctor.nationalId;
    doctor.name = req.body.name || doctor.name;
    doctor.age = req.body.age || doctor.age;
    doctor.phone = req.body.phone || doctor.phone;
    doctor.email = req.body.email || doctor.email;
    doctor.password = req.body.password || doctor.password;
    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        message: 'Doctor not found'
      });
    }
    await Doctor.deleteOne({
      _id: req.params.id
    });
    res.json({
      message: 'Doctor deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

//get logged in User 
const loggedInDoctor = async (req, res, next) => {

  const {
    token
  } = req.body;
  (token);

  try {
    const decryptToken = jwt.verify(token, process.env.JWTSECRET);
    if (!decryptToken) {
      res.status(403)
      throw new Error("Invalid token")
    }
    (decryptToken);
    // Find user by email
    const doctor = await Doctor.findOne({
      _id: decryptToken.doctorId
    })
    res.json({
      doctor
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  loggedInDoctor
};