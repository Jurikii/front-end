import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./BUSCA.module.css";

const BUSCA = ({
  className = "",
  searchQuery = "",
  onSearchChange,
  onSearchSubmit,
  onFilterClick,
  onKeyDown,
  filtroAtivo = false,
}) => {
  return (
    <section className={[styles.busca, className].join(" ")}>
      <div className={styles.buscarAdvogado}>
        <h1 className={styles.buscarAdvogado2}>Buscar advogado</h1>
        <h3 className={styles.encontreOEspecialista}>
          Encontre o especialista ideal para o seu caso
        </h3>
      </div>
      <div className={styles.botesDeBusca}>
        <div className={styles.menuDeBusca}>
          <div className={styles.pesquisar}>
            <input
              className={styles.buscarDocumento}
              type="text"
              placeholder="Busque por nome ou área de atuação"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <img className={styles.lupaIcon} alt="" src="/lupa.svg" />
          </div>
        </div>
        <button className={styles.buscar} onClick={onSearchSubmit}>
          <span className={styles.buscar2}>Buscar</span>
        </button>
        <button
          className={`${styles.filtros} ${filtroAtivo ? styles.filtrosAtivo : ""}`}
          onClick={onFilterClick}
        >
          <span className={styles.buscarDocumento}>Filtrar</span>
          <img className={styles.filtroIcon} alt="" src="/filtro.svg" />
          {filtroAtivo && <span className={styles.filtroBadge} />}
        </button>
      </div>
    </section>
  );
};

BUSCA.propTypes = {
  className: PropTypes.string,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
  onSearchSubmit: PropTypes.func,
  onFilterClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  filtroAtivo: PropTypes.bool,
};

export default BUSCA;
