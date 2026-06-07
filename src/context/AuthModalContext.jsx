import { createContext, useContext, useState, useCallback } from "react";

const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
  const [modalState, setModalState] = useState({ open: false, tipo: "login" });

  const openTipoModal = useCallback((tipo) => {
    setModalState({ open: true, tipo });
  }, []);

  const closeTipoModal = useCallback(() => {
    setModalState({ open: false, tipo: "login" });
  }, []);

  return (
    <AuthModalContext.Provider value={{ modalState, openTipoModal, closeTipoModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}

export default AuthModalContext;
