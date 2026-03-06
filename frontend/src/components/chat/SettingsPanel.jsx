import React, { useState } from 'react';

export default function SettingsPanel({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('account');
  const [settings, setSettings] = useState({
    notifications: true,
    soundEnabled: true,
    darkMode: false,
    twoFactor: false,
    readReceipts: true,
    typingIndicator: true,
    onlineStatus: true,
    lastSeen: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingToggle = ({ label, description, settingKey }) => (
    <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
      <div className="flex-1">
        <div className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </div>
        {description && (
          <div className="text-xs text-[var(--text-secondary)] mt-1">
            {description}
          </div>
        )}
      </div>
      <button
        onClick={() => toggleSetting(settingKey)}
        className={`w-12 h-7 rounded-full border-none cursor-pointer relative transition-all duration-300 ml-4 shrink-0 ${settings[settingKey] ? 'bg-[#ec4899]' : 'bg-[var(--bg-active)]'
          }`}
      >
        <div
          className="w-6 h-6 rounded-full bg-white absolute top-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-300"
          style={{ left: settings[settingKey] ? '22px' : '2px' }}
        />
      </button>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/20 z-[98] animate-[fadeIn_0.3s_ease]"
      />

      {/* Settings Panel */}
      <div
        className="fixed right-0 top-0 h-screen w-[360px] bg-[var(--bg-sidebar)] border-l border-[var(--border)] flex flex-col z-[99] animate-[slideInRight_0.3s_ease] shadow-[-4px_0_12px_rgba(0,0,0,0.1)]"
      >
        {/* Header */}
        <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[#ec4899]">
          <h3 className="m-0 text-base font-semibold text-white">
            Settings
          </h3>
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-2xl text-[var(--text-secondary)] p-0 w-8 h-8 flex items-center justify-center hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-1 py-3 px-4 border-b border-[var(--border)] overflow-x-auto">
          {[
            { id: 'account', label: 'Account', icon: '👤' },
            { id: 'privacy', label: 'Privacy', icon: '🔒' },
            { id: 'notifications', label: 'Alerts', icon: '🔔' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`py-2 px-3 rounded-[var(--radius-md)] border-none cursor-pointer text-xs font-semibold flex items-center gap-1 whitespace-nowrap transition-all duration-200 ease-out ${activeCategory === cat.id
                  ? 'bg-[#ec4899] text-white hover:bg-[#db2777]'
                  : 'bg-[#f3e8f5] text-[#ec4899] hover:bg-gradient-to-br hover:from-pink-500/15 hover:to-orange-500/10'
                }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeCategory === 'account' && (
            <div>
              <h4 className="m-0 mb-4 text-[13px] font-semibold text-[var(--text-secondary)] uppercase">
                Account Settings
              </h4>

              <SettingToggle
                label="Two-Factor Authentication"
                description="Add an extra layer of security"
                settingKey="twoFactor"
              />

              <SettingToggle
                label="Read Receipts"
                description="Show when you've read messages"
                settingKey="readReceipts"
              />

              <SettingToggle
                label="Typing Indicator"
                description="Show when you're typing"
                settingKey="typingIndicator"
              />

              <div className="pt-4 border-t border-[var(--border)]">
                <button
                  className="w-full py-2.5 px-4 rounded-[var(--radius-md)] border-none bg-[#ec4899] text-white cursor-pointer text-sm font-semibold mb-2 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(236,72,153,0.3)]"
                >
                  Change Password
                </button>
                <button
                  className="w-full py-2.5 px-4 rounded-[var(--radius-md)] border-none bg-[#ef4444] text-white cursor-pointer text-sm font-medium transition-all duration-200 ease-out hover:scale-[1.02]"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {activeCategory === 'privacy' && (
            <div>
              <h4 className="m-0 mb-4 text-[13px] font-semibold text-[var(--text-secondary)] uppercase">
                Privacy & Visibility
              </h4>

              <SettingToggle
                label="Online Status"
                description="Let others know when you're online"
                settingKey="onlineStatus"
              />

              <SettingToggle
                label="Last Seen"
                description="Show when you were last active"
                settingKey="lastSeen"
              />

              <div className="mt-4 p-3 bg-[#f3e8f5] rounded-[var(--radius-md)] border border-[#e879c4]">
                <div className="text-[13px] text-[#ec4899]">
                  <div className="font-semibold mb-1">🚫 Blocked Users</div>
                  <div>Manage blocked contacts</div>
                </div>
                <button className="mt-2 py-2 px-3 rounded-[var(--radius-md)] border border-[var(--accent)] bg-transparent text-[var(--accent)] cursor-pointer text-xs font-medium hover:bg-pink-500/10 transition-colors">
                  View Blocked
                </button>
              </div>
            </div>
          )}

          {activeCategory === 'notifications' && (
            <div>
              <h4 className="m-0 mb-4 text-[13px] font-semibold text-[var(--text-secondary)] uppercase">
                Notification Preferences
              </h4>

              <SettingToggle
                label="All Notifications"
                description="Receive all notifications"
                settingKey="notifications"
              />

              <SettingToggle
                label="Sound"
                description="Play sound for new messages"
                settingKey="soundEnabled"
              />

              <div className="mt-4">
                <div className="text-sm font-medium text-[var(--text-primary)] mb-2">
                  Notification Types
                </div>
                {['Messages', 'Group Mentions', 'Calls'].map(type => (
                  <div
                    key={type}
                    className="py-2 px-3 rounded-[var(--radius-md)] bg-[var(--bg-active)] mb-1.5 text-[13px] text-[var(--text-primary)] flex justify-between items-center"
                  >
                    {type}
                    <input
                      type="checkbox"
                      defaultChecked
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border)] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-active)] text-[var(--text-primary)] cursor-pointer text-sm font-medium transition-all duration-200 ease-out hover:bg-[var(--bg-hover)]"
          >
            Done
          </button>
          <button
            className="flex-1 px-4 py-2.5 rounded-[var(--radius-md)] border-none bg-[#ec4899] text-white cursor-pointer text-sm font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(236,72,153,0.3)]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
