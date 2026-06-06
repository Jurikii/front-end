import { useState, useMemo, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu1 from "../../components/Menu1";
import Voltar from "../../components/Voltar/Voltar";
import CONJUNTOPASTAS from "../../components/CONJUNTOPASTAS/CONJUNTOPASTAS";
import SessaoFiltro from "../../components/SessaoFiltro/SessaoFiltro";
import styles from "./IADocumentosTrabalhista.module.css";

const ICONS = {
  pdf:  { src: "/icone-tipo-arquivo.svg",           id: "pdf" },
  jpg:  { src: "/ant-design-file-jpg-outlined.svg", id: "jpg" },
  docx: { src: "/bi-filetype-docx1.svg",             id: "docx" },
};

const EXT_MAP = {
  pdf:  { icon: ICONS.pdf,  category: "Documento" },
  jpg:  { icon: ICONS.jpg,  category: "Imagem" },
  jpeg: { icon: ICONS.jpg,  category: "Imagem" },
  png:  { icon: ICONS.jpg,  category: "Imagem" },
  doc:  { icon: ICONS.docx, category: "Documento" },
  docx: { icon: ICONS.docx, category: "Documento" },
};

const SAMPLE_DOCS = [
  { name: "Contrato de trabalho",        category: "Trabalhista", date: "12/05/2025", size: "2.4 MB", icon: ICONS.pdf },
  { name: "Foto do dano",                category: "Consumidor",  date: "12/05/2025", size: "7.8 MB", icon: ICONS.jpg },
  { name: "Comprovante de residência",   category: "Civil",       date: "12/05/2025", size: "4.4 MB", icon: ICONS.docx },
  { name: "Declaração de imposto de renda", category: "Tributário", date: "10/05/2025", size: "1.2 MB", icon: ICONS.pdf },
  { name: "Procuração",                  category: "Cível",       date: "08/05/2025", size: "0.8 MB", icon: ICONS.docx },
  { name: "Sentença judicial",           category: "Trabalhista", date: "05/05/2025", size: "3.1 MB", icon: ICONS.pdf },
  { name: "Extrato bancário",            category: "Consumidor",  date: "03/05/2025", size: "0.5 MB", icon: ICONS.jpg },
  { name: "Contrato social",             category: "Empresarial", date: "01/05/2025", size: "2.0 MB", icon: ICONS.docx },
  { name: "Nota fiscal",                 category: "Consumidor",  date: "28/04/2025", size: "0.3 MB", icon: ICONS.jpg },
  { name: "Laudo pericial",              category: "Cível",       date: "25/04/2025", size: "5.7 MB", icon: ICONS.pdf },
  { name: "Petição inicial",             category: "Trabalhista", date: "20/04/2025", size: "1.8 MB", icon: ICONS.docx },
  { name: "Termo de audiência",          category: "Trabalhista", date: "15/04/2025", size: "0.9 MB", icon: ICONS.pdf },
  { name: "Comprovante de pagamento",    category: "Consumidor",  date: "10/04/2025", size: "0.2 MB", icon: ICONS.jpg },
  { name: "Certidão",                    category: "Cível",       date: "05/04/2025", size: "0.4 MB", icon: ICONS.docx },
  { name: "Alvará judicial",             category: "Família",     date: "01/04/2025", size: "1.1 MB", icon: ICONS.pdf },
];

const FILTROS = [
  { id: "todos",       label: "Todas" },
  { id: "Trabalhista", label: "Trabalhista" },
  { id: "Consumidor",  label: "Consumidor" },
  { id: "Cível",       label: "Cível" },
  { id: "Civil",       label: "Civil" },
  { id: "Tributário",  label: "Tributário" },
  { id: "pdf",         label: "PDF" },
  { id: "jpg",         label: "JPG" },
  { id: "docx",        label: "DOCX" },
];

const formatDate = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

const DocumentRow = ({ doc, menuAberto, onToggleMenu }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onToggleMenu(null);
      }
    };
    if (menuAberto) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuAberto, onToggleMenu]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = doc.icon.src;
    link.download = doc.name;
    link.click();
    onToggleMenu(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: doc.name, text: `${doc.name} - ${doc.category}` });
    } else {
      navigator.clipboard?.writeText(`${doc.name} - ${doc.category}`);
    }
    onToggleMenu(null);
  };

  return (
    <div className={styles.docRow}>
      <div className={styles.rectangleGroup}>
        <div className={styles.frameChild} />
        <div className={styles.modeloViewDoc2}>
          <img className={styles.iconeTipoArquivo} alt="" src={doc.icon.src} />
          <div className={styles.txtDoc2}>
            <h3 className={styles.contratoDeTrabalho}>{doc.name}</h3>
            <div className={styles.trabalhistaEnviado}>
              {doc.category} • Enviado em {doc.date} • {doc.size}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.menuWrapper} ref={menuRef}>
        <img className={styles.mingcutemore2FillIcon} alt="" src="/mingcute-more-2-fill1.svg"
          onClick={(e) => { e.stopPropagation(); onToggleMenu(menuAberto ? null : doc.id); }} />
        {menuAberto && (
          <div className={styles.dropdownMenu}>
            <div className={styles.dropdownItem} onClick={handleDownload}>Baixar</div>
            <div className={styles.dropdownItem} onClick={handleShare}>Compartilhar</div>
          </div>
        )}
      </div>
    </div>
  );
};

const IADocumentosTrabalhista = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pasta = location.state?.pasta || "Trabalhista";
  const count = location.state?.count ?? 5;
  const [itensPorPagina, setItensPorPagina] = useState(12);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState("todos");
  const [menuAberto, setMenuAberto] = useState(null);
  const nextId = useRef(100);

  const [allDocs, setAllDocs] = useState(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({ ...SAMPLE_DOCS[i % SAMPLE_DOCS.length], id: i + 1 });
    }
    return items;
  });

  const handleUpload = (file) => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "pdf";
    const tipo = EXT_MAP[ext] || EXT_MAP.pdf;
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    const novoDoc = {
      id: nextId.current++,
      name: file.name,
      category: pasta,
      date: formatDate(),
      size: `${sizeMB} MB`,
      icon: tipo.icon,
    };
    setAllDocs((prev) => [novoDoc, ...prev]);
  };

  const docs = useMemo(() => {
    if (filtroAtivo === "todos") return allDocs;
    const tipoIcone = { pdf: ICONS.pdf.id, jpg: ICONS.jpg.id, docx: ICONS.docx.id };
    if (filtroAtivo === "pdf" || filtroAtivo === "jpg" || filtroAtivo === "docx") {
      return allDocs.filter((d) => d.icon.id === tipoIcone[filtroAtivo]);
    }
    return allDocs.filter((d) => d.category === filtroAtivo);
  }, [allDocs, filtroAtivo]);

  const totalPaginas = Math.max(1, Math.ceil(docs.length / itensPorPagina));

  const docsPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    return docs.slice(inicio, inicio + itensPorPagina);
  }, [docs, paginaAtual, itensPorPagina]);

  const selecionarFiltro = (id) => {
    setFiltroAtivo(id);
    setPaginaAtual(1);
    setFiltroAberto(false);
  };

  return (
    <div className={styles.iaDocumentosTrabalhista}>
      <Menu1 />
      <main className={styles.todosOsElementos}>
        <main className={styles.funcionalidades}>
          <img className={styles.mergedAsset1Icon} loading="lazy" alt="" src="/merged-asset-1.svg" />
          <Voltar pasta={pasta} count={String(allDocs.length)} onFiltrar={() => setFiltroAberto(true)} onUpload={handleUpload} onCriarPasta={() => navigate("/documentos/mais")} />
          {filtroAtivo !== "todos" && (
            <div style={{ alignSelf: "flex-start", fontSize: "15px", color: "var(--azul-sereno)", fontWeight: 600, fontFamily: "var(--font-montserrat)" }}>
              Filtrando: {FILTROS.find((f) => f.id === filtroAtivo)?.label}
            </div>
          )}
          <CONJUNTOPASTAS />
          <div className={styles.docRecentes}>
            <h2 className={styles.documentosRecentes}>Documentos recentes</h2>
          </div>
          <div className={styles.arquivosRecentes}>
            {docsPaginados.map((doc) => (
              <DocumentRow key={doc.id} doc={doc} menuAberto={menuAberto === doc.id} onToggleMenu={setMenuAberto} />
            ))}
          </div>
        </main>
        <SessaoFiltro
          total={docs.length}
          exibindo={docsPaginados.length}
          itensPorPagina={itensPorPagina}
          paginaAtual={paginaAtual}
          onChangeItensPorPagina={(v) => { setItensPorPagina(v); setPaginaAtual(1); }}
          onPaginaAnterior={() => setPaginaAtual((p) => Math.max(1, p - 1))}
          onPaginaProxima={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
        />
      </main>

      {filtroAberto && (
        <div className={styles.overlay} onClick={() => setFiltroAberto(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitulo}>Filtrar documentos</h2>
            <div className={styles.filtroOpcoes}>
              {FILTROS.map((f) => (
                <button key={f.id} className={`${styles.filtroOpcao} ${filtroAtivo === f.id ? styles.filtroOpcaoAtiva : ""}`} onClick={() => selecionarFiltro(f.id)}>{f.label}</button>
              ))}
            </div>
            <div className={styles.modalBotoes}>
              <button className={styles.modalCancelar} onClick={() => setFiltroAberto(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IADocumentosTrabalhista;
