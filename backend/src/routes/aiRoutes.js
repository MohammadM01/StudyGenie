const express = require('express');
  const router = express.Router();
  const aiController = require('../controllers/aiController');

  router.post('/send-message', aiController.sendMessage);
  router.get('/conversations', aiController.getConversations);

  module.exports = router;