const express = require('express');
const router  = express.Router();
const { getAllUsers } = require('../controllers/userController');

// GET /api/users/:userId  – all users except the requesting user
router.get('/:userId', getAllUsers);

module.exports = router;
