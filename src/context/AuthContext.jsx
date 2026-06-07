import { createContext, useContext, useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "juriki_auth";

const AuthContext = createContext(null);

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.isAuthenticated) return parsed;
    }
  } catch {}
  return null;
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(loadFromStorage);

  useEffect(() => {
    if (auth) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [auth]);

  const login = useCallback((userData) => {
    setAuth({
      isAuthenticated: true,
      tipoUsuario: userData.tipoUsuario,
      nome: userData.nome,
      email: userData.email,
    });
  }, []);

  const logout = useCallback(() => {
    setAuth(null);
  }, []);

  const register = useCallback((userData) => {
    setAuth({
      isAuthenticated: true,
      tipoUsuario: userData.tipoUsuario,
      nome: userData.nome,
      email: userData.email,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
