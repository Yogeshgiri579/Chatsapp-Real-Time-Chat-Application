const express = require('express');
const router  = express.Router();
const { getMessages } = require('../controllers/messageController');

// GET /api/messages/:conversationId
router.get('/:conversationId', getMessages);

module.exports = router;
