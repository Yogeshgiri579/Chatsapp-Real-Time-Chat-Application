import React, { useState } from 'react';

export default function Input({
  label,
  placeholder = '',
  value,
  onChange,
  onKeyDown,
  type = 'text',
  disabled = false,
  id,
  maxLength,
  autoFocus = false,
  autoComplete = 'off',
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            letterSpacing: '0.01em',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        style={{
          width: '100%',
          padding: '12px 14px',
          borderRadius: 'var(--radius-sm)',
          border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
          background: 'transparent',
          color: 'var(--text-primary)',
          fontSize: '16px',
          fontFamily: 'inherit',
          outline: 'none',
          transition: 'all var(--transition)',
          boxShadow: focused ? '0 0 0 1px var(--accent)' : 'none',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      />
    </div>
  );
}
