const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
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
});

module.exports = mongoose.model('Chat', ChatSchema);