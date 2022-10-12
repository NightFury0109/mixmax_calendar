const express = require('express');
const router = express.Router();

const { getAvailableSlots } = require('../controller/calendar');

router.get('/api/calendar', getAvailableSlots);

module.exports = router;
