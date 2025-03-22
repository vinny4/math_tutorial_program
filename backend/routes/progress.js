const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const auth = require('../middleware/auth');

// @route   GET /api/progress/:userId
// @desc    Get user progress
// @access  Private
router.get('/:userId', auth, async (req, res) => {
  try {
    // Check if user is requesting their own progress or if parent is requesting child's progress
    if (req.user.id !== req.params.userId && 
        req.user.role !== 'admin' && 
        !req.user.studentIds.includes(req.params.userId)) {
      return res.status(403).json({ message: 'Not authorized to view this progress' });
    }
    
    const progress = await Progress.find({ userId: req.params.userId })
      .populate('contentId', 'title strand topic subtopic');
    
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/progress
// @desc    Update user progress
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { contentId, completed, score, timeSpent } = req.body;
    
    // Find existing progress or create new one
    let progress = await Progress.findOne({ 
      userId: req.user.id, 
      contentId 
    });
    
    if (progress) {
      // Update existing progress
      progress.completed = completed || progress.completed;
      progress.score = score > progress.score ? score : progress.score; // Only update if better score
      progress.attempts += 1;
      progress.lastAttemptDate = Date.now();
      progress.timeSpent += timeSpent || 0;
    } else {
      // Create new progress
      progress = new Progress({
        userId: req.user.id,
        contentId,
        completed: completed || false,
        score: score || 0,
        attempts: 1,
        timeSpent: timeSpent || 0
      });
    }
    
    await progress.save();
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/progress/report/:userId
// @desc    Get progress report
// @access  Private
router.get('/report/:userId', auth, async (req, res) => {
  try {
    // Check if user is requesting their own report or if parent is requesting child's report
    if (req.user.id !== req.params.userId && 
        req.user.role !== 'admin' && 
        !req.user.studentIds.includes(req.params.userId)) {
      return res.status(403).json({ message: 'Not authorized to view this report' });
    }
    
    const progress = await Progress.find({ userId: req.params.userId })
      .populate('contentId', 'title strand topic subtopic difficulty');
    
    // Calculate overall statistics
    const totalItems = progress.length;
    const completedItems = progress.filter(item => item.completed).length;
    const completionRate = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    const averageScore = progress.length > 0 
      ? progress.reduce((sum, item) => sum + item.score, 0) / progress.length 
      : 0;
    
    // Calculate strand-specific statistics
    const strandStats = {};
    progress.forEach(item => {
      const strand = item.contentId.strand;
      if (!strandStats[strand]) {
        strandStats[strand] = {
          total: 0,
          completed: 0,
          averageScore: 0,
          scores: []
        };
      }
      
      strandStats[strand].total += 1;
      if (item.completed) {
        strandStats[strand].completed += 1;
      }
      strandStats[strand].scores.push(item.score);
    });
    
    // Calculate averages for each strand
    Object.keys(strandStats).forEach(strand => {
      const stats = strandStats[strand];
      stats.completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
      stats.averageScore = stats.scores.length > 0 
        ? stats.scores.reduce((sum, score) => sum + score, 0) / stats.scores.length 
        : 0;
      delete stats.scores; // Remove raw scores from response
    });
    
    res.json({
      overall: {
        totalItems,
        completedItems,
        completionRate,
        averageScore
      },
      byStrand: strandStats,
      progressDetails: progress
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/progress/suggestions/:userId
// @desc    Get improvement suggestions
// @access  Private
router.get('/suggestions/:userId', auth, async (req, res) => {
  try {
    // Check if user is requesting their own suggestions or if parent is requesting child's suggestions
    if (req.user.id !== req.params.userId && 
        req.user.role !== 'admin' && 
        !req.user.studentIds.includes(req.params.userId)) {
      return res.status(403).json({ message: 'Not authorized to view these suggestions' });
    }
    
    const progress = await Progress.find({ userId: req.params.userId })
      .populate('contentId', 'title strand topic subtopic difficulty');
    
    // Find areas with low scores
    const lowScoreItems = progress
      .filter(item => item.score < 70)
      .sort((a, b) => a.score - b.score);
    
    // Find incomplete items
    const incompleteItems = progress
      .filter(item => !item.completed)
      .sort((a, b) => b.contentId.difficulty - a.contentId.difficulty);
    
    // Generate suggestions
    const suggestions = {
      focusAreas: [],
      nextSteps: []
    };
    
    // Add low score items as focus areas
    if (lowScoreItems.length > 0) {
      lowScoreItems.slice(0, 3).forEach(item => {
        suggestions.focusAreas.push({
          contentId: item.contentId._id,
          title: item.contentId.title,
          strand: item.contentId.strand,
          topic: item.contentId.topic,
          score: item.score,
          message: `Work on improving your understanding of ${item.contentId.title}`
        });
      });
    }
    
    // Add incomplete items as next steps
    if (incompleteItems.length > 0) {
      incompleteItems.slice(0, 3).forEach(item => {
        suggestions.nextSteps.push({
          contentId: item.contentId._id,
          title: item.contentId.title,
          strand: item.contentId.strand,
          topic: item.contentId.topic,
          difficulty: item.contentId.difficulty,
          message: `Complete the ${item.contentId.title} module`
        });
      });
    }
    
    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
