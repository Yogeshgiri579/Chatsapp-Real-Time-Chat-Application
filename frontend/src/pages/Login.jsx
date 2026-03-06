import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      setError('Please enter your name.');
      return;
    }
    setError('');
    await login(trimmed);
    navigate('/chat');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-app)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Luxury Minimalist Background Glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 300,
          background: 'var(--accent)',
          filter: 'blur(140px)',
          opacity: 0.15,
          borderRadius: '50%'
        }}></div>
      </div>

      {/* Premium Login Card */}
      <div
        className="animate-fade-in-up"
        style={{
          background: 'rgba(9, 9, 11, 0.7)', // Zinc 950 with transparency for glass effect
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          padding: '48px',
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(180deg, var(--accent) 0%, var(--accent-hover) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Minimalist Message Icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            Welcome to ChatsApp
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '14px' }}>
            Connect instantly with your workspace.
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Input
            id="username-input"
            label="Display Name"
            placeholder="John Doe"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            maxLength={30}
            autoFocus
            autoComplete="username"
          />

          {error && (
            <div style={{ color: 'var(--danger)', fontSize: '13px', marginTop: '-8px' }}>
              {error}
            </div>
          )}

          <Button
            id="login-btn"
            type="submit"
            variant="primary"
            loading={loading}
            style={{ 
              width: '100%', 
              padding: '14px', 
              fontSize: '15px', 
              boxShadow: '0 4px 12px -2px rgba(99, 102, 241, 0.25)' 
            }}
          >
            {loading ? 'Entering Workspace...' : 'Continue'}
          </Button>
        </form>
      </div>
    </div>
  );
}
