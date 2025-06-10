const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const authenticateToken = require('./middleware/auth');

require('dotenv').config({ path: 'C:/Users/Muhammad Mitkar/Desktop/StudyGenie/backend/src/.env' });
 const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
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
app.use('/api/users', authenticateToken, require('./routes/userRoutes'));
app.use('/api/study', authenticateToken, require('./routes/studyRoutes'));
app.use('/api/quiz', authenticateToken, require('./routes/quizRoutes'));
app.use('/api/chat', authenticateToken, require('./routes/aiRoutes'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));