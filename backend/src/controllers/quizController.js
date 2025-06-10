const Quiz = require('../models/Quiz');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateQuiz = async (req, res) => {
  const { topic, difficulty, questionCount } = req.body;
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }

    if (!topic || typeof topic !== 'string') {
      return res.status(400).json({ success: false, error: 'Topic must be a string' });
    }
    if (!difficulty || !['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      return res.status(400).json({ success: false, error: 'Difficulty must be Easy, Medium, or Hard' });
    }
    if (!questionCount || typeof questionCount !== 'number' || questionCount < 1 || questionCount > 20) {
      return res.status(400).json({ success: false, error: 'Question count must be between 1 and 20' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `Generate a quiz on the topic "${topic}" with ${questionCount} multiple-choice questions at ${difficulty} difficulty. Return a JSON array of objects, each containing "question" (string), "options" (array of 4 strings), "correctAnswer" (number, index of correct option 0-3), and "explanation" (string, brief explanation). Example: [{"question": "What is 2+2?", "options": ["3", "4", "5", "6"], "correctAnswer": 1, "explanation": "2+2 equals 4."}]`;

    const result = await model.generateContent(prompt);
    let quizText = result.response.text();
    console.log('Gemini API Response:', quizText);

    quizText = quizText.replace(/```json\n|\n```/g, '').trim();

    let questions;
    try {
      questions = JSON.parse(quizText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      return res.status(500).json({ success: false, error: 'Failed to parse quiz from AI response' });
    }

    if (!Array.isArray(questions)) {
      return res.status(500).json({ success: false, error: 'AI response must be an array of questions' });
    }

    const validatedQuestions = questions.map(item => {
      if (!item.question || !Array.isArray(item.options) || item.options.length !== 4 || typeof item.correctAnswer !== 'number' || item.correctAnswer < 0 || item.correctAnswer > 3 || !item.explanation) {
        throw new Error('Each question must have a question, 4 options, a correctAnswer (0-3), and an explanation');
      }
      return {
        question: item.question,
        options: item.options,
        correctAnswer: item.correctAnswer,
        explanation: item.explanation,
      };
    });

    const newQuiz = new Quiz({
      userId: req.user.id,
      topic,
      difficulty,
      questions: validatedQuestions,
      userAnswers: [],
      score: 0,
      totalQuestions: questionCount,
      completedAt: null,
      timeSpent: 0,
      createdAt: new Date(),
    });

    await newQuiz.save();

    res.json({ success: true, data: newQuiz });
  } catch (error) {
    console.error('Error in generateQuiz:', error.message, error.stack);
    res.status(500).json({ success: false, error: `Failed to generate quiz: ${error.message}` });
  }
};

const getHistory = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }
    const quizzes = await Quiz.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: quizzes });
  } catch (error) {
    console.error('Error in getHistory:', error.message, error.stack);
    res.status(500).json({ success: false, error: 'Failed to fetch quiz history: ' + error.message });
  }
};

const submitQuiz = async (req, res) => {
  const { quizId, userAnswers, timeSpent } = req.body;
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }

    const quiz = await Quiz.findOne({ _id: quizId, userId: req.user.id });
    if (!quiz) {
      return res.status(404).json({ success: false, error: 'Quiz not found' });
    }

    if (!Array.isArray(userAnswers) || userAnswers.length !== quiz.questions.length) {
      return res.status(400).json({ success: false, error: 'Invalid user answers' });
    }

    let score = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        score++;
      }
    });

    quiz.userAnswers = userAnswers;
    quiz.score = score;
    quiz.completedAt = new Date();
    quiz.timeSpent = timeSpent;

    await quiz.save();

    res.json({ success: true, data: quiz });
  } catch (error) {
    console.error('Error in submitQuiz:', error.message, error.stack);
    res.status(500).json({ success: false, error: 'Failed to submit quiz: ' + error.message });
  }
};

module.exports = { generateQuiz, getHistory, submitQuiz };