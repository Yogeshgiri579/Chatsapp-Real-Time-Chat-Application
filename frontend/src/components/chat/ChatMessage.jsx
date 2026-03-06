import React from 'react';
import Avatar from '../common/Avatar.jsx';
import { formatTime } from '../../utils/formatTime.js';

export default function ChatMessage({ message, isOwn, isGroup }) {
  const { senderName, senderColor, text, timestamp } = message;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isOwn ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        alignSelf: isOwn ? 'flex-end' : 'flex-start',
        marginBottom: '6px',
        maxWidth: '85%',
        padding: '0 40px', // Extra padding from edges like WhatsApp
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isOwn ? 'flex-end' : 'flex-start', position: 'relative' }}>
        {/* Bubble */}
        <div
          style={{
            padding: '6px 8px 6px 10px',
            borderRadius: '7.5px',
            borderTopLeftRadius: !isOwn ? '0' : '7.5px',
            borderTopRightRadius: isOwn ? '0' : '7.5px',
            background: isOwn ? 'var(--bg-bubble-out)' : 'var(--bg-bubble-in)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            lineHeight: 1.4,
            boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)', // Subtle realistic shadow
            wordBreak: 'break-word',
            display: 'flex',
            flexDirection: 'column',
            minWidth: '80px',
          }}
        >
          {/* Sender name only for group chats and not own */}
          {!isOwn && isGroup && senderName && (
            <span style={{ 
              fontSize: '12.5px', 
              fontWeight: 500, 
              color: senderColor || 'var(--accent)', 
              marginBottom: '2px', 
              letterSpacing: '0.01em' 
            }}>
              {senderName}
            </span>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '8px' }}>
            <span style={{ paddingBottom: '2px' }}>{text}</span>
            <span
              style={{
                fontSize: '10.5px',
                color: isOwn ? 'rgba(255,255,255,0.65)' : 'var(--text-secondary)',
                alignSelf: 'flex-end',
                marginLeft: 'auto',
                marginTop: '1px',
                lineHeight: 1,
              }}
            >
              {formatTime(timestamp)}
              {isOwn && (
                <svg style={{ marginLeft: '4px', display: 'inline' }} width="16" height="11" viewBox="0 0 16 11" fill="none">
                  <path d="M4.6 11L0 6.4L1.4 5L4.6 8.2L14.6 0L16 1.4L4.6 11Z" fill="#53bdeb" />
                </svg>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
