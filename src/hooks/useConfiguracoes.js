import { useState, useCallback, useEffect, useRef } from "react";

const STORAGE_KEY = "juriki_configuracoes";

const FONT_SIZE_MAP = {
  pequena: { label: "Pequena", value: "14px", root: "14px" },
  padrao: { label: "Padrão", value: "16px", root: "16px" },
  grande: { label: "Grande", value: "18px", root: "18px" },
  "extra-grande": { label: "Extra grande", value: "20px", root: "20px" },
};

const DEFAULTS = {
  fontSize: "padrao",
  tema: "claro",
  corPrincipal: "#102e44",
  corDestaque: "#fab84c",
  emailNotif: true,
  processoNotif: true,
  consultaNotif: true,
  lembreteNotif: true,
  documentoNotif: false,
  somNotif: false,
  autenticacaoDoisFatores: false,
  controleDados: false,
  altoContraste: false,
  contrasteSuave: false,
  monocromatico: false,
  reducaoAnimacao: false,
  destacarLinks: true,
  destacarTitulos: true,
  espacamentoLinhas: "1.6",
  espacamentoLetras: "0",
  navegacaoSimplificada: false,
  areaClique: false,
  focoTeclado: true,
  leitorTela: true,
  descricoesIcones: false,
  atalhosAcessibilidade: false,
};

const FS_LIST = [14, 15, 16, 18, 19, 20, 21, 22, 24, 25, 26, 28, 30, 32, 35, 36, 38, 40, 48, 51, 56, 64];
const BASE_FS = 16;

function darkenHex(hex) {
  const num = parseInt(hex.replace("#", ""), 16);
  const factor = 0.78;
  const r = Math.round((num >> 16) * factor);
  const g = Math.round(((num >> 8) & 0xff) * factor);
  const b = Math.round((num & 0xff) * factor);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function applyConfig(config) {
  const root = document.documentElement;
  const fontVal = FONT_SIZE_MAP[config.fontSize]?.root || "16px";
  const ratio = parseFloat(fontVal) / BASE_FS;
  FS_LIST.forEach((px) => {
    root.style.setProperty(`--fs-${px}`, `${Math.round(px * ratio)}px`);
  });
  root.style.setProperty("--fs-config-base", fontVal);
  root.setAttribute("data-tema", config.tema || "claro");
  root.style.setProperty("--azul", config.corPrincipal);
  root.style.setProperty("--azul-escuro", darkenHex(config.corPrincipal));
  root.style.setProperty("--amarelo", config.corDestaque);
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

export function useConfiguracoes() {
  const [config, setConfig] = useState(loadFromStorage);
  const savedRef = useRef(loadFromStorage());

  useEffect(() => {
    applyConfig(config);
  }, [config]);

  const updateConfig = useCallback((updates) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const saveConfig = useCallback(() => {
    setConfig((prev) => {
      const next = { ...prev };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      savedRef.current = next;
      return next;
    });
  }, []);

  const discardConfig = useCallback(() => {
    setConfig({ ...savedRef.current });
  }, []);

  const resetConfig = useCallback(() => {
    const defaults = { ...DEFAULTS };
    setConfig(defaults);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    savedRef.current = defaults;
  }, []);

  const hasUnsavedChanges =
    JSON.stringify(config) !== JSON.stringify(savedRef.current);

  return { config, updateConfig, saveConfig, discardConfig, resetConfig, hasUnsavedChanges, FONT_SIZE_MAP };
}
