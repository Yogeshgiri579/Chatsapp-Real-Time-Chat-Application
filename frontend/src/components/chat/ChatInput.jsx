import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ChatInput() {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
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
    <div className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-input-bar)] border-t border-[var(--border)] z-10 transition-colors duration-300">
      {/* Attachment button */}
      <button
        className="text-[var(--text-secondary)] cursor-pointer p-1.5 bg-transparent border-none flex items-center justify-center transition-all duration-200 ease-out rounded-[var(--radius-md)] hover:text-[#ec4899] hover:scale-110"
      >
        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
        </svg>
      </button>

      {/* Input field */}
      <div
        className={`flex-1 flex items-center rounded-full px-4 py-2 transition-all duration-200 ease-out ${
          focused 
            ? 'bg-[var(--bg-active)] border-[1.5px] border-[#ec4899]' 
            : 'bg-[var(--bg-search)] border border-[var(--border)]'
        }`}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Type a message..."
          disabled={!connected}
          autoComplete="off"
          className="w-full p-0 bg-transparent border-none text-[var(--text-primary)] text-sm font-sans outline-none"
        />
      </div>

      {/* Send button */}
      <button
        onClick={handleSend}
        disabled={!connected || !text.trim()}
        className={`border-none cursor-${text.trim() ? 'pointer' : 'default'} px-3 py-2 flex items-center justify-center rounded-full transition-all duration-200 ease-out ${
          text.trim() 
            ? 'bg-[#ec4899] text-white shadow-[0_2px_8px_rgba(236,72,153,0.25)] hover:shadow-[0_4px_12px_rgba(236,72,153,0.35)] hover:scale-105' 
            : 'bg-[var(--bg-active)] text-[var(--text-muted)]'
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
        </svg>
      </button>
    </div>
  );
}
