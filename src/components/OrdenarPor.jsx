import { useState } from "react";
import "./OrdenarPor.css";

const PRIORITY_IDS = ["prioridade-alta", "prioridade-baixa"];

const opcoes = [
  { id: "recentes", label: "Mais Recentes" },
  { id: "antigos", label: "Mais antigos" },
  { id: "nome-az", label: "Nome do cliente (A-Z)" },
  { id: "nome-za", label: "Nome do cliente (Z-A)" },
  { id: "prioridade-alta", label: "Prioridade (Alta → Baixa)" },
  { id: "prioridade-baixa", label: "Prioridade (Baixa →Alta)" },
];

export default function OrdenarPor({ onClose, onSort }) {
  const [selecionado, setSelecionado] = useState("recentes");

  const handleClick = (id) => {
    if (PRIORITY_IDS.includes(id)) return;
    setSelecionado(id);
    onSort?.(id);
    onClose();
  };

  return (
    <div className="ordenar-overlay">
      <div className="ordenar-modal">
        <div className="ordenar-header">
          <div className="ordenar-titulo">
            <svg
              className="ordenar-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6h18M7 12h10M11 18h2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6 9L3 6l3-3M18 15l3 3-3 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ordenar-titulo-texto">Ordenar por</span>
          </div>
          <button className="ordenar-fechar" onClick={onClose}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="ordenar-divider" />

        <div className="ordenar-lista">
          {opcoes.map((opcao) => {
            const isPriority = PRIORITY_IDS.includes(opcao.id);
            return (
              <label
                key={opcao.id}
                className={`ordenar-opcao${isPriority ? " ordenar-opcao-disabled" : ""}`}
                onClick={() => handleClick(opcao.id)}
              >
                <span
                  className={`ordenar-radio ${
                    selecionado === opcao.id ? "selecionado" : ""
                  }`}
                >
                  {selecionado === opcao.id && (
                    <span className="ordenar-radio-inner" />
                  )}
                </span>
                <span className="ordenar-opcao-label">{opcao.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
