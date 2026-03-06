import React from 'react';
import ChatMessage from './ChatMessage.jsx';
import ChatInput from './ChatInput.jsx';
import Avatar from '../common/Avatar.jsx';
import { useChat } from '../../context/ChatContext.jsx';
import useScrollToBottom from '../../hooks/useScrollToBottom.js';

export default function ChatWindow() {
  const { conversations, activeChatId, messages } = useChat();
  const bottomRef = useScrollToBottom([messages, activeChatId]);

  const activeChat = conversations.find(c => c.id === activeChatId);

  if (!activeChat) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-app)', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: 'var(--bg-chat)',
      }}
    >
      <div className="chat-bg"></div>
      
      {/* Header */}
      <div style={{
        padding: '10px 16px',
        background: 'var(--bg-header)',
        display: 'flex',
        alignItems: 'center',
        borderLeft: '1px solid var(--border)',
        zIndex: 10,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <Avatar username={activeChat.name} color={activeChat.color} size="md" isGroup={activeChat.isGroup} />
        <div style={{ marginLeft: '14px', flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)' }}>{activeChat.name}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '1px' }}>
            {activeChat.isGroup ? 
              activeChat.participants.map(p => p.name).join(', ') : 
              'click here for contact info'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', color: 'var(--text-secondary)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </div>
      </div>

      {/* Messages area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 0',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ 
            background: 'var(--bg-header)', 
            color: 'var(--text-secondary)', 
            fontSize: '12.5px', 
            padding: '5px 12px', 
            borderRadius: '6px', 
            boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
            textTransform: 'uppercase'
          }}>
            TODAY
          </span>
        </div>
        
        {messages.map((msg, index) => {
          // If previous message was from same sender, don't repeat the sender name and tail
          const prevMsg = messages[index - 1];
          const isConsecutive = prevMsg && prevMsg.senderId === msg.senderId;
          
          return (
            <div key={msg.id} style={{ marginTop: isConsecutive ? '2px' : '10px' }}>
              <ChatMessage 
                message={msg} 
                isOwn={msg.isOwn} 
                isGroup={activeChat.isGroup} 
              />
            </div>
          );
        })}
        <div ref={bottomRef} style={{ height: 1 }} />
      </div>

      <ChatInput />
    </div>
  );
}
