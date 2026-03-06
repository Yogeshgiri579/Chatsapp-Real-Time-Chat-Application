import React from 'react';
import Avatar from '../common/Avatar.jsx';
import { formatTime } from '../../utils/formatTime.js';

export default function ChatMessage({ message, isOwn, isGroup, onSenderClick }) {
  const { senderName, senderColor, text, timestamp } = message;

  return (
    <div
      className={`flex items-end mb-2 max-w-[85%] px-6 animate-[slideUp_0.3s_ease_forwards] ${
        isOwn ? 'flex-row-reverse self-end' : 'flex-row self-start'
      } ${isGroup ? 'gap-2' : 'gap-0'}`}
    >
      {/* Avatar for group chats */}
      {!isOwn && isGroup && (
        <div
          className="flex mb-1 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onSenderClick?.({ username: senderName, color: senderColor })}
        >
          <Avatar username={senderName} color={senderColor} size="sm" />
        </div>
      )}

      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        {/* Sender name for group chats */}
        {!isOwn && isGroup && senderName && (
          <span
            onClick={() => onSenderClick?.({ username: senderName, color: senderColor })}
            className="text-xs font-semibold mb-0.5 ml-2 tracking-wide cursor-pointer transition-opacity hover:opacity-70"
            style={{ color: senderColor || 'var(--accent-light)' }}
          >
            {senderName}
          </span>
        )}

        {/* Message Bubble */}
        <div
          className={`px-[14px] py-[10px] rounded-2xl flex flex-col break-words min-w-[60px] max-w-[400px] transition-all duration-200 ease-out ${
            isOwn
              ? 'rounded-tr-[4px] bg-[#ec4899] text-white shadow-[0_4px_12px_rgba(236,72,153,0.25)] hover:shadow-[0_6px_16px_rgba(236,72,153,0.35)] hover:-translate-y-[2px]'
              : 'rounded-tl-[4px] bg-[var(--bg-bubble-in)] text-[var(--text-primary)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
          } text-[15px] leading-[1.45]`}
        >
          <span className="pb-0.5">{text}</span>

          <div className={`flex justify-end items-center gap-1 mt-1 text-[11px] ${isOwn ? 'text-white/75' : 'text-[var(--text-secondary)]'}`}>
            <span>{formatTime(timestamp)}</span>
            {isOwn && (
              <svg className="mt-0.5" width="16" height="11" viewBox="0 0 16 11" fill="none">
                <path d="M4.6 11L0 6.4L1.4 5L4.6 8.2L14.6 0L16 1.4L4.6 11Z" fill="currentColor" opacity="0.8" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
