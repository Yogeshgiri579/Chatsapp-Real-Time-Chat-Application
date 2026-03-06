import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ChatInput() {
  const [text, setText] = useState('');
  const { sendMessage, connected } = useChat();
  const { user } = useAuth();

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(trimmed, user);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        background: 'var(--bg-input-bar)',
        zIndex: 10,
      }}
    >
      <div style={{ color: 'var(--text-secondary)', cursor: 'pointer', padding: '5px' }}>
        <svg fill="currentColor" width="26" height="26" viewBox="0 0 24 24">
          <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
        </svg>
      </div>
      
      <div style={{ color: 'var(--text-secondary)', cursor: 'pointer', padding: '5px' }}>
        <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" viewBox="0 0 24 24">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
        </svg>
      </div>

      <div style={{ flex: 1 }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          disabled={!connected}
          autoComplete="off"
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--bg-active)',
            color: 'var(--text-primary)',
            fontSize: '15px',
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />
      </div>

      <button
        onClick={handleSend}
        disabled={!connected || !text.trim()}
        style={{
          background: 'transparent',
          border: 'none',
          color: text.trim() ? 'var(--text-primary)' : 'var(--text-secondary)',
          cursor: text.trim() ? 'pointer' : 'default',
          padding: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
        </svg>
      </button>
    </div>
  );
}
