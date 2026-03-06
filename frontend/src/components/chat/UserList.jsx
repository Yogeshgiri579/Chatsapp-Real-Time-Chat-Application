import React from 'react';
import Avatar from '../common/Avatar.jsx';
import { useChat } from '../../context/ChatContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { formatDate } from '../../utils/formatTime.js';

export default function Sidebar() {
  const { conversations, activeChatId, selectChat, disconnectWS, clearState } = useChat();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    disconnectWS();
    clearState();
    logout();
  };

  return (
    <aside
      style={{
        width: 380,
        flexShrink: 0,
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* User Header */}
      <div
        style={{
          padding: '10px 16px',
          background: 'var(--bg-header)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Avatar username={user?.username} color={user?.color} size="md" />
        <div style={{ display: 'flex', gap: '20px', color: 'var(--text-secondary)' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12.072 1.761a10.05 10.05 0 0 0-9.303 5.658..."></path>
              <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"></circle>
            </svg>
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path>
            </svg>
          </button>
          <button onClick={handleLogout} title="Sign Out" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-sidebar)',
          gap: '12px'
        }}
      >
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-search)',
          borderRadius: 'var(--radius-md)',
          padding: '6px 12px',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search or start new chat"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '14px',
              padding: '4px 12px',
            }}
          />
        </div>
      </div>

      {/* Conversations List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {conversations.map((chat) => (
          <div
            key={chat.id}
            onClick={() => selectChat(chat.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              cursor: 'pointer',
              background: activeChatId === chat.id ? 'var(--bg-active)' : 'transparent',
              transition: 'background var(--transition)',
            }}
            onMouseEnter={(e) => {
              if (activeChatId !== chat.id) e.currentTarget.style.background = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              if (activeChatId !== chat.id) e.currentTarget.style.background = 'transparent';
            }}
          >
            <Avatar username={chat.name} color={chat.color} size="lg" isGroup={chat.isGroup} />
            <div style={{ marginLeft: '14px', flex: 1, borderBottom: activeChatId === chat.id ? '1px solid transparent' : '1px solid var(--border-light)', paddingBottom: '14px', marginBottom: '-14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {chat.name}
                </span>
                <span style={{ fontSize: '12px', color: chat.unread > 0 ? 'var(--accent)' : 'var(--text-secondary)' }}>
                  {chat.timestamp ? formatDate(chat.timestamp) : ''}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '14px', 
                  color: chat.unread > 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '220px',
                  fontWeight: chat.unread > 0 ? 500 : 400
                }}>
                  {chat.lastMessage || 'Start a conversation'}
                </span>
                {chat.unread > 0 && (
                  <span style={{
                    background: 'var(--accent)',
                    color: 'var(--text-inverse)',
                    fontSize: '12px',
                    fontWeight: 600,
                    minWidth: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 6px'
                  }}>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
