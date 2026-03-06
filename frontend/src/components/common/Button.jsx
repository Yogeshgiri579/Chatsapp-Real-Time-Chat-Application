import React from 'react';

export default function Button({
  variant = 'primary',
  onClick,
  disabled = false,
  loading = false,
  children,
  style = {},
  type = 'button',
  id,
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: 'var(--radius-full)',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'all var(--transition)',
    opacity: disabled || loading ? 0.55 : 1,
    userSelect: 'none',
    ...style,
  };

  const variants = {
    primary: {
      background: 'var(--accent)',
      color: '#fff',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
    },
    danger: {
      background: 'var(--danger)',
      color: '#fff',
    },
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...base, ...variants[variant] }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          if (variant === 'primary') {
             e.currentTarget.style.background = 'var(--accent-hover)';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
           e.currentTarget.style.background = variants[variant].background;
           e.currentTarget.style.color = variants[variant].color;
        }
      }}
    >
      {loading ? (
        <svg width="18" height="18" viewBox="0 0 24 24" style={{ animation: 'spin 0.8s linear infinite' }}>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="31 10" />
        </svg>
      ) : null}
      {children}
    </button>
  );
}
