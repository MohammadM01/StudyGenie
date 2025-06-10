const mongoose = require('mongoose');

  const QuizSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    topic: String,
    difficulty: String, // "Easy", "Medium", "Hard"
    questions: [{
      question: String,
      options: [String],
      correctAnswer: Number,
      explanation: String
    }],
    userAnswers: [Number],
    score: Number,
    totalQuestions: Number,
    completedAt: Date,
    timeSpent: Number, // in seconds
    createdAt: Date
  });

  module.exports = mongoose.model('Quiz', QuizSchema);