import React, { useState } from 'react';
import Avatar from '../common/Avatar.jsx';
import ProfilePanel from './ProfilePanel.jsx';
import SettingsPanel from './SettingsPanel.jsx';
import NewChatDialog from './NewChatDialog.jsx';
import { useChat } from '../../context/ChatContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { formatDate } from '../../utils/formatTime.js';

export default function Sidebar() {
  const { conversations, activeChatId, selectChat, disconnectWS, clearState, onlineUserIds } = useChat();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [newChatOpen, setNewChatOpen] = useState(false);

  const handleLogout = () => {
    disconnectWS();
    clearState();
    logout();
  };

  const filteredConversations = conversations.filter(chat =>
    (chat.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isOnline = (chat) => {
    if (chat.isGroup) return false;
    if (chat.partnerId) return onlineUserIds.includes(chat.partnerId);
    return chat.online === true;
  };

  return (
    <aside className="w-[380px] shrink-0 bg-[var(--bg-sidebar)] border-r border-[var(--border)] flex flex-col overflow-hidden">
      {/* User Profile Header */}
      <div
        onClick={() => setProfileOpen(true)}
        className="px-4 py-5 border-b border-[var(--border)] flex items-center justify-between cursor-pointer transition-all duration-200 ease-out hover:bg-gradient-to-br hover:from-pink-500/10 hover:to-orange-500/10 bg-gradient-to-br from-pink-500/5 to-orange-500/5"
      >
        <div className="flex items-center gap-3 flex-1">
          <Avatar username={user?.username} color={user?.color} size="lg" online={true} />
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-semibold text-[var(--text-primary)] overflow-hidden text-ellipsis whitespace-nowrap">
              {user?.username}
            </div>
            <div className="text-xs text-[var(--text-secondary)] mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block shadow-[0_0_4px_rgba(16,185,129,0.8)]" />
              Online
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); setSettingsOpen(true); }}
            className="bg-[var(--bg-active)] border border-[var(--border)] cursor-pointer text-[var(--text-secondary)] px-2 py-1.5 flex items-center justify-center rounded-[var(--radius-md)] transition-all duration-200 ease-out hover:bg-[var(--bg-hover)] hover:text-[var(--accent)]"
            title="Settings"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6m-17.78 7.78l4.24-4.24m2.12-2.12l4.24-4.24"></path>
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setNewChatOpen(true); }}
            className="bg-[var(--bg-active)] border border-[var(--border)] cursor-pointer text-[var(--text-secondary)] px-2 py-1.5 flex items-center justify-center rounded-[var(--radius-md)] transition-all duration-200 ease-out hover:bg-[var(--bg-hover)] hover:text-[var(--accent)]"
            title="New Chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleLogout(); }}
            title="Sign Out"
            className="bg-[var(--bg-active)] border border-[var(--border)] cursor-pointer text-[var(--danger)] px-2 py-1.5 flex items-center justify-center rounded-[var(--radius-md)] transition-all duration-200 ease-out hover:bg-pink-500/10 hover:border-[var(--danger)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 border-b border-[var(--border)] flex items-center bg-[var(--bg-sidebar)] gap-2.5">
        <div className="flex-1 flex items-center bg-[var(--bg-search)] rounded-full px-3.5 py-2 border border-[var(--border)] transition-all duration-200 ease-out focus-within:border-[var(--accent)] focus-within:bg-[var(--bg-active)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats"
            className="w-full bg-transparent border-none outline-none text-[var(--text-primary)] text-sm px-2.5 font-sans"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-1 p-2">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[var(--text-secondary)] text-sm gap-2">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            No conversations yet
          </div>
        ) : (
          filteredConversations.map((chat, index) => {
            const chatOnline = isOnline(chat);
            return (
              <div
                key={chat.id}
                onClick={() => selectChat(chat.id)}
                className={`flex items-center px-3 py-2.5 cursor-pointer rounded-[var(--radius-lg)] transition-all duration-200 ease-out animate-[slideInRight_0.3s_ease_forwards] border ${
                  activeChatId === chat.id
                    ? 'bg-gradient-to-br from-pink-500/10 to-orange-500/5 border-[var(--border)]'
                    : 'bg-transparent border-transparent hover:bg-[var(--bg-active)]'
                }`}
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                <div className="relative">
                  <Avatar
                    username={chat.name}
                    color={chat.color}
                    size="md"
                    isGroup={chat.isGroup}
                    online={chatOnline}
                  />
                  {chat.unread > 0 && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                  )}
                </div>

                <div className="ml-3 flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className={`text-[15px] text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis ${
                      activeChatId === chat.id ? 'font-semibold' : 'font-medium'
                    }`}>
                      {chat.name}
                    </span>
                    <span className={`text-xs ml-2 whitespace-nowrap shrink-0 ${
                      chat.unread > 0 ? 'text-[var(--accent)] font-semibold' : 'text-[var(--text-secondary)] font-normal'
                    }`}>
                      {chat.timestamp ? formatDate(chat.timestamp) : ''}
                    </span>
                  </div>

                  <div className="flex justify-between items-center gap-2">
                    <span className={`text-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex-1 ${
                      chat.unread > 0 ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)] font-normal'
                    }`}>
                      {chat.lastMessage || 'Start a conversation'}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Online badge */}
                      {!chat.isGroup && chatOnline && (
                        <span className="text-[10px] font-semibold text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded-full border border-[#10b981]/20">
                          online
                        </span>
                      )}
                      {chat.unread > 0 && (
                        <span className="bg-gradient-to-br from-pink-500 to-orange-500 text-white text-[10px] font-bold min-w-[22px] h-[22px] rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(236,72,153,0.3)]">
                          {chat.unread > 99 ? '99+' : chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <ProfilePanel
        profile={user ? { username: user.username, color: user.color, online: true } : null}
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        isOwnProfile={true}
      />
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <NewChatDialog
        isOpen={newChatOpen}
        onClose={() => setNewChatOpen(false)}
      />
    </aside>
  );
}
