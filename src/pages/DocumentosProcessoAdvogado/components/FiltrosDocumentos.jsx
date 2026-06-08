import { useState, useEffect, useRef } from "react";
import styles from "./FiltrosDocumentos.module.css";

export default function FiltrosDocumentos({ aberto, onFechar, onAplicar, onLimpar, opcoesFormatos, opcoesTipos, opcoesAreas, opcoesUrgencias, filtrosAtuais }) {
  const formatosArquivo = opcoesFormatos || ["PDF", "PNG", "JPG", "DOCX", "XLSX"];
  const tiposDocumento = [...(opcoesTipos || []), "Outros"];
  const areasDir = [...(opcoesAreas || []), "Outros"];
  const niveisUrgencia = opcoesUrgencias || ["Alta", "Média", "Baixa"];
  const opcoesData = ["Hoje", "Últimos 7 dias", "Últimos 30 dias"];
  const [formatos, setFormatos] = useState({ PDF: true });
  const [tipos, setTipos] = useState({});
  const [areas, setAreas] = useState({});
  const [urgencias, setUrgencias] = useState({ Alta: true });
  const [cliente, setCliente] = useState("");
  const [processo, setProcesso] = useState("");
  const [dataAtual, setDataAtual] = useState(null);
  const abertoAnterior = useRef(false);

  useEffect(() => {
    if (!aberto || abertoAnterior.current) { abertoAnterior.current = aberto; return; }
    abertoAnterior.current = aberto;
    if (!filtrosAtuais) {
      setFormatos({});
      setTipos({});
      setAreas({});
      setUrgencias({});
      setCliente("");
      setProcesso("");
      setDataAtual(null);
    } else {
      if (filtrosAtuais.tipos) setTipos(filtrosAtuais.tipos);
      if (filtrosAtuais.formatos) setFormatos(filtrosAtuais.formatos);
      if (filtrosAtuais.areas) setAreas(filtrosAtuais.areas);
      if (filtrosAtuais.urgencias) setUrgencias(filtrosAtuais.urgencias);
      setCliente(filtrosAtuais.cliente || "");
      setProcesso(filtrosAtuais.processo || "");
      setDataAtual(filtrosAtuais.dataAtual || null);
    }
  }, [aberto]);

  const toggle = (setter) => (key) =>
    setter((prev) => {
      if (prev[key]) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: true };
    });

  function handleLimpar() {
    setFormatos({});
    setTipos({});
    setAreas({});
    setUrgencias({});
    setCliente("");
    setProcesso("");
    setDataAtual(null);
    onLimpar?.();
  }

  return (
    <div className={`${styles.fdOverlay} ${aberto ? styles.fdOverlayAberto : ''}`} onClick={onFechar}>
      <div className={styles.fdModal} onClick={(e) => e.stopPropagation()}>

        <div className={styles.fdHeader}>
          <div className={styles.fdTitulo}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M3 4.5h18M7.5 12h9M10.5 19.5h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Filtros</span>
          </div>
          <button className={styles.fdFechar} onClick={onFechar}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.fdDivider} />

        <div className={styles.fdSecao}>
          <div className={styles.fdSecaoTitulo}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span>Formato de arquivo</span>
          </div>
          <div className={styles.fdGrid3}>
            {formatosArquivo.map((item) => (
              <Checkbox
                key={item}
                label={item}
                checked={!!formatos[item]}
                onChange={() => toggle(setFormatos)(item)}
              />
            ))}
          </div>
        </div>

        <div className={styles.fdDivider} />

        <div className={styles.fdSecao}>
          <div className={styles.fdSecaoTitulo}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M9 2H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V9l-7-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M9 2v7h7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
            </svg>
            <span>Tipo do documento</span>
          </div>
          <div className={styles.fdGrid3}>
            {tiposDocumento.map((item) => (
              <Checkbox
                key={item}
                label={item}
                checked={!!tipos[item]}
                onChange={() => toggle(setTipos)(item)}
              />
            ))}
          </div>
        </div>

        <div className={styles.fdDivider} />

        <div className={styles.fdSecao}>
          <div className={styles.fdSecaoTitulo}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span>Cliente</span>
          </div>
          <input
            className={styles.fdInput}
            type="text"
            placeholder="Buscar cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </div>

        <div className={styles.fdDivider} />

        <div className={styles.fdSecao}>
          <div className={styles.fdSecaoTitulo}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M8 12h8M8 8h5M8 16h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span>Número do Processo</span>
          </div>
          <input
            className={styles.fdInput}
            type="text"
            placeholder="Número do processo (Ex: 0001234-56.2024.5.02.0001)"
            value={processo}
            onChange={(e) => setProcesso(e.target.value)}
          />
        </div>

        <div className={styles.fdDivider} />

        <div className={styles.fdSecao}>
          <div className={styles.fdSecaoTitulo}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L4 7v5c0 4.418 3.582 8 8 9 4.418-1 8-4.582 8-9V7l-8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
            </svg>
            <span>Área do Dieito</span>
          </div>
          <div className={styles.fdGrid3}>
            {areasDir.map((item) => (
              <Checkbox
                key={item}
                label={item}
                checked={!!areas[item]}
                onChange={() => toggle(setAreas)(item)}
              />
            ))}
          </div>
        </div>

        <div className={styles.fdDivider} />

        <div className={styles.fdSecao}>
          <div className={styles.fdSecaoTitulo}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
            </svg>
            <span>Nível de Urgência</span>
          </div>
          <div className={styles.fdRowUrgencia}>
            {niveisUrgencia.map((item) => (
              <Checkbox
                key={item}
                label={item}
                checked={!!urgencias[item]}
                onChange={() => toggle(setUrgencias)(item)}
              />
            ))}
          </div>
        </div>

        <div className={styles.fdDivider} />

        <div className={styles.fdSecao}>
          <div className={styles.fdSecaoTitulo}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span>Última Atualização</span>
          </div>
          <div className={styles.fdRowData}>
            {opcoesData.map((opcao) => (
              <label key={opcao} className={styles.fdDataOpcao} onClick={() => setDataAtual((prev) => prev === opcao ? null : opcao)}>
                <span className={[styles.fdRadioDot, dataAtual === opcao ? styles.selecionado : ""].join(" ")} />
                <span className={styles.fdTexto}>{opcao}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.fdFooter}>
          <button className={styles.fdBtnLimpar} onClick={handleLimpar}>
            Limpar filtros
          </button>
          <button className={styles.fdBtnAplicar} onClick={() => { onAplicar?.({ formatos, tipos, areas, urgencias, cliente, processo, dataAtual }); onFechar(); }}>
            Aplicar filtros
          </button>
        </div>

      </div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className={styles.fdCheckboxLabel} onClick={onChange}>
      <span className={[styles.fdCheckbox, checked ? styles.marcado : ""].join(" ")}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      <span className={styles.fdTexto}>{label}</span>
    </label>
  );
}
