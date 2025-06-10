// studygenie/backend/routes/api.js

// Authentication
POST /api/auth/login
POST /api/auth/register
GET /api/auth/profile

// Google Gemini AI
POST /api/ai/study-plan
POST /api/ai/doubt-solver
POST /api/ai/quiz-generator
POST /api/ai/mood-tips

// Google Calendar
POST /api/calendar/sync
GET /api/calendar/events

// User Data
GET /api/user/progress
POST /api/user/save-result