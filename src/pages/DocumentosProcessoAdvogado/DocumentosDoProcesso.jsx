import { useCallback, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavbarAdvogado";
import HeaderSuperior from "./components/HeaderSuperior";
import TabelaDocumentos from "./components/TabelaDocumentos";
import NovoDocumentoModal from "./components/NovoDocumentoModal";
import { NAV_LATERAL, DOCUMENTOS } from "./data/documentos";
import styles from "./DocumentosDoProcesso.module.css";

const ITENS_POR_PAGINA = 5;

// ── Componente de paginação ───────────────────────────────────────────────────

const Paginacao = ({ total, atual, onChange }) => {
  const totalPaginas = Math.ceil(total / ITENS_POR_PAGINA);
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
  const inicio = total === 0 ? 0 : (atual - 1) * ITENS_POR_PAGINA + 1;
  const fim = Math.min(atual * ITENS_POR_PAGINA, total);
  const paginaAnterior = atual - 1;
  const paginaSeguinte = atual + 1;

  return (
    <div className={styles.paginacao}>
      <span className={styles.paginacaoInfo}>
        Mostrando {inicio} a {fim} de {total} processos
      </span>
      <nav className={styles.paginacaoControles}>
        <img
          className={[styles.paginacaoBotao, paginaAnterior < 1 ? styles.paginacaoDesabilitado : ""].join(" ")}
          alt="Anterior"
          src="/Group-84.svg"
          onClick={() => paginaAnterior >= 1 && onChange(paginaAnterior)}
          style={paginaAnterior < 1 ? { opacity: 0.3, cursor: "not-allowed" } : { cursor: "pointer" }}
        />
        {paginas.map((p) => (
          <button
            key={p}
            className={[
              styles.paginacaoNumero,
              p === atual ? styles.paginacaoAtivo : "",
            ].join(" ")}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ))}
        <img
          className={[styles.paginacaoBotao, paginaSeguinte > totalPaginas ? styles.paginacaoDesabilitado : ""].join(" ")}
          alt="Próxima"
          src="/Group-83.svg"
          onClick={() => paginaSeguinte <= totalPaginas && onChange(paginaSeguinte)}
          style={paginaSeguinte > totalPaginas ? { opacity: 0.3, cursor: "not-allowed" } : { cursor: "pointer" }}
        />
      </nav>
    </div>
  );
};

// ── Componente principal ──────────────────────────────────────────────────────

const PRIORIDADE_BASE = { Alta: 1, Média: 2, Baixa: 3 };

function ordenarDocumentos(lista, criterio, urgenciasDinamicas = []) {
  const PRIORIDADE = {
    ...PRIORIDADE_BASE,
    ...Object.fromEntries(urgenciasDinamicas.map((u) => [u.nome, u.prioridade])),
  };
  const clone = [...lista];
  switch (criterio) {
    case "recentes":
      return clone.sort((a, b) => {
        const [da, ma, aa] = a.data.split("/").map(Number);
        const [db, mb, ab] = b.data.split("/").map(Number);
        return new Date(aa, ma - 1, da) > new Date(ab, mb - 1, db) ? -1 : 1;
      });
    case "antigos":
      return clone.sort((a, b) => {
        const [da, ma, aa] = a.data.split("/").map(Number);
        const [db, mb, ab] = b.data.split("/").map(Number);
        return new Date(aa, ma - 1, da) > new Date(ab, mb - 1, db) ? 1 : -1;
      });
    case "nome-az":
      return clone.sort((a, b) => a.partes.localeCompare(b.partes));
    case "nome-za":
      return clone.sort((a, b) => b.partes.localeCompare(a.partes));
    case "prioridade-alta":
      return clone.sort((a, b) => PRIORIDADE[a.urgencia] - PRIORIDADE[b.urgencia]);
    case "prioridade-baixa":
      return clone.sort((a, b) => PRIORIDADE[b.urgencia] - PRIORIDADE[a.urgencia]);
    default:
      return clone;
  }
}

function filtrarDocumentos(lista, filtros) {
  if (!filtros) return lista;
  return lista.filter((doc) => {
    const ext = doc.nome.split(".").pop().toUpperCase();
    if (filtros.formatos && Object.keys(filtros.formatos).length > 0 && filtros.formatos[ext] !== true) return false;

    if (filtros.tipos && Object.keys(filtros.tipos).length > 0) {
      const temTipo = filtros.tipos[doc.tipo] === true;
      const temOutros = filtros.tipos["Outros"] === true && !["Ata", "Contrato", "Despacho", "Evidência", "Petição", "Recurso", "Sentença"].includes(doc.tipo);
      if (!temTipo && !temOutros) return false;
    }

    if (filtros.areas && Object.keys(filtros.areas).length > 0) {
      const temArea = filtros.areas[doc.areaDireito] === true;
      const temOutros = filtros.areas["Outros"] === true && !["Direito Civil", "Direito de Família", "Direito do Consumidor", "Direito Previdenciário"].includes(doc.areaDireito);
      if (!temArea && !temOutros) return false;
    }

    if (filtros.urgencias && Object.keys(filtros.urgencias).length > 0 && filtros.urgencias[doc.urgencia] !== true) return false;

    if (filtros.cliente) {
      if (!doc.partes.toLowerCase().includes(filtros.cliente.toLowerCase())) return false;
    }

    if (filtros.processo && !doc.processo.includes(filtros.processo)) return false;

    if (filtros.dataAtual) {
      const [dd, mm, aa] = doc.data.split("/").map(Number);
      const dataDoc = new Date(aa, mm - 1, dd);
      const hoje = new Date();
      if (filtros.dataAtual === "Hoje") {
        if (dataDoc.toDateString() !== hoje.toDateString()) return false;
      } else {
        const dias = filtros.dataAtual === "Últimos 7 dias" ? 7 : 30;
        const limite = new Date(hoje);
        limite.setDate(limite.getDate() - dias);
        limite.setHours(0, 0, 0, 0);
        if (dataDoc < limite) return false;
      }
    }

    return true;
  });
}

const DocumentosDoProcesso = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenarPor, setOrdenarPor] = useState("recentes");
  const [filtros, setFiltros] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos os documentos");
  const [documentos, setDocumentos] = useState(DOCUMENTOS);

  // Ref para scroll até a paginação
  const paginacaoRef = useRef(null);

  const scrollAtePaginacao = () => {
    setTimeout(() => {
      paginacaoRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 0);
  };

  // Modal
  const [modalAberto, setModalAberto] = useState(false);
  const [arquivoPendente, setArquivoPendente] = useState(null);

  // Dinâmicas
  const [dynamicTipos, setDynamicTipos] = useState([]);
  const [dynamicUrgencias, setDynamicUrgencias] = useState([]);

  // Opções computadas para filtros e modal
  const opcoesFormatos = useMemo(() => [...new Set(documentos.map((d) => d.nome.split(".").pop().toUpperCase()))].sort(), [documentos]);
  const opcoesTipos = useMemo(() => {
    const fromDocs = [...new Set(documentos.map((d) => d.tipo))];
    const fromDyn = dynamicTipos.map((d) => d.nome);
    return [...new Set([...fromDocs, ...fromDyn])].sort();
  }, [documentos, dynamicTipos]);
  const opcoesAreas = useMemo(() => [...new Set(documentos.map((d) => d.areaDireito))].sort(), [documentos]);
  const opcoesPartes = useMemo(() => [...new Set(documentos.map((d) => d.partes))], [documentos]);
  const opcoesProcessos = useMemo(() => [...new Set(documentos.map((d) => d.processo))], [documentos]);
  const opcoesUrgencias = useMemo(() => {
    const fromDyn = dynamicUrgencias.map((d) => d.nome);
    return [...new Set(["Alta", "Média", "Baixa", ...fromDyn])];
  }, [dynamicUrgencias]);

  // Opções com cores para o modal
  const tiposComCores = useMemo(() => {
    const fromDocs = [...new Set(documentos.map((d) => d.tipo))].map((t) => ({ nome: t }));
    return [...fromDocs, ...dynamicTipos];
  }, [documentos, dynamicTipos]);
  const urgenciasComCores = useMemo(() => {
    return [
      { nome: "Alta", cor: "#e74c3c", prioridade: 1 },
      { nome: "Média", cor: "#f39c12", prioridade: 2 },
      { nome: "Baixa", cor: "#2ecc71", prioridade: 3 },
      ...dynamicUrgencias,
    ];
  }, [dynamicUrgencias]);

  const navigate = useNavigate();

  const handleNavClick = useCallback((destino) => {
    const rotas = {
      inicio: "/homeadvogado",
      chat: "/chatadvogado",
      agenda: "/agendaadvogado",
      processos: "/meus-processosadvogado",
      configuracao: "/configuracoesadvogado",
      perfil: "/perfiladvogado",
      configuracoes: "/configuracoesadvogado",
    };
    const rota = rotas[destino];
    if (rota) navigate(rota);
  }, [navigate]);

  // Categorias dinâmicas baseadas nos documentos atuais
  const categorias = useMemo(() => {
    const total = documentos.length;
    const sentenca = documentos.filter((d) => d.tipo === "Sentença").length;
    const provas = documentos.filter((d) => d.tipo === "Evidência").length;
    const contratos = documentos.filter((d) => d.tipo === "Contrato").length;
    const outros = total - sentenca - provas - contratos;
    return [
      { label: "Todos os documentos", quantidade: total, icone: "/Icone-todos-documentos.svg" },
      { label: "Sentença",            quantidade: sentenca, icone: "/Icone-Documentos-Sentenca.svg" },
      { label: "Provas e evidências", quantidade: provas, icone: "/Icone-Documentos-Evidencia.svg" },
      { label: "Contratos",           quantidade: contratos, icone: "/Icone-Documentos-Contrato.svg" },
      { label: "Outros",              quantidade: outros, icone: "/Icone-Documentos-Outros.svg" },
    ];
  }, [documentos]);

  const documentosFiltrados = filtrarDocumentos(documentos, filtros);
  const documentosOrdenados = ordenarDocumentos(documentosFiltrados, ordenarPor, dynamicUrgencias);
  const totalDocumentos = documentosOrdenados.length;
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const documentosPagina = documentosOrdenados.slice(inicio, inicio + ITENS_POR_PAGINA);

  const handleMudarPagina = useCallback((pagina) => {
    setPaginaAtual(pagina);
    scrollAtePaginacao();
  }, []);

  const handleChangeOrdenarPor = useCallback((criterio) => {
    setOrdenarPor(criterio);
    setPaginaAtual(1);
    scrollAtePaginacao();
  }, []);

  const handleAplicarFiltros = useCallback((filtrosSelecionados) => {
    setFiltros(filtrosSelecionados);
    setCategoriaSelecionada((() => {
      if (!filtrosSelecionados) return "Todos os documentos";
      const temFiltro = (obj) => obj && Object.keys(obj).length > 0;
      if (temFiltro(filtrosSelecionados.formatos)) return "";
      if (temFiltro(filtrosSelecionados.areas)) return "";
      if (temFiltro(filtrosSelecionados.urgencias)) return "";
      if (filtrosSelecionados.cliente) return "";
      if (filtrosSelecionados.processo) return "";
      if (filtrosSelecionados.dataAtual) return "";
      if (!temFiltro(filtrosSelecionados.tipos)) return "Todos os documentos";
      const tiposStr = JSON.stringify(filtrosSelecionados.tipos);
      const mapa = {
        '{"Sentença":true}': "Sentença",
        '{"Evidência":true}': "Provas e evidências",
        '{"Contrato":true}': "Contratos",
        '{"Petição":true,"Despacho":true,"Ata":true,"Recurso":true}': "Outros",
      };
      return mapa[tiposStr] || "";
    })());
    setPaginaAtual(1);
    scrollAtePaginacao();
  }, []);

  const handleLimparFiltros = useCallback(() => {
    setFiltros(null);
    setCategoriaSelecionada("Todos os documentos");
    setPaginaAtual(1);
    scrollAtePaginacao();
  }, []);

  const handleChangeCategoria = useCallback((categoria) => {
    setCategoriaSelecionada(categoria);
    setPaginaAtual(1);
    if (categoria === "Todos os documentos") {
      setFiltros(null);
    } else {
      const mapa = {
        "Sentença":            { tipos: { Sentença: true } },
        "Provas e evidências": { tipos: { Evidência: true } },
        "Contratos":           { tipos: { Contrato: true } },
        "Outros":              { tipos: { Petição: true, Despacho: true, Ata: true, Recurso: true } },
      };
      setFiltros(mapa[categoria] || null);
    }
  }, []);

  const handleFileDetected = useCallback((fileInfo) => {
    setArquivoPendente(fileInfo);
    setModalAberto(true);
  }, []);

  const handleExcluirDocumento = useCallback((docId) => {
    setDocumentos((prev) => prev.filter((d) => d.id !== docId));
  }, []);

  const [editandoDoc, setEditandoDoc] = useState(null);

  const handleConfirmarNovoDocumento = useCallback((dados) => {
    const novosTiposList = dados.novosTipos || [];
    const novasUrgenciasList = dados.novasUrgencias || [];
    setDocumentos((prev) => {
      if (editandoDoc) {
        return prev.map((d) => d.id === editandoDoc.id ? {
          ...d,
          nome: dados.nome,
          tamanho: arquivoPendente?.tamanho || editandoDoc.tamanho,
          icone: arquivoPendente?.icone || editandoDoc.icone,
          tipo: dados.tipo,
          tipoCor: dados.tipoCor,
          urgencia: dados.urgencia,
          urgenciaCor: dados.urgenciaCor,
          urgenciaPrioridade: dados.urgenciaPrioridade,
          partes: dados.partes,
          processo: dados.processo,
          areaDireito: dados.areaDireito,
          data: arquivoPendente?.data || dados.data,
          hora: arquivoPendente?.hora || dados.hora,
        } : d);
      }
      const maxId = prev.reduce((max, d) => Math.max(max, d.id), 0);
      const icone = arquivoPendente?.icone || "/icone-tipo-arquivo.svg";
      return [{
        id: maxId + 1,
        nome: dados.nome,
        tamanho: arquivoPendente?.tamanho || "0 B",
        icone,
        tipo: dados.tipo,
        tipoCor: dados.tipoCor,
        urgencia: dados.urgencia,
        urgenciaCor: dados.urgenciaCor,
        urgenciaPrioridade: dados.urgenciaPrioridade,
        partes: dados.partes,
        processo: dados.processo,
        areaDireito: dados.areaDireito,
        data: arquivoPendente?.data || dados.data,
        hora: arquivoPendente?.hora || dados.hora,
      }, ...prev];
    });
    if (novosTiposList.length) setDynamicTipos((prev) => [...prev, ...novosTiposList]);
    if (novasUrgenciasList.length) setDynamicUrgencias((prev) => [...prev, ...novasUrgenciasList]);
    setModalAberto(false);
    setEditandoDoc(null);
    setArquivoPendente(null);
    setPaginaAtual(1);
    scrollAtePaginacao();
  }, [arquivoPendente, editandoDoc]);

  const handleEditarDocumento = useCallback((doc) => {
    setArquivoPendente({ nome: doc.nome, tamanho: doc.tamanho, icone: doc.icone, data: doc.data, hora: doc.hora });
    setEditandoDoc(doc);
    setModalAberto(true);
  }, []);

  const handleFecharModal = useCallback(() => {
    setModalAberto(false);
    setEditandoDoc(null);
    setArquivoPendente(null);
  }, []);

  return (
    <div className={styles.pagina}>
      <Navbar />

      {/* ── Área principal ── */}
      <main className={styles.conteudo}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
          {NAV_LATERAL.map(({ label, icone, ativo }) => (
            <button
              key={label}
              className={[styles.sidebarItem, ativo ? styles.sidebarItemAtivo : ""].join(" ")}
              onClick={() => {
                if (label === "Detalhes do processo") navigate("/detalhes-processoadvogado");
                if (label === "Documentos do processo") navigate("/documentos-processoadvogado");
              }}
            >
              <img className={styles.sidebarIcone} alt="" src={icone} />
              <span>{label}</span>
            </button>
          ))}
          </div>
        </aside>

        {/* Corpo */}
        <section className={styles.corpo}>
          <div className={styles.corpoPainel}>
            <HeaderSuperior onVoltar={() => handleNavClick("processos")} ordenarPor={ordenarPor} onChangeOrdenarPor={handleChangeOrdenarPor} onAplicarFiltros={handleAplicarFiltros} onLimparFiltros={handleLimparFiltros} filtrosAtuais={filtros} categoriaSelecionada={categoriaSelecionada} onChangeCategoria={handleChangeCategoria} onFileDetected={handleFileDetected} opcoesFormatos={opcoesFormatos} opcoesTipos={opcoesTipos} opcoesAreas={opcoesAreas} opcoesUrgencias={opcoesUrgencias} categorias={categorias} />
            <NovoDocumentoModal
              aberto={modalAberto}
              onFechar={handleFecharModal}
              onConfirmar={handleConfirmarNovoDocumento}
              nomeArquivo={arquivoPendente?.nome}
              editando={editandoDoc}
              tiposExistentes={tiposComCores}
              partesExistentes={opcoesPartes}
              processosExistentes={opcoesProcessos}
              areasExistentes={opcoesAreas}
              urgenciasExistentes={urgenciasComCores}
            />
            <TabelaDocumentos documentos={documentosPagina} onExcluir={handleExcluirDocumento} onEditar={handleEditarDocumento} />
            <div ref={paginacaoRef}>
              <Paginacao total={totalDocumentos} atual={paginaAtual} onChange={handleMudarPagina} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DocumentosDoProcesso;
