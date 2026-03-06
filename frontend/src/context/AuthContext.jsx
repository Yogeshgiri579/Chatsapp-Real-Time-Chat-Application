import { createContext, useState, useCallback, useContext, useEffect } from 'react';
import { login as apiLogin } from '../services/api.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('chatsapp_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const isMongoId = (id) => /^[a-f\d]{24}$/i.test(id);

  useEffect(() => {
    const saved = sessionStorage.getItem('chatsapp_user');
    if (!saved) return;
    try {
      const storedUser = JSON.parse(saved);
      if (!isMongoId(storedUser.id)) {
        sessionStorage.removeItem('chatsapp_user');
        setUser(null);
        return;
      }
      apiLogin(storedUser.username).then((freshUser) => {
        setUser(freshUser);
        sessionStorage.setItem('chatsapp_user', JSON.stringify(freshUser));
      }).catch(() => {});
    } catch {
      sessionStorage.removeItem('chatsapp_user');
      setUser(null);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

export function useAuth() {
  return useContext(AuthContext);
}
