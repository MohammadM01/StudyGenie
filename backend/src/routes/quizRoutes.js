const express = require('express');
  const router = express.Router();
  const quizController = require('../controllers/quizController');

  router.post('/generate', quizController.generateQuiz);
  router.get('/history', quizController.getHistory);
  router.post('/submit', quizController.submitQuiz);

  module.exports = router;