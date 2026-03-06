import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useChat } from '../../context/ChatContext.jsx';
import { fetchAllUsers } from '../../services/api.js';
import Avatar from '../common/Avatar.jsx';

export default function NewChatDialog({ isOpen, onClose }) {
  const { user } = useAuth();
  const { conversations, selectChat, onlineUserIds } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load users when dialog opens
  useEffect(() => {
    if (!isOpen || !user) return;
    setLoading(true);
    fetchAllUsers(user.id)
      .then(users => setAllUsers(users))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isOpen, user]);

  // Users who DON'T yet have a direct conversation in the sidebar
  // OR all users in case you still want to show everyone
  const existingPartnerIds = new Set(
    conversations
      .filter(c => !c.isGroup && c.partnerId)
      .map(c => c.partnerId)
  );

  const filteredUsers = allUsers.filter(u =>
    (u.username || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Users not yet in sidebar = "new" ones
  const newUsers = filteredUsers.filter(u => !existingPartnerIds.has(u.id));
  const existingUsers = filteredUsers.filter(u => existingPartnerIds.has(u.id));

  const handleUserClick = (clickedUser) => {
    // Check if a conversation already exists with this user
    const existing = conversations.find(c => !c.isGroup && c.partnerId === clickedUser.id);
    if (existing) {
      selectChat(existing.id);
      onClose();
      return;
    }
    // If no existing convo yet (should be created by backend on login), just close
    // The backend auto-creates DMs so refresh should show it
    onClose();
  };

  if (!isOpen) return null;

  const UserRow = ({ u }) => {
    const online = onlineUserIds.includes(u.id);
    const alreadyInSidebar = existingPartnerIds.has(u.id);
    return (
      <div
        onClick={() => handleUserClick(u)}
        className="flex items-center px-3 py-2.5 cursor-pointer rounded-[var(--radius-lg)] transition-all duration-200 ease-out hover:bg-[var(--bg-active)] border border-transparent hover:border-[var(--border)]"
      >
        <div className="relative">
          <Avatar username={u.username} color={u.color} size="md" online={online} />
        </div>

        <div className="ml-3 flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-medium text-[var(--text-primary)] overflow-hidden text-ellipsis whitespace-nowrap">
              {u.username}
            </span>
            {alreadyInSidebar && (
              <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-active)] px-1.5 py-0.5 rounded-full border border-[var(--border)] shrink-0">
                existing
              </span>
            )}
          </div>
          <div className={`text-xs mt-0.5 flex items-center gap-1 ${online ? 'text-[#10b981]' : 'text-[var(--text-muted)]'}`}>
            <span className={`w-1.5 h-1.5 rounded-full inline-block ${online ? 'bg-[#10b981]' : 'bg-gray-300'}`} />
            {online ? 'Online' : 'Offline'}
          </div>
        </div>

        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    );
  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/30 z-[98] animate-[fadeIn_0.3s_ease]" />

      <div className="fixed right-0 top-0 h-screen w-[360px] bg-[var(--bg-sidebar)] border-l border-[var(--border)] flex flex-col z-[99] animate-[slideInRight_0.3s_ease] shadow-[-8px_0_24px_rgba(0,0,0,0.12)]">
        {/* Header */}
        <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-gradient-to-br from-pink-500/10 to-orange-500/5">
          <div>
            <h3 className="m-0 text-base font-semibold text-[var(--text-primary)]">Start New Chat</h3>
            <p className="m-0 text-xs text-[var(--text-secondary)] mt-0.5">{allUsers.length} users registered</p>
          </div>
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-active)] hover:text-[var(--danger)] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <div className="flex items-center bg-[var(--bg-search)] rounded-full px-3.5 py-2 border border-[var(--border)] transition-all duration-200 ease-out focus-within:border-[var(--accent)] focus-within:bg-[var(--bg-active)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              autoFocus
              className="w-full bg-transparent border-none outline-none text-[var(--text-primary)] text-sm px-2.5 font-sans"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-0.5">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3 text-[var(--text-secondary)]">
                <svg width="28" height="28" viewBox="0 0 24 24" style={{ animation: 'spin 0.8s linear infinite' }}>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  <circle cx="12" cy="12" r="10" fill="none" stroke="#ec4899" strokeWidth="3" strokeDasharray="31 10" />
                </svg>
                <span className="text-sm">Loading users…</span>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-[var(--text-secondary)]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-sm">No users found</span>
            </div>
          ) : (
            <>
              {/* New users (not yet in sidebar) */}
              {newUsers.length > 0 && (
                <>
                  <div className="px-2 py-1.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    New
                  </div>
                  {newUsers.map(u => <UserRow key={u.id} u={u} />)}
                </>
              )}

              {/* Already existing conversations */}
              {existingUsers.length > 0 && (
                <>
                  <div className="px-2 py-1.5 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mt-2">
                    Existing Chats
                  </div>
                  {existingUsers.map(u => <UserRow key={u.id} u={u} />)}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
