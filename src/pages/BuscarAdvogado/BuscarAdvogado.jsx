import { useState, useCallback, useMemo } from "react";
import { useFavoritos } from "../../hooks/useFavoritos";
import Menu1 from "../../components/Menu1";
import BUSCA from "../../components/BUSCA";
import AdvogadosDisponiveis from "../../components/AdvogadosDisponiveis";
import { ADVOGADOS_LISTA } from "../../components/AdvogadosDisponiveis";
import styles from "./BuscarAdvogado.module.css";

const AREAS = [
  "Trabalhista",
  "Cível",
  "Família",
  "Consumidor",
  "Previdenciário",
];

const FILTROS_OPCOES = [
  { id: "todos", label: "Todos" },
  { id: "melhor-avaliacao", label: "Melhor avaliação" },
  { id: "az", label: "A-Z" },
  { id: "za", label: "Z-A" },
];

const FILTRO_LABEL = {
  "melhor-avaliacao": "Melhor avaliação",
  "az": "A-Z",
  "za": "Z-A",
};

const BuscarAdvogado = () => {
  const { isFavorito, toggleFavorito } = useFavoritos();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState(false);
  const [filtroModalAberto, setFiltroModalAberto] = useState(false);
  const [filtroOrdenacao, setFiltroOrdenacao] = useState("todos");

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    setFiltroAtivo(true);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        setFiltroAtivo(true);
      }
    },
    []
  );

  const abrirFiltro = useCallback(() => {
    setFiltroModalAberto(true);
  }, []);

  const fecharFiltro = useCallback(() => {
    setFiltroModalAberto(false);
  }, []);

  const selecionarFiltro = useCallback((id) => {
    setFiltroOrdenacao(id);
    if (id !== "todos" || selectedArea || searchQuery) {
      setFiltroAtivo(true);
    }
    setFiltroModalAberto(false);
  }, [selectedArea, searchQuery]);

  const handleAreaClick = useCallback((area) => {
    setSelectedArea((prev) => (prev === area ? null : area));
    setFiltroAtivo(true);
  }, []);

  const advogadosFiltrados = useMemo(() => {
    let lista = [...ADVOGADOS_LISTA];

    if (selectedArea) {
      const areaLower = selectedArea.toLowerCase();
      lista = lista.filter((adv) =>
        adv.areas.some((a) => a.toLowerCase().includes(areaLower))
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      lista = lista.filter(
        (adv) =>
          adv.nome.toLowerCase().includes(query) ||
          adv.areas.some((a) => a.toLowerCase().includes(query))
      );
    }

    if (filtroOrdenacao === "az") {
      lista.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (filtroOrdenacao === "za") {
      lista.sort((a, b) => b.nome.localeCompare(a.nome));
    } else if (filtroOrdenacao === "melhor-avaliacao") {
      lista.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return lista;
  }, [selectedArea, searchQuery, filtroOrdenacao]);

  const filtroLabelAtivo = filtroOrdenacao !== "todos" ? FILTRO_LABEL[filtroOrdenacao] : null;

  const temFiltroPersonalizado = filtroOrdenacao !== "todos" || !!selectedArea || !!searchQuery;

  return (
    <div className={styles.buscarAdvogado}>
      <Menu1 />
      <main className={styles.elementos}>
        <BUSCA
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          onFilterClick={abrirFiltro}
          onKeyDown={handleKeyDown}
          filtroAtivo={temFiltroPersonalizado}
        />

        {filtroLabelAtivo && (
          <div className={styles.filtroAtivoInfo}>
            <span className={styles.filtroAtivoTexto}>
              Filtrando por: <strong>{filtroLabelAtivo}</strong>
            </span>
            <button
              className={styles.limparFiltroBtn}
              onClick={() => selecionarFiltro("todos")}
            >
              Limpar
            </button>
          </div>
        )}

        <div className={styles.areasAtuacao}>
          <h2 className={styles.reasDeAtuao}>Áreas de atuação</h2>
          <div className={styles.areasAtuacao2}>
            {AREAS.map((area) => (
              <div
                key={area}
                className={`${styles.tagArea} ${
                  selectedArea === area ? styles.tagAreaAtiva : ""
                }`}
                onClick={() => handleAreaClick(area)}
              >
                <div className={styles.tagLabel}>{area}</div>
              </div>
            ))}
            <div
              className={`${styles.tagArea} ${
                !selectedArea && filtroOrdenacao === "todos" && !searchQuery ? styles.tagAreaAtiva : ""
              }`}
              onClick={() => {
                setSelectedArea(null);
                setSearchQuery("");
                setFiltroAtivo(false);
                setFiltroOrdenacao("todos");
              }}
            >
              <div className={styles.tagLabel}>Ver todas</div>
            </div>
          </div>
        </div>
        <AdvogadosDisponiveis
          isFavorito={isFavorito}
          onToggleFavorito={toggleFavorito}
          filteredList={advogadosFiltrados}
          filtroAtivo={filtroAtivo}
        />
      </main>

      {filtroModalAberto && (
        <div className={styles.overlay} onClick={fecharFiltro}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitulo}>Ordenar por</h3>
              <button className={styles.modalFechar} onClick={fecharFiltro}>
                ✕
              </button>
            </div>
            <div className={styles.filtroOpcoes}>
              {FILTROS_OPCOES.map((opcao) => (
                <button
                  key={opcao.id}
                  className={`${styles.filtroOpcao} ${
                    filtroOrdenacao === opcao.id ? styles.filtroOpcaoAtiva : ""
                  }`}
                  onClick={() => selecionarFiltro(opcao.id)}
                >
                  {opcao.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuscarAdvogado;
