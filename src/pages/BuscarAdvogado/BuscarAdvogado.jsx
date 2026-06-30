import { useState, useCallback, useMemo, useEffect } from "react";
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

const BuscarAdvogado = () => {
  const { isFavorito, toggleFavorito } = useFavoritos();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState(false);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  useEffect(() => {
    setFiltroAtivo(!!selectedArea || !!searchQuery);
  }, [selectedArea, searchQuery]);

  const handleAreaClick = useCallback((area) => {
    setSelectedArea((prev) => (prev === area ? null : area));
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
      const normalizar = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const query = normalizar(searchQuery.trim());
      lista = lista.filter(
        (adv) =>
          normalizar(adv.nome).includes(query) ||
          adv.areas.some((a) => normalizar(a).includes(query))
      );
    }

    return lista;
  }, [selectedArea, searchQuery]);

  return (
    <div className={styles.buscarAdvogado}>
      <Menu1 />
      <main className={styles.elementos}>
        <BUSCA
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

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
                !selectedArea && !searchQuery ? styles.tagAreaAtiva : ""
              }`}
              onClick={() => {
                setSelectedArea(null);
                setSearchQuery("");
                setFiltroAtivo(false);
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
    </div>
  );
};

export default BuscarAdvogado;
