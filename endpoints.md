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

// Authentication Endpoints
POST /api/auth/login          // Handle login
POST /api/auth/signup         // Handle registration  
POST /api/auth/google         // Google OAuth
POST /api/auth/forgot-password // Password reset
GET /api/auth/verify-email    // Email verification