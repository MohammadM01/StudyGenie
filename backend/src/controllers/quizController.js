const Quiz = require('../models/Quiz');
  const { GoogleGenerativeAI } = require('@google/generative-ai');

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const generateQuiz = async (req, res) => {
    const { topic, difficulty, questionCount } = req.body;
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `Generate a ${difficulty} quiz about ${topic} with ${questionCount} questions. Each question should have 4 options. Include explanations. Return JSON.`;
      const result = await model.generateContent(prompt);
      const quizData = JSON.parse(result.response.text());

      const newQuiz = new Quiz({
        userId: req.user.id,
        topic,
        difficulty,
        questions: quizData,
        totalQuestions: questionCount,
        createdAt: new Date()
      });
      await newQuiz.save();
      res.json({ success: true, data: newQuiz });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to generate quiz' });
    }
  };

  const getHistory = async (req, res) => {
    try {
      const quizzes = await Quiz.find({ userId: req.user.id });
      res.json({ success: true, data: quizzes });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server error' });
    }
  };

  const submitQuiz = async (req, res) => {
    const { quizId, userAnswers } = req.body;
    try {
      const quiz = await Quiz.findById(quizId);
      let score = 0;
      quiz.questions.forEach((q, i) => {
        if (q.correctAnswer === userAnswers[i]) score++;
      });
      quiz.userAnswers = userAnswers;
      quiz.score = score;
      quiz.completedAt = new Date();
      await quiz.save();
      res.json({ success: true, data: quiz });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server error' });
    }
  };

  module.exports = { generateQuiz, getHistory, submitQuiz };