const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  attempts: {
    type: Number,
    default: 0
  },
  lastAttemptDate: {
    type: Date,
    default: Date.now
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  }
});

// Compound index to ensure a user can only have one progress record per content item
ProgressSchema.index({ userId: 1, contentId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);
