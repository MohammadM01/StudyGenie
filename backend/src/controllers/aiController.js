const Chat = require('../models/Chat');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const sendMessage = async (req, res) => {
  const { message, conversationId } = req.body;
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'Message must be a non-empty string' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const lengthConstraint = message.toLowerCase().includes('in 2 lines')
      ? 'Respond in exactly 2 short lines (max 50 characters each).'
      : 'Keep the response concise, under 150 words, and use bullet points or paragraphs for clarity.';
    const prompt = `You are StudyGenie, a cosmic AI study buddy designed for educational support. ${lengthConstraint} Focus on providing accurate, clear, and concise answers tailored for learning. Use a friendly tone with a cosmic theme. User message: ${message}.`;

    const result = await model.generateContent(prompt);
    let aiResponse = result.response.text();
    console.log('Gemini API Response:', aiResponse);

    aiResponse = aiResponse.replace(/\n/g, '\n');

    let chat;
    if (conversationId) {
      chat = await Chat.findById(conversationId);
      if (!chat) {
        return res.status(404).json({ success: false, error: 'Conversation not found' });
      }
      chat.messages.push({ type: 'user', content: message, timestamp: new Date() });
      chat.messages.push({ type: 'ai', content: aiResponse, timestamp: new Date() });
      chat.lastActivity = new Date();
    } else {
      chat = new Chat({
        userId: req.user.id,
        title: message.slice(0, 20),
        messages: [
          { type: 'user', content: message, timestamp: new Date() },
          { type: 'ai', content: aiResponse, timestamp: new Date() },
        ],
        isActive: true,
        lastActivity: new Date(),
        createdAt: new Date(),
      });
    }
    await chat.save();

    res.json({ success: true, data: { response: aiResponse, conversationId: chat._id } });
  } catch (error) {
    console.error('Error in sendMessage:', error.message, error.stack);
    res.status(500).json({ success: false, error: 'Failed to send message: ' + error.message });
  }
};

const getConversations = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }
    const chats = await Chat.find({ userId: req.user.id }).sort({ lastActivity: -1 });
    res.json({ success: true, data: chats });
  } catch (error) {
    console.error('Error in getConversations:', error.message, error.stack);
    res.status(500).json({ success: false, error: 'Failed to fetch conversations: ' + error.message });
  }
};

const deleteChat = async (req, res) => {
  const { chatId } = req.params;
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }

    const chat = await Chat.findOneAndDelete({ _id: chatId, userId: req.user.id });
    if (!chat) {
      return res.status(404).json({ success: false, error: 'Chat not found or not authorized' });
    }

    res.json({ success: true, message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Error in deleteChat:', error.message, error.stack);
    res.status(500).json({ success: false, error: 'Failed to delete chat: ' + error.message });
  }
};

module.exports = { sendMessage, getConversations, deleteChat };