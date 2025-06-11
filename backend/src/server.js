const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const authenticateToken = require('./middleware/auth');
const studyController = require('./controllers/studyController');
const { getAuthUrl, setCredentials, syncToCalendar } = require('./services/googleCalendar');

require('dotenv').config({ path: 'C:/Users/Muhammad Mitkar/Desktop/StudyGenie/backend/src/.env' });

const app = express();

// Dynamic frontend URL for redirects (set in Vercel environment variables)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: FRONTEND_URL // Allow requests from the deployed frontend
}));
app.use(helmet());
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests
}));

// Database connection
console.log('MongoDB URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', authenticateToken, require('./routes/userRoutes'));

// Define callback route first to bypass middleware
app.get('/api/study/auth/callback', async (req, res) => {
  console.log('Reached /api/study/auth/callback');
  const { code, state } = req.query;

  if (!code || !state) {
    console.log('Missing code or state parameter:', { code, state });
    return res.redirect(`${FRONTEND_URL}/study?sync=error&message=${encodeURIComponent('Missing code or state parameter')}`);
  }

  try {
    const { userId, planId } = JSON.parse(state);
    console.log('Callback received:', { code, state, userId, planId });
    const tokens = await setCredentials(code);
    await syncToCalendar(userId, planId, tokens);
    res.redirect(`${FRONTEND_URL}/study?sync=success`);
  } catch (error) {
    console.error('Callback error:', error.message);
    res.redirect(`${FRONTEND_URL}/study?sync=error&message=${encodeURIComponent(error.message)}`);
  }
});

// Split study routes to handle authenticated routes separately
const studyRouter = express.Router();
studyRouter.use(authenticateToken);
studyRouter.post('/generate-plan', studyController.generatePlan);
studyRouter.get('/plans', studyController.getPlans);
studyRouter.put('/plans/:id', studyController.updatePlan);
studyRouter.get('/auth', async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const planId = req.query.planId;

  if (!userId) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  if (!planId) {
    return res.status(400).json({ success: false, error: 'Plan ID is required' });
  }

  try {
    const authUrl = getAuthUrl(userId, planId);
    res.status(200).json({ success: true, authUrl });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Define study routes
app.use('/api/study', studyRouter);

app.use('/api/quiz', authenticateToken, require('./routes/quizRoutes'));
app.use('/api/chat', authenticateToken, require('./routes/aiRoutes'));

// Export the app for Vercel serverless deployment
module.exports = app;