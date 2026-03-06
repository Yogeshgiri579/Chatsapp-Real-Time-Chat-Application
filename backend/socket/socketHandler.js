const mongoose = require('mongoose');
const User = require('../models/User');
const { saveMessage } = require('../controllers/messageController');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const registerSocketHandlers = (io, onlineSockets) => {
  const broadcastOnlineUsers = () => {
    const onlineUserIds = [...new Set([...onlineSockets.values()])];
    io.emit('online_users', onlineUserIds);
  };

  io.on('connection', (socket) => {
    console.log(`[Socket] Connected: ${socket.id}`);

    socket.on('identify', async (userId) => {
      if (!isValidId(userId)) {
        console.warn(`[Socket] Invalid userId: ${userId} — ignoring`);
        return;
      }
      try {
        onlineSockets.set(socket.id, userId);
        await User.findByIdAndUpdate(userId, { online: true });
        broadcastOnlineUsers();
        console.log(`[Socket] User ${userId} is online`);
      } catch (err) {
        console.error('[Socket] identify error:', err.message);
      }
    });

    socket.on('send_message', async (data) => {
      try {
        const { chatId, senderId, senderName, senderColor, text } = data;
        const savedMessage = await saveMessage({ conversationId: chatId, senderId, senderName, senderColor, text });
        socket.broadcast.emit('receive_message', savedMessage);
      } catch (err) {
        console.error('[Socket] send_message error:', err.message);
        socket.emit('message_error', { message: 'Failed to save message' });
      }
    });

    socket.on('disconnect', async () => {
      const userId = onlineSockets.get(socket.id);
      onlineSockets.delete(socket.id);

      if (userId) {
        const stillOnline = [...onlineSockets.values()].includes(userId);
        if (!stillOnline && isValidId(userId)) {
          try {
            await User.findByIdAndUpdate(userId, { online: false, lastSeen: new Date() });
            io.emit('user_offline', { userId, lastSeen: Date.now() });
            broadcastOnlineUsers();
            console.log(`[Socket] User ${userId} went offline`);
          } catch (err) {
            console.error('[Socket] disconnect error:', err.message);
          }
        }
      }
      console.log(`[Socket] Disconnected: ${socket.id}`);
    });
  });
};

module.exports = registerSocketHandlers;
