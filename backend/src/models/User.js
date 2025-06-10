const mongoose = require('mongoose');

  const UserSchema = new mongoose.Schema({
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
  });

  module.exports = mongoose.model('User', UserSchema);