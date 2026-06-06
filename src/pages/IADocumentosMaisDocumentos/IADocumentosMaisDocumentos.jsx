import { useState, useMemo } from "react";
import Menu1 from "../../components/Menu1";
import Voltar from "./components/Voltar";
import Pastas from "./components/Pastas";
import SessaoFiltro from "../../components/SessaoFiltro/SessaoFiltro";
import styles from "./IADocumentosMaisDocumentos.module.css";

const FOLDER_DATA = [
  { label: "Trabalhista", count: "5" },
  { label: "Cível", count: "2" },
  { label: "Consumidor", count: "7" },
  { label: "Outros", count: "70" },
  { label: "Família", count: "5" },
  { label: "Previdenciário", count: "2" },
  { label: "Imobiliário", count: "7" },
  { label: "Tributário", count: "70" },
  { label: "Empresarial", count: "5" },
  { label: "Contatos", count: "2" },
  { label: "Financeiro", count: "7" },
  { label: "Pessoal", count: "70" },
];

const FILTROS = [
  { id: "todos", label: "Todas" },
  { id: "az", label: "Ordem alfabética A-Z" },
  { id: "za", label: "Ordem alfabética Z-A" },
  { id: "ate5", label: "Até 5 documentos" },
  { id: "6a20", label: "6 a 20 documentos" },
  { id: "mais20", label: "Mais de 20 documentos" },
];

function aplicarFiltroLista(folders, filtroId) {
  let resultado = folders;
  if (filtroId === "az") {
    resultado = [...folders].sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));
  } else if (filtroId === "za") {
    resultado = [...folders].sort((a, b) => b.label.localeCompare(a.label, "pt-BR"));
  } else if (filtroId !== "todos") {
    resultado = folders.filter((f) => {
      const n = parseInt(f.count, 10);
      if (filtroId === "ate5") return n <= 5;
      if (filtroId === "6a20") return n >= 6 && n <= 20;
      if (filtroId === "mais20") return n > 20;
      return true;
    });
  }
  return resultado;
}

const IADocumentosMaisDocumentos = () => {
  const [folders, setFolders] = useState(FOLDER_DATA);
  const [modalAberto, setModalAberto] = useState(false);
  const [nomePasta, setNomePasta] = useState("");
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtroAtivo, setFiltroAtivo] = useState("todos");
  const [itensPorPagina, setItensPorPagina] = useState(12);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const foldersFiltrados = useMemo(() => {
    return aplicarFiltroLista(folders, filtroAtivo);
  }, [folders, filtroAtivo]);

  const totalPaginas = Math.max(1, Math.ceil(foldersFiltrados.length / itensPorPagina));

  const foldersPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    return foldersFiltrados.slice(inicio, inicio + itensPorPagina);
  }, [foldersFiltrados, paginaAtual, itensPorPagina]);

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => {
    setModalAberto(false);
    setNomePasta("");
  };

  const criarPasta = () => {
    const nome = nomePasta.trim();
    if (!nome) return;
    setFolders((prev) => [...prev, { label: nome, count: "0" }]);
    fecharModal();
  };

  const abrirFiltro = () => setFiltroAberto(true);
  const fecharFiltro = () => setFiltroAberto(false);

  const selecionarFiltro = (id) => {
    setFiltroAtivo(id);
    setPaginaAtual(1);
    fecharFiltro();
  };

  const onChangeItensPorPagina = (valor) => {
    setItensPorPagina(valor);
    setPaginaAtual(1);
  };

  const grupos = [];
  for (let i = 0; i < foldersPaginados.length; i += 4) {
    grupos.push(foldersPaginados.slice(i, i + 4));
  }

  return (
    <div className={styles.iaDocumentosMaisDocumentos}>
      <Menu1 />
      <main className={styles.funcionalidades}>
        <Voltar onCriarPasta={abrirModal} onFiltrarPastas={abrirFiltro}  />
        {filtroAtivo !== "todos" && (
          <div className={styles.filtroAtivoInfo}>
            Filtrando: {FILTROS.find((f) => f.id === filtroAtivo)?.label}
          </div>
        )}
        {grupos.length > 0 ? (
          grupos.map((grupo, idx) => (
            <Pastas key={idx} mostrarHeader={idx === 0} cards={grupo} />
          ))
        ) : (
          <Pastas mostrarHeader cards={[]} />
        )}
      </main>
      <SessaoFiltro
        total={foldersFiltrados.length}
        exibindo={foldersPaginados.length}
        itensPorPagina={itensPorPagina}
        paginaAtual={paginaAtual}
        onChangeItensPorPagina={onChangeItensPorPagina}
        onPaginaAnterior={() => setPaginaAtual((p) => Math.max(1, p - 1))}
        onPaginaProxima={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
      />

      {modalAberto && (
        <div className={styles.overlay} onClick={fecharModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitulo}>Criar nova pasta</h2>
            <input
              className={styles.modalInput}
              type="text"
              placeholder="Nome da pasta"
              value={nomePasta}
              onChange={(e) => setNomePasta(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && criarPasta()}
              autoFocus
            />
            <div className={styles.modalBotoes}>
              <button className={styles.modalCancelar} onClick={fecharModal}>
                Cancelar
              </button>
              <button className={styles.modalConfirmar} onClick={criarPasta}>
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {filtroAberto && (
        <div className={styles.overlay} onClick={fecharFiltro}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitulo}>Filtrar pastas</h2>
            <div className={styles.filtroOpcoes}>
              {FILTROS.map((f) => (
                <button
                  key={f.id}
                  className={`${styles.filtroOpcao} ${filtroAtivo === f.id ? styles.filtroOpcaoAtiva : ""}`}
                  onClick={() => selecionarFiltro(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className={styles.modalBotoes}>
              <button className={styles.modalCancelar} onClick={fecharFiltro}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IADocumentosMaisDocumentos;
