import React, { useState } from 'react';
import ChatMessage from './ChatMessage.jsx';
import ChatInput from './ChatInput.jsx';
import Avatar from '../common/Avatar.jsx';
import ProfilePanel from './ProfilePanel.jsx';
import { useChat } from '../../context/ChatContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import useScrollToBottom from '../../hooks/useScrollToBottom.js';

export default function ChatWindow() {
  const { conversations, activeChatId, messages, onlineUserIds } = useChat();
  const { user } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const bottomRef = useScrollToBottom([messages, activeChatId]);

  const activeChat = conversations.find(c => c.id === activeChatId);

  const isPartnerOnline = activeChat && !activeChat.isGroup && activeChat.partnerId
    ? onlineUserIds.includes(activeChat.partnerId)
    : false;

  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center relative bg-[var(--bg-chat)]">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.04)_0%,transparent_70%)]" />
        <div className="text-center relative z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/10 mx-auto mb-6 flex items-center justify-center text-4xl shadow-[0_8px_24px_rgba(236,72,153,0.1)] border border-pink-500/10">
            💬
          </div>
          <p className="text-[var(--text-primary)] text-base font-medium">Select a chat to start messaging</p>
          <p className="text-[var(--text-secondary)] text-sm mt-2">Choose from your conversations in the sidebar</p>
        </div>
      </div>
    );
  }

  const onlineStatus = activeChat.isGroup
    ? `${activeChat.participants?.length || 0} members · ${activeChat.participants?.filter(p => onlineUserIds.includes(p.id)).length || 0} online`
    : isPartnerOnline
      ? 'Online'
      : 'Offline';

  return (
    <div className="flex-1 flex flex-col relative bg-[var(--bg-chat)]">
      <div className="chat-bg"></div>

      {/* Header */}
      <div className="px-5 py-3 bg-[var(--bg-header)] flex items-center justify-between border-l border-[var(--border)] z-10 shadow-sm gap-4">
        <div
          onClick={() => {
            setSelectedProfile({
              username: activeChat.name,
              color: activeChat.color,
              online: isPartnerOnline,
              isGroup: activeChat.isGroup,
              members: activeChat.participants?.length || 0,
              participants: activeChat.participants,
              partnerId: activeChat.partnerId,
            });
            setProfileOpen(true);
          }}
          className="flex items-center gap-3 px-2 py-1.5 cursor-pointer rounded-lg transition-all hover:bg-pink-500/5"
        >
          <Avatar
            username={activeChat.name}
            color={activeChat.color}
            size="md"
            isGroup={activeChat.isGroup}
            online={isPartnerOnline}
          />
          <div>
            <div className="text-[15px] font-semibold text-[var(--text-primary)] tracking-wide">
              {activeChat.name}
            </div>
            <div className={`text-xs mt-0.5 font-normal flex items-center gap-1.5 ${
              !activeChat.isGroup && isPartnerOnline ? 'text-[#10b981]' : 'text-[var(--text-secondary)]'
            }`}>
              {!activeChat.isGroup && (
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${isPartnerOnline ? 'bg-[#10b981] shadow-[0_0_4px_rgba(16,185,129,0.8)]' : 'bg-[var(--text-muted)]'}`} />
              )}
              {onlineStatus}
            </div>
          </div>
        </div>

        {/* Search Box */}
        {searchOpen && (
          <div className="flex items-center bg-[var(--bg-active)] rounded-full pt-1 pb-1 px-2.5 border-2 border-[var(--accent)] flex-1 min-w-fit animate-slide-up">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] text-sm px-2.5 font-sans"
            />
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              className="bg-none border-none cursor-pointer text-[var(--text-secondary)] text-base p-0 hover:text-[var(--danger)] transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* Header Actions */}
        <div className="flex gap-2 text-[var(--text-secondary)] items-center">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={`bg-transparent border-none cursor-pointer p-2 flex items-center justify-center rounded-lg transition-all ${
              searchOpen ? 'text-[var(--accent)] bg-pink-500/10' : 'text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--bg-active)]'
            }`}
            title="Search in chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`bg-transparent border-none cursor-pointer p-2 flex items-center justify-center rounded-lg transition-all ${
                menuOpen ? 'text-[var(--accent)] bg-pink-500/10' : 'text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--bg-active)]'
              }`}
              title="More options"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="12" cy="19" r="2"></circle>
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[var(--bg-sidebar)] border border-[var(--border)] rounded-[var(--radius-md)] shadow-lg z-50 min-w-max animate-slide-up overflow-hidden">
                {[
                  { icon: '🔔', label: 'Mute Notifications' },
                  { icon: '🖼️', label: 'View Media' },
                  { icon: '❌', label: 'Delete Chat' },
                  { icon: '🚫', label: 'Block User' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMenuOpen(false)}
                    className="w-full px-4 py-2.5 border-none bg-transparent cursor-pointer flex items-center gap-2.5 text-[var(--text-primary)] text-sm transition-all hover:bg-pink-500/10"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-5 flex flex-col z-10">
        <div className="text-center mb-6">
          <span className="bg-white/60 backdrop-blur-sm border border-[var(--border)] text-[var(--text-secondary)] text-xs px-3 py-1.5 rounded-full font-medium tracking-widest uppercase shadow-sm">
            TODAY
          </span>
        </div>

        {messages.map((msg, index) => {
          if (searchQuery && !msg.text.toLowerCase().includes(searchQuery.toLowerCase())) return null;
          const prevMsg = messages[index - 1];
          const isConsecutive = prevMsg && prevMsg.senderId === msg.senderId;
          return (
            <div key={msg.id} className={`animate-slide-up ${isConsecutive ? 'mt-0.5' : 'mt-3'}`}>
              <ChatMessage
                message={msg}
                isOwn={msg.isOwn}
                isGroup={activeChat.isGroup}
                onSenderClick={(profile) => {
                  setSelectedProfile(profile);
                  setProfileOpen(true);
                }}
              />
            </div>
          );
        })}
        <div ref={bottomRef} className="h-px" />
      </div>

      <ChatInput />

      <ProfilePanel
        profile={selectedProfile}
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </div>
  );
}
