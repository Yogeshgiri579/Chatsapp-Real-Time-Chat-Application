import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) { setError('Please enter your name to continue.'); return; }
    if (trimmed.length < 2) { setError('Name must be at least 2 characters.'); return; }
    setError('');
    try {
      await login(trimmed);
      navigate('/chat');
    } catch {
      setError('Could not connect to server. Make sure the backend is running.');
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-[var(--bg-app)] overflow-hidden">

      {/* ── Left decorative panel ─────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a0a10] to-[#0f0f14]">
        {/* Background glows */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#ec4899] opacity-[0.12] blur-[120px] -top-20 -left-20" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#f97316] opacity-[0.08] blur-[100px] bottom-0 right-0" />

        {/* Content */}
        <div className="relative z-10 px-16 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ec4899] to-[#f97316] flex items-center justify-center shadow-[0_4px_16px_rgba(236,72,153,0.4)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">ChatsApp</span>
          </div>

          <h1 className="text-[3.2rem] font-bold leading-[1.15] tracking-[-0.03em] mb-6">
            Connect.<br />
            <span className="bg-gradient-to-r from-[#ec4899] to-[#f97316] bg-clip-text text-transparent">
              Collaborate.
            </span><br />
            Communicate.
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-[400px]">
            Real-time messaging for your team. Instant delivery, always in sync, no setup required.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mt-10">
            {['⚡ Real-time', '🔒 Secure', '👥 Group Chats', '🟢 Online Status'].map(f => (
              <span key={f} className="px-3.5 py-1.5 rounded-full text-[13px] text-white/70 border border-white/10 bg-white/5 backdrop-blur-sm">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Floating chat bubbles decoration */}
        <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-40 pointer-events-none">
          {['Hey! How are you?', 'Working on the new feature 🚀', 'LGTM! Ship it!', 'Thanks for the PR review', 'On a call, back in 5'].map((text, i) => (
            <div
              key={i}
              className={`px-4 py-2.5 rounded-2xl text-sm text-white/80 max-w-[200px] ${
                i % 2 === 0
                  ? 'bg-[#ec4899]/30 rounded-tl-sm self-start'
                  : 'bg-white/10 rounded-tr-sm self-end'
              }`}
              style={{ transform: `translateX(${i % 2 === 0 ? '-20px' : '20px'})` }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right login form ──────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">

          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ec4899] to-[#f97316] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-[var(--text-primary)]">ChatsApp</span>
          </div>

          <h2 className="text-[2rem] font-bold text-[var(--text-primary)] tracking-[-0.02em] mb-1">
            Welcome back
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mb-8">
            Enter your display name to join the workspace instantly.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-[13px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Display Name
              </label>
              <div className={`flex items-center gap-3 rounded-[var(--radius-md)] border-2 px-4 py-3 bg-[var(--bg-search)] transition-all duration-200 ${
                error ? 'border-[var(--danger)]' : username ? 'border-[var(--accent)] bg-[var(--bg-active)]' : 'border-[var(--border)] focus-within:border-[var(--accent)] focus-within:bg-[var(--bg-active)]'
              }`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="e.g. John Doe"
                  maxLength={30}
                  autoFocus
                  autoComplete="username"
                  className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] text-[15px] font-sans placeholder:text-[var(--text-muted)]"
                />
                {username.trim().length >= 2 && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#10b981" strokeWidth="2" fill="none"/>
                  </svg>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-1.5 text-[var(--danger)] text-[13px] mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              id="login-btn"
              disabled={loading || !username.trim()}
              className={`w-full py-3.5 rounded-[var(--radius-md)] font-semibold text-[15px] text-white border-none transition-all duration-200 flex items-center justify-center gap-2 ${
                !username.trim()
                  ? 'bg-[var(--bg-active)] text-[var(--text-muted)] cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#ec4899] to-[#f97316] cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(236,72,153,0.35)] active:translate-y-0'
              }`}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="3" strokeDasharray="31 10" />
                  </svg>
                  Joining workspace…
                </>
              ) : (
                <>
                  Continue
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[13px] text-[var(--text-muted)] mt-8 leading-relaxed">
            No account needed · Just enter a name and you're in.<br />
            Returning user? Use the same name to restore your chats.
          </p>
        </div>
      </div>
    </div>
  );
}
