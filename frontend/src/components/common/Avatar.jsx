import React from 'react';

export default function Avatar({ username = '?', color = '#6366f1', size = 'md', online = false, isGroup = false }) {
  const initials = isGroup 
    ? username.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : username.slice(0, 2).toUpperCase();

  const sizes = {
    sm: { width: 34, height: 34, fontSize: 12, statusSize: 8 },
    md: { width: 44, height: 44, fontSize: 15, statusSize: 10 },
    lg: { width: 48, height: 48, fontSize: 17, statusSize: 12 },
  };

  const { width, height, fontSize, statusSize } = sizes[size] || sizes.md;

  // Gradient map for different colors
  const gradientMap = {
    '#6366f1': 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
    '#f59e0b': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    '#10b981': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    '#ef4444': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    '#3b82f6': 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
    '#ec4899': 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
    '#14b8a6': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
  };

  const gradient = gradientMap[color] || `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`;

  return (
    <div className="relative inline-flex shrink-0">
      {/* Modern gradient background */}
      <div
        className="rounded-full flex items-center justify-center font-bold text-white select-none shadow-[0_2px_8px_rgba(99,102,241,0.25)] transition-all duration-200 ease-out cursor-default hover:scale-105 hover:shadow-[0_4px_12px_rgba(99,102,241,0.35)]"
        style={{
          width,
          height,
          background: gradient,
          fontSize,
          letterSpacing: isGroup ? '0.05em' : 'normal',
        }}
        title={username}
      >
        {initials}
      </div>
      
      {/* Online status indicator */}
      {online && (
        <div
          className="absolute bottom-0 right-0 rounded-full bg-[#10b981] border-2 border-[var(--bg-sidebar)] shadow-[0_0_8px_rgba(16,185,129,0.6)]"
          style={{ width: statusSize, height: statusSize }}
        />
      )}
    </div>
  );
}
