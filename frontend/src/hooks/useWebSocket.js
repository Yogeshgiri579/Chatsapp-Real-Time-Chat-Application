import { useEffect, useRef, useState, useContext } from 'react';
import { connectWebSocket } from '../services/websocket.js';
import { ChatContext } from '../context/ChatContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

/**
 * Manages the mock WebSocket lifecycle and exposes a sendMessage function.
 * Automatically cleans up the connection on unmount.
 */
export default function useWebSocket() {
  const { addMessage } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const wsRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!user) return;

    const ws = connectWebSocket({
      currentUser: user,
      onMessage: (message) => {
        addMessage(message);
      },
    });

    wsRef.current = ws;
    setConnected(true);

    return () => {
      ws.close();
      wsRef.current = null;
      setConnected(false);
    };
  }, [user]); // reconnect if user changes

  const sendMessage = (text) => {
    if (!text.trim() || !wsRef.current) return;

    const message = {
      id: `msg_${Date.now()}_own`,
      senderId: user.id,
      senderName: user.username,
      senderColor: user.color,
      text: text.trim(),
      timestamp: new Date(),
      isOwn: true,
    };

    addMessage(message);
    wsRef.current.send(message);
  };

  return { sendMessage, connected };
}
