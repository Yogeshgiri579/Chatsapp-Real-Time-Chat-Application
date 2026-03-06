import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useChat } from '../context/ChatContext.jsx';
import UserList from '../components/chat/UserList.jsx';
import ChatWindow from '../components/chat/ChatWindow.jsx';

export default function Chat() {
  const { user } = useAuth();
  const { loadData, connectWS, disconnectWS, clearState } = useChat();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  // Connect WebSocket and load users on mount
  useEffect(() => {
    if (!user) return;

    loadData();
    const cleanup = connectWS(user);

    return () => {
      if (cleanup) cleanup();
      else disconnectWS();
      clearState();
    };
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        background: 'var(--bg-app)',
        overflow: 'hidden',
      }}
    >
      <UserList />
      <ChatWindow />
    </div>
  );
}
