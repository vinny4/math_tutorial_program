const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const Question = require('../models/Question');
const auth = require('../middleware/auth');

// @route   GET /api/content
// @desc    Get all content
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const content = await Content.find().sort({ strand: 1, topic: 1 });
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/content/:id
// @desc    Get specific content
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/content/strand/:strand
// @desc    Get content by strand
// @access  Private
router.get('/strand/:strand', auth, async (req, res) => {
  try {
    const content = await Content.find({ strand: req.params.strand }).sort({ topic: 1 });
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/content/topic/:topic
// @desc    Get content by topic
// @access  Private
router.get('/topic/:topic', auth, async (req, res) => {
  try {
    const content = await Content.find({ topic: req.params.topic });
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/content/questions/:contentId
// @desc    Get questions for content
// @access  Private
router.get('/questions/:contentId', auth, async (req, res) => {
  try {
    const questions = await Question.find({ contentId: req.params.contentId });
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
