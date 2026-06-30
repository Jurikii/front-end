import { useState } from "react";
import "./Filtros.css";

const areasDoDir = [
  "Trabalhista",
  "Cível",
  "Família",
  "Consumidor",
  "Previdenciário",
  "Tributário",
  "Empresarial",
];

const opcoesData = ["Hoje", "Últimos 7 dias", "Últimos 30 dias"];

export default function Filtros({ onClose, onAplicar, onLimpar, valores: current, hideCliente = false }) {
  const [areas, setAreas] = useState(current?.areas ?? {});

  const [cliente, setCliente] = useState(current?.cliente ?? "");
  const [processo, setProcesso] = useState(current?.processo ?? "");
  const [dataAtual, setDataAtual] = useState(current?.dataAtual ?? null);

  function toggleArea(area) {
    setAreas((prev) => ({ ...prev, [area]: !prev[area] }));
  }

  function handleLimpar() {
    setAreas({});
    setCliente("");
    setProcesso("");
    setDataAtual(null);
    onLimpar?.();
  }

  function handleAplicar() {
    onAplicar?.({ areas, cliente, processo, dataAtual });
    onClose();
  }

  return (
    <div className="filtros-overlay" onClick={onClose}>
      <div className="filtros-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="filtros-header">
          <div className="filtros-titulo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4.5h18M7.5 12h9M10.5 19.5h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Filtros</span>
          </div>
          <button className="filtros-fechar" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="filtros-divider" />

        {/* Área do Direito */}
        <div className="filtros-secao">
          <div className="filtros-secao-titulo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L4 7v5c0 4.418 3.582 8 8 9 4.418-1 8-4.582 8-9V7l-8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M7 11l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Area do Dieito</span>
          </div>
          <div className="filtros-grid-areas">
            {areasDoDir.map((area) => (
              <label key={area} className="filtros-checkbox-label" onClick={() => toggleArea(area)}>
                <span className={`filtros-checkbox ${areas[area] ? "marcado" : ""}`}>
                  {areas[area] && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <span className="filtros-checkbox-texto">{area}</span>
              </label>
            ))}
          </div>
        </div>


        {!hideCliente && (
          <>
            <div className="filtros-divider" />
            <div className="filtros-secao">
              <div className="filtros-secao-titulo">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <span>Cliente</span>
              </div>
              <input
                className="filtros-input"
                type="text"
                placeholder="Buscar cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="filtros-divider" />

        {/* Número do Processo */}
        <div className="filtros-secao">
          <div className="filtros-secao-titulo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M8 12h8M8 8h5M8 16h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span>Número do Processo</span>
          </div>
          <input
            className="filtros-input"
            type="text"
            placeholder="Número do processo (Ex: 0001234-56.2024.5.02.0001)"
            value={processo}
            onChange={(e) => setProcesso(e.target.value)}
          />
        </div>

        <div className="filtros-divider" />

        {/* Última Atualização */}
        <div className="filtros-secao">
          <div className="filtros-secao-titulo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span>Última Atualização</span>
          </div>
          <div className="filtros-row-data">
            {opcoesData.map((opcao) => (
              <label key={opcao} className="filtros-data-opcao" onClick={() => setDataAtual((prev) => prev === opcao ? null : opcao)}>
                <span className={`filtros-radio-dot ${dataAtual === opcao ? "selecionado" : ""}`} />
                <span className="filtros-checkbox-texto">{opcao}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="filtros-footer">
          <button className="filtros-btn-limpar" onClick={handleLimpar}>
            Limpar filtros
          </button>
          <button className="filtros-btn-aplicar" onClick={handleAplicar}>
            Aplicar filtros
          </button>
        </div>

      </div>
    </div>
  );
}
