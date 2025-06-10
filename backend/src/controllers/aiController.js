const Chat = require('../models/Chat');
  const { GoogleGenerativeAI } = require('@google/generative-ai');

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const sendMessage = async (req, res) => {
    const { message, conversationId } = req.body;
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `You are StudyGenie, a cosmic AI study buddy. User message: ${message}. Respond helpfully with a cosmic theme.`;
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      let chat;
      if (conversationId) {
        chat = await Chat.findById(conversationId);
        chat.messages.push({ type: 'user', content: message, timestamp: new Date() });
        chat.messages.push({ type: 'ai', content: aiResponse, timestamp: new Date() });
        chat.lastActivity = new Date();
      } else {
        chat = new Chat({
          userId: req.user.id,
          title: message.slice(0, 20),
          messages: [
            { type: 'user', content: message, timestamp: new Date() },
            { type: 'ai', content: aiResponse, timestamp: new Date() }
          ],
          isActive: true,
          lastActivity: new Date(),
          createdAt: new Date()
        });
      }
      await chat.save();
      res.json({ success: true, data: { response: aiResponse, conversationId: chat._id } });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to send message' });
    }
  };

  const getConversations = async (req, res) => {
    try {
      const chats = await Chat.find({ userId: req.user.id });
      res.json({ success: true, data: chats });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server error' });
    }
  };

  module.exports = { sendMessage, getConversations };