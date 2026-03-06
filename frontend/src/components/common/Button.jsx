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
  className = '',
}) {
  const baseClasses = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[15px] font-semibold font-sans border-none outline-none transition-all duration-200 select-none ${
    disabled || loading ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer'
  }`;

  const variantClasses = {
    primary: 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5',
    danger: 'bg-[var(--danger)] text-white hover:bg-red-600',
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${style.className || ''}`}
      style={style.className ? { ...style, className: undefined } : style}
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
