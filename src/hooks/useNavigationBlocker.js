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
    const BASENAME = "/front-end";
    const handleNavClick = (e) => {
      const anchor = e.target.closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;
      const path = href.startsWith(BASENAME) ? href.slice(BASENAME.length) || "/" : href;
      if (path === window.location.pathname.replace(new RegExp("^" + BASENAME), "") || path === window.location.pathname) return;
      e.preventDefault();
      e.stopPropagation();
      pendingNavRef.current = path;
      setModalAberto(true);
    };
    document.addEventListener("click", handleNavClick, true);
    return () => document.removeEventListener("click", handleNavClick, true);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const BASENAME = "/front-end";
    const handlePopState = () => {
      if (!modalAberto) {
        setModalAberto(true);
        const fullPath = window.location.pathname;
        pendingNavRef.current = fullPath.startsWith(BASENAME) ? fullPath.slice(BASENAME.length) || "/" : fullPath;
        window.history.pushState(null, "", fullPath);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [hasUnsavedChanges, modalAberto]);

  const handleModalSalvar = useCallback((saveConfig) => {
    const navTarget = pendingNavRef.current;
    pendingNavRef.current = null;
    setModalAberto(false);
    try {
      saveConfig();
    } catch (e) {
      console.error("Erro ao salvar configurações:", e);
    }
    if (navTarget) {
      setTimeout(() => navigate(navTarget), 0);
    }
  }, [navigate]);

  const handleModalSair = useCallback((discardConfig) => {
    const navTarget = pendingNavRef.current;
    pendingNavRef.current = null;
    setModalAberto(false);
    try {
      discardConfig();
    } catch (e) {
      console.error("Erro ao descartar configurações:", e);
    }
    if (navTarget) {
      setTimeout(() => navigate(navTarget), 0);
    }
  }, [navigate]);

  const handleModalCancelar = useCallback(() => {
    setModalAberto(false);
    pendingNavRef.current = null;
  }, []);

  return { modalAberto, handleModalSalvar, handleModalSair, handleModalCancelar };
}
