const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    enum: ['multiple-choice', 'fill-in', 'interactive', 'matching', 'true-false'],
    required: true
  },
  options: [{
    type: String
  }],
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  explanation: {
    type: String
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  tags: [{
    type: String
  }]
});

module.exports = mongoose.model('Question', QuestionSchema);
