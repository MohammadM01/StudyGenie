const mongoose = require('mongoose');

const StudyPlanSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  subjects: [String],
  goals: String,
  dailyHours: Number,
  mood: String,
  startDate: Date, // New field for start date
  endDate: Date,   // New field for end date
  plan: [{
    date: Date,    // Store actual date instead of day number
    subject: String,
    duration: String,
    task: String,
    completed: Boolean
  }],
  syncedToCalendar: Boolean,
  calendarEventIds: [String],
  createdAt: Date,
  updatedAt: Date
});

module.exports = mongoose.model('StudyPlan', StudyPlanSchema);