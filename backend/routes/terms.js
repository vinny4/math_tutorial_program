const express = require('express');
const router = express.Router();
const Term = require('../models/Term');
const auth = require('../middleware/auth');

// @route   GET /api/terms
// @desc    Get all terms
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // If user is a parent, get terms they created
    // If user is a student, get terms associated with their parent
    let terms;
    
    if (req.user.role === 'admin') {
      terms = await Term.find().sort({ startDate: -1 });
    } else if (req.user.role === 'parent') {
      terms = await Term.find({ createdBy: req.user.id }).sort({ startDate: -1 });
    } else {
      // For students, find parent first
      const parentId = req.user.parentId;
      if (parentId) {
        terms = await Term.find({ createdBy: parentId }).sort({ startDate: -1 });
      } else {
        // Default terms if no parent is associated
        terms = await Term.find({ createdBy: { $exists: false } }).sort({ startDate: -1 });
      }
    }
    
    res.json(terms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/terms
// @desc    Create new term
// @access  Private (Parent/Admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Only parents and admins can create terms
    if (req.user.role !== 'parent' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to create terms' });
    }
    
    const { name, startDate, endDate, topics } = req.body;
    
    const term = new Term({
      name,
      startDate,
      endDate,
      topics,
      createdBy: req.user.id
    });
    
    await term.save();
    res.status(201).json(term);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/terms/:id
// @desc    Update term
// @access  Private (Parent/Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    // Only parents and admins can update terms
    if (req.user.role !== 'parent' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update terms' });
    }
    
    const term = await Term.findById(req.params.id);
    
    if (!term) {
      return res.status(404).json({ message: 'Term not found' });
    }
    
    // Check if user is the creator of the term or an admin
    if (term.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this term' });
    }
    
    const { name, startDate, endDate, topics } = req.body;
    
    term.name = name || term.name;
    term.startDate = startDate || term.startDate;
    term.endDate = endDate || term.endDate;
    term.topics = topics || term.topics;
    
    await term.save();
    res.json(term);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/terms/:id/topics
// @desc    Get topics for term
// @access  Private
router.get('/:id/topics', auth, async (req, res) => {
  try {
    const term = await Term.findById(req.params.id).populate('topics');
    
    if (!term) {
      return res.status(404).json({ message: 'Term not found' });
    }
    
    res.json(term.topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
