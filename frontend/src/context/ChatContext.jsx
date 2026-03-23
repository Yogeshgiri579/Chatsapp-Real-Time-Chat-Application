import { createContext, useState, useCallback, useContext, useRef } from 'react';
import { fetchConversations, fetchMessages } from '../services/api.js';
import { connectWebSocket } from '../services/websocket.js';

export const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messagesByChat, setMessagesByChat] = useState({});
  const [connected, setConnected] = useState(false);
  const [onlineUserIds, setOnlineUserIds] = useState([]); // live online set

  const wsRef = useRef(null);
  const currentUserRef = useRef(null);
  const activeChatIdRef = useRef(null);

  // Keep ref in sync with state so callbacks always see latest value
  const setActiveChatIdSynced = (id) => {
    activeChatIdRef.current = id;
    setActiveChatId(id);
  };

  const loadData = useCallback(async (userId) => {
    if (!userId) return;
    const data = await fetchConversations(userId);
    data.sort((a, b) => b.timestamp - a.timestamp);
    setConversations(data);
    if (data.length > 0 && !activeChatIdRef.current) {
      setActiveChatIdSynced(data[0].id);
      loadMessagesForChat(data[0].id);
    }
  }, []); 

  const loadMessagesForChat = useCallback(async (chatId) => {
    setMessagesByChat(prev => {
      if (prev[chatId]) return prev; // already loaded
      return prev; // will load after
    });
    const messages = await fetchMessages(chatId);
    setMessagesByChat(prev => ({ ...prev, [chatId]: messages }));
  }, []);

  const selectChat = useCallback((chatId) => {
    setActiveChatIdSynced(chatId);
    loadMessagesForChat(chatId);
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
            unread: (activeChatIdRef.current !== chatId && !message.isOwn)
              ? (c.unread || 0) + 1 : 0,
          };
        }
        return c;
      });
      return updated.sort((a, b) => b.timestamp - a.timestamp);
    });
  }, []);

  const connectWS = useCallback((user) => {
    if (wsRef.current) wsRef.current.close();
    currentUserRef.current = user;

    const refreshChats = async () => {
      if (!currentUserRef.current) return;
      const data = await fetchConversations(currentUserRef.current.id);
      data.sort((a, b) => b.timestamp - a.timestamp);
      setConversations(data);
    };

    const ws = connectWebSocket({
      currentUser: user,
      onRefreshNeeded: () => refreshChats(),
      onOnlineUsers: (ids) => {
        setOnlineUserIds(ids);
        // Also update conversation online status
        setConversations(prev =>
          prev.map(c => {
            if (!c.isGroup && c.partnerId) {
              return { ...c, online: ids.includes(c.partnerId) };
            }
            // update participants online too
            if (c.participants) {
              return {
                ...c,
                participants: c.participants.map(p => ({ ...p, online: ids.includes(p.id) })),
              };
            }
            return c;
          })
        );
      },
      onUserOffline: (userId) => {
        setOnlineUserIds(prev => prev.filter(id => id !== userId));
        setConversations(prev =>
          prev.map(c => {
            if (!c.isGroup && c.partnerId === userId) return { ...c, online: false };
            if (c.participants) {
              return {
                ...c,
                participants: c.participants.map(p =>
                  p.id === userId ? { ...p, online: false } : p
                ),
              };
            }
            return c;
          })
        );
      },
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
    if (!text.trim() || !activeUser || !activeChatIdRef.current) return;

    const message = {
      id: `m_${Date.now()}_own`,
      chatId: activeChatIdRef.current,
      senderId: activeUser.id,
      senderName: activeUser.username || activeUser.name,
      senderColor: activeUser.color,
      text: text.trim(),
      timestamp: new Date().getTime(),
      isOwn: true,
    };

    addMessageToChat(activeChatIdRef.current, message);

    if (wsRef.current) {
      wsRef.current.send(message);
    }
  }, [addMessageToChat]);

  const clearState = useCallback(() => {
    setConversations([]);
    setActiveChatIdSynced(null);
    setMessagesByChat({});
    setOnlineUserIds([]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeChatId,
        selectChat,
        messages: activeChatId ? (messagesByChat[activeChatId] || []) : [],
        connected,
        onlineUserIds,
        loadData,
        connectWS,
        disconnectWS,
        sendMessage,
        clearState,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
