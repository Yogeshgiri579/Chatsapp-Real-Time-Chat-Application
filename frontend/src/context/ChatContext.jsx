import { createContext, useState, useCallback, useContext, useRef } from 'react';
import { fetchConversations, fetchMessages } from '../services/api.js';
import { connectWebSocket } from '../services/websocket.js';

export const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messagesByChat, setMessagesByChat] = useState({});
  const [connected, setConnected] = useState(false);
  
  const wsRef = useRef(null);
  const currentUserRef = useRef(null);
  const conversationsRef = useRef([]);

  const loadData = useCallback(async () => {
    const data = await fetchConversations();
    // Sort by latest timestamp
    data.sort((a, b) => b.timestamp - a.timestamp);
    setConversations(data);
    conversationsRef.current = data;
    
    // Auto select first chat if not on mobile (here we just select first for simplicity)
    if (data.length > 0) {
      setActiveChatId(data[0].id);
      loadMessagesForChat(data[0].id);
    }
  }, []);

  const loadMessagesForChat = useCallback(async (chatId) => {
    if (messagesByChat[chatId]) return; // Already loaded
    
    const messages = await fetchMessages(chatId);
    setMessagesByChat(prev => ({ ...prev, [chatId]: messages }));
  }, [messagesByChat]);

  const selectChat = useCallback((chatId) => {
    setActiveChatId(chatId);
    loadMessagesForChat(chatId);
    
    // Clear unread
    setConversations(prev => 
      prev.map(c => c.id === chatId ? { ...c, unread: 0 } : c)
    );
  }, [loadMessagesForChat]);

  const addMessageToChat = useCallback((chatId, message) => {
    setMessagesByChat(prev => {
      const chatMsgs = prev[chatId] || [];
      return { ...prev, [chatId]: [...chatMsgs, message] };
    });

    setConversations(prev => {
      const updated = prev.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: message.text,
            timestamp: message.timestamp,
            // Increment unread if it's not the active chat or we didn't send it
            unread: (activeChatId !== chatId && !message.isOwn) ? (c.unread || 0) + 1 : 0
          };
        }
        return c;
      });
      return updated.sort((a, b) => b.timestamp - a.timestamp);
    });
  }, [activeChatId]);

  const connectWS = useCallback((user) => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    currentUserRef.current = user;

    const ws = connectWebSocket({
      currentUser: user,
      conversations: conversationsRef.current,
      onMessage: (message) => {
        addMessageToChat(message.chatId, message);
      },
    });

    wsRef.current = ws;
    setConnected(true);

    return () => {
      ws.close();
      wsRef.current = null;
      setConnected(false);
    };
  }, [addMessageToChat]);

  const disconnectWS = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setConnected(false);
  }, []);

  const sendMessage = useCallback((text, user) => {
    const activeUser = user || currentUserRef.current;
    if (!text.trim() || !activeUser || !activeChatId) return;

    const message = {
      id: `m_${Date.now()}_own`,
      chatId: activeChatId,
      senderId: activeUser.id,
      text: text.trim(),
      timestamp: new Date().getTime(),
      isOwn: true,
    };

    addMessageToChat(activeChatId, message);

    if (wsRef.current) {
      wsRef.current.send(message);
    }
  }, [activeChatId, addMessageToChat]);

  const clearState = useCallback(() => {
    setConversations([]);
    setActiveChatId(null);
    setMessagesByChat({});
  }, []);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeChatId,
        selectChat,
        messages: activeChatId ? (messagesByChat[activeChatId] || []) : [],
        connected,
        loadData,
        connectWS,
        disconnectWS,
        sendMessage,
        clearState
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
