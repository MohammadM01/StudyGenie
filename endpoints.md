// ===================================
// STUDYGENIE BACKEND ARCHITECTURE
// ===================================

// 1. DATABASE MODELS (MongoDB/Mongoose)
// ===================================

// User Model
const UserSchema = {
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // hashed
  profilePicture: String, // URL or base64
  joinDate: Date,
  googleId: String, // for OAuth
  preferences: {
    mood: String, // "energized", "stressed", "epic"
    studyHours: Number,
    subjects: [String]
  },
  stats: {
    totalQuizzes: Number,
    studyHours: Number,
    achievements: [String]
  },
  createdAt: Date,
  updatedAt: Date
}

// Study Plan Model
const StudyPlanSchema = {
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  subjects: [String],
  goals: String,
  dailyHours: Number,
  mood: String,
  plan: [{
    day: Number,
    subject: String,
    duration: String,
    task: String,
    completed: Boolean
  }],
  syncedToCalendar: Boolean,
  calendarEventIds: [String],
  createdAt: Date,
  updatedAt: Date
}

// Quiz Model
const QuizSchema = {
  _id: ObjectId,
  userId: ObjectId,
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
}

// Chat Conversation Model
const ChatSchema = {
  _id: ObjectId,
  userId: ObjectId,
  title: String, // auto-generated from first message
  messages: [{
    type: String, // "user" or "ai"
    content: String,
    timestamp: Date,
    metadata: {
      mood: String,
      subject: String,
      confidence: Number
    }
  }],
  subject: String, // extracted topic
  isActive: Boolean,
  lastActivity: Date,
  createdAt: Date
}

// Achievement Model
const AchievementSchema = {
  _id: ObjectId,
  userId: ObjectId,
  name: String,
  description: String,
  icon: String,
  category: String, // "quiz", "study", "streak", "special"
  unlockedAt: Date,
  progress: Number, // 0-100
  requirements: {
    type: String, // "quiz_count", "study_hours", "streak_days"
    target: Number,
    current: Number
  }
}

// ===================================
// 2. API ENDPOINTS
// ===================================

// AUTH ENDPOINTS
// ===================================
POST   /api/auth/register          // User registration
POST   /api/auth/login             // User login
POST   /api/auth/logout            // User logout
POST   /api/auth/refresh           // Refresh JWT token
GET    /api/auth/me                // Get current user
POST   /api/auth/google            // Google OAuth login
POST   /api/auth/forgot-password   // Send reset email
POST   /api/auth/reset-password    // Reset password

// USER ENDPOINTS
// ===================================
GET    /api/users/profile          // Get user profile
PUT    /api/users/profile          // Update user profile
POST   /api/users/upload-avatar    // Upload profile picture
GET    /api/users/stats            // Get user statistics
PUT    /api/users/preferences      // Update user preferences
DELETE /api/users/account          // Delete user account

// STUDY PLAN ENDPOINTS
// ===================================
POST   /api/study/generate-plan    // Generate AI study plan
GET    /api/study/plans            // Get user's study plans
GET    /api/study/plans/:id        // Get specific study plan
PUT    /api/study/plans/:id        // Update study plan
DELETE /api/study/plans/:id        // Delete study plan
POST   /api/study/sync-calendar    // Sync to Google Calendar
PUT    /api/study/mark-complete    // Mark task as complete

// QUIZ ENDPOINTS
// ===================================
POST   /api/quiz/generate          // Generate AI quiz
GET    /api/quiz/history           // Get quiz history
GET    /api/quiz/:id               // Get specific quiz
POST   /api/quiz/submit            // Submit quiz answers
GET    /api/quiz/leaderboard       // Get quiz leaderboard
POST   /api/quiz/retry/:id         // Retry a quiz

// AI CHAT ENDPOINTS
// ===================================
POST   /api/chat/send-message      // Send message to AI
GET    /api/chat/conversations     // Get chat history
GET    /api/chat/conversations/:id // Get specific conversation
DELETE /api/chat/conversations/:id // Delete conversation
POST   /api/chat/new-conversation  // Start new conversation
PUT    /api/chat/conversations/:id // Update conversation title

// ACHIEVEMENT ENDPOINTS
// ===================================
GET    /api/achievements           // Get user achievements
POST   /api/achievements/check     // Check for new achievements
GET    /api/achievements/available // Get available achievements

// CALENDAR INTEGRATION ENDPOINTS
// ===================================
GET    /api/calendar/auth          // Google Calendar OAuth
POST   /api/calendar/sync          // Sync study plan to calendar
GET    /api/calendar/events        // Get calendar events
DELETE /api/calendar/events/:id    // Remove calendar event

// ===================================
// 3. GOOGLE GEMINI AI INTEGRATION
// ===================================

// Study Plan Generation
const generateStudyPlan = async (subjects, goals, hours, mood) => {
  const prompt = `
    Create a personalized study plan for:
    Subjects: ${subjects}
    Goals: ${goals}
    Daily Hours: ${hours}
    Mood: ${mood}
    
    Return a 7-day plan with specific tasks for each day.
    Format as JSON with day, subject, duration, and task.
  `
  
  const response = await gemini.generateContent(prompt)
  return JSON.parse(response.text())
}

// Quiz Generation
const generateQuiz = async (topic, difficulty, questionCount) => {
  const prompt = `
    Generate a ${difficulty} quiz about ${topic} with ${questionCount} questions.
    Each question should have 4 multiple choice options.
    Include explanations for correct answers.
    Format as JSON.
  `
  
  const response = await gemini.generateContent(prompt)
  return JSON.parse(response.text())
}

// AI Chat Response
const generateChatResponse = async (message, context, mood) => {
  const prompt = `
    You are StudyGenie, a cosmic AI study buddy.
    User mood: ${mood}
    Context: ${context}
    User message: ${message}
    
    Respond in a helpful, encouraging way matching the cosmic theme.
    If it's study-related, provide detailed explanations.
  `
  
  const response = await gemini.generateContent(prompt)
  return response.text()
}

// ===================================
// 4. GOOGLE CALENDAR INTEGRATION
// ===================================

const syncToGoogleCalendar = async (studyPlan, accessToken) => {
  const calendar = google.calendar({ version: 'v3', auth: accessToken })
  
  const events = studyPlan.plan.map(task => ({
    summary: `${task.subject} - ${task.task}`,
    description: `StudyGenie Study Session\nDuration: ${task.duration}`,
    start: {
      dateTime: calculateStartTime(task.day, task.duration),
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: calculateEndTime(task.day, task.duration),
      timeZone: 'America/Los_Angeles'
    },
    colorId: getSubjectColor(task.subject)
  }))
  
  const createdEvents = await Promise.all(
    events.map(event => calendar.events.insert({
      calendarId: 'primary',
      resource: event
    }))
  )
  
  return createdEvents.map(event => event.data.id)
}

// ===================================
// 5. MIDDLEWARE & AUTHENTICATION
// ===================================

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })
    req.user = user
    next()
  })
}

// Rate Limiting Middleware
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
})

// ===================================
// 6. ENVIRONMENT VARIABLES NEEDED
// ===================================

// .env file
/*
# Database
MONGODB_URI=mongodb://localhost:27017/studygenie
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Google APIs
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# Email (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:3000

# File Upload
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
*/

// ===================================
// 7. SAMPLE API RESPONSES
// ===================================

// Study Plan Generation Response
{
  "success": true,
  "data": {
    "planId": "64f8a1b2c3d4e5f6g7h8i9j0",
    "plan": [
      {
        "day": 1,
        "subject": "Math",
        "duration": "1 hr",
        "task": "Practice basic algebra equations",
        "completed": false
      }
    ],
    "totalDays": 7,
    "estimatedHours": 10
  }
}

// Quiz Generation Response
{
  "success": true,
  "data": {
    "quizId": "64f8a1b2c3d4e5f6g7h8i9j1",
    "topic": "Chemistry",
    "difficulty": "Medium",
    "questions": [
      {
        "question": "What is the chemical symbol for water?",
        "options": ["H2O", "CO2", "NaCl", "O2"],
        "correctAnswer": 0,
        "explanation": "Water is composed of two hydrogen atoms and one oxygen atom."
      }
    ],
    "totalQuestions": 10,
    "timeLimit": 600
  }
}

// Chat Response
{
  "success": true,
  "data": {
    "response": "Great question about quadratic equations! Let me break this down for you...",
    "conversationId": "64f8a1b2c3d4e5f6g7h8i9j2",
    "subject": "Mathematics",
    "confidence": 0.95
  }
}

// ===================================
// 8. WEBSOCKET EVENTS (Real-time)
// ===================================

// Client to Server Events
'join_chat'          // Join chat room
'send_message'       // Send chat message
'typing_start'       // User started typing
'typing_stop'        // User stopped typing
'quiz_answer'        // Submit quiz answer
'study_progress'     // Update study progress

// Server to Client Events
'message_received'   // New chat message
'typing_indicator'   // Show typing indicator
'quiz_feedback'      // Quiz answer feedback
'achievement_unlocked' // New achievement
'study_reminder'     // Study session reminder
'motivation_blast'   // Motivation message

// ===================================
// 9. CACHING STRATEGY (Redis)
// ===================================

// Cache Keys
'user:profile:{userId}'           // User profile data
'quiz:leaderboard:{topic}'        // Quiz leaderboards
'chat:history:{conversationId}'   // Chat conversation
'study:plan:{planId}'            // Study plan data
'achievements:{userId}'          // User achievements

// Cache TTL (Time To Live)
USER_PROFILE_TTL = 3600          // 1 hour
QUIZ_LEADERBOARD_TTL = 1800      // 30 minutes
CHAT_HISTORY_TTL = 7200          // 2 hours
STUDY_PLAN_TTL = 1800           // 30 minutes

// ===================================
// 10. ERROR HANDLING
// ===================================

// Standard Error Response Format
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  },
  "timestamp": "2024-06-10T15:30:00Z"
}

// Error Codes
'AUTH_REQUIRED'      // Authentication required
'INVALID_TOKEN'      // Invalid JWT token
'VALIDATION_ERROR'   // Input validation failed
'NOT_FOUND'         // Resource not found
'RATE_LIMITED'      // Too many requests
'GEMINI_API_ERROR'  // Google Gemini API error
'CALENDAR_SYNC_ERROR' // Google Calendar sync failed
'DATABASE_ERROR'    // Database operation failed



---------

npm install express mongoose redis jsonwebtoken bcryptjs
npm install @google/generative-ai googleapis nodemailer
npm install socket.io cors helmet express-rate-limit
npm install multer cloudinary dotenv  