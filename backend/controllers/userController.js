const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await User.find({ _id: { $ne: userId } }).lean();

    const onlineIds = req.onlineSockets
      ? new Set([...req.onlineSockets.values()])
      : new Set();

    const result = users.map((u) => ({
      id: u._id.toString(),
      username: u.username,
      color: u.color,
      online: onlineIds.has(u._id.toString()),
      lastSeen: u.lastSeen,
    }));

    res.json({ success: true, users: result });
  } catch (error) {
    console.error('[userController.getAllUsers]', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

module.exports = { getAllUsers };
