import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useNavigationBlocker(hasUnsavedChanges) {
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const pendingNavRef = useRef(null);

  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const handler = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const handleNavClick = (e) => {
      const anchor = e.target.closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript:") || href === window.location.pathname) return;
      e.preventDefault(); e.stopPropagation();
      pendingNavRef.current = href;
      setModalAberto(true);
    };
    document.addEventListener("click", handleNavClick, true);
    return () => document.removeEventListener("click", handleNavClick, true);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const handlePopState = () => {
      if (!modalAberto) {
        setModalAberto(true);
        pendingNavRef.current = window.location.pathname;
        window.history.pushState(null, "", window.location.pathname);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [hasUnsavedChanges, modalAberto]);

  const handleModalSalvar = useCallback((saveConfig) => {
    saveConfig();
    setModalAberto(false);
    if (pendingNavRef.current) {
      navigate(pendingNavRef.current);
      pendingNavRef.current = null;
    }
  }, [navigate]);

  const handleModalSair = useCallback((discardConfig) => {
    discardConfig();
    setModalAberto(false);
    if (pendingNavRef.current) {
      navigate(pendingNavRef.current);
      pendingNavRef.current = null;
    }
  }, [navigate]);

  const handleModalCancelar = useCallback(() => {
    setModalAberto(false);
    pendingNavRef.current = null;
  }, []);

  return { modalAberto, handleModalSalvar, handleModalSair, handleModalCancelar };
}
