import { useCallback, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Navbar from "../../components/NavbarAdvogado";
import CardAndamento from "../../components/CardAndamento";
import { andamentos } from "../../data/andamentos";
import styles from "./DetalhesDaConsultaAdvogado.module.css";

const BotaoVoltar = ({ onClick }) => (
  <button className={styles.botaoVoltar} onClick={onClick}>
    <img
      className={styles.setaVoltar}
      loading="lazy"
      alt=""
      src="/pepicons-pencil-arrow-up.svg"
    />
    <span>Voltar para meus processos</span>
  </button>
);

const PRESET_COLORS = [
  { hex: "#1c6506", label: "Verde" },
  { hex: "#3d6a8a", label: "Azul" },
  { hex: "#7c3aed", label: "Roxo" },
  { hex: "#f97316", label: "Laranja" },
  { hex: "#ec4899", label: "Rosa" },
  { hex: "#dc2626", label: "Vermelho" },
  { hex: "#0891b2", label: "Ciano" },
  { hex: "#4f46e5", label: "Índigo" },
  { hex: "#65a30d", label: "Lima" },
  { hex: "#78716c", label: "Cinza" },
];

const CATEGORIA_DEFAULTS = [
  { label: "Trabalhista", value: "trabalhista", color: "#1c6506" },
  { label: "Cível", value: "civel", color: "#3d6a8a" },
  { label: "Previdenciário", value: "previdenciario", color: "#7c3aed" },
  { label: "Empresarial", value: "empresarial", color: "#f97316" },
  { label: "Família", value: "familia", color: "#ec4899" },
];

const catStyle = (color) => ({
  backgroundColor: `${color}26`,
  borderColor: color,
  color,
});

const InfoCliente = ({ onCategoriaChange }) => {
  const [open, setOpen] = useState(false);
  const [categorias, setCategorias] = useState(CATEGORIA_DEFAULTS);
  const [selected, setSelected] = useState(CATEGORIA_DEFAULTS[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [novaLabel, setNovaLabel] = useState("");
  const [novaCor, setNovaCor] = useState(PRESET_COLORS[0].hex);
  const ref = useRef(null);
  const modalRef = useRef(null);
  let nextCustomId = useRef(0);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
        setNovaLabel("");
        setNovaCor(PRESET_COLORS[0].hex);
      }
    };
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [modalOpen]);

  const handleSelect = (opt) => {
    if (opt === "nova") {
      setModalOpen(true);
      return;
    }
    setSelected(opt);
    setOpen(false);
    onCategoriaChange?.(opt);
  };

  const handleCriar = () => {
    const label = novaLabel.trim();
    if (!label) return;
    const id = nextCustomId.current++;
    const nova = { label, value: `custom-${id}`, color: novaCor };
    setCategorias((prev) => [...prev, nova]);
    setSelected(nova);
    setOpen(false);
    setModalOpen(false);
    setNovaLabel("");
    setNovaCor(PRESET_COLORS[0].hex);
    onCategoriaChange?.(nova);
  };

  return (
    <div className={styles.infoCliente}>
      <div className={styles.clienteHeader}>
        <div className={styles.trabalhista}>
          <div className={styles.dropdownWrapper} ref={ref}>
            <button
              className={styles.categoriaBase}
              style={catStyle(selected.color)}
              onClick={() => setOpen((v) => !v)}
            >
              <span>{selected.label}</span>
              <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.65752 17.3894L1.00051 11.7324L2.41451 10.3184L7.36452 15.2684L12.3145 10.3184L13.7285 11.7324L8.07152 17.3894C7.88399 17.5768 7.62968 17.6821 7.36452 17.6821C7.09935 17.6821 6.84504 17.5768 6.65752 17.3894Z" fill={selected.color} />
              </svg>
            </button>
            {open && (
              <div className={styles.dropdownMenu}>
                {categorias.map((opt) => (
                  <button
                    key={opt.value}
                    className={styles.dropdownItem}
                    onClick={() => handleSelect(opt)}
                  >
                    <span className={styles.dot} style={{ backgroundColor: opt.color }} />
                    {opt.label}
                  </button>
                ))}
                <div className={styles.dropdownDivider} />
                <button
                  className={styles.dropdownItem}
                  onClick={() => handleSelect("nova")}
                >
                  <span className={styles.dotMais} />
                  Nova área
                </button>
              </div>
            )}
          </div>

          {modalOpen && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal} ref={modalRef}>
                <h3 className={styles.modalTitulo}>Nova área do direito</h3>
                <label className={styles.modalLabel}>Nome</label>
                <input
                  className={styles.modalInput}
                  type="text"
                  value={novaLabel}
                  onChange={(e) => setNovaLabel(e.target.value)}
                  placeholder="Ex: Direito Tributário"
                  autoFocus
                />
                <label className={styles.modalLabel}>Cor</label>
                <div className={styles.colorPicker}>
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      className={`${styles.colorSwatch} ${novaCor === c.hex ? styles.colorSwatchAtivo : ""}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setNovaCor(c.hex)}
                      title={c.label}
                    />
                  ))}
                </div>
                <div className={styles.modalAcoes}>
                  <button
                    className={styles.modalCancelar}
                    onClick={() => {
                      setModalOpen(false);
                      setNovaLabel("");
                      setNovaCor(PRESET_COLORS[0].hex);
                    }}
                  >
                    Cancelar
                  </button>
                  <button className={styles.modalCriar} onClick={handleCriar}>
                    Criar área
                  </button>
                </div>
              </div>
            </div>
          )}

          <h2 className={styles.tituloCaso}>Rescisão indireta</h2>
        </div>

      <div className={styles.dadosCliente}>
        <div className={styles.clienteRow}>
          <img
            className={styles.fotoCliente}
            alt="Maria Souza"
            src="/user1@2x.png"
          />
          <div className={styles.clienteTextos}>
            <div className={styles.clienteNomeBloco}>
              <span className={styles.rotulo}>Cliente</span>
              <h3 className={styles.nome}>Maria Souza</h3>
            </div>
          </div>
        </div>

        <div className={styles.separador} />

        <div className={styles.detalhesProcesso}>
          <div className={styles.detalheItem}>
            <span className={styles.rotulo}>Processo nº</span>
            <h3 className={styles.nome}>0001234-56.2024.5.02.0001</h3>
          </div>
          <div className={styles.detalheItem}>
            <span className={styles.rotulo}>Advogada responsável</span>
            <h3 className={styles.nome}>Dra. Beatriz Oliveira</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const STATUS_OPTIONS = [
  { label: "Em andamento", value: "em_andamento" },
  { label: "Interrompido", value: "interrompido" },
];

const statusStyle = (value) => {
  switch (value) {
    case "interrompido":
      return `${styles.statusBadge} ${styles.statusBadgeAmarelo}`;
    default:
      return styles.statusBadge;
  }
};

const ResumoDoCaso = ({ onStatusChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(STATUS_OPTIONS[0]);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    setSelected(opt);
    setOpen(false);
    onStatusChange?.(opt);
  };

  return (
    <div className={styles.resumo}>
      <div className={styles.resumoHeader}>
        <h3 className={styles.subtitulo}>Resumo do caso</h3>
        <span className={styles.statusRotulo}>Status do processo</span>
      </div>
      <div className={styles.resumoCorpo}>
        <p className={styles.resumoTexto}>
          Alegação de assédio moral e condições inadequadas de trabalho que
          justificam a rescisão indireta do contrato.
        </p>
        <div className={styles.dropdownWrapper} ref={ref}>
          <button
            className={statusStyle(selected.value)}
            onClick={() => setOpen((v) => !v)}
          >
            <span>{selected.label}</span>
            <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.65752 17.3894L1.00051 11.7324L2.41451 10.3184L7.36452 15.2684L12.3145 10.3184L13.7285 11.7324L8.07152 17.3894C7.88399 17.5768 7.62968 17.6821 7.36452 17.6821C7.09935 17.6821 6.84504 17.5768 6.65752 17.3894Z" fill={selected.value === "interrompido" ? "#92400e" : "var(--color-darkgreen-200)"} />
            </svg>
          </button>
          {open && (
            <div className={styles.dropdownMenu}>
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={styles.dropdownItem}
                    onClick={() => handleSelect(opt)}
                  >
                    <span
                      className={styles.dot}
                      style={{
                        backgroundColor:
                          opt.value === "interrompido"
                            ? "var(--amarelo)"
                            : "var(--color-darkgreen-100)",
                      }}
                    />
                    {opt.label}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TAG_PRESETS = [
  { label: "Assédio Moral", color: "#1c6506" },
  { label: "Rescisão indireta", color: "#1c6506" },
  { label: "Urgente", color: "#dc2626" },
  { label: "Prioridade", color: "#f97316" },
  { label: "Documentação", color: "#3d6a8a" },
  { label: "Audiência", color: "#7c3aed" },
  { label: "Pendente", color: "#ec4899" },
  { label: "Concluído", color: "#65a30d" },
];

const InformacoesDoProcesso = () => {
  const [tags, setTags] = useState(TAG_PRESETS.slice(0, 2));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [novaLabel, setNovaLabel] = useState("");
  const [novaCor, setNovaCor] = useState(PRESET_COLORS[0].hex);
  const [removendoLabel, setRemovendoLabel] = useState(null);
  const dropdownRef = useRef(null);
  const addBtnRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        addBtnRef.current &&
        !addBtnRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (dropdownOpen && addBtnRef.current) {
      const rect = addBtnRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
    }
  }, [dropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
        setNovaLabel("");
        setNovaCor(PRESET_COLORS[0].hex);
      }
    };
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [modalOpen]);

  const handleRemoverTag = (label) => {
    setRemovendoLabel(label);
    setTimeout(() => {
      setTags((prev) => prev.filter((t) => t.label !== label));
      setRemovendoLabel(null);
    }, 250);
  };

  const handleAdicionarTag = (t) => {
    setTags((prev) => [...prev, t]);
    setDropdownOpen(false);
  };

  const handleCriarTag = () => {
    const label = novaLabel.trim();
    if (!label) return;
    const nova = { label, color: novaCor };
    setTags((prev) => [...prev, nova]);
    setModalOpen(false);
    setNovaLabel("");
    setNovaCor(PRESET_COLORS[0].hex);
  };

  const tagsDisponiveis = TAG_PRESETS.filter(
    (tp) => !tags.some((t) => t.label === tp.label),
  );

  return (
    <section className={styles.informacoesProcesso}>
      <h2 className={styles.secaoTitulo}>Informações do processo</h2>
      <div className={styles.infoGrid}>
        <InfoItem icone="/Vector6.svg" rotulo="Data de início" valor="15/03/2024" />
        <Divider />
        <InfoItem
          icone="/tabler-map-pin.svg"
          rotulo="Vara"
          valor="1ª Vara do Trabalho de São Paulo-SP"
        />
        <Divider />
        <InfoItem icone="/Vector7.svg" rotulo="Situação atual">
          <span className={styles.situacaoAtiva}>Em andamento</span>
        </InfoItem>
        <Divider />
        <InfoItem
          icone="/material-symbols-light-timer-arrow-up-outline.svg"
          rotulo="Última atualização"
          valor="10/05/2026"
        />
        <Divider />
        <InfoItem icone="/fluent-tag-20-regular.svg" rotulo="Tags">
          <div className={styles.tags}>
            {tags.map((t) => (
              <button
                key={t.label}
                className={`${styles.tag} ${removendoLabel === t.label ? styles.tagRemovendo : ""}`}
                style={{ backgroundColor: `${t.color}26`, color: t.color }}
                onClick={() => handleRemoverTag(t.label)}
                title={`Remover ${t.label}`}
              >
                {t.label}
              </button>
            ))}
            <div className={styles.dropdownWrapper}>
              <button
                ref={addBtnRef}
                className={styles.tagAdicionar}
                onClick={() => setDropdownOpen((v) => !v)}
                title="Adicionar tag"
              >
                +
              </button>
            </div>
          </div>
        </InfoItem>
      </div>

      {modalOpen &&
        createPortal(
          <div className={styles.modalOverlay}>
            <div className={styles.modal} ref={modalRef}>
              <h3 className={styles.modalTitulo}>Nova tag</h3>
              <label className={styles.modalLabel}>Nome</label>
              <input
                className={styles.modalInput}
                type="text"
                value={novaLabel}
                onChange={(e) => setNovaLabel(e.target.value)}
                placeholder="Ex: Urgente"
                autoFocus
              />
              <label className={styles.modalLabel}>Cor</label>
              <div className={styles.colorPicker}>
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    className={`${styles.colorSwatch} ${novaCor === c.hex ? styles.colorSwatchAtivo : ""}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => setNovaCor(c.hex)}
                    title={c.label}
                  />
                ))}
              </div>
              <div className={styles.modalAcoes}>
                <button
                  className={styles.modalCancelar}
                  onClick={() => {
                    setModalOpen(false);
                    setNovaLabel("");
                    setNovaCor(PRESET_COLORS[0].hex);
                  }}
                >
                  Cancelar
                </button>
                <button className={styles.modalCriar} onClick={handleCriarTag}>
                  Criar tag
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {dropdownOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className={styles.dropdownMenuTags}
            style={{ position: "fixed", top: dropdownPos.top, right: dropdownPos.right }}
          >
            {tagsDisponiveis.length > 0 ? (
              tagsDisponiveis.map((tp) => (
                <button
                  key={tp.label}
                  className={styles.dropdownItem}
                  onClick={() => handleAdicionarTag(tp)}
                >
                  <span className={styles.dot} style={{ backgroundColor: tp.color }} />
                  {tp.label}
                </button>
              ))
            ) : (
              <span className={styles.dropdownVazio}>Todas as tags foram adicionadas</span>
            )}
            <div className={styles.dropdownDivider} />
            <button
              className={styles.dropdownItem}
              onClick={() => {
                setDropdownOpen(false);
                setModalOpen(true);
              }}
            >
              <span className={styles.dotMais} />
              Nova tag
            </button>
          </div>,
          document.body,
        )}
    </section>
  );
};

const InfoItem = ({ icone, rotulo, valor, children }) => (
  <div className={styles.infoItem}>
    <div className={styles.infoItemHeader}>
      <img className={styles.infoIcone} alt="" src={icone} />
      <h3 className={styles.subtitulo}>{rotulo}</h3>
    </div>
    {children ?? <span className={styles.infoValor}>{valor}</span>}
  </div>
);

const Divider = () => <div className={styles.divider} />;

const Andamentos = ({ andamentosList, onAndamentoMenuClick, onAndamentoSave, onAndamentoDelete, onAndamentoAdd }) => {
  const [autoEditId, setAutoEditId] = useState(null);
  const [expandido, setExpandido] = useState(false);
  const maxVisiveis = 3;
  const exibidos = expandido ? andamentosList : andamentosList.slice(0, maxVisiveis);

  const handleAdd = () => {
    const id = onAndamentoAdd();
    setAutoEditId(id);
  };

  const handleEditEnd = () => {
    setAutoEditId(null);
  };

  const handleToggleExpandido = () => {
    setExpandido((v) => {
      if (v) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      }
      return !v;
    });
  };

  return (
    <section className={styles.andamentos}>
      <div className={styles.andamentosHeader}>
        <h2 className={styles.secaoTitulo}>Andamentos</h2>
        <div className={styles.andamentosHeaderAcoes}>
          <button className={styles.andamentoAdicionar} onClick={handleAdd} title="Adicionar andamento">
            +
          </button>
        </div>
      </div>
      <div className={styles.andamentosLinha}>
        <div className={styles.timelineRail} />
        {exibidos.map((item, index) => (
          <div key={item.id} className={styles.andamentoRow}>
            <div className={styles.timelineDot} />
            <CardAndamento
              index={index}
              dataHora={item.dataHora}
              titulo={item.titulo}
              descricao={item.descricao}
              onMenuClick={() => onAndamentoMenuClick?.(item, index)}
              onSave={onAndamentoSave}
              onDelete={onAndamentoDelete}
              onEditEnd={handleEditEnd}
              autoEdit={autoEditId === item.id}
            />
          </div>
        ))}
      </div>
      {andamentosList.length > maxVisiveis && (
        <button
          className={styles.verTodosBtn}
          onClick={handleToggleExpandido}
        >
          {expandido ? "Mostrar menos" : "Ver todos os andamentos"}
        </button>
      )}
    </section>
  );
};

const PainelLateral = ({ className = "", style, onEditarObservacoesClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [passos, setPassos] = useState([
    "Aguardar manifestação da parte ré",
    "Analisar documentos complementares",
    "Preparar argumentos para próxima audiência",
  ]);
  const [observacoes, setObservacoes] = useState(
    "Cliente relatou episódios de assédio recorrentes. Reunir mais evidências e testemunhas.",
  );
  const [removendoPasso, setRemovendoPasso] = useState(null);
  const [exitingEdit, setExitingEdit] = useState(false);

  const handleAddPasso = () => {
    setPassos((prev) => [...prev, ""]);
  };

  const handleRemovePasso = (index) => {
    setRemovendoPasso(index);
    setTimeout(() => {
      setPassos((prev) => prev.filter((_, i) => i !== index));
      setRemovendoPasso(null);
    }, 250);
  };

  const handlePassoChange = (index, value) => {
    setPassos((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const toggleEditing = () => {
    if (isEditing) {
      onEditarObservacoesClick?.({ passos, observacoes });
      setExitingEdit(true);
      setTimeout(() => {
        setIsEditing(false);
        setExitingEdit(false);
      }, 250);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <section className={`${styles.painelLateral} ${className}`} style={style}>
      <div className={styles.proximosPassos}>
        <div className={styles.passoHeader}>
          <h3 className={styles.subtitulo}>Próximos passos</h3>
        </div>
        {isEditing || exitingEdit ? (
          <div className={`${styles.passoEditList} ${exitingEdit ? styles.passoEditListSaindo : ""}`}>
              {passos.map((p, i) => (
              <div key={i} className={`${styles.passoEditRow} ${removendoPasso === i ? styles.passoRemovendo : ""}`}>
                <input
                  className={styles.passoInput}
                  type="text"
                  value={p}
                  onChange={(e) => handlePassoChange(i, e.target.value)}
                  placeholder="Novo passo..."
                />
                <button
                  className={styles.passoRemover}
                  onClick={() => handleRemovePasso(i)}
                  title="Remover"
                >
                  ✕
                </button>
              </div>
            ))}
            <button className={styles.passoAdicionar} onClick={handleAddPasso}>
              + Adicionar passo
            </button>
          </div>
        ) : (
          <ul className={styles.listaPassos}>
            {passos.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.observacoes}>
        <div className={styles.observacoesHeader}>
          <h3 className={styles.subtitulo}>Observações internas</h3>
          {!isEditing && (
            <button
              className={styles.botaoEditar}
              onClick={toggleEditing}
              title="Editar"
            >
              <img alt="Editar" src="/raphael-pensil1.svg" />
            </button>
          )}
        </div>
        <div className={styles.observacoesCorpo}>
          {isEditing || exitingEdit ? (
            <textarea
              className={`${styles.observacoesTextarea} ${exitingEdit ? styles.observacoesTextareaSaindo : ""}`}
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Adicione observações..."
              rows={4}
            />
          ) : (
            <p className={styles.observacoesTexto}>{observacoes}</p>
          )}
        </div>
      </div>
      {(isEditing || exitingEdit) && (
        <button className={styles.passoSalvar} onClick={toggleEditing}>
          ✓ Salvar
        </button>
      )}
    </section>
  );
};

const DetalhesDaConsultaAdvogado = () => {
  const navigate = useNavigate();
  const [andamentosList, setAndamentosList] = useState(andamentos);
  const nextAndamentoId = useRef(5);

  const handleVoltarClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleDetalhesClick = useCallback(() => {}, []);
  const handleDocumentosClick = useCallback(() => {}, []);
  const handleCategoriaChange = useCallback((opt) => {}, []);
  const handleStatusChange = useCallback((opt) => {}, []);
  const handleEditarObservacoesClick = useCallback(() => {}, []);
  const handleAndamentoMenuClick = useCallback((item, index) => {}, []);
  const handleAndamentoSave = useCallback((index, updatedItem) => {
    setAndamentosList((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updatedItem };
      next.sort((a, b) => {
        const parse = (s) => {
          const parts = s.split("  ·  ");
          const [d, m, y] = parts[0].split("/");
          const [h, min] = parts[1].split(":");
          return new Date(+y, +m - 1, +d, +h, +min);
        };
        return parse(b.dataHora) - parse(a.dataHora);
      });
      return next;
    });
  }, []);
  const handleAndamentoDelete = useCallback((index) => {
    setAndamentosList((prev) => prev.filter((_, i) => i !== index));
  }, []);
  const handleAndamentoAdd = useCallback(() => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = now.getFullYear();
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const id = nextAndamentoId.current++;
    const novo = {
      id,
      dataHora: `${dd}/${mm}/${yyyy}  ·  ${hh}:${min}`,
      titulo: "Novo andamento",
      descricao: "",
    };
    setAndamentosList((prev) => [novo, ...prev]);
    return id;
  }, []);

  return (
    <div className={styles.pagina}>
      <Navbar />

      <main className={styles.conteudo}>
        <aside className={styles.navLateral}>
          <div className={styles.navLateralItens}>
            <button className={styles.navLateralItemAtivo} onClick={handleDetalhesClick}>
              <img alt="" src="/Vector4.svg" />
              <span>Detalhes do processo</span>
            </button>
            <button className={styles.navLateralItem} onClick={handleDocumentosClick}>
              <img alt="" src="/Vector5.svg" />
              <span>Documentos do processo</span>
            </button>
          </div>
        </aside>

        <div className={styles.areaInterna}>
          <div className={styles.containerProcesso}>
            <section className={`${styles.cabecalho} ${styles.mountAnim}`} style={{animationDelay: "0s"}}>
              <BotaoVoltar onClick={handleVoltarClick} />
              <h1 className={styles.tituloPagina}>Detalhes do processo</h1>
            </section>

            <div className={styles.corpo}>
              <div className={`${styles.linhaSuperiror} ${styles.mountAnim}`} style={{animationDelay: "0.15s"}}>
                <div className={styles.colunaEsquerda}>
                  <div className={styles.detalhesCard}>
                    <InfoCliente onCategoriaChange={handleCategoriaChange} />
                    <div className={styles.separadorHorizontal} />
                    <ResumoDoCaso onStatusChange={handleStatusChange} />
                  </div>
                  <InformacoesDoProcesso />
                </div>

                <Andamentos
                  andamentosList={andamentosList}
                  onAndamentoMenuClick={handleAndamentoMenuClick}
                  onAndamentoSave={handleAndamentoSave}
                  onAndamentoDelete={handleAndamentoDelete}
                  onAndamentoAdd={handleAndamentoAdd}
                />
              </div>

              <PainelLateral
                className={`${styles.mountAnim}`}
                style={{animationDelay: "0.3s"}}
                onEditarObservacoesClick={handleEditarObservacoesClick}
              />
            </div>
          </div>
        </div>
      </main>

      <div className={styles.barraInferior}>
        <BotaoVoltar onClick={handleVoltarClick} />
        <h2 className={styles.tituloPaginaMobile}>Detalhes do processo</h2>
      </div>
    </div>
  );
};

export default DetalhesDaConsultaAdvogado;
