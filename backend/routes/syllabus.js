const express = require('express');
const router = express.Router();
const Syllabus = require('../models/Syllabus');
const authMiddleware = require('../middleware/authMiddleware');

// Add topic (Protected)
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { subject, topicName, importance } = req.body;

    const newTopic = new Syllabus({
      userId: req.user,
      subject,
      topicName,
      importance
    });

    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all topics for user (Protected)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const topics = await Syllabus.find({ userId: req.user });
    res.json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update topic status (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const topic = await Syllabus.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      { status, lastStudied: Date.now() },
      { new: true }
    );

    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    res.json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete topic (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const topic = await Syllabus.findOneAndDelete({
      _id: req.params.id,
      userId: req.user
    });

    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    res.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;