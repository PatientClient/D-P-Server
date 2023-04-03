const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Get all doctors
router.get('/', doctorController.getAllDoctors);

// Get a single doctor by ID
router.get('/:id', doctorController.getDoctorById);

// Create a new doctor
router.post('/', doctorController.createDoctor);

// Update an existing doctor by ID
router.put('/:id', doctorController.updateDoctor);

// Delete a doctor by ID
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;