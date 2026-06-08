import { useState, useRef, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./TabelaDocumentos.module.css";

// ── Helpers ──────────────────────────────────────────────────────────────────

const URGENCIA_CLASSES = {
  Alta: styles.urgenciaAlta,
  Média: styles.urgenciaMedia,
  Baixa: styles.urgenciaBaixa,
};

const TIPO_CLASSES = {
  Petição: styles.tipoPeticao,
  Despacho: styles.tipoDespacho,
  Evidência: styles.tipoEvidencia,
  Contrato: styles.tipoContrato,
  Sentença: styles.tipoSentenca,
  Ata: styles.tipoAta,
  Recurso: styles.tipoRecurso,
};

// ── Sub-componentes ───────────────────────────────────────────────────────────

const TextoComTooltip = ({ texto, max, className }) => {
  const [mostrar, setMostrar] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef(null);
  const hideTimer = useRef(null);
  const precisa = texto && texto.length > max;

  const handleEnter = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (!ref.current) return;
    const el = ref.current;
    const overflow = el.scrollWidth > el.clientWidth;
    if (!precisa && !overflow) return;
    const r = el.getBoundingClientRect();
    setPos({ top: r.top - 33, left: r.left });
    setMostrar(true);
  }, [precisa]);

  const handleLeave = useCallback(() => {
    hideTimer.current = setTimeout(() => setMostrar(false), 150);
  }, []);

  const handleTooltipEnter = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  const handleTooltipLeave = useCallback(() => {
    setMostrar(false);
  }, []);

  const txt = precisa ? texto.slice(0, max) + "…" : texto;

  return (
    <>
      <span ref={ref} className={className} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {txt}
      </span>
      {mostrar && (
        <span
          className={styles.tooltip}
          style={{ top: pos.top, left: pos.left }}
          onMouseEnter={handleTooltipEnter}
          onMouseLeave={handleTooltipLeave}
        >
          {texto}
        </span>
      )}
    </>
  );
};

const BadgeUrgencia = ({ nivel, cor, max }) => (
  <span className={[styles.badge, cor ? "" : URGENCIA_CLASSES[nivel] || ""].join(" ")}
    style={cor ? { backgroundColor: cor + "22", color: cor } : (URGENCIA_CLASSES[nivel] ? undefined : { backgroundColor: "#f0f0f0", color: "#333" })}>
    <TextoComTooltip texto={nivel} max={max} />
  </span>
);

const BadgeTipo = ({ tipo, cor, max }) => (
  <span className={[styles.badge, cor ? "" : TIPO_CLASSES[tipo] || ""].join(" ")}
    style={cor ? { backgroundColor: cor + "22", color: cor } : (TIPO_CLASSES[tipo] ? undefined : { backgroundColor: "#f0f0f0", color: "#333" })}>
    <TextoComTooltip texto={tipo} max={max} />
  </span>
);

const IconeArquivo = ({ src, nome }) => (
  <div className={styles.iconeArquivo}>
    <img src={src} alt={`Ícone ${nome}`} />
  </div>
);

// ── Linha da tabela ───────────────────────────────────────────────────────────

const LinhaDocumento = ({ doc, onExcluir, onEditar }) => {
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [dropdownEstilo, setDropdownEstilo] = useState({});
  const tresPontosRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!dropdownAberto) return;
    const handleClick = (e) => {
      if (
        tresPontosRef.current && !tresPontosRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) {
        setDropdownAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownAberto]);

  const handleTresPontosClick = useCallback(() => {
    if (tresPontosRef.current) {
      const r = tresPontosRef.current.getBoundingClientRect();
      setDropdownEstilo({ top: r.bottom + 4, right: window.innerWidth - r.right, left: "auto" });
    }
    setDropdownAberto((p) => !p);
  }, []);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setDropdownEstilo({ top: e.clientY, left: e.clientX });
    setDropdownAberto(true);
  }, []);

  return (
    <tr className={styles.linha} onContextMenu={handleContextMenu}>
      {/* Documento: td permanece table-cell; flex fica no div interno */}
      <td className={styles.celulaDoc}>
        <div className={styles.celulaDocInner}>
          <IconeArquivo src={doc.icone} nome={doc.nome} />
          <div className={styles.infoArquivo}>
            <TextoComTooltip texto={doc.nome} max={18} className={styles.nomeArquivo} />
            <span className={styles.tamanhoArquivo}>{doc.tamanho}</span>
          </div>
        </div>
      </td>

      <td><BadgeTipo tipo={doc.tipo} cor={doc.tipoCor} max={10} /></td>

      {/* Partes envolvidas: mesmo padrão */}
      <td className={styles.partesEnvolvidas}>
        <div className={styles.partesEnvolvidasInner}>
          {doc.partes.split("\n").map((linha, i) => (
            <TextoComTooltip key={i} texto={linha} max={20} />
          ))}
        </div>
      </td>

      <td><TextoComTooltip texto={doc.processo} max={25} className={styles.colTexto} /></td>
      <td><TextoComTooltip texto={doc.areaDireito} max={14} className={styles.colTexto} /></td>
      <td><BadgeUrgencia nivel={doc.urgencia} cor={doc.urgenciaCor} max={10} /></td>
      <td>
        <div className={styles.colunaDataAcoes}>
          <div className={styles.dataHora}>
            <span>{doc.data}</span>
            <span className={styles.hora}>{doc.hora}</span>
          </div>
          <button className={styles.botaoAcao} aria-label="Download">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 20h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <div className={styles.acaoDropdownWrapper}>
            <button className={styles.botaoAcao} ref={tresPontosRef} aria-label="Mais ações" onClick={handleTresPontosClick}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="19" r="1.5" fill="currentColor" />
              </svg>
            </button>
            <div className={[styles.acaoDropdown, dropdownAberto ? styles.acaoDropdownAberto : ""].join(" ")} ref={dropdownRef} style={dropdownEstilo}>
              <button className={styles.acaoDropdownItem} onClick={() => { setDropdownAberto(false); onEditar(doc); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                </svg>
                Editar
              </button>
              <button className={styles.acaoDropdownItemExcluir} onClick={() => { setDropdownAberto(false); onExcluir(doc.id); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Excluir
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

// ── Componente principal ──────────────────────────────────────────────────────

const TabelaDocumentos = ({ documentos, className = "", onExcluir, onEditar }) => (
  <section className={[styles.tabela, className].join(" ")}>
    <table className={styles.tabelaGrid}>
      <thead>
        <tr>
          <th>Documento</th>
          <th>Tipo</th>
          <th>Partes envolvidas</th>
          <th>N° do processo</th>
          <th>Área do direito</th>
          <th>Urgência</th>
          <th>Data / Ações</th>
        </tr>
      </thead>
      <tbody>
        {documentos.map((doc) => (
          <LinhaDocumento key={doc.id} doc={doc} onExcluir={onExcluir} onEditar={onEditar} />
        ))}
      </tbody>
    </table>
  </section>
);

TabelaDocumentos.propTypes = {
  documentos: PropTypes.array.isRequired,
  className: PropTypes.string,
  onExcluir: PropTypes.func,
  onEditar: PropTypes.func,
};

BadgeUrgencia.propTypes = { nivel: PropTypes.string.isRequired, cor: PropTypes.string, max: PropTypes.number };
BadgeTipo.propTypes = { tipo: PropTypes.string.isRequired, cor: PropTypes.string, max: PropTypes.number };
TextoComTooltip.propTypes = { texto: PropTypes.string, max: PropTypes.number, className: PropTypes.string };
IconeArquivo.propTypes = { src: PropTypes.string.isRequired, nome: PropTypes.string.isRequired };
LinhaDocumento.propTypes = { doc: PropTypes.object.isRequired, onExcluir: PropTypes.func, onEditar: PropTypes.func };

export default TabelaDocumentos;