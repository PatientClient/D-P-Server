





const express = require('express');
const router = express.Router();
const {sendLog} = require('../controllers/producerCotroller');

router.post('/sendLog', sendLog);


module.exports = router;