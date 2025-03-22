const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  strand: {
    type: String,
    required: true,
    enum: ['Number and Algebra', 'Measurement and Geometry', 'Statistics and Probability']
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  subtopic: {
    type: String,
    trim: true
  },
  curriculumCode: {
    type: String,
    trim: true
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  content: {
    type: Object,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  examples: [{
    type: Object
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  source: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Content', ContentSchema);
