import React, { useState } from 'react';
import Avatar from '../common/Avatar.jsx';

export default function ProfilePanel({ profile, isOpen, onClose, isOwnProfile = false, onAction }) {
  const [activePopup, setActivePopup] = useState(null);

  if (!isOpen || !profile) return null;

  const isGroupChat = profile.isGroup === true;

  const actions = isOwnProfile
    ? [
        { id: 'edit', label: 'Edit Profile', icon: '✏️' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
        { id: 'privacy', label: 'Privacy', icon: '🔒' },
      ]
    : isGroupChat
    ? [
        { id: 'view-members', label: 'View Members', icon: '👥' },
        { id: 'leave-group', label: 'Leave Group', icon: '🚪' },
        { id: 'mute-group', label: 'Mute Notifications', icon: '🔕' },
        { id: 'clear-chat', label: 'Clear Chat', icon: '🗑️' },
        { id: 'delete-chat', label: 'Delete Chat', icon: '❌' },
      ]
    : [
        { id: 'view-media', label: 'View Media', icon: '🖼️' },
        { id: 'report', label: 'Report User', icon: '⚠️' },
        { id: 'block', label: 'Block User', icon: '🚫' },
        { id: 'clear-chat', label: 'Clear Chat', icon: '🗑️' },
        { id: 'delete-chat', label: 'Delete Chat', icon: '❌' },
      ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/20 z-[98] animate-[fadeIn_0.3s_ease]"
      />

      {/* Profile Panel */}
      <div
        className="fixed right-0 top-0 h-screen w-[360px] bg-[var(--bg-sidebar)] border-l border-[var(--border)] flex flex-col z-[99] animate-[slideInRight_0.3s_ease] shadow-[-4px_0_12px_rgba(0,0,0,0.1)]"
      >
        {/* Header */}
        <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[#ec4899]">
          <h3 className="m-0 text-base font-semibold text-white">
            {isOwnProfile ? 'My Profile' : isGroupChat ? 'Group Profile' : 'Profile'}
          </h3>
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-2xl text-white/80 p-0 w-8 h-8 flex items-center justify-center hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-4 py-6 text-center border-b border-[var(--border)] bg-[#f3e8f5]">
          <Avatar
            username={profile.username}
            color={profile.color}
            size="lg"
            online={profile.online}
          />
          <h2 className="mt-4 mb-1 text-lg font-bold text-[var(--text-primary)]">
            {profile.username}
          </h2>
          <p className="mt-1 mb-0 text-[13px] text-[var(--text-secondary)]">
            {isGroupChat ? `${profile.members || 0} members` : profile.email || 'user@example.com'}
          </p>
          {!isGroupChat && profile.status && (
            <p className="mt-2 mb-0 text-xs text-[var(--text-muted)] italic">
              "{profile.status}"
            </p>
          )}
          {!isOwnProfile && !isGroupChat && (
            <p className={`mt-2 mb-0 text-xs ${profile.online ? 'text-[var(--success)]' : 'text-[var(--text-muted)]'}`}>
              {profile.online ? '🟢 Online' : '⚫ Offline'}
            </p>
          )}
        </div>

        {/* Media Section */}
        <div className="p-4 border-b border-[var(--border)]">
          <h4 className="m-0 mb-3 text-[13px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
            Media
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {profile.media && profile.media.length > 0 ? (
              profile.media.slice(0, 9).map((item, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-[var(--radius-md)] bg-gradient-to-br from-pink-500 to-orange-500 cursor-pointer transition-transform duration-200 ease-out hover:scale-105"
                />
              ))
            ) : (
              <p className="col-span-full m-0 p-5 text-[13px] text-[var(--text-secondary)] text-center">
                No media shared
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex-1 p-4 overflow-y-auto grid grid-cols-2 gap-2 content-start">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => {
                onAction?.(action.id);
                setActivePopup(action.id);
              }}
              className="px-4 py-3 rounded-[var(--radius-md)] border-none bg-[#ec4899] text-white cursor-pointer text-[13px] font-semibold transition-all duration-200 ease-out flex items-center justify-center gap-1.5 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(236,72,153,0.3)]"
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Confirmation Popup */}
      {activePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] animate-[fadeIn_0.2s_ease]">
          <div
            onClick={() => setActivePopup(null)}
            className="absolute inset-0 bg-black/30"
          />
          <div className="relative bg-[var(--bg-sidebar)] rounded-[var(--radius-lg)] p-6 w-full max-w-[320px] shadow-[0_10px_40px_rgba(0,0,0,0.2)] z-10 animate-[slideUp_0.3s_ease]">
            <h3 className="m-0 mb-3 text-base font-semibold text-[var(--text-primary)]">
              {activePopup === 'report' && 'Report User?'}
              {activePopup === 'block' && 'Block User?'}
              {activePopup === 'delete-chat' && 'Delete Chat?'}
              {activePopup === 'clear-chat' && 'Clear Chat?'}
              {activePopup === 'view-media' && 'View Media'}
              {activePopup === 'view-members' && 'Group Members'}
              {activePopup === 'leave-group' && 'Leave Group?'}
              {activePopup === 'mute-group' && 'Mute Notifications?'}
              {activePopup === 'edit' && 'Edit Profile'}
              {activePopup === 'settings' && 'Settings'}
              {activePopup === 'privacy' && 'Privacy Settings'}
            </h3>
            <p className="m-0 mb-5 text-sm text-[var(--text-secondary)] leading-normal">
              {activePopup === 'report' && 'This user will be reported for abuse.'}
              {activePopup === 'block' && 'You will no longer receive messages from this user.'}
              {activePopup === 'delete-chat' && 'This chat will be permanently deleted.'}
              {activePopup === 'clear-chat' && 'All messages will be cleared.'}
              {activePopup === 'view-media' && 'Coming soon - View all shared media.'}
              {activePopup === 'view-members' && 'Coming soon - View all group members.'}
              {activePopup === 'leave-group' && 'You will leave this group and no longer receive messages.'}
              {activePopup === 'mute-group' && 'You won\'t receive notifications for this group.'}
              {activePopup === 'edit' && 'Update your profile information.'}
              {activePopup === 'settings' && 'Manage your account settings.'}
              {activePopup === 'privacy' && 'Control your privacy settings.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setActivePopup(null)}
                className="flex-1 px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-active)] text-[var(--text-primary)] cursor-pointer text-[13px] font-medium transition-colors hover:bg-[var(--bg-hover)]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActivePopup(null);
                  console.log(`Action: ${activePopup}`);
                }}
                className={`flex-1 px-4 py-2.5 rounded-[var(--radius-md)] border-none text-white cursor-pointer text-[13px] font-medium transition-transform hover:scale-105 ${
                  ['edit', 'settings', 'privacy', 'view-media', 'view-members'].includes(activePopup)
                    ? 'bg-[#ec4899]'
                    : 'bg-[#ef4444]'
                }`}
              >
                {['edit', 'settings', 'privacy', 'view-media', 'view-members'].includes(activePopup) ? 'Continue' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
