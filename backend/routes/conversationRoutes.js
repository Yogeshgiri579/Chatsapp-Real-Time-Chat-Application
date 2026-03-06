const express = require('express');
const router = express.Router();
const { getConversations } = require('../controllers/conversationController');

// GET /api/conversations/:userId
router.get('/:userId', getConversations);

module.exports = router;
