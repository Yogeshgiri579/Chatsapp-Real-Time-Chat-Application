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
  className = '',
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-[13px] font-medium text-[var(--text-secondary)] tracking-[0.01em]"
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
        className={`w-full px-3.5 py-3 rounded-[var(--radius-sm)] border bg-transparent text-[var(--text-primary)] text-base font-sans outline-none transition-all duration-200 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'
        } ${
          focused ? 'border-[var(--accent)] shadow-[0_0_0_1px_var(--accent)]' : 'border-[var(--border)] shadow-none'
        }`}
      />
    </div>
  );
}
