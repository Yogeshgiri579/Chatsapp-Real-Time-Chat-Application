import React from 'react';

export default function Avatar({ username = '?', color = '#00a884', size = 'md', online = false, isGroup = false }) {
  const initials = isGroup 
    ? username.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : username.slice(0, 2).toUpperCase();

  const sizes = {
    sm: { width: 34, height: 34, fontSize: 13 },
    md: { width: 44, height: 44, fontSize: 16 },
    lg: { width: 48, height: 48, fontSize: 18 },
  };

  const { width, height, fontSize } = sizes[size] || sizes.md;

  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      {/* Flat, solid colored background for a professional look instead of neon gradients */}
      <div
        style={{
          width,
          height,
          borderRadius: '50%',
          backgroundColor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize,
          fontWeight: 600,
          color: '#fff',
          userSelect: 'none',
          letterSpacing: isGroup ? '0.05em' : 'normal',
        }}
        title={username}
      >
        {initials}
      </div>
    </div>
  );
}
