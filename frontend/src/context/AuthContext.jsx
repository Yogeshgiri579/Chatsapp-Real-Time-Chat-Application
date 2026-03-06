import { createContext, useState, useCallback, useContext } from 'react';
import { login as apiLogin } from '../services/api.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Restore session on reload
    try {
      const saved = sessionStorage.getItem('chatsapp_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (username) => {
    setLoading(true);
    try {
      const userData = await apiLogin(username);
      setUser(userData);
      sessionStorage.setItem('chatsapp_user', JSON.stringify(userData));
      return userData;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('chatsapp_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// convenience hook
export function useAuth() {
  return useContext(AuthContext);
}
