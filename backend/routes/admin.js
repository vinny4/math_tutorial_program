const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Content = require('../models/Content');
const Question = require('../models/Question');
const auth = require('../middleware/auth');

// Admin middleware - checks if user is an admin
const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ role: 1, lastName: 1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/admin/content
// @desc    Add new content
// @access  Private (Admin only)
router.post('/content', auth, adminAuth, async (req, res) => {
  try {
    const { 
      title, 
      strand, 
      topic, 
      subtopic, 
      curriculumCode, 
      difficulty, 
      content, 
      instructions, 
      examples, 
      source 
    } = req.body;
    
    const newContent = new Content({
      title,
      strand,
      topic,
      subtopic,
      curriculumCode,
      difficulty,
      content,
      instructions,
      examples,
      source
    });
    
    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/content/:id
// @desc    Update content
// @access  Private (Admin only)
router.put('/content/:id', auth, adminAuth, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    const { 
      title, 
      strand, 
      topic, 
      subtopic, 
      curriculumCode, 
      difficulty, 
      content: contentData, 
      instructions, 
      examples, 
      source 
    } = req.body;
    
    content.title = title || content.title;
    content.strand = strand || content.strand;
    content.topic = topic || content.topic;
    content.subtopic = subtopic || content.subtopic;
    content.curriculumCode = curriculumCode || content.curriculumCode;
    content.difficulty = difficulty || content.difficulty;
    content.content = contentData || content.content;
    content.instructions = instructions || content.instructions;
    content.examples = examples || content.examples;
    content.source = source || content.source;
    content.updatedAt = Date.now();
    
    await content.save();
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admin/content/:id
// @desc    Delete content
// @access  Private (Admin only)
router.delete('/content/:id', auth, adminAuth, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    // Delete associated questions
    await Question.deleteMany({ contentId: req.params.id });
    
    // Delete content
    await content.remove();
    
    res.json({ message: 'Content and associated questions removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/admin/questions
// @desc    Add new question
// @access  Private (Admin only)
router.post('/questions', auth, adminAuth, async (req, res) => {
  try {
    const { 
      contentId, 
      question, 
      questionType, 
      options, 
      correctAnswer, 
      explanation, 
      difficulty, 
      tags 
    } = req.body;
    
    // Verify content exists
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    const newQuestion = new Question({
      contentId,
      question,
      questionType,
      options,
      correctAnswer,
      explanation,
      difficulty,
      tags
    });
    
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/questions/:id
// @desc    Update question
// @access  Private (Admin only)
router.put('/questions/:id', auth, adminAuth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    const { 
      contentId, 
      question: questionText, 
      questionType, 
      options, 
      correctAnswer, 
      explanation, 
      difficulty, 
      tags 
    } = req.body;
    
    // If contentId is changing, verify new content exists
    if (contentId && contentId !== question.contentId.toString()) {
      const content = await Content.findById(contentId);
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
      question.contentId = contentId;
    }
    
    question.question = questionText || question.question;
    question.questionType = questionType || question.questionType;
    question.options = options || question.options;
    question.correctAnswer = correctAnswer !== undefined ? correctAnswer : question.correctAnswer;
    question.explanation = explanation || question.explanation;
    question.difficulty = difficulty || question.difficulty;
    question.tags = tags || question.tags;
    
    await question.save();
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admin/questions/:id
// @desc    Delete question
// @access  Private (Admin only)
router.delete('/questions/:id', auth, adminAuth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    await question.remove();
    res.json({ message: 'Question removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
