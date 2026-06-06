import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Menu1 from "../../components/Menu1";
import PageHeader from "./components/PageHeader";
import Pastas from "./components/Pastas";
import RecentDocumentsSection from "./components/RecentDocumentsSection";
import SessaoFiltro from "../../components/SessaoFiltro/SessaoFiltro";
import styles from "./IADocumentos.module.css";

const CATEGORIAS = ["Trabalhista", "Consumidor", "Cível", "Tributário", "Empresarial", "Família"];

const FILTROS = [
  { id: "todos", label: "Todas" },
  ...CATEGORIAS.map((c) => ({ id: c, label: c })),
];

const INITIAL_DOCS = [
  { id: 1,  nome: "Contrato de trabalho",      pasta: "Trabalhista", data: "12/05/2025", tamanho: "2.4 MB", icone: "/icone-tipo-arquivo.svg" },
  { id: 2,  nome: "Foto do dano",              pasta: "Consumidor",  data: "12/05/2025", tamanho: "7.8 MB", icone: "/ant-design-file-jpg-outlined.svg" },
  { id: 3,  nome: "Comprovante de residência", pasta: "Cível",       data: "12/05/2025", tamanho: "4.4 MB", icone: "/bi-filetype-docx.svg" },
  { id: 4,  nome: "Declaração de imposto de renda", pasta: "Tributário", data: "10/05/2025", tamanho: "1.2 MB", icone: "/icone-tipo-arquivo.svg" },
  { id: 5,  nome: "Procuração",                pasta: "Cível",       data: "08/05/2025", tamanho: "0.8 MB", icone: "/bi-filetype-docx.svg" },
  { id: 6,  nome: "Sentença judicial",         pasta: "Trabalhista", data: "05/05/2025", tamanho: "3.1 MB", icone: "/icone-tipo-arquivo.svg" },
  { id: 7,  nome: "Extrato bancário",          pasta: "Consumidor",  data: "03/05/2025", tamanho: "0.5 MB", icone: "/ant-design-file-jpg-outlined.svg" },
  { id: 8,  nome: "Contrato social",           pasta: "Empresarial", data: "01/05/2025", tamanho: "2.0 MB", icone: "/bi-filetype-docx.svg" },
  { id: 9,  nome: "Nota fiscal",               pasta: "Consumidor",  data: "28/04/2025", tamanho: "0.3 MB", icone: "/ant-design-file-jpg-outlined.svg" },
  { id: 10, nome: "Laudo pericial",            pasta: "Cível",       data: "25/04/2025", tamanho: "5.7 MB", icone: "/icone-tipo-arquivo.svg" },
  { id: 11, nome: "Petição inicial",           pasta: "Trabalhista", data: "20/04/2025", tamanho: "1.8 MB", icone: "/bi-filetype-docx.svg" },
  { id: 12, nome: "Termo de audiência",        pasta: "Trabalhista", data: "15/04/2025", tamanho: "0.9 MB", icone: "/icone-tipo-arquivo.svg" },
  { id: 13, nome: "Comprovante de pagamento",  pasta: "Consumidor",  data: "10/04/2025", tamanho: "0.2 MB", icone: "/ant-design-file-jpg-outlined.svg" },
  { id: 14, nome: "Certidão",                  pasta: "Cível",       data: "05/04/2025", tamanho: "0.4 MB", icone: "/bi-filetype-docx.svg" },
  { id: 15, nome: "Alvará judicial",           pasta: "Família",     data: "01/04/2025", tamanho: "1.1 MB", icone: "/icone-tipo-arquivo.svg" },
];

const EXT_ICONE = {
  pdf:  "/icone-tipo-arquivo.svg",
  jpg:  "/ant-design-file-jpg-outlined.svg",
  jpeg: "/ant-design-file-jpg-outlined.svg",
  png:  "/ant-design-file-jpg-outlined.svg",
  doc:  "/bi-filetype-docx.svg",
  docx: "/bi-filetype-docx.svg",
};

const formatDate = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

const UploadArea = ({ onUpload }) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const counterRef = useRef(0);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    counterRef.current += 1;
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    counterRef.current -= 1;
    if (counterRef.current <= 0) {
      counterRef.current = 0;
      setDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    counterRef.current = 0;
    const files = e.dataTransfer?.files;
    if (files?.length > 0) {
      onUpload?.(files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload?.(file);
    }
    e.target.value = "";
  };

  return (
    <section className={`${styles.uploadArea} ${dragging ? styles.uploadAreaDragging : ""}`}
      onDragOver={handleDragOver} onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleClick}>
      <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
      <img className={styles.uploadIcone} loading="lazy" alt="" src="/material-symbols-light-add-notes-outline@2x.png" />
      <p className={styles.uploadTitulo}>Arraste e solte seu arquivo aqui</p>
      <p className={styles.uploadSubtitulo}>ou clique para selecionar</p>
      <p className={styles.uploadFormatos}>Formatos aceitos: PDF, DOC, DOCX, JPG, PNG (máx. 20MB)</p>
    </section>
  );
};

const INITIAL_PASTAS = [
  { nome: "Trabalhista", documentos: 5  },
  { nome: "Cível",       documentos: 2  },
  { nome: "Consumidor",  documentos: 7  },
  { nome: "Outros",      documentos: 70 },
];

const IADocumentos = () => {
  const [itensPorPagina, setItensPorPagina] = useState(8);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState("todos");
  const [menuAberto, setMenuAberto] = useState(null);
  const [documentos, setDocumentos] = useState(INITIAL_DOCS);
  const [pastas, setPastas] = useState(INITIAL_PASTAS);
  const [criarPastaAberto, setCriarPastaAberto] = useState(false);
  const [nomeNovaPasta, setNomeNovaPasta] = useState("");
  const nextId = useRef(16);

  const handleCriarPasta = () => setCriarPastaAberto(true);

  const confirmarCriarPasta = () => {
    const nome = nomeNovaPasta.trim();
    if (!nome) return;
    setPastas((prev) => [...prev, { nome, documentos: 0 }]);
    setCriarPastaAberto(false);
    setNomeNovaPasta("");
  };

  const handleUpload = useCallback((file) => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "pdf";
    const icone = EXT_ICONE[ext] || EXT_ICONE.pdf;
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    const novoDoc = {
      id: nextId.current++,
      nome: file.name,
      pasta: "Geral",
      data: formatDate(),
      tamanho: `${sizeMB} MB`,
      icone,
    };
    setDocumentos((prev) => [novoDoc, ...prev]);
  }, []);

  const docsFiltrados = useMemo(() => {
    if (filtroAtivo === "todos") return documentos;
    return documentos.filter((d) => d.pasta === filtroAtivo);
  }, [documentos, filtroAtivo]);

  const totalPaginas = Math.max(1, Math.ceil(docsFiltrados.length / itensPorPagina));

  const docsPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    return docsFiltrados.slice(inicio, inicio + itensPorPagina);
  }, [docsFiltrados, paginaAtual, itensPorPagina]);

  const selecionarFiltro = (id) => {
    setFiltroAtivo(id);
    setPaginaAtual(1);
    setFiltroAberto(false);
  };

  return (
    <div className={styles.iaDocumentos}>
      <Menu1 />
      <PageHeader onFiltrar={() => setFiltroAberto(true)} onUpload={handleUpload} onCriarPasta={handleCriarPasta} />
      {filtroAtivo !== "todos" && (
        <div style={{ alignSelf: "flex-start", maxWidth: "1280px", width: "100%", fontSize: "15px", color: "var(--azul-sereno)", fontWeight: 600, fontFamily: "var(--font-montserrat)" }}>
          Filtrando: {FILTROS.find((f) => f.id === filtroAtivo)?.label}
        </div>
      )}
      <UploadArea onUpload={handleUpload} />
      <Pastas pastas={pastas} />
      <RecentDocumentsSection documentos={docsPaginados} menuAberto={menuAberto} onToggleMenu={setMenuAberto} />
      <SessaoFiltro
        total={docsFiltrados.length}
        exibindo={docsPaginados.length}
        itensPorPagina={itensPorPagina}
        paginaAtual={paginaAtual}
        onChangeItensPorPagina={(v) => { setItensPorPagina(v); setPaginaAtual(1); }}
        onPaginaAnterior={() => setPaginaAtual((p) => Math.max(1, p - 1))}
        onPaginaProxima={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
      />

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

      {criarPastaAberto && (
        <div className={styles.overlay} onClick={() => { setCriarPastaAberto(false); setNomeNovaPasta(""); }}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitulo}>Criar pasta</h2>
            <input className={styles.criarPastaInput} type="text" placeholder="Nome da pasta" value={nomeNovaPasta} onChange={(e) => setNomeNovaPasta(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") confirmarCriarPasta(); }} autoFocus />
            <div className={styles.modalBotoes}>
              <button className={styles.modalCancelar} onClick={() => { setCriarPastaAberto(false); setNomeNovaPasta(""); }}>Cancelar</button>
              <button className={styles.modalConfirmar} onClick={confirmarCriarPasta}>Criar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IADocumentos;
