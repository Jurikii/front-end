import { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./NovoDocumentoModal.module.css";

const CORES_DISPONIVEIS = [
  "#e74c3c", "#3498db", "#2ecc71", "#f39c12",
  "#9b59b6", "#1abc9c", "#e67e22", "#34495e",
  "#e91e63", "#00bcd4", "#8bc34a", "#ff5722",
];

const PROCESSO_REGEX = /^\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}$/;

function DropdownFluido({ id, aberto, onToggle, valor, opcoes, onChange, onAdd, mostrarCor, mostrarPrioridade }) {
  const [modoAdd, setModoAdd] = useState(false);
  const [addValue, setAddValue] = useState("");
  const [addCor, setAddCor] = useState("");
  const [dragOrder, setDragOrder] = useState([]);
  const [dragFrom, setDragFrom] = useState(null);
  const dragFromRef = useRef(null);

  const handleToggle = useCallback(() => {
    onToggle(aberto ? null : id);
    setModoAdd(false);
    setAddValue("");
  }, [id, aberto, onToggle]);

  const handleSelect = useCallback((item) => {
    onChange(item);
    onToggle(null);
    setModoAdd(false);
    setAddValue("");
  }, [onChange, onToggle]);

  const handleAddClick = useCallback(() => {
    setModoAdd(true);
    setAddCor(CORES_DISPONIVEIS[0]);
    const sorted = [...opcoes]
      .map((o) => ({
        nome: typeof o === "string" ? o : o.nome,
        cor: typeof o === "object" ? o.cor : null,
        prioridade: typeof o === "object" ? o.prioridade : null,
        isNew: false,
      }))
      .sort((a, b) => (a.prioridade ?? 99) - (b.prioridade ?? 99));
    sorted.push({ nome: "", cor: CORES_DISPONIVEIS[0], prioridade: null, isNew: true });
    setDragOrder(sorted);
    setDragFrom(null);
  }, [opcoes]);

  useEffect(() => {
    if (!mostrarPrioridade || !modoAdd || !dragOrder.length) return;
    setDragOrder((prev) =>
      prev.map((i) => (i.isNew ? { ...i, nome: addValue.trim() || "", cor: addCor || CORES_DISPONIVEIS[0] } : i)),
    );
  }, [addValue, addCor, mostrarPrioridade, modoAdd]);

  const handleDragStart = useCallback((e, idx) => {
    e.dataTransfer.effectAllowed = "move";
    dragFromRef.current = idx;
    setDragFrom(idx);
  }, []);

  const handleDragOver = useCallback((e, idx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const from = dragFromRef.current;
    if (from === null || from === idx) return;
    setDragOrder((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(from, 1);
      copy.splice(idx, 0, removed);
      return copy;
    });
    dragFromRef.current = idx;
    setDragFrom(idx);
  }, []);

  const handleDragEnd = useCallback(() => {
    dragFromRef.current = null;
    setDragFrom(null);
  }, []);

  const handleConfirmAdd = useCallback(() => {
    const nome = addValue.trim();
    if (!nome) return;
    const obj = mostrarCor ? { nome, cor: addCor || CORES_DISPONIVEIS[0] } : { nome };
    if (mostrarPrioridade && dragOrder.length > 0) {
      const newIdx = dragOrder.findIndex((item) => item.isNew);
      if (newIdx >= 0) {
        let leftPri = null;
        let rightPri = null;
        for (let i = newIdx - 1; i >= 0; i--) {
          if (!dragOrder[i].isNew && dragOrder[i].prioridade != null) { leftPri = dragOrder[i].prioridade; break; }
        }
        for (let i = newIdx + 1; i < dragOrder.length; i++) {
          if (!dragOrder[i].isNew && dragOrder[i].prioridade != null) { rightPri = dragOrder[i].prioridade; break; }
        }
        if (leftPri !== null && rightPri !== null) obj.prioridade = (leftPri + rightPri) / 2;
        else if (leftPri !== null) obj.prioridade = leftPri + 0.5;
        else if (rightPri !== null) obj.prioridade = rightPri - 0.5;
        else obj.prioridade = 1;
      }
    }
    onAdd(obj);
    onChange(nome);
    onToggle(null);
    setModoAdd(false);
    setAddValue("");
  }, [addValue, addCor, dragOrder, onAdd, onChange, onToggle, mostrarCor, mostrarPrioridade]);

  useEffect(() => {
    if (!aberto) { setModoAdd(false); setAddValue(""); }
  }, [aberto]);

  const itemAtual = opcoes.find((o) => {
    const n = typeof o === "string" ? o : o.nome;
    return n === valor;
  });

  return (
    <div className={styles.ndmDropdown}>
      <div
        className={[styles.ndmDropdownTrigger, aberto ? styles.ndmDropdownTriggerAberto : ""].join(" ")}
        onClick={handleToggle}
        tabIndex={0}
        role="button"
      >
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {itemAtual && mostrarCor && itemAtual.cor && (
            <span className={styles.ndmCorDot} style={{ background: itemAtual.cor }} />
          )}
          {valor || "Selecione..."}
        </span>
        <svg className={[styles.ndmDropdownSeta, aberto ? styles.ndmDropdownSetaAberta : ""].join(" ")} viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className={[styles.ndmDropdownMenu, aberto ? styles.ndmDropdownMenuAberto : ""].join(" ")}>
        {opcoes.map((item) => {
          const nome = typeof item === "string" ? item : item.nome;
          const cor = typeof item === "string" ? null : item.cor;
          const pri = typeof item === "string" ? null : item.prioridade;
          return (
            <div
              key={nome}
              className={[styles.ndmDropdownItem, valor === nome ? styles.ndmDropdownItemSelecionado : ""].join(" ")}
              onClick={() => handleSelect(nome)}
            >
              {mostrarCor && cor && <span className={styles.ndmCorDot} style={{ background: cor }} />}
              <span>{nome}</span>
            </div>
          );
        })}

        {modoAdd ? (
          <>
            <div className={styles.ndmAddRow}>
              <input
                className={styles.ndmAddInput}
                placeholder="Novo..."
                value={addValue}
                onChange={(e) => setAddValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleConfirmAdd()}
                autoFocus
              />
              <button className={styles.ndmAddBtn} onClick={handleConfirmAdd}>Adicionar</button>
            </div>
            {mostrarCor && (
              <div className={styles.ndmCores}>
                {CORES_DISPONIVEIS.map((c) => (
                  <div
                    key={c}
                    className={[styles.ndmCorSwatch, addCor === c ? styles.ndmCorSwatchAtiva : ""].join(" ")}
                    style={{ background: c }}
                    onClick={() => setAddCor(c)}
                  />
                ))}
              </div>
            )}
            {mostrarPrioridade && dragOrder.length > 0 && (
              <div className={styles.ndmDragSection}>
                <span className={styles.ndmDragLabel}>Arraste para definir a prioridade:</span>
                <div className={styles.ndmDragList}>
                  {dragOrder.map((item, idx) => (
                    <div
                      key={`${item.isNew ? "new" : item.nome}-${idx}`}
                      className={[
                        styles.ndmDragItem,
                        item.isNew ? styles.ndmDragItemNovo : "",
                        dragFrom === idx ? styles.ndmDragItemDragging : "",
                      ].join(" ")}
                      draggable
                      onDragStart={(e) => handleDragStart(e, idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDragEnd={handleDragEnd}
                    >
                      <span className={styles.ndmDragHandle}>
                        <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                          <circle cx="3" cy="2" r="1.2" fill="#999"/><circle cx="7" cy="2" r="1.2" fill="#999"/>
                          <circle cx="3" cy="8" r="1.2" fill="#999"/><circle cx="7" cy="8" r="1.2" fill="#999"/>
                          <circle cx="3" cy="14" r="1.2" fill="#999"/><circle cx="7" cy="14" r="1.2" fill="#999"/>
                        </svg>
                      </span>
                      {item.cor && <span className={styles.ndmCorDot} style={{ background: item.cor }} />}
                      <span className={styles.ndmDragNome}>{item.nome || "..."}</span>
                      {item.isNew && <span className={styles.ndmDragTag}>novo</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={[styles.ndmDropdownItem, styles.ndmDropdownItemAdd].join(" ")} onClick={handleAddClick}>
            + Adicionar novo...
          </div>
        )}
      </div>
    </div>
  );
}

DropdownFluido.propTypes = {
  id: PropTypes.string.isRequired,
  aberto: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  valor: PropTypes.string,
  opcoes: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  mostrarCor: PropTypes.bool,
  mostrarPrioridade: PropTypes.bool,
};

export default function NovoDocumentoModal({
  aberto,
  onFechar,
  onConfirmar,
  nomeArquivo,
  editando,
  tiposExistentes,
  partesExistentes,
  processosExistentes,
  areasExistentes,
  urgenciasExistentes,
}) {
  const [nome, setNome] = useState(nomeArquivo || (editando ? editando.nome : ""));
  const [tipo, setTipo] = useState(editando ? editando.tipo : "");
  const [partes, setPartes] = useState(editando ? editando.partes : "");
  const [processo, setProcesso] = useState(editando ? editando.processo : "");
  const [area, setArea] = useState(editando ? editando.areaDireito : "");
  const [urgencia, setUrgencia] = useState(editando ? editando.urgencia : "");
  const [dropdownAberto, setDropdownAberto] = useState(null);
  const [erroProcesso, setErroProcesso] = useState("");

  const [tipos, setTipos] = useState(tiposExistentes);
  const [partesList, setPartesList] = useState(partesExistentes);
  const [processosList, setProcessosList] = useState(processosExistentes);
  const [areasList, setAreasList] = useState(areasExistentes);
  const [urgenciasList, setUrgenciasList] = useState(urgenciasExistentes);

  useEffect(() => {
    if (aberto) {
      setNome(nomeArquivo || (editando ? editando.nome : ""));
      setTipo(editando ? editando.tipo : "");
      setPartes(editando ? editando.partes : "");
      setProcesso(editando ? editando.processo : "");
      setArea(editando ? editando.areaDireito : "");
      setUrgencia(editando ? editando.urgencia : "");
      setDropdownAberto(null);
      setErroProcesso("");
      setTipos(tiposExistentes);
      setUrgenciasList(urgenciasExistentes);
      setPartesList(partesExistentes);
      setProcessosList(processosExistentes);
      setAreasList(areasExistentes);
    }
  }, [aberto, nomeArquivo, editando, tiposExistentes, urgenciasExistentes, partesExistentes, processosExistentes, areasExistentes]);

  useEffect(() => {
    if (processo && !PROCESSO_REGEX.test(processo)) {
      setErroProcesso("Formato inválido. Use: 0000000-00.0000.0.00.0000");
    } else {
      setErroProcesso("");
    }
  }, [processo]);

  const processoValido = !processo || PROCESSO_REGEX.test(processo);
  const podeAdicionar = nome.trim() && partes.trim() && processo.trim() && processoValido;

  const handleConfirmar = useCallback(() => {
    if (!podeAdicionar) return;

    const findItem = (list, name) => list.find((o) => (typeof o === "string" ? o : o.nome) === name);
    const selectedTipo = findItem(tipos, tipo);
    const selectedUrgencia = findItem(urgenciasList, urgencia);

    const tipoCor = selectedTipo && typeof selectedTipo === "object" ? selectedTipo.cor : undefined;
    const urgenciaCor = selectedUrgencia && typeof selectedUrgencia === "object" ? selectedUrgencia.cor : undefined;
    const urgenciaPri = selectedUrgencia && typeof selectedUrgencia === "object" ? selectedUrgencia.prioridade : undefined;

    onConfirmar({
      nome: nome.trim(),
      tipo,
      tipoCor,
      partes: partes.trim(),
      processo: processo.trim(),
      areaDireito: area || "Direito de Família",
      urgencia,
      urgenciaCor,
      urgenciaPrioridade: urgenciaPri,
      novosTipos: tipos.filter((t) => typeof t === "object" && !tiposExistentes.find((e) => (typeof e === "string" ? e : e.nome) === t.nome)),
      novasUrgencias: urgenciasList.filter((u) => typeof u === "object" && !urgenciasExistentes.find((e) => (typeof e === "string" ? e : e.nome) === u.nome)),
    });
  }, [nome, tipo, partes, processo, area, urgencia, tipos, urgenciasList, tiposExistentes, urgenciasExistentes, onConfirmar, podeAdicionar]);

  if (!aberto) return null;

  return (
    <div className={[styles.ndmOverlay, aberto ? styles.ndmOverlayAberto : ""].join(" ")} onPointerDown={(e) => { if (e.target === e.currentTarget) onFechar(); }}>
      <div className={styles.ndmModal} onPointerDown={(e) => e.stopPropagation()}>
        <div className={styles.ndmHeader}>
          <span className={styles.ndmTitulo}>{editando ? "Editar documento" : "Novo documento"}</span>
          <button className={styles.ndmFechar} onClick={onFechar}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className={styles.ndmDivider} />

        <div className={styles.ndmBody}>
          <div className={styles.ndmCampo}>
            <label className={styles.ndmLabel}>Nome do documento</label>
            <input className={styles.ndmInput} value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>

          <div className={styles.ndmCampo}>
            <label className={styles.ndmLabel}>Tipo</label>
            <DropdownFluido
              id="tipo"
              aberto={dropdownAberto === "tipo"}
              onToggle={setDropdownAberto}
              valor={tipo}
              opcoes={tipos}
              onChange={setTipo}
              onAdd={(novo) => setTipos((prev) => [...prev, novo])}
              mostrarCor
            />
          </div>

          <div className={styles.ndmCampo}>
            <label className={styles.ndmLabel}>Partes envolvidas *</label>
            <DropdownFluido
              id="partes"
              aberto={dropdownAberto === "partes"}
              onToggle={setDropdownAberto}
              valor={partes}
              opcoes={partesList}
              onChange={setPartes}
              onAdd={(novo) => setPartesList((prev) => [...prev, novo])}
            />
          </div>

          <div className={styles.ndmCampo}>
            <label className={styles.ndmLabel}>N° do Processo *</label>
            <DropdownFluido
              id="processo"
              aberto={dropdownAberto === "processo"}
              onToggle={setDropdownAberto}
              valor={processo}
              opcoes={processosList}
              onChange={(v) => { setProcesso(v); setErroProcesso(""); }}
              onAdd={(novo) => {
                if (!PROCESSO_REGEX.test(novo)) {
                  setErroProcesso("Formato inválido. Use: 0000000-00.0000.0.00.0000");
                  return;
                }
                setProcessosList((prev) => [...prev, novo]);
                setProcesso(novo);
                setErroProcesso("");
              }}
            />
            {erroProcesso && <span style={{ fontSize: 11, color: "#d32f2f", marginTop: 2 }}>{erroProcesso}</span>}
          </div>

          <div className={styles.ndmCampo}>
            <label className={styles.ndmLabel}>Área do Direito</label>
            <DropdownFluido
              id="area"
              aberto={dropdownAberto === "area"}
              onToggle={setDropdownAberto}
              valor={area}
              opcoes={areasList}
              onChange={setArea}
              onAdd={(novo) => setAreasList((prev) => [...prev, novo])}
            />
          </div>

          <div className={styles.ndmCampo}>
            <label className={styles.ndmLabel}>Urgência</label>
            <DropdownFluido
              id="urgencia"
              aberto={dropdownAberto === "urgencia"}
              onToggle={setDropdownAberto}
              valor={urgencia}
              opcoes={urgenciasList}
              onChange={setUrgencia}
              onAdd={(novo) => setUrgenciasList((prev) => [...prev, novo])}
              mostrarCor
              mostrarPrioridade
            />
          </div>
        </div>

        <div className={styles.ndmFooter}>
          <button className={styles.ndmBtnCancelar} onClick={onFechar}>Cancelar</button>
          <button
            className={styles.ndmBtnConfirmar}
            onClick={handleConfirmar}
            disabled={!podeAdicionar}
            style={!podeAdicionar ? { opacity: 0.5, cursor: "not-allowed" } : {}}
          >
            {editando ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}

NovoDocumentoModal.propTypes = {
  aberto: PropTypes.bool.isRequired,
  onFechar: PropTypes.func.isRequired,
  onConfirmar: PropTypes.func.isRequired,
  nomeArquivo: PropTypes.string,
  editando: PropTypes.object,
  tiposExistentes: PropTypes.array,
  partesExistentes: PropTypes.array,
  processosExistentes: PropTypes.array,
  areasExistentes: PropTypes.array,
  urgenciasExistentes: PropTypes.array,
};
