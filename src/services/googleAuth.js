import { useCallback, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import api from "./api";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const HAS_CLIENT_ID = Boolean(CLIENT_ID);

function loadGsiScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Falha ao carregar o script do Google"));
    document.head.appendChild(script);
  });
}

export function useGoogleAuth(onSuccessRedirect) {
  const { register } = useAuth();
  const redirectRef = useRef(onSuccessRedirect);
  redirectRef.current = onSuccessRedirect;

  const loginComGoogle = useCallback(async () => {
    if (!HAS_CLIENT_ID) {
      alert(
        'Login com Google não configurado.\n\n' +
        'Para configurar:\n' +
        '1. Crie um projeto no Google Cloud Console\n' +
        '2. Gere um ID do cliente OAuth\n' +
        '3. Adicione VITE_GOOGLE_CLIENT_ID no arquivo .env'
      );
      return;
    }

    try {
      await loadGsiScript();

      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: "openid email profile",
        callback: async (response) => {
          if (response.error) {
            console.error("Erro Google OAuth:", response.error);
            alert("Erro ao fazer login com Google. Tente novamente.");
            return;
          }

          try {
            const res = await api.post("/auth/login/google", {
              credentialToken: response.access_token,
            });
            register(res.data);
            if (redirectRef.current) {
              redirectRef.current();
            }
          } catch (err) {
            console.error("Erro ao autenticar com Google:", err);
            alert("Erro ao fazer login com Google. Tente novamente.");
          }
        },
      });

      tokenClient.requestAccessToken();
    } catch (err) {
      console.error("Erro ao carregar Google API:", err);
      alert("Erro ao carregar o serviço do Google. Tente recarregar a página.");
    }
  }, [register]);

  return loginComGoogle;
}
