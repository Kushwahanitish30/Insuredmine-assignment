const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Post-service: schedule message insertion
const Message = mongoose.model('Message', new mongoose.Schema({
	message: String,
	scheduledFor: Date
}));

router.post('/schedule-message', async (req, res) => {
	const { message, day, time } = req.body;
	if (!message || !day || !time) return res.error('message, day, and time required', 400);
	const scheduledFor = new Date(`${day}T${time}`);
	if (isNaN(scheduledFor)) return res.error('Invalid date/time', 400);
	await Message.create({ message, scheduledFor });
	res.success({ message, scheduledFor }, 'Message scheduled', 201);
});

module.exports = router;