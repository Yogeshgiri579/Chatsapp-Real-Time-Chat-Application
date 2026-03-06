import { io } from 'socket.io-client';

export const connectWebSocket = ({ onMessage, onRefreshNeeded, onOnlineUsers, onUserOffline, currentUser }) => {
  const socket = io('http://localhost:3000');

  socket.on('connect', () => {
    socket.emit('identify', currentUser.id);
  });

  socket.on('receive_message', (message) => {
    onMessage({
      ...message,
      isOwn: message.senderId === currentUser.id,
    });
  });

  socket.on('online_users', (userIds) => {
    if (onOnlineUsers) onOnlineUsers(userIds);
  });

  socket.on('user_offline', ({ userId, lastSeen }) => {
    if (onUserOffline) onUserOffline(userId, lastSeen);
  });

  socket.on('new_user_joined', () => {
    if (onRefreshNeeded) onRefreshNeeded();
  });

  return {
    send: (messageData) => {
      socket.emit('send_message', messageData);
    },
    close: () => {
      socket.disconnect();
    },
    socket,
  };
};
